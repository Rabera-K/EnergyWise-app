import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

const DataContext = createContext(null);
const CACHE_TTL = 60 * 1000;

export function DataProvider({ children }) {
  const [cache, setCache] = useState({});
  const inflightRef = useRef({});
  const cacheRef = useRef({});

  const fetchWithCache = useCallback(async (key, url) => {
    const cached = cacheRef.current[key];
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    if (inflightRef.current[key]) {
      return inflightRef.current[key];
    }

    const token = localStorage.getItem("ew_token");
    const promise = fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          cacheRef.current[key] = { data: d.data, timestamp: Date.now() };
        }
        delete inflightRef.current[key];
        return d.success ? d.data : null;
      })
      .catch(() => {
        delete inflightRef.current[key];
        return null;
      });

    inflightRef.current[key] = promise;
    return promise;
  }, []);

  const invalidate = useCallback((key) => {
    setCache((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  return (
    <DataContext.Provider value={{ fetchWithCache, invalidate, cache }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

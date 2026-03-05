import { useState } from "react";
import styles from "./Services.module.css";
import { useUser } from "../../context/UserContext";

const CATEGORIES = [
  "All services",
  "Electrician",
  "Energy Auditor",
  "Installation",
  "Repair",
  "Maintenance",
];

const PROVIDERS = [
  {
    id: 1,
    name: "Chidi Okafor",
    rating: 4.8,
    reviews: 24,
    location: "Lagos, Ikeja",
    services: "Electrical Repairs, Installations, Energy Audits",
    experience: "15 years exp.",
    responseTime: "Responds in 2 hrs",
    verified: true,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=ChidiOkafor",
  },
  {
    id: 2,
    name: "Adedoyin Yinka",
    rating: 4.8,
    reviews: 24,
    location: "Lagos, Ikeja",
    services: "Electrical Repairs, Installations, Energy Audits",
    experience: "15 years exp.",
    responseTime: "Responds in 2 hrs",
    verified: true,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=AdedoyinYinka",
  },
  {
    id: 3,
    name: "Adedayo Gabriel",
    rating: 4.8,
    reviews: 24,
    location: "Lagos, Ikeja",
    services: "Electrical Repairs, Installations, Energy Audits",
    experience: "15 years exp.",
    responseTime: "Responds in 2 hrs",
    verified: true,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=AdedayoGabriel",
  },
  {
    id: 4,
    name: "Wasiu Kunle",
    rating: 4.8,
    reviews: 24,
    location: "Lagos, Ikeja",
    services: "Electrical Repairs, Installations, Energy Audits",
    experience: "15 years exp.",
    responseTime: "Responds in 2 hrs",
    verified: true,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=WasiuKunle",
  },
  {
    id: 5,
    name: "Emeka Nwosu",
    rating: 4.7,
    reviews: 18,
    location: "Lagos, Lekki",
    services: "Solar Installation, Energy Audits, Maintenance",
    experience: "10 years exp.",
    responseTime: "Responds in 4 hrs",
    verified: true,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=EmekaNwosu",
  },
  {
    id: 6,
    name: "Funke Adeleke",
    rating: 4.9,
    reviews: 31,
    location: "Lagos, Victoria Island",
    services: "Electrical Repairs, Installations, Maintenance",
    experience: "12 years exp.",
    responseTime: "Responds in 1 hr",
    verified: true,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=FunkeAdeleke",
  },
];

function StarRating({ rating }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "#F59E0B" : "none"}
          stroke="#F59E0B"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ProviderCard({ provider }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <img
          src={provider.avatar}
          alt={provider.name}
          className={styles.avatar}
        />
        <div className={styles.cardInfo}>
          <h3 className={styles.providerName}>{provider.name}</h3>
          <div className={styles.ratingRow}>
            <StarRating rating={provider.rating} />
            <span className={styles.ratingText}>
              {provider.rating} ({provider.reviews} reviews)
            </span>
          </div>
          <div className={styles.locationRow}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className={styles.location}>{provider.location}</span>
          </div>
          <p className={styles.services}>
            <strong>Services:</strong> {provider.services}
          </p>
          <div className={styles.badges}>
            {provider.verified && (
              <span className={`${styles.badge} ${styles.badgeGreen}`}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <polyline
                    points="20 6 9 17 4 12"
                    stroke="#0d7a6d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Verified
              </span>
            )}
            <span className={`${styles.badge} ${styles.badgeAmber}`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="7"
                  width="20"
                  height="14"
                  rx="2"
                  stroke="#f59e0b"
                  strokeWidth="1.8"
                />
                <path
                  d="M16 7V5a2 2 0 0 0-4 0v2"
                  stroke="#f59e0b"
                  strokeWidth="1.8"
                />
              </svg>
              {provider.responseTime}
            </span>
            <span className={`${styles.badge} ${styles.badgeAmber}`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {provider.experience}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.cardActions}>
        <button className={styles.viewBtn}>View Profile</button>
        <button className={styles.contactBtn}>Contact</button>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All services");
  const [search, setSearch] = useState("");
  const { user } = useUser();

  const filtered = PROVIDERS.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.services.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All services" ||
      p.services.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Service Providers</h1>
          <p className={styles.subtitle}>Find professionals for help</p>
        </div>
        <div className={styles.userAvatar}>{user?.initials || "U"}</div>
      </div>
      <div className={styles.searchWrap}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2" />
          <path
            d="M21 21l-4.35-4.35"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          className={styles.searchInput}
          placeholder="Search Service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.categories}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No providers found for "{search || activeCategory}".</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      )}
    </div>
  );
}

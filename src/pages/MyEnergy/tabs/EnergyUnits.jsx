import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EnergyUnits.module.css";

const QUICK_PURCHASE = [
  { kWh: 20, price: "₦2,200" },
  { kWh: 50, price: "₦5,500" },
  { kWh: 100, price: "₦11,000" },
];

function EnergyUnits() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [dashData, setDashData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("ew_token");
    const headers = { Authorization: `Bearer ${token}` };

    //dashboard analytics
    fetch(`${import.meta.env.VITE_API_URL}/dashboard`, { headers })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setDashData(d.data);
      })
      .catch(() => {});
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.balanceCard}>
        <div className={styles.frame}>
          <p className={styles.balanceLabel}>AVAILABLE ENERGY</p>
          <p className={styles.balanceValue}>
            {dashData?.available_energy ?? 45.2} <span>kWh</span>
          </p>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.btnAmber}
            onClick={() => navigate("/buy-energy")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                fill="#fff"
                d="M21 4.5H3A1.5 1.5 0 0 0 1.5 6v12A1.5 1.5 0 0 0 3 19.5h18a1.5 1.5 0 0 0 1.5-1.5V6A1.5 1.5 0 0 0 21 4.5ZM21 6v2.25H3V6h18ZM3 18V9.75h18V18H3Z"
              />
              <path fill="#000" d="M4.5 15H12v1.5H4.5V15Z" />
            </svg>

            <span>Buy Energy</span>
          </button>
          <button className={styles.btnAmber}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14 21 3M10 14l3.5 7a.55.55 0 0 0 1 0L21 3M10 14l-7-3.5a.55.55 0 0 1 0-1L21 3"
              />
            </svg>

            <span>Send Energy</span>
          </button>
          <button
            className={styles.btnOutline}
            onClick={() => navigate("/log-purchase")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                stroke="#000"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6.5 5h14v17h-14V5Z"
              />
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.5 5V2H4a.5.5 0 0 0-.5.5V19h3m4-8h6m-6 4h6"
              />
            </svg>

            <span>Log Purchase</span>
          </button>
        </div>
      </div>
      <div className={styles.suggestion}>
        {" "}
        <p className={styles.suggestionTitle}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                fill="#F59E0B"
                d="M4 11a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11h1Zm8-9a1 1 0 0 1 .993.883L13 3v1a1 1 0 0 1-1.993.117L11 4V3a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 .117 1.993L21 13h-1a1 1 0 0 1-.117-1.993L20 11h1ZM4.893 4.893a1 1 0 0 1 1.32-.083l.094.083.7.7a1 1 0 0 1-1.32 1.497l-.094-.083-.7-.7a1 1 0 0 1 0-1.414Zm12.8 0a1 1 0 0 1 1.497 1.32l-.083.094-.7.7a1 1 0 0 1-1.497-1.32l.083-.094.7-.7ZM14 18a1 1 0 0 1 1 1 3 3 0 0 1-6 0 1 1 0 0 1 .883-.993L10 18h4ZM12 6a6 6 0 0 1 3.6 10.8 1 1 0 0 1-.471.192l-.13.008H9a1 1 0 0 1-.6-.2A6 6 0 0 1 12 6Z"
              />
            </svg>
          </span>
          <strong>Next Purchase Suggested:</strong>
          <p className={styles.feb}>
            {dashData?.forecast_depletion_date
              ? new Date(dashData.forecast_depletion_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                  },
                )
              : "N/A"}
          </p>
        </p>
        <p className={styles.suggestionText}>
          We recommend purchasing 50 kWh to maintain your current usage pattern.
        </p>
      </div>
      <div className={styles.quickPurchase}>
        <h3 className={styles.sectionTitle}>Quick Purchase</h3>
        <div className={styles.presets}>
          {QUICK_PURCHASE.map(({ kWh, price }) => (
            <button
              key={kWh}
              onClick={() => setSelected(kWh)}
              className={`${styles.preset} ${selected === kWh ? styles.presetSelected : ""}`}
            >
              <span className={styles.presetkWh}>{kWh} kWh</span>
              <span className={styles.presetPrice}>{price}</span>
            </button>
          ))}
        </div>
        <button className={styles.customBtn}>Custom Amount</button>
      </div>
    </div>
  );
}

export default EnergyUnits;

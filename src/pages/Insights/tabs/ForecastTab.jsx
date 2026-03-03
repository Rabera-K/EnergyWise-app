import styles from "./ForecastTab.module.css";
import { useState, useEffect } from "react";

export default function ForecastTab() {
  const [dashData, setDashData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("ew_token");
    const headers = { Authorization: `Bearer ${token}` };

    //dashboard analytics
    fetch(`${import.meta.env.VITE_API_URL}/dashboard`, { headers })
      .then((r) => r.json())
      .then((d) => {
        console.log("dashboard response:", d);
        if (d.success) setDashData(d.data);
      })
      .catch(() => {});
  }, []);
  return (
    <div className={styles.wrap}>
      <section className={styles.balanceCard}>
        <div className={styles.balanceLabel}>CURRENT BALANCE</div>
        <div className={styles.balanceValue}>
          {dashData?.available_energy ?? 45.2} <span>kWh</span>
        </div>
        <div className={styles.balanceSub}>
          Lasts approximately {dashData?.estimated_duration_days ?? 6} days
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.h2}>Usage Estimate</h2>

        <div className={styles.bigAmount}>₦16,500</div>
        <div className={styles.sub}>Estimated for next 30 days</div>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <div className={styles.metaLabel}>Based on current usage</div>
            <div className={styles.metaValue}>Average rate</div>
          </div>
          <div className={styles.metaItem}>
            <div className={styles.metaLabel}>225 kWh</div>
            <div className={styles.metaValue}>₦110 / kWh</div>
          </div>
        </div>
      </section>

      <section className={styles.infoBox}>
        <div className={styles.infoIconWrap}>
          <div className={styles.infoIcon}>i</div>
        </div>
        <div>
          <div className={styles.infoTitle}>How We Calculate This</div>
          <div className={styles.infoText}>
            Forecasts are based on your appliance data, historical usage
            patterns, and current consumption rate. Accuracy improves with more
            data
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.h2}>Usage Timeline</h2>

        <div className={styles.timeline}>
          <div className={styles.node}>
            <div className={`${styles.dot} ${styles.dotActive}`} />
            <div>
              <div className={styles.dateActive}>Today, Feb 20</div>
              <div className={styles.label}>Current balance</div>
              <div className={styles.value}>45.2 kWh</div>
            </div>
          </div>

          <div className={styles.node}>
            <div className={styles.dot} />
            <div>
              <div className={styles.date}>Feb 15</div>
              <div className={styles.label}>Estimated balance</div>
              <div className={styles.value}>22.5 kWh</div>
            </div>
          </div>

          <div className={styles.node}>
            <div className={styles.dot} />
            <div>
              <div className={styles.date}>Feb 18</div>
              <div className={styles.label}>Recommendation purchase</div>
              <div className={styles.value}>50 kWh (₦110 / kWh)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

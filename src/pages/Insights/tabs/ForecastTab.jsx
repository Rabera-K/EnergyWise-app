import styles from "./ForecastTab.module.css";
import { useState, useEffect } from "react";

export default function ForecastTab() {
  const [dashData, setDashData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("ew_token");
    const headers = { Authorization: `Bearer ${token}` };

    fetch(`${import.meta.env.VITE_API_URL}/dashboard`, { headers })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setDashData(d.data);
      })
      .catch(() => {});

    fetch(`${import.meta.env.VITE_API_URL}/forecast`, { headers })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setForecastData(d.data);
      })
      .catch(() => {});
  }, []);

  const TARIFF = 110;
  const dailyKwh = forecastData?.daily_kwh ?? dashData?.daily_average_kwh ?? 0;
  const monthly30 = Math.round(dailyKwh * 30);
  const monthlyCost = (monthly30 * TARIFF).toLocaleString("en-NG");
  const timeline = forecastData?.forecast_30_days ?? [];
  const depletionDay =
    forecastData?.depletionDay ?? dashData?.estimated_duration_days;

  const today = Date.now();
  const depleteDate = depletionDay
    ? new Date(today + Number(depletionDay) * 86400000).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" },
      )
    : "N/A";

  const day7Date = new Date(today + 7 * 86400000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const day7Units =
    timeline.find((d) => d.day === 7)?.projected_remaining_units?.toFixed(1) ??
    "—";
  const todayStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
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

        <div className={styles.bigAmount}>₦{monthlyCost}</div>
        <div className={styles.sub}>Estimated for next 30 days</div>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <div className={styles.metaLabel}>Daily Consumption</div>
            <div className={styles.metaValue}>30-day projection</div>
          </div>
          <div className={styles.metaItem}>
            <div className={styles.metaLabel}>
              {dailyKwh.toFixed(1)} kWh/day
            </div>
            <div className={styles.metaValue}>
              {monthly30} kWh · ₦{TARIFF}/kWh
            </div>
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
              <div className={styles.dateActive}>Today, {todayStr}</div>
              <div className={styles.label}>Current balance</div>
              <div className={styles.value}>
                {dashData?.available_energy ?? "—"} kWh
              </div>
            </div>
          </div>

          <div className={styles.node}>
            <div className={styles.dot} />
            <div>
              <div className={styles.date}>{day7Date}</div>
              <div className={styles.label}>Estimated balance (Day 7)</div>
              <div className={styles.value}>{day7Units} kWh</div>
            </div>
          </div>

          <div className={styles.node}>
            <div className={styles.dot} />
            <div>
              <div className={styles.date}>{depleteDate}</div>
              <div className={styles.label}>Estimated depletion</div>
              <div className={styles.value}>Purchase recommended</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

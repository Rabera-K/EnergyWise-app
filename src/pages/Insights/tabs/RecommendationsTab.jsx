import { useState, useEffect } from "react";
import styles from "./RecommendationsTab.module.css";
import { useData } from "../../../context/DataContext";

/* ── Icons ───────────────────────────────────────── */
function AcIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="6"
        width="20"
        height="10"
        rx="2"
        stroke="#0d7a6d"
        strokeWidth="1.8"
      />
      <line x1="6" y1="11" x2="18" y2="11" stroke="#0d7a6d" strokeWidth="1.5" />
      <line x1="7" y1="16" x2="5" y2="20" stroke="#0d7a6d" strokeWidth="1.5" />
      <line
        x1="12"
        y1="16"
        x2="12"
        y2="20"
        stroke="#0d7a6d"
        strokeWidth="1.5"
      />
      <line
        x1="17"
        y1="16"
        x2="19"
        y2="20"
        stroke="#0d7a6d"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.22-1.2 4.16-3 5.2V17H9v-2.8A6 6 0 0 1 6 9a6 6 0 0 1 6-6z"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WasherIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="#0d7a6d"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="13" r="4" stroke="#0d7a6d" strokeWidth="1.5" />
      <circle cx="12" cy="13" r="1.5" fill="#0d7a6d" />
      <line
        x1="7"
        y1="7"
        x2="7.01"
        y2="7"
        stroke="#0d7a6d"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonStarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3z"
        fill="#F59E0B"
      />
    </svg>
  );
}

/* ── Data ─ */
const actions = [
  {
    id: "ac",
    title: "Raise your AC by 2°C",
    saving: "-₦1,400/month",
    lines: [
      "Your AC runs at 20°C for ~ 9 hrs/day.",
      "Setting it to 22°C cuts consumption by 14% with minimal comfort impact",
    ],
    Icon: AcIcon,
  },
  {
    id: "moon",
    title: "Unplug devices at night",
    saving: "-₦980/month",
    lines: [
      "Your TV, decoder, and chargers draw standby power overnight.",
      "Unplugging saves an estimated 9 KWh monthly.",
    ],
    Icon: MoonIcon,
  },
  {
    id: "bulb",
    title: "Switch to LED lighting",
    saving: "-₦820/month",
    lines: [
      "2 of your rooms likely use incandescent bulbs based on usage patterns.",
      "LEDs use 80% less energy for the same brightness.",
    ],
    Icon: BulbIcon,
  },
];

const doingWell = [
  {
    id: "washer",
    title: "Washing machine usage",
    lines: ["it is well timed.", "You run full loads during off-peak hours"],
    Icon: WasherIcon,
  },
  {
    id: "moonstar",
    title: "Overnight consumption",
    lines: ["it is 22% below average for your household size.", "Keep it up."],
    Icon: MoonStarIcon,
  },
];

/* ── Component ───────────────────────────────────── */
export default function RecommendationsTab() {
  const [recData, setRecData] = useState(null);
  const { fetchWithCache } = useData();

  useEffect(() => {
    fetchWithCache(
      "recommendations",
      `${import.meta.env.VITE_API_URL}/recommendations`,
    ).then((data) => {
      if (data) setRecData(data);
    });
  }, []);
  return (
    <div className={styles.wrap}>
      {/* Mini stats */}
      <div className={styles.miniStats}>
        <div className={styles.miniCard}>
          <div className={styles.miniValue}>
            {recData?.daily_kwh?.toFixed(1) ?? "—"} kWh
          </div>
          <div className={styles.miniLabel}>Daily usage</div>
        </div>
        <div className={styles.miniDivider} />
        <div className={styles.miniCard}>
          <div className={styles.miniValue}>
            {recData?.days_remaining?.toFixed(0) ?? "—"}
          </div>
          <div className={styles.miniLabel}>Days remaining</div>
        </div>
        <div className={styles.miniDivider} />
        <div className={styles.miniCard}>
          <div className={styles.miniValue}>
            {recData?.units_per_day?.toFixed(1) ?? "—"}
          </div>
          <div className={styles.miniLabel}>Units/day</div>
        </div>
      </div>

      {/* Top Actions */}
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>Top Actions for You</div>
          <div className={styles.tipPill}>
            {recData?.recommendations?.length ?? actions.length} tips
          </div>
        </div>

        <div className={styles.actionList}>
          {actions.map((a, idx) => (
            <div key={a.id}>
              <div className={styles.actionRow}>
                <div className={styles.actionIconWrap}>
                  <a.Icon />
                </div>
                <div className={styles.actionContent}>
                  <div className={styles.actionTopRow}>
                    <div className={styles.actionTitle}>{a.title}</div>
                    <div className={styles.saving}>{a.saving}</div>
                  </div>
                  <div className={styles.actionBody}>
                    {a.lines.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                  <button className={styles.viewBtn}>View →</button>
                </div>
              </div>
              {idx !== actions.length - 1 && <div className={styles.divider} />}
            </div>
          ))}
        </div>
        {recData?.recommendations?.length > 0 && (
          <section className={styles.panel} style={{ marginTop: "16px" }}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Live Recommendations</div>
            </div>
            <div className={styles.actionList}>
              {recData.recommendations.map((r, i) => (
                <div key={i} className={styles.actionRow}>
                  <div className={styles.actionIconWrap}>
                    <span
                      style={{
                        fontSize: "18px",
                        color:
                          r.type === "warning"
                            ? "#ef4444"
                            : r.type === "positive"
                              ? "#10b981"
                              : "#f59e0b",
                      }}
                    >
                      {r.type === "warning"
                        ? "⚠️"
                        : r.type === "positive"
                          ? "✅"
                          : "ℹ️"}
                    </span>
                  </div>
                  <div className={styles.actionContent}>
                    <div className={styles.actionBody}>{r.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* Doing Well */}
      <section className={styles.panelBottom}>
        <div className={styles.panelTitle}>You're Already Doing Well</div>
        <div className={styles.goodGrid}>
          {doingWell.map((x) => (
            <div className={styles.goodCard} key={x.id}>
              <div className={styles.goodIconWrap}>
                <x.Icon />
              </div>
              <div>
                <div className={styles.goodTitle}>{x.title}</div>
                <div className={styles.goodBody}>
                  {x.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

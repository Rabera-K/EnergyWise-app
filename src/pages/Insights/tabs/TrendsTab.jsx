import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
} from "recharts";
import styles from "./TrendsTab.module.css";
import { useState, useEffect } from "react";
import { useData } from "../../../context/DataContext";

/* ── Icons ───────────────────────────────────────── */
function AcIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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

function FridgeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2"
        stroke="#0d7a6d"
        strokeWidth="1.8"
      />
      <line x1="5" y1="9" x2="19" y2="9" stroke="#0d7a6d" strokeWidth="1.5" />
      <line
        x1="9"
        y1="5.5"
        x2="9"
        y2="7.5"
        stroke="#0d7a6d"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="12"
        x2="9"
        y2="16"
        stroke="#0d7a6d"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TvIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="4"
        width="20"
        height="14"
        rx="2"
        stroke="#F59E0B"
        strokeWidth="1.8"
      />
      <line
        x1="8"
        y1="21"
        x2="16"
        y2="21"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="18"
        x2="12"
        y2="21"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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

function PlugIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M18.36 6.64a9 9 0 1 1-12.73 0"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="2"
        x2="12"
        y2="12"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        stroke="#F59E0B"
        strokeWidth="1.8"
        fill="#FEF3C7"
      />
      <line
        x1="12"
        y1="9"
        x2="12"
        y2="13"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="17"
        x2="12.01"
        y2="17"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <polyline
        points="22 7 13.5 15.5 8.5 10.5 2 17"
        stroke="#0d7a6d"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="16 7 22 7 22 13"
        stroke="#0d7a6d"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke="#0d7a6d"
        strokeWidth="1.8"
      />
      <line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
        stroke="#0d7a6d"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="2"
        x2="8"
        y2="6"
        stroke="#0d7a6d"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line x1="3" y1="10" x2="21" y2="10" stroke="#0d7a6d" strokeWidth="1.8" />
    </svg>
  );
}

/* ── Data ────────────────────────────────────────── */

const breakdown = [
  { name: "Air Conditioner", pct: "60%", Icon: AcIcon },
  { name: "Refrigerator", pct: "12%", Icon: FridgeIcon },
  { name: "Television", pct: "8%", Icon: TvIcon },
  { name: "Lighting", pct: "5%", Icon: LightIcon },
  { name: "Other devices", pct: "3%", Icon: PlugIcon },
];

/* ── Custom tooltip ──────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0b7d70",
        color: "white",
        padding: "6px 10px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {label}: {payload[0].value} kWh
    </div>
  );
}

/* ── Component ───────────────────────────────────── */
export default function TrendsTab() {
  const [dashData, setDashData] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const { fetchWithCache } = useData();

  useEffect(() => {
    fetchWithCache(
      "dashboard",
      `${import.meta.env.VITE_API_URL}/dashboard`,
    ).then((data) => {
      if (!data) return;
      setDashData(data);
      const trend = (data.monthly_trend || []).map((t) => ({
        d: new Date(t.month + "-01").toLocaleString("en-US", {
          month: "short",
        }),
        v: t.monthly_kwh_used,
      }));
      setTrendData(trend);
    });
  }, [fetchWithCache]);

  return (
    <div className={styles.wrap}>
      {/* Stat cards */}
      <div className={styles.statRow}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {dashData?.daily_average_kwh
              ? `${(dashData.daily_average_kwh * 30).toFixed(0)} kWh`
              : "— kWh"}
          </div>
          <div className={styles.statLabel}>This month</div>
          <div className={styles.delta}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <polyline
                points="18 15 12 9 6 15"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            8%
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {dashData?.daily_average_kwh
              ? `₦${(dashData.daily_average_kwh * 30 * 110).toLocaleString("en-NG")}`
              : "—"}
          </div>
          <div className={styles.statLabel}>Spent this month</div>
          <div className={styles.delta}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <polyline
                points="18 15 12 9 6 15"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            11%
          </div>
        </div>
      </div>

      {/* Daily Usage chart */}
      <section className={styles.panel}>
        <div className={styles.panelTop}>
          <div className={styles.panelTitle}>Daily Usage</div>
          <div className={styles.pill}>Feb 2026</div>
        </div>
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trendData} barCategoryGap="35%">
              <XAxis
                dataKey="d"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#6b7280", fontWeight: 600 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
              />
              <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                {trendData.map((x) => (
                  <Cell
                    key={x.d}
                    fill={
                      x.v === Math.max(...trendData.map((t) => t.v))
                        ? "#0b7d70"
                        : "#a6d9d1"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Appliance Breakdown */}
      <section className={styles.panelBreakdown}>
        <div className={styles.panelTop}>
          <div className={styles.panelTitle}>Appliance Breakdown</div>
          <div className={styles.thisMonth}>This month</div>
        </div>
        <div className={styles.breakdown}>
          {breakdown.map((b) => (
            <div className={styles.row} key={b.name}>
              <div className={styles.left}>
                <div className={styles.iconBox}>
                  <b.Icon />
                </div>
                <div className={styles.name}>{b.name}</div>
              </div>
              <div className={styles.pct}>{b.pct}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trend Insights */}
      <section className={styles.insights}>
        <div className={styles.insightsTitle}>Trend Insights</div>

        <div className={styles.noteWarn}>
          <div className={styles.noteIcon}>
            <WarningIcon />
          </div>
          <div>
            AC usage is up 18% compared to last month - likely due to rising
            temperatures.
          </div>
        </div>

        <div className={styles.note}>
          <div className={styles.noteIcon}>
            <TrendIcon />
          </div>
          <div>
            Weekend usage dropped 12% - your off-peak habits are paying off.
          </div>
        </div>

        <div className={styles.note}>
          <div className={styles.noteIcon}>
            <CalendarIcon />
          </div>
          <div>
            At this rate, you'll spend ₦27,000 in March. Top up before Feb 24 to
            avoid running out.
          </div>
        </div>
      </section>
    </div>
  );
}

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useGreeting } from "../../Hooks/useGreeting";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import iconMap from "../../utils/iconMap";

const monthlyConsumption = [
  { m: "Jan", v: 38 },
  { m: "Feb", v: 22 },
  { m: "Mar", v: 34 },
  { m: "Apr", v: 28 },
  { m: "May", v: 39 },
  { m: "Jun", v: 22 },
  { m: "Jul", v: 35 },
  { m: "Aug", v: 27 },
  { m: "Sep", v: 40 },
  { m: "Oct", v: 22 },
  { m: "Nov", v: 34 },
  { m: "Dec", v: 28 },
];
const APPLIANCE_TYPE_TO_KEY = {
  "Air Conditioner": "ac",
  Fridge: "fridge",
  Bulb: "bulb",
  Laptop: "laptop",
  Fan: "fan",
  Kettle: "kettle",
  Modem: "modem",
  "Hand Dryer": "dryer",
  TV: "tv",
  Microwave: "microwave",
  "Other Appliances": "socket",
};

function AcIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="6"
        width="20"
        height="10"
        rx="2"
        stroke="#F59E0B"
        strokeWidth="1.8"
      />
      <line x1="6" y1="11" x2="18" y2="11" stroke="#F59E0B" strokeWidth="1.5" />
      <line x1="7" y1="16" x2="5" y2="20" stroke="#F59E0B" strokeWidth="1.5" />
      <line
        x1="12"
        y1="16"
        x2="12"
        y2="20"
        stroke="#F59E0B"
        strokeWidth="1.5"
      />
      <line
        x1="17"
        y1="16"
        x2="19"
        y2="20"
        stroke="#F59E0B"
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
        stroke="#F59E0B"
        strokeWidth="1.8"
      />
      <line x1="5" y1="9" x2="19" y2="9" stroke="#F59E0B" strokeWidth="1.5" />
      <line
        x1="9"
        y1="5.5"
        x2="9"
        y2="7.5"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="12"
        x2="9"
        y2="16"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DeviceIcon({ type }) {
  return type === "ac" ? <AcIcon /> : <FridgeIcon />;
}

/* ── Action button icons ──────────────────────────── */
function BuyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke="#1b1b1b"
        strokeWidth="2"
      />
      <line x1="2" y1="10" x2="22" y2="10" stroke="#1b1b1b" strokeWidth="2" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 2L11 13"
        stroke="#1b1b1b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="#1b1b1b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2"
        stroke="white"
        strokeWidth="2"
      />
      <line x1="9" y1="7" x2="15" y2="7" stroke="white" strokeWidth="1.5" />
      <line x1="9" y1="11" x2="15" y2="11" stroke="white" strokeWidth="1.5" />
      <line x1="9" y1="15" x2="13" y2="15" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function TodayChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="13" width="4" height="8" rx="1" fill="#F59E0B" />
      <rect x="10" y="8" width="4" height="13" rx="1" fill="#0d7a6d" />
      <rect
        x="17"
        y="4"
        width="4"
        height="17"
        rx="1"
        fill="#F59E0B"
        opacity="0.5"
      />
    </svg>
  );
}

/* ── Custom bar chart tooltip ─────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0d7a6d",
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

/* ── Search + Avatar ──────────────────────────────── */
function SearchAndAvatar() {
  const { user } = useUser();
  return (
    <>
      <div className={styles.search}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2" />
          <path
            d="M21 21L16.65 16.65"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input placeholder="Search...." />
      </div>
      <div className={styles.avatar}>{user?.initials || "U"}</div>
    </>
  );
}

/* ── Dashboard page ───────────────────────────────── */
export default function Dashboard() {
  const greeting = useGreeting();
  const { user } = useUser();
  const navigate = useNavigate();
  const [dashData, setDashData] = useState(null);
  const [recommendation, setRec] = useState(null);
  const [appliances, setAppliances] = useState([]);

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

    // Recommendations
    fetch(`${import.meta.env.VITE_API_URL}/recommendations`, { headers })
      .then((r) => r.json())
      .then((d) => {
        console.log("recommendations response:", d);
        if (d.success) setRec(d.data);
      })
      .catch(() => {});

    // Appliances for top consumers
    fetch(`${import.meta.env.VITE_API_URL}/appliances`, { headers })
      .then((r) => r.json())
      .then((d) => {
        console.log("appliances response:", d);
        if (d.success) setAppliances(d.data);
      })
      .catch(() => {});
  }, []);
  return (
    <div className={styles.page}>
      <PageHeader
        title={`${greeting}, ${user.name}`}
        subtitle="Here's your energy for today"
        rightSlot={<SearchAndAvatar initials={user.initials} />}
      />

      {/* ── Top Row ─────────────────────────────── */}
      <div className={styles.topRow}>
        <section className={styles.balanceCard}>
          <div className={styles.balanceLabel}>AVAILABLE ENERGY</div>
          <div className={styles.balanceValue}>
            {dashData?.available_energy ?? 45.2} <span>kWh</span>
          </div>

          <div className={styles.balanceStats}>
            <div className={styles.stat}>
              <div className={styles.statLabel}>Estimated Duration</div>
              <div className={styles.statValue}>
                {dashData?.estimated_duration_days ?? 6} days
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>Daily Average</div>
              <div className={styles.statValue}>
                {dashData?.daily_average_kwh ?? 7.5} kWh
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>Last Purchase</div>
              <div className={styles.statValue}>
                {dashData?.last_purchase?.date
                  ? new Date(dashData.last_purchase.date).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" },
                    )
                  : "N/A"}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.btnPrimary}
              onClick={() => navigate("/buy-energy")}
            >
              <BuyIcon /> Buy Energy
            </button>
            <button className={styles.btnPrimary}>
              <SendIcon /> Send Energy
            </button>
            <button
              className={styles.btnGhost}
              onClick={() => navigate("/log-purchase")}
            >
              <LogIcon /> Log Purchase
            </button>
          </div>
        </section>

        <section className={styles.todayCard}>
          <div className={styles.todayIconBox}>
            <TodayChartIcon />
          </div>
          <div className={styles.todayRight}>
            <div className={styles.todayDelta}>-12%</div>
            <div className={styles.todayValue}>
              {dashData?.today_consumption ?? 3.8} kWh
            </div>
            <div className={styles.todayLabel}>Today's Consumption</div>
          </div>
        </section>
      </div>

      {/* ── Bottom Grid ─────────────────────────── */}
      <div className={styles.bottomGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Consumption Trends</h3>
            <div className={styles.segment}>
              <button>Week</button>
              <button className={styles.segmentActive}>Month</button>
              <button>Year</button>
            </div>
          </div>

          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyConsumption} barCategoryGap="30%">
                <XAxis
                  dataKey="m"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#6b7280", fontWeight: 600 }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="#0d7a6d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className={styles.rightCol}>
          <section className={styles.recoCard}>
            <div className={styles.recoTitle}>
              <div className={styles.recoIconWrap}>💡</div>
              <span>Recommendation</span>
            </div>
            <p className={styles.recoText}>
              {recommendation?.recommendations?.[0]?.message ??
                "Your AC accounts for 60% of energy consumption. Reducing usage by 2 hours/day could save ₦2,400/month."}
            </p>
            <button className={styles.recoBtn}>View Full Insight →</button>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeaderPlain}>
              <h3>Top Consumers</h3>
            </div>
            <div className={styles.list}>
              {appliances.slice(0, 6).map((x, idx) => {
                const iconKey = APPLIANCE_TYPE_TO_KEY[x.appliance_type];
                const Icon = iconMap[iconKey];
                return (
                  <div className={styles.listRow} key={idx}>
                    <div className={styles.listLeft}>
                      <div>
                        {Icon ? (
                          <Icon className={styles.cardIcon} />
                        ) : (
                          <ApplianceIcon />
                        )}
                      </div>
                      <div>
                        <div className={styles.deviceName}>
                          {x.appliance_type}
                        </div>
                        <div className={styles.deviceMeta}>
                          {x.wattage}W · {x.hours_per_day}hrs/day
                        </div>
                      </div>
                    </div>
                    <div className={styles.listRight}>
                      <div className={styles.kwh}>
                        {(
                          (x.wattage * x.hours_per_day * x.duty_cycle) /
                          1000
                        ).toFixed(1)}{" "}
                        kWh
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

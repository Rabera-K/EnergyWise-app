import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Appliances.module.css";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import iconMap from "../../../utils/iconMap";

// const DONUT_DATA = [
//   { name: "Air Conditioner", value: 60, fill: "#10b981" },
//   { name: "Refrigerator", value: 18, fill: "#F59E0B" },
//   { name: "Others", value: 22, fill: "#E2E8F0" },
// ];

// Appliance icon SVG
function ApplianceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M29.25 3.25C30.9069 3.25 32.25 4.59315 32.25 6.25V31.7334C32.25 33.3902 30.9068 34.7334 29.25 34.7334H10.7588C9.10196 34.7334 7.75882 33.3902 7.75879 31.7334V6.25C7.75879 4.59315 9.10193 3.25 10.7588 3.25H29.25Z"
        stroke="#F59E0B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="path-2-outside-1_99_3428"
        maskUnits="userSpaceOnUse"
        x="7.25879"
        y="7.15833"
        width="26"
        height="31"
        fill="black"
      >
        <rect fill="white" x="7.25879" y="7.15833" width="26" height="31" />
        <path d="M8.25879 16.4083H31.7421H8.25879ZM12.8921 13.2083V8.15833V13.2083ZM12.8921 24.3V19.25V24.3ZM10.5338 34.2333V35.1083C10.5338 35.4097 10.6529 35.6988 10.8652 35.9127C11.0775 36.1265 11.3658 36.2478 11.6671 36.25H13.7255C14.0282 36.25 14.3186 36.1297 14.5327 35.9156C14.7468 35.7015 14.8671 35.4111 14.8671 35.1083V34.2333M25.1255 34.2333V35.1083C25.1255 35.4111 25.2457 35.7015 25.4598 35.9156C25.6739 36.1297 25.9643 36.25 26.2671 36.25H28.3338C28.6366 36.25 28.927 36.1297 29.1411 35.9156C29.3552 35.7015 29.4755 35.4111 29.4755 35.1083V34.2333" />
      </mask>
      <path
        d="M8.25879 15.4083C7.7065 15.4083 7.25879 15.856 7.25879 16.4083C7.25879 16.9606 7.7065 17.4083 8.25879 17.4083V16.4083V15.4083ZM31.7421 17.4083C32.2944 17.4083 32.7421 16.9606 32.7421 16.4083C32.7421 15.856 32.2944 15.4083 31.7421 15.4083V16.4083V17.4083ZM11.8921 13.2083C11.8921 13.7606 12.3398 14.2083 12.8921 14.2083C13.4444 14.2083 13.8921 13.7606 13.8921 13.2083H12.8921H11.8921ZM13.8921 8.15833C13.8921 7.60604 13.4444 7.15833 12.8921 7.15833C12.3398 7.15833 11.8921 7.60604 11.8921 8.15833H12.8921H13.8921ZM11.8921 24.3C11.8921 24.8523 12.3398 25.3 12.8921 25.3C13.4444 25.3 13.8921 24.8523 13.8921 24.3H12.8921H11.8921ZM13.8921 19.25C13.8921 18.6977 13.4444 18.25 12.8921 18.25C12.3398 18.25 11.8921 18.6977 11.8921 19.25H12.8921H13.8921ZM11.5338 34.2333C11.5338 33.681 11.0861 33.2333 10.5338 33.2333C9.9815 33.2333 9.53379 33.681 9.53379 34.2333H10.5338H11.5338ZM10.5338 35.1083L11.5338 35.1084V35.1083H10.5338ZM11.6671 36.25L11.6598 37.25H11.6671V36.25ZM15.8671 34.2333C15.8671 33.681 15.4194 33.2333 14.8671 33.2333C14.3148 33.2333 13.8671 33.681 13.8671 34.2333H14.8671H15.8671ZM26.1255 34.2333C26.1255 33.681 25.6777 33.2333 25.1255 33.2333C24.5732 33.2333 24.1255 33.681 24.1255 34.2333H25.1255H26.1255ZM30.4755 34.2333C30.4755 33.681 30.0277 33.2333 29.4755 33.2333C28.9232 33.2333 28.4755 33.681 28.4755 34.2333H29.4755H30.4755ZM8.25879 16.4083V17.4083H31.7421V16.4083V15.4083H8.25879V16.4083ZM12.8921 13.2083H13.8921V8.15833H12.8921H11.8921V13.2083H12.8921ZM12.8921 24.3H13.8921V19.25H12.8921H11.8921V24.3H12.8921ZM10.5338 34.2333H9.53379V35.1083H10.5338H11.5338V34.2333H10.5338ZM10.5338 35.1083L9.53379 35.1083C9.53377 35.6736 9.75727 36.216 10.1555 36.6172L10.8652 35.9127L11.5749 35.2082C11.5486 35.1816 11.5338 35.1457 11.5338 35.1084L10.5338 35.1083ZM10.8652 35.9127L10.1555 36.6172C10.5538 37.0184 11.0945 37.2458 11.6598 37.25L11.6671 36.25L11.6744 35.25C11.637 35.2497 11.6013 35.2347 11.5749 35.2082L10.8652 35.9127ZM11.6671 36.25V37.25H13.7255V36.25V35.25H11.6671V36.25ZM13.7255 36.25V37.25C14.2935 37.25 14.8382 37.0244 15.2398 36.6227L14.5327 35.9156L13.8256 35.2085C13.7991 35.2351 13.763 35.25 13.7255 35.25V36.25ZM14.5327 35.9156L15.2398 36.6227C15.6415 36.2211 15.8671 35.6763 15.8671 35.1083H14.8671H13.8671C13.8671 35.1459 13.8522 35.1819 13.8256 35.2085L14.5327 35.9156ZM14.8671 35.1083H15.8671V34.2333H14.8671H13.8671V35.1083H14.8671ZM25.1255 34.2333H24.1255V35.1083H25.1255H26.1255V34.2333H25.1255ZM25.1255 35.1083H24.1255C24.1255 35.6763 24.3511 36.2211 24.7527 36.6227L25.4598 35.9156L26.1669 35.2085C26.1404 35.1819 26.1255 35.1459 26.1255 35.1083H25.1255ZM25.4598 35.9156L24.7527 36.6227C25.1544 37.0244 25.6991 37.25 26.2671 37.25V36.25V35.25C26.2296 35.25 26.1935 35.2351 26.1669 35.2085L25.4598 35.9156ZM26.2671 36.25V37.25H28.3338V36.25V35.25H26.2671V36.25ZM28.3338 36.25V37.25C28.9018 37.25 29.4465 37.0243 29.8482 36.6227L29.1411 35.9156L28.434 35.2085C28.4074 35.2351 28.3714 35.25 28.3338 35.25V36.25ZM29.1411 35.9156L29.8482 36.6227C30.2498 36.2211 30.4755 35.6763 30.4755 35.1083H29.4755H28.4755C28.4755 35.1459 28.4605 35.1819 28.434 35.2085L29.1411 35.9156ZM29.4755 35.1083H30.4755V34.2333H29.4755H28.4755V35.1083H29.4755Z"
        fill="#F59E0B"
        mask="url(#path-2-outside-1_99_3428)"
      />
    </svg>
  );
}

// Edit icon
function EditIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        transform="matrix(-1 0 0 1 32 0)"
        fill="#F8FAFC"
      />
      <rect
        x="-0.5"
        y="0.5"
        width="31"
        height="31"
        rx="7.5"
        transform="matrix(-1 0 0 1 31 0)"
        stroke="black"
        strokeOpacity="0.13"
      />
      <path
        d="M25.3333 25.3333H23.4333L10.4 12.3L12.3 10.4L25.3333 23.4333V25.3333ZM28 28V22.3333L10.4 4.76667C10.1333 4.52222 9.83867 4.33333 9.516 4.2C9.19333 4.06667 8.85467 4 8.5 4C8.14533 4 7.80089 4.06667 7.46667 4.2C7.13245 4.33333 6.84356 4.53333 6.6 4.8L4.76667 6.66667C4.5 6.91111 4.30533 7.2 4.18267 7.53333C4.06 7.86667 3.99911 8.2 4 8.53333C4 8.88889 4.06089 9.228 4.18267 9.55067C4.30445 9.87333 4.49911 10.1676 4.76667 10.4333L22.3333 28H28ZM11.3667 11.3667L12.3 10.4L10.4 12.3L11.3667 11.3667Z"
        fill="#3FF3DD"
      />
    </svg>
  );
}

// Delete icon
function DeleteIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        transform="matrix(-1 0 0 1 32 0)"
        fill="#F8FAFC"
      />
      <rect
        x="-0.5"
        y="0.5"
        width="31"
        height="31"
        rx="7.5"
        transform="matrix(-1 0 0 1 31 0)"
        stroke="black"
        strokeOpacity="0.13"
      />
      <path
        d="M22.667 28C23.4003 28 24.0279 27.7391 24.5497 27.2173C25.0714 26.6956 25.3328 26.0676 25.3337 25.3333V8H26.667V5.33333H20.0003V4H12.0003V5.33333H5.33366V8H6.66699V25.3333C6.66699 26.0667 6.92788 26.6947 7.44966 27.2173C7.97144 27.74 8.59944 28.0009 9.33366 28H22.667ZM9.33366 8H22.667V25.3333H9.33366V8ZM20.0003 22.6667H17.3337V10.6667H20.0003V22.6667ZM14.667 22.6667H12.0003V10.6667H14.667V22.6667Z"
        fill="#3FF3DD"
      />
    </svg>
  );
}
// const INITIAL_APPLIANCES = [
//   {
//     id: 1,
//     appl: "Air Conditioner",
//     location: "Main bedroom",
//     specs: "1500W · 8 hrs/day",
//     usage: "12 kWh",
//     contribution: 60,
//     cost: "₦1,320",
//   },
//   {
//     id: 2,
//     appl: "Refrigerator",
//     location: "Kitchen",
//     specs: "150W · 8 hrs/day",
//     usage: "3.6 kWh",
//     contribution: 18,
//     cost: "₦396",
//   },
//   {
//     id: 3,
//     appl: "Refrigerator",
//     location: "Kitchen",
//     specs: "150W · 8 hrs/day",
//     usage: "3.6 kWh",
//     contribution: 18,
//     cost: "₦396",
//   },
//   {
//     id: 4,
//     appl: "Refrigerator",
//     location: "Kitchen",
//     specs: "150W · 8 hrs/day",
//     usage: "3.6 kWh",
//     contribution: 18,
//     cost: "₦396",
//   },
// ];
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
const CHART_COLORS = [
  "#09907f", // teal
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ef4444", // red
  "#06b6d4", // cyan
  "#f97316", // orange
  "#84cc16", // lime
];

function DonutLabel() {
  return (
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
      <tspan x="50%" dy="-6" fontSize="22" fontWeight="800" fill="#1a1f1e">
        5
      </tspan>
      <tspan x="50%" dy="20" fontSize="11" fill="#6b7c78">
        Appliances
      </tspan>
    </text>
  );
}

function Appliances() {
  const [appliances, setAppliances] = useState([]);
  const [dashData, setDashData] = useState(null);
  const navigate = useNavigate();

  const totalKwh = appliances.reduce(
    (sum, a) => sum + (a.wattage * a.hours_per_day * a.duty_cycle) / 1000,
    0,
  );
  const donutData = appliances.map((a, index) => ({
    name: a.appliance_type,
    value:
      Math.round(
        ((a.wattage * a.hours_per_day * a.duty_cycle) / 1000 / totalKwh) * 100,
      ) || 0,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  useEffect(() => {
    const token = localStorage.getItem("ew_token");
    const headers = { Authorization: `Bearer ${token}` };

    fetch(`${import.meta.env.VITE_API_URL}/appliances`, { headers })
      .then((r) => r.json())
      .then((d) => {
        console.log("appliances:", d);
        if (d.success) setAppliances(d.data);
      })
      .catch(() => {});

    fetch(`${import.meta.env.VITE_API_URL}/dashboard`, { headers })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setDashData(d.data);
      })
      .catch(() => {});
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("ew_token");
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/appliances/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliances((prev) => prev.filter((a) => a.id !== id));
    } catch {
      console.error("Failed to delete appliance");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.searchBox}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 14H14.71L14.43 13.73C15.444 12.5541 16.0012 11.0527 16 9.5C16 8.21442 15.6188 6.95772 14.9046 5.8888C14.1903 4.81988 13.1752 3.98676 11.9874 3.49479C10.7997 3.00282 9.49279 2.87409 8.23192 3.1249C6.97104 3.3757 5.81285 3.99477 4.90381 4.90381C3.99477 5.81285 3.3757 6.97104 3.1249 8.23192C2.87409 9.49279 3.00282 10.7997 3.49479 11.9874C3.98676 13.1752 4.81988 14.1903 5.8888 14.9046C6.95772 15.6188 8.21442 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
              fill="#09907F"
            />
          </svg>
          <input placeholder="Search appliances..." />
        </div>
        <button
          className={styles.addBtn}
          onClick={() => navigate("/quicksetup")}
        >
          + Add Appliance
        </button>
      </div>
      <div className={styles.topGrid}>
        {/* Left card */}
        <div className={styles.balanceCard}>
          <p className={styles.balanceLabel}>Available Energy</p>
          <p className={styles.balanceValue}>
            {dashData?.available_energy ?? 45.2} <span>kWh</span>
          </p>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Estimated Duration</p>
              <p className={styles.statValue}>
                {dashData?.estimated_duration_days ?? 6} days
              </p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Daily Average</p>
              <p className={styles.statValue}>
                {dashData?.daily_average_kwh ?? 7.5} kWh
              </p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Last Purchase</p>
              <p className={styles.statValue}>
                {dashData?.last_purchase?.date
                  ? new Date(dashData.last_purchase.date).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" },
                    )
                  : "N/A"}
              </p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Next Suggested</p>
              <p className={styles.statValue}>Feb 18</p>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.btnAmber}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                onClick={() => navigate("/buy-energy")}
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
                  stroke="#fff"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6.5 5h14v17h-14V5Z"
                />
                <path
                  stroke="#fff"
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
        {/* right card */}
        <div className={styles.breakdown}>
          <div className={styles.containerTop}>
            <div>
              <h3 className={styles.breakdownTitle}>Consumption Breakdown</h3>
              <p className={styles.breakdownSubtitle}>
                How your energy is distributed
              </p>
            </div>
            <div>
              <p className={styles.totalLabel}>Total Daily Consumption</p>
              <p className={styles.totalValue}>20 kWh</p>

              <p className={styles.totalSub}>
                Across {appliances.length} appliances
              </p>
            </div>
            <div className={styles.chartRow}>
              <ResponsiveContainer width={225} height={225}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={90}
                    dataKey="value"
                    labelLine={false}
                  />

                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.legend}>
                {donutData.map(({ name, value, fill }) => (
                  <div key={name} className={styles.legendItem}>
                    <div className={styles.legendLeft}>
                      <span
                        className={styles.legendDot}
                        style={{ background: fill }}
                      />
                      <span className={styles.legendName}>{name}</span>
                    </div>
                    <div>
                      <span className={styles.legendPct}>{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h3 className={styles.tableTitle}>All Appliances</h3>
          <button
            className={styles.addNewBtn}
            onClick={() => navigate("/quicksetup")}
          >
            + Add New
          </button>
        </div>
        <div className={styles.tableWrapper}>
          {/* Header Row */}
          <div className={`${styles.row} ${styles.headerRow}`}>
            <div>Appliance</div>
            <div>Specifications</div>
            <div>Daily Usage</div>
            <div>Contribution</div>
            <div>Daily Cost</div>
            <div>Actions</div>
          </div>

          {/* Data Rows */}
          {appliances.map((item, idx) => {
            const iconKey = APPLIANCE_TYPE_TO_KEY[item.appliance_type];
            const Icon = iconMap[iconKey];
            return (
              <div key={item.id ?? idx} className={styles.row}>
                <div className={styles.applianceCell}>
                  <div className={styles.applianceIcon}>
                    {Icon ? (
                      <Icon className={styles.cardIcon} />
                    ) : (
                      <ApplianceIcon />
                    )}
                  </div>
                  <div className={styles.textBlock}>
                    <p className={styles.applianceName}>
                      {item.appliance_type}
                    </p>
                    <p className={styles.applianceLocation}>—</p>
                  </div>
                </div>
                <div className={styles.specs}>
                  {item.wattage}W · {item.hours_per_day} hrs/day
                </div>
                <div className={styles.usage}>
                  {(
                    (item.wattage * item.hours_per_day * item.duty_cycle) /
                    1000
                  ).toFixed(1)}{" "}
                  kWh
                </div>
                <div>
                  <span className={styles.contributionBadge}>—</span>
                </div>
                <div className={styles.dailyCost}>—</div>
                <div className={styles.actionBtns}>
                  <button className={styles.editBtn}>
                    <EditIcon />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Appliances;

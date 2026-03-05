import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Appliances.module.css";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import iconMap from "../../../utils/iconMap";

// Appliance icon SVG
function ApplianceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M33.3333 10.3333C34.6667 11.6667 34.6667 13.8333 33.3333 15L28.6667 19.6667L15.6667 6.66667L20.3333 2C21.6667 0.666667 23.8333 0.666667 25 2L28 5L33 0L35.3333 2.33333L30.3333 7.33333L33.3333 10.3333ZM23.6667 20L21.3333 17.6667L16.6667 22.3333L13.1667 18.8333L17.8333 14.1667L15.5 11.8333L10.8333 16.5L8.33333 14.1667L3.66667 18.8333C2.33333 20.1667 2.33333 22.3333 3.66667 23.5L6.66667 26.5L0 33.1667L2.33333 35.5L9 28.8333L12 31.8333C13.3333 33.1667 15.5 33.1667 16.6667 31.8333L21.3333 27.1667L19 24.8333L23.6667 20Z"
        fill="#F59E0B"
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

function Appliances() {
  const [appliances, setAppliances] = useState([]);
  const [dashData, setDashData] = useState(null);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const totalKwh = appliances.reduce(
    (sum, a) => sum + (a.wattage * a.hours_per_day * a.duty_cycle) / 1000,
    0,
  );
  const donutData =
    totalKwh === 0
      ? []
      : appliances.map((a, index) => ({
          name: a.appliance_type,
          value:
            Math.round(
              ((a.wattage * a.hours_per_day * a.duty_cycle) / 1000 / totalKwh) *
                100,
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

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditForm({
      wattage: item.wattage,
      hours_per_day: item.hours_per_day,
      quantity: item.quantity || 1,
    });
  };

  const handleEditSave = async (id) => {
    setSaving(true);
    try {
      const token = localStorage.getItem("ew_token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/appliances/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            wattage: Number(editForm.wattage),
            hours_per_day: Number(editForm.hours_per_day),
            quantity: Number(editForm.quantity),
          }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        setAppliances((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ...editForm } : a)),
        );
        setEditingItem(null);
      } else {
        alert(data.message || "Failed to update");
      }
    } catch {
      alert("Failed to update appliance");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    const token = localStorage.getItem("ew_token");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/appliances/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("delete status:", res.status);
      if (res.ok) {
        setAppliances((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert("Failed to delete appliance");
      }
    } catch (err) {
      console.error("Delete error:", err.message);
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
              <p className={styles.statValue}>
                {dashData?.forecast_depletion_date
                  ? new Date(
                      dashData.forecast_depletion_date,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
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
              <p className={styles.totalValue}>{totalKwh.toFixed(1)} kWh</p>

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
                {donutData.length === 0 ? (
                  <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                    No appliances
                  </p>
                ) : (
                  donutData.map(({ name, value, fill }, i) => (
                    <div key={i} className={styles.legendItem}>
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
                  ))
                )}
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
            const isEditing = editingItem === item.id;
            const dailyKwh = (
              (item.wattage * item.hours_per_day * item.duty_cycle) /
              1000
            ).toFixed(1);

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

                {/* Specs — editable */}
                <div className={styles.specs}>
                  {isEditing ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <input
                        className={styles.inlineInput}
                        type="number"
                        value={editForm.wattage}
                        onChange={(e) =>
                          setEditForm((p) => ({
                            ...p,
                            wattage: e.target.value,
                          }))
                        }
                        placeholder="Watts"
                      />
                      <input
                        className={styles.inlineInput}
                        type="number"
                        value={editForm.hours_per_day}
                        onChange={(e) =>
                          setEditForm((p) => ({
                            ...p,
                            hours_per_day: e.target.value,
                          }))
                        }
                        placeholder="Hours/day"
                      />
                    </div>
                  ) : (
                    `${item.wattage}W · ${item.hours_per_day} hrs/day`
                  )}
                </div>

                <div className={styles.usage}>
                  {isEditing
                    ? (
                        (editForm.wattage *
                          editForm.hours_per_day *
                          item.duty_cycle) /
                        1000
                      ).toFixed(1)
                    : dailyKwh}{" "}
                  kWh
                </div>

                <div>
                  <span className={styles.contributionBadge}>—</span>
                </div>
                <div className={styles.dailyCost}>—</div>

                <div className={styles.actionBtns}>
                  {isEditing ? (
                    <>
                      <button
                        className={styles.saveInlineBtn}
                        onClick={() => handleEditSave(item.id)}
                        disabled={saving}
                      >
                        {saving ? "..." : "Save"}
                      </button>
                      <button
                        className={styles.cancelInlineBtn}
                        onClick={() => setEditingItem(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(item)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() =>
                          handleDeleteConfirm(item.id, item.appliance_type)
                        }
                      >
                        <DeleteIcon />
                      </button>
                    </>
                  )}
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

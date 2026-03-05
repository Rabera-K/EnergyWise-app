import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import styles from "./Account.module.css";

const AFRICAN_COUNTRIES = {
  Nigeria: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
  Ghana: ["Accra", "Kumasi", "Tamale", "Takoradi"],
  Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria"],
  Ethiopia: ["Addis Ababa", "Dire Dawa", "Mekelle"],
  Tanzania: ["Dar es Salaam", "Dodoma", "Mwanza"],
  Uganda: ["Kampala", "Gulu", "Lira"],
  Senegal: ["Dakar", "Thiès", "Kaolack"],
  Rwanda: ["Kigali", "Butare", "Gisenyi"],
  Cameroon: ["Yaoundé", "Douala", "Bamenda"],
};

function AvatarImage({ name, size = 88 }) {
  const seed = encodeURIComponent(name || "user");
  return (
    <img
      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=b6e3f4`}
      alt="avatar"
      width={size}
      height={size}
      style={{ borderRadius: "50%", objectFit: "cover" }}
    />
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`${styles.toggle} ${checked ? styles.toggleOn : ""}`}
      aria-checked={checked}
      role="switch"
    >
      <span className={styles.toggleThumb} />
    </button>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke="#9ca3af"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({
    first_name: profile.first_name || "",
    last_name: profile.last_name || "",
    phone: profile.phone || "",
    city: profile.city || "",
    country: profile.country || "",
    household_size: profile.household_size || "",
    primary_power_source: profile.primary_power_source || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("ew_token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");
      onSave(form);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Edit Profile</h3>
          <button className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label>First Name</label>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First name"
              />
            </div>
            <div className={styles.field}>
              <label>Last Name</label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last name"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+234 800 000 0000"
            />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label>Country</label>
              <select
                name="country"
                value={form.country}
                onChange={(e) => {
                  handleChange(e);
                  setForm((prev) => ({ ...prev, city: "" }));
                }}
              >
                <option value="">Select country</option>
                {Object.keys(AFRICAN_COUNTRIES).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>City</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                disabled={!form.country}
              >
                <option value="">Select city</option>
                {(AFRICAN_COUNTRIES[form.country] || []).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label>Household Size</label>
            <select
              name="household_size"
              value={form.household_size}
              onChange={handleChange}
            >
              <option value="">Select size</option>
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
              <option value="5">5+ people</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Primary Power Source</label>
            <select
              name="primary_power_source"
              value={form.primary_power_source}
              onChange={handleChange}
            >
              <option value="">Select source</option>
              <option value="Grid Connection (NEPA/PHCN)">
                Grid Connection (NEPA/PHCN)
              </option>
              <option value="Solar Power">Solar Power</option>
              <option value="Generator">Generator</option>
              <option value="Solar + Grid Hybrid">Solar + Grid Hybrid</option>
              <option value="Inverter/Battery System">
                Inverter/Battery System
              </option>
            </select>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Account() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [notifications, setNotifications] = useState({
    lowEnergy: false,
    weeklyReports: false,
    recommendations: true,
    alerts: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("ew_token");
    const ewUser = JSON.parse(localStorage.getItem("ew_user") || "{}");
    const ewName = JSON.parse(localStorage.getItem("ew_name") || "{}");
    setProfile({
      first_name: ewName.firstName || "",
      last_name: ewName.lastName || "",
      phone: ewUser.phone || "",
      city: ewUser.city || "",
      country: ewUser.country || "",
      household_size: ewUser.household_size || "",
      meter_number: sessionStorage.getItem("ew_meter") || "",
    });

    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setProfile((prev) => ({
            ...prev,
            email: d.data.email,
            phone: d.data.phone || prev.phone,
            user_type: d.data.user_type || prev.user_type,
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (updated) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    // Update UserContext so greeting + avatar refresh
    const firstName = updated.first_name || profile?.first_name || "User";
    const lastName = updated.last_name || profile?.last_name || "";
    const initials =
      `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    setUser({ name: firstName, initials });
  };

  const handleLogout = () => {
    localStorage.removeItem("ew_token");
    localStorage.removeItem("ew_user");
    localStorage.removeItem("ew_name");
    navigate("/login");
  };

  const fullName = profile
    ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
    : "—";
  const email = profile?.identifier || profile?.email || "—";
  const location =
    [profile?.city, profile?.country].filter(Boolean).join(", ") || "—";
  const meterNum = profile?.meter_number || "—";
  const householdSize = profile?.household_size
    ? `${profile.household_size} members`
    : "—";
  const userType =
    profile?.user_type === "HOUSEHOLD"
      ? "Household Account"
      : profile?.user_type === "BUSINESS"
        ? "Business Account"
        : "Account";

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Profile Header */}
      <div className={styles.profileCard}>
        <div className={styles.avatarWrap}>
          <AvatarImage name={fullName} size={88} />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>{fullName || "Your Name"}</h2>
          <p className={styles.profileEmail}>{email}</p>
          <div className={styles.profileActions}>
            <span className={styles.accountBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  stroke="#0d7a6d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {userType}
            </span>
            <button
              className={styles.editBtn}
              onClick={() => setShowEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>ACCOUNT DETAILS</p>

        <div className={styles.listItem}>
          <div className={styles.listLeft}>
            <span className={styles.listIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                  stroke="#0d7a6d"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="3"
                  stroke="#0d7a6d"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <div>
              <p className={styles.listTitle}>Location</p>
              <p className={styles.listSub}>{location}</p>
            </div>
          </div>
          <ChevronRight />
        </div>

        <div className={styles.listItem}>
          <div className={styles.listLeft}>
            <span className={styles.listIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <p className={styles.listTitle}>Meter Number</p>
              <p className={styles.listSub}>{meterNum}</p>
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className={styles.listItem}>
          <div className={styles.listLeft}>
            <span className={styles.listIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  stroke="#0d7a6d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="7" r="4" stroke="#0d7a6d" strokeWidth="2" />
                <path
                  d="M23 21v-2a4 4 0 0 0-3-3.87"
                  stroke="#0d7a6d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="#0d7a6d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div>
              <p className={styles.listTitle}>Household Size</p>
              <p className={styles.listSub}>{householdSize}</p>
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      {/* Notifications */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>NOTIFICATIONS</p>

        {[
          {
            key: "lowEnergy",
            label: "Low Energy Alerts",
            sub: "Notify when credit is running low",
          },
          {
            key: "weeklyReports",
            label: "Weekly Reports",
            sub: "Energy summary every Sunday",
          },
          {
            key: "recommendations",
            label: "Recommendations",
            sub: "Tips to save energy",
          },
          { key: "alerts", label: "Alerts", sub: "5 days before exhaustion" },
        ].map(({ key, label, sub }) => (
          <div key={key} className={styles.listItem}>
            <div className={styles.listLeft}>
              <div>
                <p className={styles.listTitle}>{label}</p>
                <p className={styles.listSub}>{sub}</p>
              </div>
            </div>
            <Toggle
              checked={notifications[key]}
              onChange={(val) =>
                setNotifications((prev) => ({ ...prev, [key]: val }))
              }
            />
          </div>
        ))}
      </section>

      {/* Help & Support */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>HELP & SUPPORT</p>
        {[
          "How EnergyWise Works",
          "FAQs",
          "Contact Support",
          "Send Feedbacks",
        ].map((item) => (
          <div
            key={item}
            className={`${styles.listItem} ${styles.listItemClickable}`}
          >
            <p className={styles.listTitle}>{item}</p>
            <ChevronRight />
          </div>
        ))}
      </section>

      {/* About */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>ABOUT</p>
        {[
          "Privacy Policy",
          "Terms of Service",
          "Contact Support",
          "Send Feedbacks",
        ].map((item) => (
          <div
            key={item}
            className={`${styles.listItem} ${styles.listItemClickable}`}
          >
            <p className={styles.listTitle}>{item}</p>
            <ChevronRight />
          </div>
        ))}
      </section>

      {/* Log Out */}
      <section className={styles.section}>
        <div
          className={`${styles.listItem} ${styles.listItemClickable}`}
          onClick={handleLogout}
        >
          <div className={styles.listLeft}>
            <span className={styles.listIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                  stroke="#0d7a6d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <polyline
                  points="16 17 21 12 16 7"
                  stroke="#0d7a6d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="21"
                  y1="12"
                  x2="9"
                  y2="12"
                  stroke="#0d7a6d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <p
              className={styles.listTitle}
              style={{ color: "#0d7a6d", fontWeight: 600 }}
            >
              Log Out
            </p>
          </div>
          <ChevronRight />
        </div>
      </section>

      {showEdit && (
        <EditModal
          profile={profile || {}}
          onClose={() => setShowEdit(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

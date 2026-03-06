import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import styles from "./Account.module.css";
import { useData } from "../../context/DataContext";

const AFRICAN_COUNTRIES = {
  Nigeria: [
    "Lagos",
    "Abuja",
    "Kano",
    "Ibadan",
    "Port Harcourt",
    "Benin City",
    "Kaduna",
    "Enugu",
  ],
  Ghana: ["Accra", "Kumasi", "Tamale", "Sekondi-Takoradi", "Ashaiman"],
  Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
  "South Africa": [
    "Johannesburg",
    "Cape Town",
    "Durban",
    "Pretoria",
    "Port Elizabeth",
  ],
  Ethiopia: ["Addis Ababa", "Dire Dawa", "Mekelle", "Gondar", "Hawassa"],
  Tanzania: ["Dar es Salaam", "Dodoma", "Mwanza", "Arusha", "Zanzibar City"],
  Egypt: ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said"],
  Uganda: ["Kampala", "Gulu", "Lira", "Mbarara", "Jinja"],
  Senegal: ["Dakar", "Touba", "Thiès", "Rufisque", "Kaolack"],
  "Ivory Coast": ["Abidjan", "Bouaké", "Daloa", "San-Pédro", "Yamoussoukro"],
  Cameroon: ["Douala", "Yaoundé", "Bamenda", "Bafoussam", "Garoua"],
  Rwanda: ["Kigali", "Butare", "Gisenyi", "Ruhengeri", "Byumba"],
  Zambia: ["Lusaka", "Kitwe", "Ndola", "Kabwe", "Chingola"],
  Zimbabwe: ["Harare", "Bulawayo", "Chitungwiza", "Mutare", "Gweru"],
  Mali: ["Bamako", "Sikasso", "Mopti", "Koutiala", "Ségou"],
  Angola: ["Luanda", "Huambo", "Lobito", "Benguela", "Kuito"],
  Mozambique: ["Maputo", "Matola", "Beira", "Nampula", "Chimoio"],
  Madagascar: [
    "Antananarivo",
    "Toamasina",
    "Antsirabe",
    "Fianarantsoa",
    "Mahajanga",
  ],
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
                Grid Connection (NEPA/PHCN/KPLC)
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
  const [editingMeter, setEditingMeter] = useState(false);
  const [editingHousehold, setEditingHousehold] = useState(false);
  const [meterInput, setMeterInput] = useState("");
  const [householdInput, setHouseholdInput] = useState("");
  const [savingMeter, setSavingMeter] = useState(false);
  const { fetchWithCache } = useData();

  useEffect(() => {
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

    fetchWithCache("auth_me", `${import.meta.env.VITE_API_URL}/auth/me`)
      .then((data) => {
        if (!data) return;
        setProfile((prev) => ({
          ...prev,
          email: data.email,
          phone: data.phone || prev.phone,
          user_type: data.user_type || prev.user_type,
        }));
      })
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect width="24" height="24" rx="8" fill="#F5FEFD" />
                <path
                  d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z"
                  fill="#0CC0AA"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect width="24" height="24" rx="8" fill="#F5FEFD" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.0002 2L15.2584 8.99998H20.2584L8.02374 22L10.7607 11H6.76074L9.0001 2H17.0002Z"
                  fill="#C47E08"
                />
              </svg>
            </span>
            <div>
              <p className={styles.listTitle}>Meter Number</p>
              {editingMeter ? (
                <input
                  className={styles.inlineInput}
                  value={meterInput}
                  onChange={(e) => setMeterInput(e.target.value)}
                  placeholder="Enter meter number"
                  autoFocus
                />
              ) : (
                <p className={styles.listSub}>{meterNum}</p>
              )}
            </div>
          </div>
          {editingMeter ? (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className={styles.inlineSave}
                onClick={async () => {
                  setSavingMeter(true);
                  try {
                    const token = localStorage.getItem("ew_token");
                    await fetch(
                      `${import.meta.env.VITE_API_URL}/energy-account`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ meter_number: meterInput }),
                      },
                    );
                    setProfile((prev) => ({
                      ...prev,
                      meter_number: meterInput,
                    }));
                    setEditingMeter(false);
                  } catch {
                    alert("Failed to save meter number");
                  } finally {
                    setSavingMeter(false);
                  }
                }}
                disabled={savingMeter}
              >
                {savingMeter ? "..." : "Save"}
              </button>
              <button
                className={styles.inlineCancel}
                onClick={() => setEditingMeter(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className={styles.iconBtn}
              onClick={() => {
                setMeterInput(meterNum === "—" ? "" : meterNum);
                setEditingMeter(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3.33333 12.6667H4.28333L10.8 6.15L9.85 5.2L3.33333 11.7167V12.6667ZM2 14V11.1667L10.8 2.38333C10.9333 2.26111 11.0807 2.16667 11.242 2.1C11.4033 2.03333 11.5727 2 11.75 2C11.9273 2 12.0996 2.03333 12.2667 2.1C12.4338 2.16667 12.5782 2.26667 12.7 2.4L13.6167 3.33333C13.75 3.45556 13.8473 3.6 13.9087 3.76667C13.97 3.93333 14.0004 4.1 14 4.26667C14 4.44444 13.9696 4.614 13.9087 4.77533C13.8478 4.93667 13.7504 5.08378 13.6167 5.21667L4.83333 14H2ZM10.3167 5.68333L9.85 5.2L10.8 6.15L10.3167 5.68333Z"
                  fill="#0CC0AA"
                />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.listItem}>
          <div className={styles.listLeft}>
            <span className={styles.listIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect width="24" height="24" rx="8" fill="#F5FEFD" />
                <path
                  d="M7.125 12C8.98896 12 10.5 10.489 10.5 8.625C10.5 6.76104 8.98896 5.25 7.125 5.25C5.26104 5.25 3.75 6.76104 3.75 8.625C3.75 10.489 5.26104 12 7.125 12Z"
                  fill="#C47E08"
                />
                <path
                  d="M10.9688 13.875C9.64875 13.2047 8.19187 12.9375 7.125 12.9375C5.03531 12.9375 0.75 14.2191 0.75 16.7812V18.75H7.78125V17.9967C7.78125 17.1061 8.15625 16.2131 8.8125 15.4688C9.33609 14.8744 10.0692 14.3227 10.9688 13.875Z"
                  fill="#C47E08"
                />
                <path
                  d="M15.9375 13.5C13.4967 13.5 8.625 15.0075 8.625 18V20.25H23.25V18C23.25 15.0075 18.3783 13.5 15.9375 13.5Z"
                  fill="black"
                />
                <path
                  d="M15.9375 12C18.2157 12 20.0625 10.1532 20.0625 7.875C20.0625 5.59683 18.2157 3.75 15.9375 3.75C13.6593 3.75 11.8125 5.59683 11.8125 7.875C11.8125 10.1532 13.6593 12 15.9375 12Z"
                  fill="black"
                />
              </svg>
            </span>
            <div>
              <p className={styles.listTitle}>Household Size</p>
              {editingHousehold ? (
                <select
                  className={styles.inlineInput}
                  value={householdInput}
                  onChange={(e) => setHouseholdInput(e.target.value)}
                >
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5+ people</option>
                </select>
              ) : (
                <p className={styles.listSub}>{householdSize}</p>
              )}
            </div>
          </div>
          {editingHousehold ? (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className={styles.inlineSave}
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("ew_token");
                    await fetch(
                      `${import.meta.env.VITE_API_URL}/users/profile`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          household_size: Number(householdInput),
                        }),
                      },
                    );
                    setProfile((prev) => ({
                      ...prev,
                      household_size: householdInput,
                    }));
                    setEditingHousehold(false);
                  } catch {
                    alert("Failed to save household size");
                  }
                }}
              >
                Save
              </button>
              <button
                className={styles.inlineCancel}
                onClick={() => setEditingHousehold(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className={styles.iconBtn}
              onClick={() => {
                setHouseholdInput(profile?.household_size || "1");
                setEditingHousehold(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3.33333 12.6667H4.28333L10.8 6.15L9.85 5.2L3.33333 11.7167V12.6667ZM2 14V11.1667L10.8 2.38333C10.9333 2.26111 11.0807 2.16667 11.242 2.1C11.4033 2.03333 11.5727 2 11.75 2C11.9273 2 12.0996 2.03333 12.2667 2.1C12.4338 2.16667 12.5782 2.26667 12.7 2.4L13.6167 3.33333C13.75 3.45556 13.8473 3.6 13.9087 3.76667C13.97 3.93333 14.0004 4.1 14 4.26667C14 4.44444 13.9696 4.614 13.9087 4.77533C13.8478 4.93667 13.7504 5.08378 13.6167 5.21667L4.83333 14H2ZM10.3167 5.68333L9.85 5.2L10.8 6.15L10.3167 5.68333Z"
                  fill="#0CC0AA"
                />
              </svg>
            </button>
          )}
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

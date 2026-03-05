import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeInfo.module.css";

const HomeInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    primaryPowerSource: "",
    householdSize: "",
    country: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.primaryPowerSource.trim()) {
      newErrors.primaryPowerSource = "Primary power source is required";
    }

    if (!formData.householdSize.trim()) {
      newErrors.householdSize = "Household size is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "city is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("ew_token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            primary_power_source: formData.primaryPowerSource,
            household_size: Number(formData.householdSize),
            city: formData.city,
            country: formData.country,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save");

      navigate("/meter-setup");
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "Failed to save information. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.backgroundDecoration}></div>
      {/* Logo */}
      <div className={styles.logoBar}>
        <div className={styles.logoIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
          >
            <rect width="36" height="36" fill="#008070" rx="10" />
            <path
              fill="#f59e0b"
              stroke="#f59e0b"
              strokeWidth=".04"
              d="m22.47 9.02-1.56 6.27-.005.027h4.477L14.46 26.93l2.444-9.82.007-.027H13.31l2.006-8.058z"
            />
          </svg>
        </div>
        <span className={styles.logoText}>EnergyWise</span>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>My Home</h1>
            <p className={styles.subtitle}>Kindly fill the details below</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <select
                name="primaryPowerSource"
                value={formData.primaryPowerSource}
                onChange={handleChange}
                className={`${styles.select} ${errors.primaryPowerSource ? styles.inputError : ""}`}
              >
                <option value="" disabled>
                  Primary Power Source
                </option>
                <option value="grid">
                  Grid Connection (eg.NEPA/PHCN/KPLC)
                </option>
                <option value="solar">Solar Power</option>
                <option value="generator">Generator</option>
                <option value="solar_grid">Solar + Grid Hybrid</option>
                <option value="solar_generator">
                  Solar + Generator Hybrid
                </option>
                <option value="inverter">Inverter/Battery System</option>
                <option value="other">Other</option>
              </select>
              {errors.primaryPowerSource && (
                <p className={styles.errorText}>{errors.primaryPowerSource}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <select
                name="householdSize"
                value={formData.householdSize}
                onChange={handleChange}
                className={`${styles.select} ${errors.householdSize ? styles.inputError : ""}`}
              >
                <option value="" disabled>
                  Household Size
                </option>
                <option value="1">1 person — Solo living</option>
                <option value="2">2 people — Couple or roommates</option>
                <option value="3">3 people — Small family</option>
                <option value="4">4 people — Medium family</option>
                <option value="5">5+ people — Large family</option>
                <option value="2p">2 people + pets — Light extra usage</option>
                <option value="3p">
                  3 people + pets — Moderate extra usage
                </option>
                <option value="4p">
                  4+ people + pets — High usage household
                </option>
              </select>
              {errors.householdSize && (
                <p className={styles.errorText}>{errors.householdSize}</p>
              )}
            </div>
            {/* Country */}
            <div className={styles.formGroup}>
              <select
                name="country"
                value={formData.country}
                onChange={(e) => {
                  handleChange(e);
                  // Reset city when country changes
                  setFormData((prev) => ({ ...prev, city: "" }));
                }}
                className={styles.select}
              >
                <option value="" disabled>
                  Select Country
                </option>
                {Object.keys(AFRICAN_COUNTRIES).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className={styles.errorText}>{errors.country}</p>
              )}
            </div>

            {/* City — only shows after country is selected */}
            {formData.country && (
              <div className={styles.formGroup}>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  {AFRICAN_COUNTRIES[formData.country].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className={styles.errorText}>{errors.city}</p>
                )}
              </div>
            )}

            {errors.submit && (
              <div className={styles.submitError}>{errors.submit}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Saving..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;

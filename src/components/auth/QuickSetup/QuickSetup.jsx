import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuickSetup.module.css";
import iconMap from "../../../utils/iconMap";

const QuickSetup = () => {
  const navigate = useNavigate();
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [loading, setLoading] = useState(false);

  const commonAppliances = [
    { id: "bulb", name: "Bulb", defaultPower: 60, defaultHours: 5 },

    {
      id: "kettle",
      name: "Kettle",

      defaultPower: 2000,
      defaultHours: 0.5,
    },

    {
      id: "fridge",
      name: "Fridge",

      defaultPower: 150,
      defaultHours: 24,
    },

    {
      id: "modem",
      name: "Modem",

      defaultPower: 10,
      defaultHours: 24,
    },
    {
      id: "dryer",
      name: "Hand Dryer",

      defaultPower: 1800,
      defaultHours: 0.25,
    },

    { id: "fan", name: "Fan", defaultPower: 75, defaultHours: 12 },
    {
      id: "ac",
      name: "Air Conditioner",

      defaultPower: 1500,
      defaultHours: 8,
    },
    {
      id: "laptop",
      name: "Laptop",

      defaultPower: 65,
      defaultHours: 6,
    },
    { id: "tv", name: "TV", defaultPower: 100, defaultHours: 6 },
    {
      id: "microwave",
      name: "Microwave",

      defaultPower: 1000,
      defaultHours: 0.5,
    },
    {
      id: "socket",
      name: "Other Appliances",

      defaultPower: 2000,
      defaultHours: 10,
    },
  ];

  const handleApplianceClick = (appliance) => {
    const exists = selectedAppliances.find((a) => a.id === appliance.id);

    if (exists) {
      setSelectedAppliances(
        selectedAppliances.filter((a) => a.id !== appliance.id),
      );
    } else {
      setSelectedAppliances([
        ...selectedAppliances,
        {
          id: appliance.id,
          name: appliance.name,
          icon: appliance.icon,
          power: appliance.defaultPower,
          hoursPerDay: appliance.defaultHours,
        },
      ]);
    }
  };

  const handleApplianceUpdate = (id, field, value) => {
    setSelectedAppliances(
      selectedAppliances.map((appliance) =>
        appliance.id === id
          ? { ...appliance, [field]: parseFloat(value) || 0 }
          : appliance,
      ),
    );
  };

  const calculateDailyUsage = (power, hours) => {
    return ((power * hours) / 1000).toFixed(2);
  };

  const handleContinue = async () => {
    if (selectedAppliances.length === 0) {
      alert("Please select at least one appliance");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("ew_token");

      await Promise.all(
        selectedAppliances.map(async (appliance) => {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/appliances`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                appliance_type: appliance.name,
                wattage: appliance.power,
                quantity: 1,
                hours_per_day: appliance.hoursPerDay,
                duty_cycle: 0.8,
              }),
            },
          );
          const data = await res.json();

          if (!res.ok)
            throw new Error(data.message || "Failed to save appliance");
        }),
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save appliances. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isSelected = (id) => selectedAppliances.some((a) => a.id === id);

  return (
    <div className={styles.page}>
      <div className={styles.backgroundDecoration}></div>

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
        <div className={styles.content}>
          <h1 className={styles.title}>Quick Setup</h1>
          <p className={styles.subtitle}>
            Select your main appliances to get personalized <br />
            insights and accurate energy consumption tracking.
          </p>

          {}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Common Appliances</h2>
            <div className={styles.applianceGrid}>
              {commonAppliances.map((appliance) => {
                const Icon = iconMap[appliance.id];

                return (
                  <button
                    key={appliance.id}
                    onClick={() => handleApplianceClick(appliance)}
                    className={`${styles.applianceButton} ${isSelected(appliance.id) ? styles.applianceButtonActive : ""}`}
                  >
                    {Icon && <Icon className={styles.applianceIcon} />}
                    <span className={styles.applianceName}>
                      {appliance.name}
                    </span>
                    {isSelected(appliance.id) && (
                      <span className={styles.checkmark}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {}
          {selectedAppliances.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Add usage details for your appliances
              </h2>
              <div className={styles.detailsGrid}>
                {selectedAppliances.map((appliance) => {
                  const Icon = iconMap[appliance.id];
                  return (
                    <div key={appliance.id} className={styles.applianceCard}>
                      <div className={styles.cardHeader}>
                        {Icon && <Icon className={styles.cardIcon} />}
                        <span className={styles.cardName}>
                          {appliance.name}
                        </span>
                      </div>

                      <div className={styles.cardInputs}>
                        <div className={styles.inputGroup}>
                          <div>
                            <label className={styles.inputLabel}>
                              Power (Watts)
                            </label>
                            <input
                              type="number"
                              value={appliance.power}
                              onChange={(e) =>
                                handleApplianceUpdate(
                                  appliance.id,
                                  "power",
                                  e.target.value,
                                )
                              }
                              className={styles.input}
                              placeholder="1500"
                            />
                            <p className={styles.inputHint}>
                              Check on AC label
                            </p>
                          </div>

                          <div className={styles.inputGroup}>
                            <div>
                              <label className={styles.inputLabel}>
                                Hours per Day
                              </label>
                              <input
                                type="number"
                                step="0.5"
                                value={appliance.hoursPerDay}
                                onChange={(e) =>
                                  handleApplianceUpdate(
                                    appliance.id,
                                    "hoursPerDay",
                                    e.target.value,
                                  )
                                }
                                className={styles.input}
                                placeholder="8"
                              />
                              <p className={styles.inputHint}>
                                Average daily usage
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.cardUsage}>
                        <span className={styles.usageLabel}>Daily usage:</span>
                        <span className={styles.usageValue}>
                          {calculateDailyUsage(
                            appliance.power,
                            appliance.hoursPerDay,
                          )}{" "}
                          kWh
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {}
          <button
            onClick={handleContinue}
            disabled={loading || selectedAppliances.length === 0}
            className={styles.continueButton}
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickSetup;

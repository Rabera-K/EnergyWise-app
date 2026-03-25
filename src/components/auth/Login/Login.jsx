import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import styles from "./Login.module.css";
import { useUser } from "../../../context/UserContext";
import { useData } from "../../../context/DataContext";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { fetchWithCache } = useData();
  const { setUser } = useUser();

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

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = "Email or phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: formData.emailOrPhone,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      const token = data.data.token;
      const savedName = JSON.parse(localStorage.getItem("ew_name") || "{}");

      login(
        {
          identifier: formData.emailOrPhone,
          firstName: savedName.firstName || "",
          lastName: savedName.lastName || "",
        },
        token,
      );

      login({ identifier: formData.emailOrPhone }, token);

      const BASE = import.meta.env.VITE_API_URL;
      fetchWithCache("dashboard", `${BASE}/dashboard`);
      fetchWithCache("appliances", `${BASE}/appliances`);
      fetchWithCache("recommendations", `${BASE}/recommendations`);
      fetchWithCache("forecast", `${BASE}/forecast`);

      const meRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const meData = await meRes.json();
      const u = meData.data;
      const firstName = u?.first_name || formData.emailOrPhone.split("@")[0];
      const lastName = u?.last_name || "";
      setUser({
        name: firstName,
        lastName,
        initials: lastName
          ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
          : firstName.slice(0, 2).toUpperCase(),
      });

      const isOnboarded = meData.data?.onboarding?.is_onboarded === true;

      if (isOnboarded) {
        localStorage.setItem("ew_onboarded", "true");
        navigate("/dashboard");
      } else {
        navigate("/user-type");
      }
    } catch (error) {
      setErrors({
        submit: error.message || "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.backgroundDecoration} />
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
            <h1 className={styles.title}>Log in</h1>
            <p className={styles.subtitle}>
              Don't have an account?{" "}
              <Link to="/signup" className={styles.link}>
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                placeholder="Email/Phone"
                className={`${styles.input} ${errors.emailOrPhone ? styles.inputError : ""}`}
              />
              {errors.emailOrPhone && (
                <p className={styles.errorText}>{errors.emailOrPhone}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`${styles.input} ${styles.passwordInput} ${errors.password ? styles.inputError : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className={styles.eyeIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className={styles.eyeIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
              )}
            </div>

            {errors.submit && (
              <div className={styles.submitError}>{errors.submit}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
        formData.password,
      )
    ) {
      newErrors.password =
        "Password must be 8+ characters and include an uppercase letter, number, and special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "ew_name",
          JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        );
        navigate("/login");
        return;
      }

      if (response.status === 400 && data.message === "User already exists") {
        setErrors({ submit: "User already exists. Please login instead." });
        return;
      }

      throw new Error(data.message || "Signup failed");
    } catch (error) {
      setErrors({
        submit: error.message || "Signup failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    alert("Google signup - Connect to your OAuth backend");
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundDecoration}></div>

      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg
              className={styles.logoSvg}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className={styles.logoText}>EnergyWise</span>
        </div>

        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Sign Up</h1>
            <p className={styles.subtitle}>
              Already have an account?{" "}
              <Link to="/login" className={styles.link}>
                Log in
              </Link>
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className={styles.googleButton}
          >
            <FcGoogle className={styles.googleIcon} />
            Continue with Google
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerText}>OR</span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
              />
              {errors.firstName && (
                <p className={styles.errorText}>{errors.firstName}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
              />
              {errors.lastName && (
                <p className={styles.errorText}>{errors.lastName}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              />
              {errors.phone && (
                <p className={styles.errorText}>{errors.phone}</p>
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
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                />

                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                />

                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>

              {errors.confirmPassword && (
                <p className={styles.errorText}>{errors.confirmPassword}</p>
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
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>

          <p className={styles.terms}>
            By signing up, you agree to our{" "}
            <Link to="/terms" className={styles.link}>
              Terms of Service
            </Link>{" "}
            and acknowledge our{" "}
            <Link to="/privacy" className={styles.link}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

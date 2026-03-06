import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import analyticsImg from "../../../assets/analytics.png";
import energyImg from "../../../assets/energy.png";
import electricianImg from "../../../assets/electrician.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSeeHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.landingPage}>
      {/* navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="none"
              >
                <rect width="40" height="40" fill="#008070" rx="12" />
                <path
                  fill="#f59e0b"
                  stroke="#f59e0b"
                  strokeWidth=".047"
                  d="m24.97 10.023-1.735 6.971-.006.03h4.975L16.068 29.917l2.715-10.912.008-.03H14.79l2.229-8.953z"
                />
              </svg>
            </div>
            <span className={styles.logoText}>EnergyWise</span>
          </div>

          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>
              Features
            </a>
            <a href="#pricing" className={styles.navLink}>
              Pricing
            </a>
            <a href="#about" className={styles.navLink}>
              About
            </a>
            <button onClick={handleLogin} className={styles.loginButton}>
              Log In
            </button>
            <button
              onClick={handleGetStarted}
              className={styles.getStartedButtonNav}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* hero */}
      <section className={styles.hero}>
        <div className={`${styles.blob} ${styles.blobGreen}`} />
        <div className={`${styles.blob} ${styles.blobAmber}`} />
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1031_3909)">
                    <path
                      d="M6.6243 10.3332C6.56478 10.1025 6.44453 9.89191 6.27605 9.72343C6.10757 9.55495 5.89702 9.43469 5.6663 9.37517L1.5763 8.32051C1.50652 8.3007 1.44511 8.25867 1.40138 8.2008C1.35765 8.14293 1.33398 8.07238 1.33398 7.99984C1.33398 7.9273 1.35765 7.85675 1.40138 7.79888C1.44511 7.74101 1.50652 7.69898 1.5763 7.67917L5.6663 6.62384C5.89693 6.56438 6.10743 6.44422 6.2759 6.27587C6.44438 6.10751 6.56468 5.8971 6.6243 5.66651L7.67897 1.57651C7.69857 1.50645 7.74056 1.44474 7.79851 1.40077C7.85647 1.35681 7.92722 1.33301 7.99997 1.33301C8.07271 1.33301 8.14346 1.35681 8.20142 1.40077C8.25938 1.44474 8.30136 1.50645 8.32097 1.57651L9.37497 5.66651C9.43449 5.89722 9.55474 6.10777 9.72322 6.27625C9.8917 6.44473 10.1023 6.56499 10.333 6.62451L14.423 7.67851C14.4933 7.69791 14.5553 7.73985 14.5995 7.79789C14.6437 7.85594 14.6677 7.92688 14.6677 7.99984C14.6677 8.0728 14.6437 8.14374 14.5995 8.20179C14.5553 8.25983 14.4933 8.30177 14.423 8.32117L10.333 9.37517C10.1023 9.43469 9.8917 9.55495 9.72322 9.72343C9.55474 9.89191 9.43449 10.1025 9.37497 10.3332L8.3203 14.4232C8.3007 14.4932 8.25871 14.5549 8.20075 14.5989C8.1428 14.6429 8.07205 14.6667 7.9993 14.6667C7.92656 14.6667 7.85581 14.6429 7.79785 14.5989C7.73989 14.5549 7.69791 14.4932 7.6783 14.4232L6.6243 10.3332Z"
                      stroke="#09907F"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.333 2V4.66667"
                      stroke="#09907F"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.6667 3.3335H12"
                      stroke="#09907F"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.66699 11.3335V12.6668"
                      stroke="#09907F"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.33333 12H2"
                      stroke="#09907F"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1031_3909">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span className={styles.badgeText}>
                AI-Powered Energy Intelligence
              </span>
            </div>
            {/* left side */}
            <div>
              <h1 className={styles.heroTitle}>
                Track, Optimize & <br />
                Save on <span className={styles.highlight}>Energy</span>
                <br />
                Costs
              </h1>

              <p className={styles.heroDescription}>
                Monitor your electricity usage in real-time, get AI-
                <br />
                powered forecasts, and connect with verified technicians
                <br />— all in one platform built for African homes and
                <br />
                businesses
              </p>

              <div className={styles.heroCta}>
                <button
                  onClick={handleGetStarted}
                  className={styles.primaryButton}
                >
                  Get Started FREE →
                </button>
                <button
                  onClick={handleSeeHowItWorks}
                  className={styles.secondaryButton}
                >
                  See How It Works
                </button>
              </div>

              <div className={styles.stats}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>25%</div>
                  <div className={styles.statLabel}>Average Savings</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>98%</div>
                  <div className={styles.statLabel}>Forecast Accuracy</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue2}>24/7</div>
                  <div className={styles.statLabel}>Real-Time Monitoring</div>
                </div>
              </div>
            </div>
          </div>
          {/* Right -dashboard mockup */}
          <div className={styles.heroImage}>
            <div className={styles.dashboardMockup}>
              <div className={styles.mockupCard}>
                <div className={styles.mockupTopRow}>
                  <div>
                    <div className={styles.mockupLabel}>Current Usage</div>
                    <div className={styles.mockupBalance}>140 kWh</div>
                  </div>
                  <div className={styles.mockupBadgesCol}>
                    <div className={styles.mockupOptimalBadge}>Optimal</div>
                  </div>
                </div>
                <div>
                  <div className={styles.mockupProgressTrack}>
                    <div className={styles.mockupProgressFill} />
                  </div>
                  <div className={styles.mockupProgressRow}>
                    <span>750 units remaining</span>
                    <span className={styles.mockupProgressRow2}>75% left</span>
                  </div>
                </div>
                <div className={styles.mockupChart}>
                  {[91, 105, 77, 97, 112, 85, 95].map((h, i) => (
                    <div
                      key={i}
                      className={styles.chartBar}
                      style={{ height: `${h}%`, opacity: i === 4 ? 1 : 0.5 }}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.mockupFloating}>
                <div className={styles.floatingIcon}>$</div>
                <div>
                  <div className={styles.floatingLabel}>Saved today</div>
                  <div className={styles.floatingValue}>₦450</div>
                </div>
              </div>
              <div className={styles.mockupFloating2}>
                <div className={styles.floatingIcon2}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M22 17L13.5 8.5L8.5 13.5L2 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 17H22V11"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className={styles.floatingLabel2}>This Week</div>
                  <div className={styles.floatingValue2}>-12%</div>
                </div>
              </div>
              <div className={styles.mockupFloating3}>
                {/* <div className={styles.blobFloat} /> */}
                <div className={styles.floatingIcon3}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="172"
                    height="178"
                    fill="none"
                  >
                    <g filter="url(#a)">
                      <path
                        fill="url(#b)"
                        d="M125.004 94.963c-15.454 21.54-45.443 26.473-66.982 11.019S31.549 60.54 47.002 39.001c15.454-21.54 45.443-26.473 66.983-11.02 21.539 15.454 26.473 45.443 11.019 66.982"
                        shapeRendering="crispEdges"
                      />
                      <g
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.333"
                        clipPath="url(#c)"
                      >
                        <path d="M92.198 64.247a3.33 3.33 0 0 0 .55 3.342l6.77 8.103a.833.833 0 0 1-.934 1.302l-9.846-3.817a3.33 3.33 0 0 0-3.341.549l-8.103 6.77a.834.834 0 0 1-1.304-.935l3.82-9.844a3.33 3.33 0 0 0-.55-3.342l-6.773-8.102a.833.833 0 0 1 .937-1.305l9.844 3.82a3.33 3.33 0 0 0 3.342-.55l8.103-6.771a.833.833 0 0 1 1.304.936zM66.426 71.397l3.886-5.417M65.66 66.746l5.417 3.886M101.694 67.984l1.943-2.709M101.312 65.658l2.709 1.943" />
                      </g>
                    </g>
                    <defs>
                      <linearGradient
                        id="b"
                        x1="97.022"
                        x2="74.984"
                        y1="133.964"
                        y2="0"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".216" stopColor="#f59e0b" />
                        <stop offset=".356" stopColor="#09907f" />
                      </linearGradient>
                      <clipPath id="c">
                        <path
                          fill="#fff"
                          d="m90.595 94.891-32.5-23.318 23.317-32.5 32.5 23.318z"
                        />
                      </clipPath>
                      <filter
                        id="a"
                        width="209.964"
                        height="209.964"
                        x="-18.979"
                        y="-13"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          result="hardAlpha"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feMorphology
                          in="SourceAlpha"
                          radius="12"
                          result="effect1_dropShadow_1031_4116"
                        />
                        <feOffset dy="25" />
                        <feGaussianBlur stdDeviation="25" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1031_4116"
                        />
                        <feBlend
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1031_4116"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
              {/* Scroll indicator */}
              <div
                className={`${styles.scrollIndicator} ${scrolled ? styles.scrollIndicatorHidden : ""}`}
              >
                <span className={styles.scrollText}>Scroll to explore</span>
                <div className={styles.scrollPill}>
                  <div className={styles.scrollDot} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* features*/}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Everything You Need to Manage Energy
          </h2>
          <p className={styles.sectionSubtitle}>
            Stay informed, AI forecasting, cost analytics, and expert support in
            one platform.
          </p>

          <div className={styles.featureGrid}>
            <div className={styles.featureBlock}>
              <div className={styles.featureImage}>
                <div className={styles.dashboardPreview}>
                  <div className={styles.imgWrap}>
                    <img src={analyticsImg} className={styles.img} />
                    <div className={styles.tint1} />
                  </div>
                </div>
              </div>
              <div className={styles.featureContent}>
                <div className={`${styles.featureBadge} ${styles.badge1}`}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M2.5 2.5V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H17.5"
                        stroke="#09907F"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 14.1667V7.5"
                        stroke="#09907F"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.833 14.1665V4.1665"
                        stroke="#09907F"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.66699 14.1665V11.6665"
                        stroke="#09907F"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>{" "}
                  Real-Time Insights
                </div>
                <h3 className={styles.featureTitle}>
                  Monitor Your Energy Usage Live
                </h3>
                <p className={styles.featureDescription}>
                  Track your household or business electricity consumption,
                  identify high-usage appliances, and get instant updates on
                  your energy balance.
                </p>
                <ul className={`${styles.featureList} ${styles.feature1}`}>
                  <li>Track energy usage in real-time</li>
                  <li>Appliance-level monitoring</li>
                  <li>Daily, weekly, and monthly trends</li>
                  <li>Instant balance updates</li>
                </ul>
              </div>
            </div>

            <div
              className={`${styles.featureBlock} ${styles.featureBlockReverse}`}
            >
              <div className={styles.featureContent}>
                <div className={`${styles.featureBadge} ${styles.badge2}`}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1034_4836)">
                        <path
                          d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7936 7.08336 11.7192L1.97086 10.4009C1.88364 10.3761 1.80687 10.3236 1.75221 10.2512C1.69754 10.1789 1.66797 10.0907 1.66797 10C1.66797 9.90937 1.69754 9.82118 1.75221 9.74884C1.80687 9.6765 1.88364 9.62397 1.97086 9.59921L7.08336 8.28004C7.37166 8.20572 7.63477 8.05552 7.84537 7.84508C8.05596 7.63463 8.20634 7.37162 8.28086 7.08338L9.5992 1.97088C9.6237 1.88331 9.67618 1.80616 9.74863 1.75121C9.82108 1.69625 9.90951 1.6665 10.0004 1.6665C10.0914 1.6665 10.1798 1.69625 10.2523 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3052 9.82016 18.3351 9.90884 18.3351 10C18.3351 10.0912 18.3052 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1168 10.3239 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99961 18.3336C9.90868 18.3336 9.82025 18.3038 9.7478 18.2489C9.67535 18.1939 9.62287 18.1168 9.59836 18.0292L8.28086 12.9167Z"
                          stroke="#0046F5"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.667 2.5V5.83333"
                          stroke="#0046F5"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.3333 4.1665H15"
                          stroke="#0046F5"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.33301 14.1665V15.8332"
                          stroke="#0046F5"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.16667 15H2.5"
                          stroke="#0046F5"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1034_4836">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>{" "}
                  AI Forecasting
                </div>
                <h3 className={styles.featureTitle}>
                  Protect Your Energy Needs
                </h3>
                <p className={styles.featureDescription}>
                  Our AI analyzes your usage patterns to forecast when you'll
                  run out of energy and how much you'll need. Plan ahead and
                  never experience unexpected outages.
                </p>
                <ul className={`${styles.featureList} ${styles.feature2}`}>
                  <li>Predict your expense forecast</li>
                  <li>Manage your credit limit</li>
                  <li>Get analytics and insights</li>
                  <li>AI recommendations</li>
                </ul>
              </div>
              <div className={styles.featureImage}>
                <div className={styles.illustrationPreview}>
                  {}
                  <div className={styles.previewCard}>
                    {" "}
                    <div className={styles.imgWrap}>
                      <img src={energyImg} className={styles.img} />
                      <div className={styles.tint2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.featureBlock}>
              <div className={styles.featureImage}>
                <div className={styles.dashboardPreview}>
                  <div className={styles.imgWrap}>
                    <img src={electricianImg} className={styles.img} />
                    <div className={styles.tint3} />
                  </div>
                </div>
              </div>
              <div className={styles.featureContent}>
                <div className={`${styles.featureBadge} ${styles.badge3}`}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M13.3337 17.5V15.8333C13.3337 14.9493 12.9825 14.1014 12.3573 13.4763C11.7322 12.8512 10.8844 12.5 10.0003 12.5H5.00033C4.11627 12.5 3.26842 12.8512 2.6433 13.4763C2.01818 14.1014 1.66699 14.9493 1.66699 15.8333V17.5"
                        stroke="#F59E0B"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.50033 9.16667C9.34127 9.16667 10.8337 7.67428 10.8337 5.83333C10.8337 3.99238 9.34127 2.5 7.50033 2.5C5.65938 2.5 4.16699 3.99238 4.16699 5.83333C4.16699 7.67428 5.65938 9.16667 7.50033 9.16667Z"
                        stroke="#F59E0B"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.333 17.5001V15.8334C18.3325 15.0948 18.0866 14.3774 17.6341 13.7937C17.1817 13.2099 16.5481 12.793 15.833 12.6084"
                        stroke="#F59E0B"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.333 2.6084C14.05 2.79198 14.6855 3.20898 15.1394 3.79366C15.5932 4.37833 15.8395 5.09742 15.8395 5.83757C15.8395 6.57771 15.5932 7.2968 15.1394 7.88147C14.6855 8.46615 14.05 8.88315 13.333 9.06673"
                        stroke="#F59E0B"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>{" "}
                  Expert Support
                </div>
                <h3 className={styles.featureTitle}>
                  Connect with Verified Technicians
                </h3>
                <p className={styles.featureDescription}>
                  Access a marketplace of verified electricians, energy
                  auditors, and installation specialists. Get professional help
                  when you need it most.
                </p>
                <ul className={`${styles.featureList} ${styles.feature3}`}>
                  <li>Admin-verified credentials</li>
                  <li>Browse by location and specialty</li>
                  <li>Read reviews and ratings</li>
                  <li>Direct contact and booking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className={styles.howItWorks} id="how-it-works">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Get Started in 3 Simple Steps</h2>
          <p className={styles.sectionSubtitle}>
            Setup takes less than 5 minutes. Start managing your energy smarter
            today.
          </p>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>
                <div className={styles.stepNumber1}>1</div>
                <div className={styles.stepIcon1}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M20 28V17.3333C20 16.9797 19.8595 16.6406 19.6095 16.3905C19.3594 16.1405 19.0203 16 18.6667 16H13.3333C12.9797 16 12.6406 16.1405 12.3905 16.3905C12.1405 16.6406 12 16.9797 12 17.3333V28"
                      stroke="white"
                      strokeWidth="2.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 13.3335C3.99991 12.9455 4.08445 12.5623 4.24772 12.2104C4.41099 11.8585 4.64906 11.5465 4.94533 11.2961L14.2787 3.29745C14.76 2.89067 15.3698 2.66748 16 2.66748C16.6302 2.66748 17.24 2.89067 17.7213 3.29745L27.0547 11.2961C27.3509 11.5465 27.589 11.8585 27.7523 12.2104C27.9156 12.5623 28.0001 12.9455 28 13.3335V25.3335C28 26.0407 27.719 26.719 27.219 27.2191C26.7189 27.7192 26.0406 28.0001 25.3333 28.0001H6.66667C5.95942 28.0001 5.28115 27.7192 4.78105 27.2191C4.28095 26.719 4 26.0407 4 25.3335V13.3335Z"
                      stroke="white"
                      strokeWidth="2.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className={styles.stepTitle}>Create Your Profile</h3>
              <p className={styles.stepDescription}>
                Sign up and let us know you use energy for your home or
                business. It's quick and easy!
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>
                <div className={styles.stepNumber2}>2</div>
                <div className={styles.stepIcon2}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M25.3333 9.33333V5.33333C25.3333 4.97971 25.1929 4.64057 24.9428 4.39052C24.6928 4.14048 24.3536 4 24 4H6.66667C5.95942 4 5.28115 4.28095 4.78105 4.78105C4.28095 5.28115 4 5.95942 4 6.66667C4 7.37391 4.28095 8.05219 4.78105 8.55229C5.28115 9.05238 5.95942 9.33333 6.66667 9.33333H26.6667C27.0203 9.33333 27.3594 9.47381 27.6095 9.72386C27.8595 9.97391 28 10.313 28 10.6667V16M28 16H24C23.2928 16 22.6145 16.281 22.1144 16.781C21.6143 17.2811 21.3333 17.9594 21.3333 18.6667C21.3333 19.3739 21.6143 20.0522 22.1144 20.5523C22.6145 21.0524 23.2928 21.3333 24 21.3333H28C28.3536 21.3333 28.6928 21.1929 28.9428 20.9428C29.1929 20.6928 29.3333 20.3536 29.3333 20V17.3333C29.3333 16.9797 29.1929 16.6406 28.9428 16.3905C28.6928 16.1405 28.3536 16 28 16Z"
                      stroke="white"
                      strokeWidth="2.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 6.6665V25.3332C4 26.0404 4.28095 26.7187 4.78105 27.2188C5.28115 27.7189 5.95942 27.9998 6.66667 27.9998H26.6667C27.0203 27.9998 27.3594 27.8594 27.6095 27.6093C27.8595 27.3593 28 27.0201 28 26.6665V21.3332"
                      stroke="white"
                      strokeWidth="2.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className={styles.stepTitle}>Log Your Energy</h3>
              <p className={styles.stepDescription}>
                Log your electricity units as you purchase or add units right
                from the platform for easy tracking.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>
                <div className={styles.stepNumber3}>3</div>
                <div className={styles.stepIcon3}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M29.3337 15.9998H26.027C25.4443 15.9986 24.8772 16.1882 24.4125 16.5398C23.9478 16.8913 23.611 17.3854 23.4537 17.9465L20.3203 29.0932C20.3001 29.1624 20.258 29.2232 20.2003 29.2665C20.1426 29.3098 20.0724 29.3332 20.0003 29.3332C19.9282 29.3332 19.858 29.3098 19.8003 29.2665C19.7426 29.2232 19.7005 29.1624 19.6803 29.0932L12.3203 2.9065C12.3001 2.83727 12.258 2.77644 12.2003 2.73317C12.1426 2.6899 12.0724 2.6665 12.0003 2.6665C11.9282 2.6665 11.858 2.6899 11.8003 2.73317C11.7426 2.77644 11.7005 2.83727 11.6803 2.9065L8.54699 14.0532C8.39028 14.612 8.0555 15.1045 7.59348 15.4559C7.13145 15.8072 6.56742 15.9982 5.98699 15.9998H2.66699"
                      stroke="white"
                      strokeWidth="2.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className={styles.stepTitle}>Get Insights</h3>
              <p className={styles.stepDescription}>
                View personalized AI-powered forecasts, track usage, and connect
                with trusted technicians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {}

      {}
      <section className={styles.whyChoose}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleWhite}>Why Choose EnergyWise?</h2>
          <p className={styles.sectionSubtitleWhite}>
            Join thousands already saving money and managing energy smarter with
            EnergyWise
          </p>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22 17L13.5 8.5L8.5 13.5L2 7"
                    stroke="#09907F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17H22V11"
                    stroke="#09907F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className={styles.benefitTitle}>Reduce waste by upto 25%</h4>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.55664 17.5C8.70293 17.7533 8.91332 17.9637 9.16668 18.11C9.42003 18.2563 9.70743 18.3333 9.99997 18.3333C10.2925 18.3333 10.5799 18.2563 10.8333 18.11C11.0866 17.9637 11.297 17.7533 11.4433 17.5"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.7187 12.7715C2.60984 12.8908 2.538 13.0392 2.51191 13.1986C2.48583 13.358 2.50663 13.5215 2.57179 13.6693C2.63695 13.8171 2.74365 13.9428 2.87891 14.0311C3.01418 14.1193 3.17218 14.1664 3.3337 14.1665H16.667C16.8285 14.1666 16.9866 14.1197 17.1219 14.0316C17.2573 13.9435 17.3641 13.818 17.4294 13.6703C17.4948 13.5226 17.5158 13.3591 17.4899 13.1997C17.464 13.0402 17.3924 12.8918 17.2837 12.7723C16.1754 11.6298 15.0004 10.4157 15.0004 6.6665C15.0004 5.34042 14.4736 4.06865 13.5359 3.13097C12.5982 2.19329 11.3265 1.6665 10.0004 1.6665C8.67429 1.6665 7.40252 2.19329 6.46483 3.13097C5.52715 4.06865 5.00037 5.34042 5.00037 6.6665C5.00037 10.4157 3.82453 11.6298 2.7187 12.7715Z"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className={styles.benefitTitle}>
                Never run out unexpectedly
              </h4>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <span>$</span>
              </div>
              <h4 className={styles.benefitTitle}>Lower your monthly cost</h4>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.6663 10.8335C16.6663 15.0002 13.7497 17.0835 10.283 18.2919C10.1015 18.3534 9.90429 18.3505 9.72467 18.2835C6.24967 17.0835 3.33301 15.0002 3.33301 10.8335V5.00021C3.33301 4.7792 3.42081 4.56724 3.57709 4.41096C3.73337 4.25468 3.94533 4.16688 4.16634 4.16688C5.83301 4.16688 7.91634 3.16688 9.36634 1.90021C9.54289 1.74938 9.76747 1.6665 9.99967 1.6665C10.2319 1.6665 10.4565 1.74938 10.633 1.90021C12.0913 3.17521 14.1663 4.16688 15.833 4.16688C16.054 4.16688 16.266 4.25468 16.4223 4.41096C16.5785 4.56724 16.6663 4.7792 16.6663 5.00021V10.8335Z"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className={styles.benefitTitle}>
                No expensive hardware needed
              </h4>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10.0003 18.3332C14.6027 18.3332 18.3337 14.6022 18.3337 9.99984C18.3337 5.39746 14.6027 1.6665 10.0003 1.6665C5.39795 1.6665 1.66699 5.39746 1.66699 9.99984C1.66699 14.6022 5.39795 18.3332 10.0003 18.3332Z"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 5V10L13.3333 11.6667"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className={styles.benefitTitle}>24/7 real-time monitoring</h4>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7936 7.08336 11.7192L1.97086 10.4009C1.88364 10.3761 1.80687 10.3236 1.75221 10.2512C1.69754 10.1789 1.66797 10.0907 1.66797 10C1.66797 9.90937 1.69754 9.82118 1.75221 9.74884C1.80687 9.6765 1.88364 9.62397 1.97086 9.59921L7.08336 8.28004C7.37166 8.20572 7.63477 8.05552 7.84537 7.84508C8.05596 7.63463 8.20634 7.37162 8.28086 7.08338L9.5992 1.97088C9.6237 1.88331 9.67618 1.80616 9.74863 1.75121C9.82108 1.69625 9.90951 1.6665 10.0004 1.6665C10.0914 1.6665 10.1798 1.69625 10.2523 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3052 9.82016 18.3351 9.90884 18.3351 10C18.3351 10.0912 18.3052 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1168 10.3239 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99961 18.3336C9.90868 18.3336 9.82025 18.3038 9.7478 18.2489C9.67535 18.1939 9.62287 18.1168 9.59836 18.0292L8.28086 12.9167Z"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.667 2.5V5.83333"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3333 4.1665H15"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.33301 14.1665V15.8332"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16667 15H2.5"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className={styles.benefitTitle}>AI powered predictions</h4>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.3337 17.5V15.8333C13.3337 14.9493 12.9825 14.1014 12.3573 13.4763C11.7322 12.8512 10.8844 12.5 10.0003 12.5H5.00033C4.11627 12.5 3.26842 12.8512 2.6433 13.4763C2.01818 14.1014 1.66699 14.9493 1.66699 15.8333V17.5"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.50033 9.16667C9.34127 9.16667 10.8337 7.67428 10.8337 5.83333C10.8337 3.99238 9.34127 2.5 7.50033 2.5C5.65938 2.5 4.16699 3.99238 4.16699 5.83333C4.16699 7.67428 5.65938 9.16667 7.50033 9.16667Z"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.333 17.5001V15.8334C18.3325 15.0948 18.0866 14.3774 17.6341 13.7937C17.1817 13.2099 16.5481 12.793 15.833 12.6084"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.333 2.6084C14.05 2.79198 14.6855 3.20898 15.1394 3.79366C15.5932 4.37833 15.8395 5.09742 15.8395 5.83757C15.8395 6.57771 15.5932 7.2968 15.1394 7.88147C14.6855 8.46615 14.05 8.88315 13.333 9.06673"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className={styles.benefitTitle}>
                Access verified technicians
              </h4>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10.0003 18.3332C14.6027 18.3332 18.3337 14.6022 18.3337 9.99984C18.3337 5.39746 14.6027 1.6665 10.0003 1.6665C5.39795 1.6665 1.66699 5.39746 1.66699 9.99984C1.66699 14.6022 5.39795 18.3332 10.0003 18.3332Z"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.99967 11.6668C10.9201 11.6668 11.6663 10.9206 11.6663 10.0002C11.6663 9.07969 10.9201 8.3335 9.99967 8.3335C9.0792 8.3335 8.33301 9.07969 8.33301 10.0002C8.33301 10.9206 9.0792 11.6668 9.99967 11.6668Z"
                    stroke="#09907F"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className={styles.benefitTitle}>
                Simple, intuitive interface
              </h4>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Start Saving?</h2>
          <p className={styles.ctaDescription}>
            Join 5,000+ homes and businesses managing energy smarter with
            EnergyWise
          </p>
          <button onClick={handleGetStarted} className={styles.ctaButton}>
            Get Started Free Today →
          </button>
          <p className={styles.ctaNote}>
            No credit card required • Free forever
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <div className={styles.logoIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="none"
                  >
                    <rect width="40" height="40" fill="#008070" rx="12" />
                    <path
                      fill="#f59e0b"
                      stroke="#f59e0b"
                      strokeWidth=".047"
                      d="m24.97 10.023-1.735 6.971-.006.03h4.975L16.068 29.917l2.715-10.912.008-.03H14.79l2.229-8.953z"
                    />
                  </svg>
                </div>
                <span>EnergyWise</span>
              </div>
              <p className={styles.footerTagline}>
                Empowering smarter energy decisions
                <br />
                across Africa.
              </p>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Product</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#how-it-works">Get Started</a>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Company</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Support</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#help">Help Centre</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© 2026 EnergyWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

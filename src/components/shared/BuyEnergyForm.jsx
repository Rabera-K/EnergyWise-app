import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuyEnergyForm.module.css";
import { paymentsAPI } from "../../api/payments";
import { openPaystackPopup } from "../../utils/paystack";
import { useAuth } from "../../context/useAuth";

const PRESETS = [
  { kwh: 25, price: 2750 },
  { kwh: 50, price: 5500 },
  { kwh: 75, price: 8250 },
  { kwh: 100, price: 11050 },
];

const PAYMENT_METHODS = [
  { id: "card", pname: "Card", sub: "Debit or Credit" },
  { id: "bank_transfer", pname: "Bank Transfer", sub: "Direct Transfer" },
  { id: "mobile_money", pname: "Mobile Money", sub: "Wallet payment" },
];

const FALLBACK_RATE = 110;

function formatNaira(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

function CardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none">
      <path
        fill="#f59e0b"
        d="M49 10.5H7A3.5 3.5 0 0 0 3.5 14v28A3.5 3.5 0 0 0 7 45.5h42a3.5 3.5 0 0 0 3.5-3.5V14a3.5 3.5 0 0 0-3.5-3.5m0 3.5v5.25H7V14zM7 42V22.75h42V42z"
      />
      <path fill="#000" d="M10.5 35H28v3.5H10.5z" />
    </svg>
  );
}

function BuyEnergyForm({ variant }) {
  const navigate = useNavigate();

  const [selectedKwh, setSelectedKwh] = useState(null);
  const [customKwh, setCustomKwh] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [rate, setRate] = useState(FALLBACK_RATE);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newBalance, setNewBalance] = useState(null);
  const [unitsCredited, setUnitsCredited] = useState(null);
  const userEmail = user?.identifier?.includes("@")
    ? user.identifier
    : `${user?.identifier}@gmail.com`;
  // derived values
  const activeKwh = selectedKwh ?? (customKwh ? Number(customKwh) : 0);
  const totalAmount = activeKwh * rate;
  const canContinue = activeKwh > 0 && paymentMethod !== null;

  // ‼️‼️‼️get rate from backend‼️‼️‼️

  useEffect(() => {
    const token = localStorage.getItem("ew_token");
    fetch(`${import.meta.env.VITE_API_URL}/energy-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.rate) setRate(data.rate);
      })
      .catch(() => {});
  }, []);

  const handlePresetClick = (kwh) => {
    setSelectedKwh(kwh);
    setCustomKwh("");
  };

  const handleCustomChange = (e) => {
    setCustomKwh(e.target.value);
    setSelectedKwh(null);
  };

  const handleCancel = () => {
    if (variant === "onboarding") {
      navigate("/dashboard");
    } else {
      navigate("/my-energy");
    }
  };
  const handleCopyToken = () => {
    navigator.clipboard.writeText("1234 5678 9012 346 690");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleDone = () => {
    if (variant === "onboarding") {
      navigate("/quicksetup");
    } else {
      navigate("/my-energy");
    }
  };

  function formatDate() {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  const handleContinue = async () => {
    setLoading(true);
    setError(null);

    try {
      openPaystackPopup({
        email: userEmail,
        amount: totalAmount,

        onSuccess: async (reference) => {
          // console.log("Paystack reference:", reference);
          try {
            const { data } = await paymentsAPI.verify(
              reference,
              activeKwh,
              totalAmount,
            );
            setUnitsCredited(data.units_purchased);
            setNewBalance(data.new_balance);
            setShowSuccess(true);
          } catch (err) {
            if (err.response?.status === 400) {
              setError("This payment has already been verified.");
            } else if (err.response?.status === 401) {
              setError("Session expired. Please log in again.");
            } else {
              setError(
                "Payment went through but logging failed. Contact support.",
              );
            }
          } finally {
            setLoading(false);
          }
        },

        onClose: () => {
          // user closed popup without paying
          setLoading(false);
        },
      });
    } catch {
      setError("Could not open payment. Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className={styles.form}>
      {/* balance card----dashboard only */}
      {variant === "dashboard" && (
        <div className={styles.balanceCard}>
          <p className={styles.balanceCardLabel}>Current Balance</p>
          <p className={styles.balanceCardValue}>
            45.2<span>kWh</span>
          </p>
          <p className={styles.balanceCardSub}>Lasts approximately 6 days</p>
        </div>
      )}

      {/* Preset amounts */}
      <div>
        <p className={styles.sectionTitle}>Select Amount</p>
        <div className={styles.presets}>
          {PRESETS.map(({ kwh, price }) => (
            <button
              key={kwh}
              onClick={() => handlePresetClick(kwh)}
              className={`${styles.preset} ${selectedKwh === kwh ? styles.presetSelected : ""}`}
            >
              <span className={styles.presetKwh}>{kwh}</span>
              <span className={styles.presetPrice}>{formatNaira(price)}</span>
            </button>
          ))}
        </div>
      </div>
      {/* custom amount */}
      <div className={styles.customSection}>
        <div className={styles.subSection}>
          <p className={styles.customLabel}>Custom Amount</p>
          <div className={styles.customInputRow}>
            <input
              type="number"
              min="1"
              placeholder="Enter amount"
              value={customKwh}
              onChange={handleCustomChange}
              className={styles.customInput}
            />
          </div>
          {activeKwh > 0 && (
            <p className={styles.customHint}>
              Approximately <strong>{formatNaira(totalAmount)}</strong> at ₦
              {rate}/kWh
            </p>
          )}
        </div>
        {/* <span className={styles.customUnit}>kWh</span> */}
      </div>
      {/* Payment method */}
      <div>
        <p className={styles.sectionTitle}>Payment Method</p>
        <div className={styles.paymentMethods}>
          {PAYMENT_METHODS.map(({ id, pname, sub }) => (
            <button
              key={id}
              onClick={() => setPaymentMethod(id)}
              className={`${styles.paymentMethod} ${paymentMethod === id ? styles.paymentMethodSelected : ""}`}
            >
              <CardIcon />
              <span className={styles.paymentName}>{pname}</span>
              <span className={styles.paymentSub}>{sub}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Order summary */}
      <div className={styles.orderSummary}>
        <p className={styles.orderTitle}>Order Summary</p>
        <div className={styles.orderRow}>
          <span>Energy Units</span>
          <span>{activeKwh > 0 ? `${activeKwh} kWh` : "—"}</span>
        </div>
        <div className={styles.orderRow}>
          <span>Rate</span>
          <span>₦{rate}/kWh</span>
        </div>
        <hr className={styles.orderDivider} />
        <div className={styles.orderTotal}>
          <span>Total Amount</span>
          <span className={styles.orderTotalAmount}>
            {activeKwh > 0 ? formatNaira(totalAmount) : "—"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.cancelBtn} onClick={handleCancel}>
          Cancel
        </button>
        <button
          className={styles.continueBtn}
          onClick={handleContinue}
          disabled={!canContinue || loading}
        >
          {loading
            ? "Processing..."
            : variant === "onboarding"
              ? "Continue to Payment"
              : "Continue"}
        </button>

        {error && (
          <p
            style={{
              color: "#e05252",
              fontSize: "0.85rem",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            {error}
          </p>
        )}
      </div>
      {/* Payment success modal */}
      {showSuccess && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Title */}
            <h2 className={styles.modalTitle}>Payment Successful!</h2>

            {/* Checkmark with glow */}
            <div className={styles.checkWrapper}>
              <div className={styles.checkGlow} />
              <div className={styles.checkCircle}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#6b7c78",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Units Credited
              </p>
              <p
                style={{ fontSize: "2rem", fontWeight: 800, color: "#1a7a5e" }}
              >
                {unitsCredited ?? activeKwh} kWh
              </p>
            </div>

            <hr className={styles.modalDivider} />

            {/* Order summary */}
            <div className={styles.modalSummaryRow}>
              <span>Energy Units</span>
              <span>{unitsCredited ?? activeKwh} kWh</span>
            </div>
            <div className={styles.modalSummaryRow}>
              <span>Amount Paid</span>
              <span>{formatNaira(totalAmount)}</span>
            </div>
            <div className={styles.modalSummaryRow}>
              <span>New Balance</span>
              <span style={{ color: "#1a7a5e", fontWeight: 700 }}>
                {newBalance ?? "—"} kWh
              </span>
            </div>
            <div className={styles.modalSummaryRow}>
              <span>Transaction date</span>
              <span>{formatDate()}</span>
            </div>

            <hr className={styles.modalDivider} />

            {/* Usage impact */}
            <div className={styles.usageImpact}>
              <svg
                className={styles.usageIcon}
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
                <line x1="2" y1="12" x2="4" y2="12" />
                <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
                <line x1="12" y1="22" x2="12" y2="20" />
                <line x1="19.07" y1="19.07" x2="17.66" y2="17.66" />
                <line x1="22" y1="12" x2="20" y2="12" />
                <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" />
                <path d="M12 6a6 6 0 0 1 0 12h0a6 6 0 0 1 0-12" />
                <line x1="12" y1="18" x2="12" y2="21" />
                <line x1="10" y1="21" x2="14" y2="21" />
              </svg>
              <p className={styles.usageText}>
                {unitsCredited ?? activeKwh}kWh can power your fridge for ~20
                days
              </p>
            </div>
            <button
              className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ""}`}
              onClick={handleCopyToken}
            >
              {copied ? "Copied!" : "Copy Token"}
            </button>

            {/* Done */}
            <button className={styles.doneBtn} onClick={handleDone}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyEnergyForm;

// Payment.jsx
import React, { useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

function Payment() {
  const { token } = useAuth();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      // Simulate payment (for demo)
      // In real app, integrate Razorpay/Stripe etc
      const paymentId = "PAY" + Date.now();
      await axios.post(
        `/registrations/${eventId}`,
        { paymentStatus: "completed", paymentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Payment successful, registration completed!");
      navigate("/my-events");
    } catch {
      alert("Payment failed. Please try again.");
    }
    setProcessing(false);
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <form onSubmit={handlePayment}>
        <p>Click Pay to complete registration.</p>
        <button type="submit" disabled={processing}>
          {processing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
}

export default Payment;

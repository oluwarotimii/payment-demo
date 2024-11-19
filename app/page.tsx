'use client'
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);

  // Initialize the payment
  const handlePayment = async () => {
    try {
      // POST request to the backend
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, amount: amount * 100 }), // sending the amount in kobo
      });
      const data = await res.json();
      if (data.access_code) {
        // Start the payment process with Paystack popup
        const paystack = new window.PaystackPop();
        paystack.popup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email: email,
          amount: amount * 100, // amount should be in kobo (NGN)
          currency: 'NGN',
          ref: data.access_code,
          onClose: () => {
            alert('Payment Pop-up closed');
          },
          callback: (response) => {
            alert('Payment was successful: ' + response.reference);
          },
        });
      } else {
        alert('Payment initialization failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while processing');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Paystack Payment Demo</h1>

      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg space-y-6">
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Enter Amount (NGN)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Pay
        </button>
      </div>
    </div>
  );
}

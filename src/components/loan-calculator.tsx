"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [termMonths, setTermMonths] = useState(12);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    const totalPayment = monthlyPayment * termMonths;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
    };
  };

  const loanDetails = calculateLoan();

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cream-200 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 p-6 shadow-sm backdrop-blur"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cocoa-900">
          Loan Calculator
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
          Calculate loan payments
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-semibold text-cocoa-700">
            Loan Amount
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-cocoa-700">
            Interest Rate (% per year)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            step="0.1"
            className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-cocoa-700">
            Loan Term (months)
          </label>
          <input
            type="number"
            value={termMonths}
            onChange={(e) => setTermMonths(Number(e.target.value))}
            className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-emerald-200 bg-white/90 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
              Monthly Payment
            </div>
            <div className="mt-1 text-xl font-bold text-emerald-700">
              ${loanDetails.monthlyPayment.toFixed(2)}
            </div>
          </div>
          <div className="rounded-xl border border-teal-200 bg-white/90 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
              Total Payment
            </div>
            <div className="mt-1 text-xl font-bold text-teal-700">
              ${loanDetails.totalPayment.toFixed(2)}
            </div>
          </div>
          <div className="rounded-xl border border-cyan-200 bg-white/90 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
              Total Interest
            </div>
            <div className="mt-1 text-xl font-bold text-cyan-700">
              ${loanDetails.totalInterest.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import Input from "./input";
import Button from "./button";
import {
  Loan,
  calculateMonthlyPayment,
  calculateTotalPayment,
  calculateTotalInterest,
  getLoanSummary,
} from "@/lib/loan-utils";

type LoanCalculatorProps = {
  className?: string;
  onCalculate?: (loan: Loan) => void;
};

export default function LoanCalculator({
  className,
  onCalculate,
}: LoanCalculatorProps) {
  const [principal, setPrincipal] = useState<string>("10000");
  const [interestRate, setInterestRate] = useState<string>("5");
  const [term, setTerm] = useState<string>("12");
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const handleCalculate = () => {
    const principalNum = parseFloat(principal);
    const rateNum = parseFloat(interestRate);
    const termNum = parseInt(term);

    if (isNaN(principalNum) || isNaN(rateNum) || isNaN(termNum)) {
      return;
    }

    const monthlyPayment = calculateMonthlyPayment(principalNum, rateNum, termNum);
    const totalPayment = calculateTotalPayment({
      id: "calc",
      principal: principalNum,
      interestRate: rateNum,
      term: termNum,
      frequency: "monthly",
      startDate: new Date(),
      status: "pending",
    });
    const totalInterest = calculateTotalInterest({
      id: "calc",
      principal: principalNum,
      interestRate: rateNum,
      term: termNum,
      frequency: "monthly",
      startDate: new Date(),
      status: "pending",
    });

    setResults({ monthlyPayment, totalPayment, totalInterest });

    if (onCalculate) {
      onCalculate({
        id: "calc",
        principal: principalNum,
        interestRate: rateNum,
        term: termNum,
        frequency: "monthly",
        startDate: new Date(),
        status: "pending",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl bg-white border border-cream-200 p-6", className)}
    >
      <h3 className="text-lg font-semibold text-cocoa-800 mb-4">Loan Calculator</h3>

      <div className="space-y-4 mb-4">
        <Input
          label="Principal Amount"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="10000"
        />
        <Input
          label="Annual Interest Rate (%)"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="5"
        />
        <Input
          label="Loan Term (months)"
          type="number"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="12"
        />
        <Button onClick={handleCalculate} variant="primary" fullWidth>
          Calculate
        </Button>
      </div>

      {results && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-3 pt-4 border-t border-cream-200"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <div className="text-xs text-green-700 mb-1">Monthly Payment</div>
              <div className="text-lg font-bold text-green-800">
                ${results.monthlyPayment.toFixed(2)}
              </div>
            </div>
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
              <div className="text-xs text-blue-700 mb-1">Total Payment</div>
              <div className="text-lg font-bold text-blue-800">
                ${results.totalPayment.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
            <div className="text-xs text-yellow-700 mb-1">Total Interest</div>
            <div className="text-lg font-bold text-yellow-800">
              ${results.totalInterest.toFixed(2)}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

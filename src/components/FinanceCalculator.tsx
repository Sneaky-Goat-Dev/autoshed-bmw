'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '@/utils/format';
import { calculateMonthlyPayment } from '@/utils/format';

interface FinanceCalculatorProps {
  vehiclePrice: number;
}

export default function FinanceCalculator({ vehiclePrice }: FinanceCalculatorProps) {
  const [deposit, setDeposit] = useState(vehiclePrice * 0.1);
  const [term, setTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(11.75);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const payment = calculateMonthlyPayment(vehiclePrice, interestRate, term, deposit);
    setMonthlyPayment(payment);
  }, [vehiclePrice, deposit, term, interestRate]);

  const depositPercentage = Math.round((deposit / vehiclePrice) * 100);

  return (
    <div className="bg-gray-50 p-6">
      <h3 className="text-lg font-bold uppercase tracking-wider mb-6">Finance Calculator</h3>

      {/* Deposit Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-near-black">Deposit</label>
          <span className="text-sm font-bold text-gold">
            {formatPrice(deposit)} ({depositPercentage}%)
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={vehiclePrice * 0.5}
          step={10000}
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-gold"
        />
        <div className="flex justify-between text-xs text-meta-gray mt-1">
          <span>{formatPrice(0)}</span>
          <span>{formatPrice(vehiclePrice * 0.5)}</span>
        </div>
      </div>

      {/* Term Selection */}
      <div className="mb-6">
        <label className="text-sm font-medium text-near-black mb-2 block">Term (months)</label>
        <div className="grid grid-cols-4 gap-2">
          {[24, 36, 48, 60, 72, 84].map((months) => (
            <button
              key={months}
              onClick={() => setTerm(months)}
              className={`py-2 text-sm font-bold transition-colors ${
                term === months
                  ? 'bg-gold text-dark-bg'
                  : 'bg-white border border-gray-200 text-near-black hover:border-gold'
              }`}
            >
              {months}
            </button>
          ))}
        </div>
      </div>

      {/* Interest Rate */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-near-black">Interest Rate</label>
          <span className="text-sm font-bold text-gold">{interestRate.toFixed(2)}%</span>
        </div>
        <input
          type="range"
          min={8}
          max={18}
          step={0.25}
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-gold"
        />
        <div className="flex justify-between text-xs text-meta-gray mt-1">
          <span>8%</span>
          <span>18%</span>
        </div>
      </div>

      {/* Result */}
      <div className="border-t border-gray-200 pt-6">
        <div className="text-center">
          <p className="text-sm text-meta-gray mb-1">Estimated Monthly Payment</p>
          <p className="text-3xl font-bold text-near-black">{formatPrice(monthlyPayment)}</p>
          <p className="text-xs text-meta-gray mt-2">
            *This is an estimate only. Final terms subject to credit approval.
          </p>
        </div>
      </div>

      {/* Loan Summary */}
      <div className="mt-6 p-4 bg-white border border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-meta-gray">Vehicle Price</p>
            <p className="font-bold">{formatPrice(vehiclePrice)}</p>
          </div>
          <div>
            <p className="text-meta-gray">Deposit</p>
            <p className="font-bold">{formatPrice(deposit)}</p>
          </div>
          <div>
            <p className="text-meta-gray">Loan Amount</p>
            <p className="font-bold">{formatPrice(vehiclePrice - deposit)}</p>
          </div>
          <div>
            <p className="text-meta-gray">Total Repayment</p>
            <p className="font-bold">{formatPrice(monthlyPayment * term)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

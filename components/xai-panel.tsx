'use client';

import { Brain, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { getRiskColor, type Zone } from '@/lib/zone-data';

function FactorBar({ name, weight, value, description, riskColor }: {
  name: string;
  weight: number;
  value: number;
  description: string;
  riskColor: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const contribution = (weight / 100) * value;

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/30">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 p-3 text-left"
      >
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-200">{name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">
                W:{weight}% &middot; V:{value}
              </span>
              <span className="text-xs font-bold tabular-nums" style={{ color: riskColor }}>
                {contribution.toFixed(1)}
              </span>
              <ChevronDown className={`h-3.5 w-3.5 text-slate-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <div className="h-1.5 flex-1 rounded-full bg-slate-700/50 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${value}%`, backgroundColor: riskColor }}
              />
            </div>
            <span className="text-[10px] text-slate-500 w-8 text-right tabular-nums">{value}%</span>
          </div>
        </div>
      </button>
      {expanded && (
        <div className="border-t border-slate-700/40 px-3 py-2.5">
          <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
            <span className="rounded bg-slate-700/50 px-1.5 py-0.5">Weight: {weight}%</span>
            <span className="rounded bg-slate-700/50 px-1.5 py-0.5">Raw: {value}/100</span>
            <span className="rounded px-1.5 py-0.5" style={{ backgroundColor: `${riskColor}22`, color: riskColor }}>
              Contribution: {contribution.toFixed(1)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function XaiPanel({ zone }: { zone: Zone }) {
  const riskColor = getRiskColor(zone.riskLevel);
  const totalContribution = zone.factors.reduce((sum, f) => sum + (f.weight / 100) * f.value, 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${riskColor}22` }}>
          <Brain className="h-4 w-4" style={{ color: riskColor }} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Explainable AI Breakdown</h3>
          <p className="text-[11px] text-slate-500">Model SHAP-style factor attribution</p>
        </div>
      </div>

      {/* Model prediction summary */}
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Model Output</span>
          <span className="font-bold tabular-nums" style={{ color: riskColor }}>
            Predicted: {zone.riskScore.toFixed(1)} / 100
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
          <span className="rounded bg-slate-700/40 px-1.5 py-0.5">Gradient Boosted Trees</span>
          <span className="rounded bg-slate-700/40 px-1.5 py-0.5">5 features</span>
          <span className="rounded bg-slate-700/40 px-1.5 py-0.5">Confidence: 92%</span>
        </div>
      </div>

      {/* Factor breakdown */}
      <div className="space-y-2">
        {zone.factors.map((factor) => (
          <FactorBar
            key={factor.name}
            name={factor.name}
            weight={factor.weight}
            value={factor.value}
            description={factor.description}
            riskColor={riskColor}
          />
        ))}
      </div>

      {/* Sum check */}
      <div className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2 text-xs">
        <span className="text-slate-400">Sum of contributions</span>
        <span className="font-bold tabular-nums text-slate-200">{totalContribution.toFixed(1)}</span>
      </div>
    </div>
  );
}

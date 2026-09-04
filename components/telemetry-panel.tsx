'use client';

import { CloudRain, Mountain, Droplets, Users, AlertTriangle, Clock, MapPin, Radio } from 'lucide-react';
import { getRiskColor, getRiskLabel, type Zone, type UserRole } from '@/lib/zone-data';
import { cn } from '@/lib/utils';

function TelemetryCard({
  icon: Icon,
  label,
  value,
  unit,
  accent,
  barPercent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit: string;
  accent: string;
  barPercent?: number;
}) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
        <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white tabular-nums">{value}</span>
        <span className="text-sm text-slate-400">{unit}</span>
      </div>
      {barPercent !== undefined && (
        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-700/50">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(barPercent, 100)}%`, backgroundColor: accent }}
          />
        </div>
      )}
    </div>
  );
}

export default function TelemetryPanel({
  zone,
  role,
}: {
  zone: Zone;
  role: UserRole;
}) {
  const riskColor = getRiskColor(zone.riskLevel);
  const riskLabel = getRiskLabel(zone.riskLevel);

  return (
    <div className="flex flex-col gap-4">
      {/* Zone header */}
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <MapPin className="h-3 w-3" />
              {zone.district}, {zone.state}
            </div>
            <h3 className="mt-1 text-lg font-bold text-white leading-tight">{zone.name}</h3>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
            style={{ backgroundColor: `${riskColor}22`, color: riskColor, border: `1px solid ${riskColor}55` }}
          >
            <AlertTriangle className="h-3 w-3" />
            {riskLabel}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {zone.lastUpdated}
          </span>
          <span className="flex items-center gap-1">
            <Radio className="h-3 w-3 text-emerald-400" />
            Live telemetry
          </span>
        </div>
      </div>

      {/* Risk score gauge */}
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-slate-400">
          <span>Composite Risk Score</span>
          <span className="tabular-nums" style={{ color: riskColor }}>{zone.riskScore}/100</span>
        </div>
        <div className="mt-2 h-2.5 w-full rounded-full bg-slate-700/50 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${zone.riskScore}%`, backgroundColor: riskColor }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-500">
          <span>Low (0)</span>
          <span>Moderate (30)</span>
          <span>High (60)</span>
          <span>Severe (80+)</span>
        </div>
      </div>

      {/* Telemetry cards */}
      <div className="grid grid-cols-2 gap-3">
        <TelemetryCard
          icon={CloudRain}
          label="Rainfall (24h)"
          value={zone.rainfall24h}
          unit="mm"
          accent="#38bdf8"
          barPercent={(zone.rainfall24h / 200) * 100}
        />
        <TelemetryCard
          icon={Droplets}
          label="Soil Moisture"
          value={zone.soilMoisture}
          unit="%"
          accent="#34d399"
          barPercent={zone.soilMoisture}
        />
        <TelemetryCard
          icon={Mountain}
          label="Slope Angle"
          value={zone.slope}
          unit="°"
          accent="#fb923c"
          barPercent={(zone.slope / 45) * 100}
        />
        <TelemetryCard
          icon={Users}
          label="Population Exposed"
          value={zone.populationExposed.toLocaleString('en-IN')}
          unit=""
          accent="#f472b6"
          barPercent={Math.min((zone.populationExposed / 70000) * 100, 100)}
        />
      </div>

      {/* Advisory */}
      <div
        className={cn(
          'rounded-xl border p-4',
          zone.riskLevel === 'red' && 'border-red-500/40 bg-red-950/30',
          zone.riskLevel === 'orange' && 'border-orange-500/40 bg-orange-950/20',
          zone.riskLevel === 'yellow' && 'border-yellow-500/40 bg-yellow-950/20',
          zone.riskLevel === 'green' && 'border-green-500/40 bg-green-950/20',
        )}
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
          style={{ color: riskColor }}
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          {role === 'citizen' ? 'Public Advisory' : 'District Action Advisory'}
        </div>
        <p className="mt-2 text-sm text-slate-200 leading-relaxed">{zone.advisory}</p>
        {role === 'official' && (
          <div className="mt-3 space-y-1 border-t border-slate-700/50 pt-3 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Estimated affected households</span>
              <span className="tabular-nums text-slate-200">{Math.round(zone.populationExposed / 4.2).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Nearest shelter capacity</span>
              <span className="tabular-nums text-slate-200">{Math.round(zone.populationExposed * 0.15).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Recommended NDRF deployment</span>
              <span className="tabular-nums text-slate-200">{zone.riskScore > 80 ? '2 teams' : zone.riskScore > 60 ? '1 team' : 'Standby'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

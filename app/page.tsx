'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import TelemetryPanel from '@/components/telemetry-panel';
import XaiPanel from '@/components/xai-panel';
import { zones, getRiskColor, getRiskLabel, type Zone, type UserRole } from '@/lib/zone-data';
import { Shield, Activity, Users, AlertTriangle, Mountain, Radio, X, Brain, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const RiskMap = dynamic(() => import('@/components/risk-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-sky-500" />
        <span className="text-xs text-slate-500">Loading map...</span>
      </div>
    </div>
  ),
});

export default function Home() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [role, setRole] = useState<UserRole>('citizen');
  const [sidebarTab, setSidebarTab] = useState<'telemetry' | 'xai'>('telemetry');

  const stats = {
    total: zones.length,
    red: zones.filter(z => z.riskLevel === 'red').length,
    orange: zones.filter(z => z.riskLevel === 'orange').length,
    yellow: zones.filter(z => z.riskLevel === 'yellow').length,
    green: zones.filter(z => z.riskLevel === 'green').length,
    totalPop: zones.reduce((sum, z) => sum + z.populationExposed, 0),
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950 text-white">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500">
            <Mountain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">LandSafe NER</h1>
            <p className="text-[11px] text-slate-500 leading-tight">AI Landslide Early-Warning System &middot; North Eastern Region, India</p>
          </div>
        </div>

        {/* Risk legend */}
        <div className="hidden items-center gap-3 lg:flex">
          {(['green', 'yellow', 'orange', 'red'] as const).map(level => (
            <div key={level} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: getRiskColor(level) }} />
              <span className="text-xs text-slate-400">{getRiskLabel(level)}</span>
            </div>
          ))}
        </div>

        {/* Role switcher */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-slate-700 bg-slate-800/50 p-0.5">
            <button
              onClick={() => setRole('citizen')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                role === 'citizen' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
              )}
            >
              <Users className="h-3.5 w-3.5" />
              Citizen
            </button>
            <button
              onClick={() => setRole('official')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                role === 'official' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'
              )}
            >
              <Shield className="h-3.5 w-3.5" />
              District Official
            </button>
          </div>
        </div>
      </header>

      {/* Status bar */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Radio className="h-3 w-3 animate-pulse" />
            Live
          </span>
          <span className="text-slate-500">Monitoring {stats.total} zones across 7 NE states</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-slate-400">{stats.red} Severe</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            <span className="text-slate-400">{stats.orange} High</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            <span className="text-slate-400">{stats.yellow} Moderate</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-slate-400">{stats.green} Low</span>
          </span>
          <span className="border-l border-slate-700 pl-4 text-slate-400">
            Pop. exposed: <span className="font-bold text-white tabular-nums">{stats.totalPop.toLocaleString('en-IN')}</span>
          </span>
        </div>
      </div>

      {/* Split screen: map + sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map */}
        <div className="relative flex-1">
          <RiskMap
            selectedZoneId={selectedZone?.id ?? null}
            onSelectZone={(zone) => {
              setSelectedZone(zone);
              setSidebarTab('telemetry');
            }}
            onBackgroundClick={() => setSelectedZone(null)}
          />
          {/* Overlay hint when nothing selected */}
          {!selectedZone && (
            <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs text-slate-400 backdrop-blur-sm">
              Click any zone to view real-time telemetry and AI risk breakdown
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex w-[420px] shrink-0 flex-col border-l border-slate-800 bg-slate-900/60">
          {selectedZone ? (
            <>
              {/* Sidebar tabs */}
              <div className="flex items-center justify-between border-b border-slate-800 px-4 pt-3">
                <div className="flex gap-1">
                  <button
                    onClick={() => setSidebarTab('telemetry')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-t-lg px-4 py-2.5 text-xs font-medium transition-colors',
                      sidebarTab === 'telemetry'
                        ? 'border-b-2 border-sky-500 text-white'
                        : 'text-slate-500 hover:text-slate-300'
                    )}
                  >
                    <Activity className="h-3.5 w-3.5" />
                    Telemetry
                  </button>
                  <button
                    onClick={() => setSidebarTab('xai')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-t-lg px-4 py-2.5 text-xs font-medium transition-colors',
                      sidebarTab === 'xai'
                        ? 'border-b-2 border-emerald-500 text-white'
                        : 'text-slate-500 hover:text-slate-300'
                    )}
                  >
                    <Brain className="h-3.5 w-3.5" />
                    Explainable AI
                  </button>
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Sidebar content */}
              <div className="flex-1 overflow-y-auto p-4">
                {sidebarTab === 'telemetry' ? (
                  <TelemetryPanel zone={selectedZone} role={role} />
                ) : (
                  <XaiPanel zone={selectedZone} />
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/60">
                <Layers className="h-8 w-8 text-slate-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-300">No Zone Selected</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Click a color-coded polygon on the map to view real-time sensor telemetry, population exposure data, and the explainable AI risk breakdown for that zone.
                </p>
              </div>
              <div className="mt-2 w-full space-y-1.5">
                {zones.slice(0, 5).map(z => (
                  <button
                    key={z.id}
                    onClick={() => { setSelectedZone(z); setSidebarTab('telemetry'); }}
                    className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 px-3 py-2 text-left transition-colors hover:bg-slate-800/60"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-200">{z.name}</div>
                      <div className="text-[10px] text-slate-500">{z.district}, {z.state}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold tabular-nums" style={{ color: getRiskColor(z.riskLevel) }}>{z.riskScore}</span>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: getRiskColor(z.riskLevel) }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

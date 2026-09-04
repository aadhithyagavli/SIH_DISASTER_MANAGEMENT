'use client';

import { MapContainer, TileLayer, Polygon, Tooltip as LeafletTooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { zones, getRiskColor, getRiskLabel, type Zone } from '@/lib/zone-data';

const riskFillOpacity: Record<string, number> = {
  green: 0.25,
  yellow: 0.30,
  orange: 0.35,
  red: 0.40,
};

function MapClickHandler({ onBackgroundClick }: { onBackgroundClick: () => void }) {
  const map = useMap();
  useEffect(() => {
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (e.originalEvent.target === e.originalEvent.currentTarget || (e.originalEvent.target as HTMLElement).classList?.contains('leaflet-container')) {
        onBackgroundClick();
      }
    });
  }, [map, onBackgroundClick]);
  return null;
}

export default function RiskMap({
  selectedZoneId,
  onSelectZone,
  onBackgroundClick,
}: {
  selectedZoneId: string | null;
  onSelectZone: (zone: Zone) => void;
  onBackgroundClick: () => void;
}) {
  return (
    <MapContainer
      center={[25.5, 93.0]}
      zoom={7}
      scrollWheelZoom
      className="h-full w-full"
      style={{ background: '#1a2a3a' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; CARTO'
      />
      <MapClickHandler onBackgroundClick={onBackgroundClick} />
      {zones.map((zone) => {
        const isSelected = zone.id === selectedZoneId;
        const color = getRiskColor(zone.riskLevel);
        return (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              color: isSelected ? '#ffffff' : color,
              weight: isSelected ? 3 : 1.5,
              fillColor: color,
              fillOpacity: isSelected ? riskFillOpacity[zone.riskLevel] + 0.15 : riskFillOpacity[zone.riskLevel],
              dashArray: isSelected ? undefined : '4 2',
            }}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.stopPropagation();
                onSelectZone(zone);
              },
            }}
          >
            <LeafletTooltip sticky>
              <div className="text-xs">
                <div className="font-bold">{zone.name}</div>
                <div>{zone.district}, {zone.state}</div>
                <div style={{ color }}>{getRiskLabel(zone.riskLevel)} — Score: {zone.riskScore}</div>
              </div>
            </LeafletTooltip>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}

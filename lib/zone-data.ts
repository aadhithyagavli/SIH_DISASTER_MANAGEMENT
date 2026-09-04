export type RiskLevel = 'green' | 'yellow' | 'orange' | 'red';

export type UserRole = 'citizen' | 'official';

export interface RiskFactor {
  name: string;
  weight: number; // 0-100
  value: number; // 0-100
  description: string;
}

export interface Zone {
  id: string;
  name: string;
  district: string;
  state: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0-100
  populationExposed: number;
  rainfall24h: number; // mm
  soilMoisture: number; // %
  slope: number; // degrees
  coordinates: [number, number][]; // polygon ring
  center: [number, number];
  factors: RiskFactor[];
  advisory: string;
  lastUpdated: string;
}

const riskColors: Record<RiskLevel, string> = {
  green: '#22c55e',
  yellow: '#eab308',
  orange: '#f97316',
  red: '#ef4444',
};

const riskLabels: Record<RiskLevel, string> = {
  green: 'Low Risk',
  yellow: 'Moderate Risk',
  orange: 'High Risk',
  red: 'Severe Risk',
};

export function getRiskColor(level: RiskLevel): string {
  return riskColors[level];
}

export function getRiskLabel(level: RiskLevel): string {
  return riskLabels[level];
}

export const zones: Zone[] = [
  {
    id: 'zone-itanagar-01',
    name: 'Itanagar Capital Zone',
    district: 'Papum Pare',
    state: 'Arunachal Pradesh',
    riskLevel: 'red',
    riskScore: 88,
    populationExposed: 64200,
    rainfall24h: 142,
    soilMoisture: 91,
    slope: 38,
    coordinates: [
      [27.08, 93.55], [27.12, 93.62], [27.10, 93.70], [27.04, 93.68], [27.01, 93.60],
    ],
    center: [27.06, 93.62],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 92, description: '142mm in 24h exceeds 95th percentile threshold' },
      { name: 'Soil Saturation', weight: 25, value: 91, description: 'Soil moisture at 91% capacity, near full saturation' },
      { name: 'Slope Angle', weight: 20, value: 78, description: '38° slope exceeds critical instability threshold of 30°' },
      { name: 'Lithology', weight: 10, value: 85, description: 'Phyllite and schist — highly weathered, low shear strength' },
      { name: 'Land Use', weight: 10, value: 82, description: 'Heavy deforestation and road-cutting destabilized slope toe' },
    ],
    advisory: 'Evacuate immediately to designated shelters. Avoid all hill roads. Landslide imminent within 6-12 hours.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-itanagar-02',
    name: 'Doimukh River Basin',
    district: 'Papum Pare',
    state: 'Arunachal Pradesh',
    riskLevel: 'orange',
    riskScore: 72,
    populationExposed: 21800,
    rainfall24h: 98,
    soilMoisture: 78,
    slope: 28,
    coordinates: [
      [27.14, 93.72], [27.18, 93.80], [27.16, 93.88], [27.10, 93.86], [27.12, 93.78],
    ],
    center: [27.15, 93.80],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 75, description: '98mm in 24h, approaching warning threshold' },
      { name: 'Soil Saturation', weight: 25, value: 78, description: 'Soil moisture elevated but below critical' },
      { name: 'Slope Angle', weight: 20, value: 55, description: '28° slope — moderate risk zone' },
      { name: 'Lithology', weight: 10, value: 68, description: 'Sandstone with moderate weathering' },
      { name: 'Land Use', weight: 10, value: 72, description: 'Moderate jhum cultivation on upper slopes' },
    ],
    advisory: 'Stay alert. Avoid riverbanks and steep slopes. Prepare for possible evacuation if rainfall continues.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-shillong-01',
    name: 'Shillong Ridge Sector',
    district: 'East Khasi Hills',
    state: 'Meghalaya',
    riskLevel: 'orange',
    riskScore: 68,
    populationExposed: 38500,
    rainfall24h: 85,
    soilMoisture: 72,
    slope: 32,
    coordinates: [
      [25.54, 91.86], [25.60, 91.92], [25.58, 92.00], [25.50, 91.98], [25.48, 91.90],
    ],
    center: [25.56, 91.92],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 68, description: '85mm in 24h, sustained monsoon rainfall' },
      { name: 'Soil Saturation', weight: 25, value: 72, description: '72% moisture, rising trend over 72 hours' },
      { name: 'Slope Angle', weight: 20, value: 65, description: '32° slope in plateau escarpment zone' },
      { name: 'Lithology', weight: 10, value: 60, description: 'Granite bedrock with residual soil cover' },
      { name: 'Land Use', weight: 10, value: 70, description: 'Urban expansion on ridge edges increasing runoff' },
    ],
    advisory: 'Monitor updates closely. Restrict travel on hill roads during heavy rain. Report any cracks to authorities.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-shillong-02',
    name: 'Cherrapunji Valley',
    district: 'East Khasi Hills',
    state: 'Meghalaya',
    riskLevel: 'red',
    riskScore: 91,
    populationExposed: 12300,
    rainfall24h: 186,
    soilMoisture: 95,
    slope: 42,
    coordinates: [
      [25.18, 91.62], [25.24, 91.70], [25.22, 91.78], [25.16, 91.76], [25.14, 91.68],
    ],
    center: [25.20, 91.70],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 96, description: '186mm in 24h — extreme rainfall event' },
      { name: 'Soil Saturation', weight: 25, value: 95, description: 'Soil fully saturated, pore pressure critically high' },
      { name: 'Slope Angle', weight: 20, value: 88, description: '42° slope — well beyond critical threshold' },
      { name: 'Lithology', weight: 10, value: 80, description: 'Limestone with karst cavities, high collapse risk' },
      { name: 'Land Use', weight: 10, value: 90, description: 'Bare rock surfaces, minimal vegetation anchoring' },
    ],
    advisory: 'EVACUATE NOW. Move to Cherrapunji Higher Secondary School shelter. Do not remain in valley-floor dwellings.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-guwahati-01',
    name: 'Guwahati Hills North',
    district: 'Kamrup Metro',
    state: 'Assam',
    riskLevel: 'yellow',
    riskScore: 45,
    populationExposed: 15200,
    rainfall24h: 52,
    soilMoisture: 58,
    slope: 18,
    coordinates: [
      [26.16, 91.68], [26.22, 91.74], [26.20, 91.82], [26.14, 91.80], [26.12, 91.72],
    ],
    center: [26.18, 91.74],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 42, description: '52mm in 24h — within normal monsoon range' },
      { name: 'Soil Saturation', weight: 25, value: 48, description: '58% moisture, stable levels' },
      { name: 'Slope Angle', weight: 20, value: 35, description: '18° slope — gentle, low failure probability' },
      { name: 'Lithology', weight: 10, value: 45, description: 'Alluvium and compacted sediment, moderate stability' },
      { name: 'Land Use', weight: 10, value: 50, description: 'Stabilized urban terrain with retaining structures' },
    ],
    advisory: 'No immediate action needed. Stay informed during monsoon season. Check updates if rainfall intensifies.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-guwahati-02',
    name: 'Dispur Belt',
    district: 'Kamrup Metro',
    state: 'Assam',
    riskLevel: 'green',
    riskScore: 22,
    populationExposed: 8400,
    rainfall24h: 28,
    soilMoisture: 41,
    slope: 12,
    coordinates: [
      [26.10, 91.74], [26.14, 91.80], [26.12, 91.86], [26.08, 91.84], [26.06, 91.78],
    ],
    center: [26.11, 91.80],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 20, description: '28mm in 24h — light rainfall' },
      { name: 'Soil Saturation', weight: 25, value: 30, description: '41% moisture, well-drained conditions' },
      { name: 'Slope Angle', weight: 20, value: 22, description: '12° slope — very gentle terrain' },
      { name: 'Lithology', weight: 10, value: 25, description: 'Stable metamorphic basement rock' },
      { name: 'Land Use', weight: 10, value: 18, description: 'Well-managed urban infrastructure with drainage' },
    ],
    advisory: 'Conditions are safe. No landslide risk anticipated in the next 48 hours.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-aizawl-01',
    name: 'Aizawl Ridge Central',
    district: 'Aizawl',
    state: 'Mizoram',
    riskLevel: 'red',
    riskScore: 84,
    populationExposed: 47800,
    rainfall24h: 118,
    soilMoisture: 88,
    slope: 40,
    coordinates: [
      [23.70, 92.68], [23.76, 92.76], [23.74, 92.84], [23.68, 92.82], [23.66, 92.74],
    ],
    center: [23.72, 92.76],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 85, description: '118mm in 24h, sustained heavy downpour' },
      { name: 'Soil Saturation', weight: 25, value: 88, description: '88% saturation, slope seepage observed' },
      { name: 'Slope Angle', weight: 20, value: 82, description: '40° slope — steep ridge terrain, high failure risk' },
      { name: 'Lithology', weight: 10, value: 78, description: 'Shale and sandstone alternation, prone to sliding' },
      { name: 'Land Use', weight: 10, value: 85, description: 'Dense settlement on steep slopes, minimal setback' },
    ],
    advisory: 'High landslide risk. Evacuate vulnerable structures on ridge edges. Move to Aizawl Civil Secretariat shelter.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-aizawl-02',
    name: 'Aizawl South Valley',
    district: 'Aizawl',
    state: 'Mizoram',
    riskLevel: 'yellow',
    riskScore: 48,
    populationExposed: 18600,
    rainfall24h: 62,
    soilMoisture: 64,
    slope: 22,
    coordinates: [
      [23.64, 92.72], [23.70, 92.78], [23.68, 92.86], [23.62, 92.84], [23.60, 92.76],
    ],
    center: [23.66, 92.78],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 48, description: '62mm in 24h — moderate monsoon rainfall' },
      { name: 'Soil Saturation', weight: 25, value: 52, description: '64% moisture, manageable levels' },
      { name: 'Slope Angle', weight: 20, value: 42, description: '22° slope — moderate gradient' },
      { name: 'Lithology', weight: 10, value: 45, description: 'Sandstone dominant, moderately stable' },
      { name: 'Land Use', weight: 10, value: 55, description: 'Some terraced cultivation reducing runoff velocity' },
    ],
    advisory: 'Maintain awareness. Secure loose objects on slopes. Check drainage channels around your property.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-imphal-01',
    name: 'Imphal Valley East',
    district: 'Imphal East',
    state: 'Manipur',
    riskLevel: 'green',
    riskScore: 28,
    populationExposed: 11200,
    rainfall24h: 34,
    soilMoisture: 45,
    slope: 14,
    coordinates: [
      [24.78, 93.92], [24.84, 93.98], [24.82, 94.06], [24.76, 94.04], [24.74, 93.96],
    ],
    center: [24.80, 93.98],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 25, description: '34mm in 24h — light to moderate rainfall' },
      { name: 'Soil Saturation', weight: 25, value: 32, description: '45% moisture, well-drained valley floor' },
      { name: 'Slope Angle', weight: 20, value: 28, description: '14° slope — flat valley terrain' },
      { name: 'Lithology', weight: 10, value: 30, description: 'Alluvial deposits, structurally stable' },
      { name: 'Land Use', weight: 10, value: 22, description: 'Paddy fields with good water management' },
    ],
    advisory: 'Safe conditions. No landslide risk expected. Continue normal activities.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-imphal-02',
    name: 'Senapati Hills',
    district: 'Senapati',
    state: 'Manipur',
    riskLevel: 'orange',
    riskScore: 66,
    populationExposed: 27400,
    rainfall24h: 92,
    soilMoisture: 76,
    slope: 30,
    coordinates: [
      [25.20, 94.00], [25.26, 94.08], [25.24, 94.16], [25.18, 94.14], [25.16, 94.06],
    ],
    center: [25.22, 94.08],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 72, description: '92mm in 24h, persistent rainfall' },
      { name: 'Soil Saturation', weight: 25, value: 76, description: '76% moisture, approaching warning level' },
      { name: 'Slope Angle', weight: 20, value: 60, description: '30° slope at critical threshold' },
      { name: 'Lithology', weight: 10, value: 62, description: 'Shale interbedded with sandstone' },
      { name: 'Land Use', weight: 10, value: 65, description: 'Jhum fallows reducing root cohesion' },
    ],
    advisory: 'Caution advised. Avoid overnight stays in slope-side houses. Monitor IMD rainfall warnings.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-kohima-01',
    name: 'Kohima Ridge Zone',
    district: 'Kohima',
    state: 'Nagaland',
    riskLevel: 'orange',
    riskScore: 70,
    populationExposed: 31200,
    rainfall24h: 88,
    soilMoisture: 80,
    slope: 34,
    coordinates: [
      [25.64, 94.04], [25.70, 94.12], [25.68, 94.20], [25.62, 94.18], [25.60, 94.10],
    ],
    center: [25.66, 94.12],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 70, description: '88mm in 24h, consistent heavy rain' },
      { name: 'Soil Saturation', weight: 25, value: 80, description: '80% saturation, seepage on road cuts' },
      { name: 'Slope Angle', weight: 20, value: 68, description: '34° slope — steep, densely settled ridge' },
      { name: 'Lithology', weight: 10, value: 65, description: 'Dissected sandstone, blocky failure potential' },
      { name: 'Land Use', weight: 10, value: 72, description: 'Urban density on ridge with cut-slope modifications' },
    ],
    advisory: 'Prepare for evacuation. Identify safe routes away from ridge. Follow Kohima District Disaster Authority updates.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-kohima-02',
    name: 'Dimapur Foothills',
    district: 'Dimapur',
    state: 'Nagaland',
    riskLevel: 'green',
    riskScore: 32,
    populationExposed: 9800,
    rainfall24h: 40,
    soilMoisture: 50,
    slope: 16,
    coordinates: [
      [25.86, 93.72], [25.92, 93.78], [25.90, 93.86], [25.84, 93.84], [25.82, 93.76],
    ],
    center: [25.88, 93.78],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 30, description: '40mm in 24h — moderate rainfall' },
      { name: 'Soil Saturation', weight: 25, value: 38, description: '50% moisture, stable foothill conditions' },
      { name: 'Slope Angle', weight: 20, value: 30, description: '16° slope — gentle foothill terrain' },
      { name: 'Lithology', weight: 10, value: 35, description: 'Consolidated alluvial fan deposits' },
      { name: 'Land Use', weight: 10, value: 28, description: 'Agricultural land with stable terracing' },
    ],
    advisory: 'Low risk. Normal activity is safe. Stay updated on weather forecasts.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-agartala-01',
    name: 'Agartala Urban Sector',
    district: 'West Tripura',
    state: 'Tripura',
    riskLevel: 'yellow',
    riskScore: 42,
    populationExposed: 13800,
    rainfall24h: 48,
    soilMoisture: 56,
    slope: 15,
    coordinates: [
      [23.80, 91.24], [23.86, 91.30], [23.84, 91.38], [23.78, 91.36], [23.76, 91.28],
    ],
    center: [23.82, 91.30],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 38, description: '48mm in 24h — moderate monsoon rain' },
      { name: 'Soil Saturation', weight: 25, value: 44, description: '56% moisture, within safe range' },
      { name: 'Slope Angle', weight: 20, value: 30, description: '15° slope — relatively flat urban terrain' },
      { name: 'Lithology', weight: 10, value: 42, description: 'Sandy clay with moderate cohesion' },
      { name: 'Land Use', weight: 10, value: 48, description: 'Urban development with drainage infrastructure' },
    ],
    advisory: 'No immediate risk. Keep drainage clear. Monitor weather updates during monsoon.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-agartala-02',
    name: 'Jampui Hill Range',
    district: 'North Tripura',
    state: 'Tripura',
    riskLevel: 'yellow',
    riskScore: 52,
    populationExposed: 7600,
    rainfall24h: 68,
    soilMoisture: 68,
    slope: 26,
    coordinates: [
      [24.10, 92.20], [24.16, 92.28], [24.14, 92.36], [24.08, 92.34], [24.06, 92.26],
    ],
    center: [24.12, 92.28],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 55, description: '68mm in 24h — moderate to heavy rainfall' },
      { name: 'Soil Saturation', weight: 25, value: 58, description: '68% moisture, slightly elevated' },
      { name: 'Slope Angle', weight: 20, value: 50, description: '26° slope — moderate hill terrain' },
      { name: 'Lithology', weight: 10, value: 48, description: 'Sandstone and shale, moderate weathering' },
      { name: 'Land Use', weight: 10, value: 52, description: 'Orange plantations providing some slope stability' },
    ],
    advisory: 'Stay cautious on hill routes. Avoid areas with visible erosion. Monitor local advisories.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-gangtok-01',
    name: 'Gangtok Urban Ridge',
    district: 'Gangtok',
    state: 'Sikkim',
    riskLevel: 'red',
    riskScore: 86,
    populationExposed: 39600,
    rainfall24h: 132,
    soilMoisture: 89,
    slope: 36,
    coordinates: [
      [27.30, 88.56], [27.36, 88.62], [27.34, 88.70], [27.28, 88.68], [27.26, 88.60],
    ],
    center: [27.32, 88.62],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 88, description: '132mm in 24h — extreme monsoon event' },
      { name: 'Soil Saturation', weight: 25, value: 89, description: '89% saturation, critical pore water pressure' },
      { name: 'Slope Angle', weight: 20, value: 75, description: '36° slope — steep Himalayan terrain' },
      { name: 'Lithology', weight: 10, value: 82, description: 'Gneiss with deep weathering profile' },
      { name: 'Land Use', weight: 10, value: 80, description: 'Road widening and construction destabilizing slopes' },
    ],
    advisory: 'Evacuate slope-side homes immediately. Move to Gangtok Town Hall shelter. Avoid NH-10 corridor.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
  {
    id: 'zone-gangtok-02',
    name: 'Rangpo River Valley',
    district: 'East Sikkim',
    state: 'Sikkim',
    riskLevel: 'orange',
    riskScore: 64,
    populationExposed: 14200,
    rainfall24h: 78,
    soilMoisture: 70,
    slope: 24,
    coordinates: [
      [27.20, 88.50], [27.26, 88.56], [27.24, 88.64], [27.18, 88.62], [27.16, 88.54],
    ],
    center: [27.22, 88.56],
    factors: [
      { name: 'Rainfall Intensity', weight: 35, value: 62, description: '78mm in 24h — heavy sustained rainfall' },
      { name: 'Soil Saturation', weight: 25, value: 65, description: '70% moisture, rising trend' },
      { name: 'Slope Angle', weight: 20, value: 48, description: '24° slope — moderate valley terrain' },
      { name: 'Lithology', weight: 10, value: 58, description: 'River deposits over bedrock, moderate stability' },
      { name: 'Land Use', weight: 10, value: 62, description: 'Highway corridor with cut-slope instability' },
    ],
    advisory: 'Stay alert. Avoid river crossings. Prepare for potential road closures on NH-10.',
    lastUpdated: '2026-09-04 08:30 IST',
  },
];

export const neIndiaCenter: [number, number] = [25.5, 93.0];

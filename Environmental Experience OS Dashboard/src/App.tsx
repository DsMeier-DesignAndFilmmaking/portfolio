import { useState, useEffect, useRef } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line,
} from 'recharts'

// ─── Types ────────────────────────────────────────────────────────────────────
type Section = 'overview' | 'resource' | 'experience' | 'stewardship' | 'operations'
type TwinMode = 'experience' | 'infrastructure'
type ServiceLayer = 'guest' | 'staff' | 'infrastructure'
type WatchLevel = 'watch' | 'monitor' | 'stable' | 'target'
type Timeframe = '24hr' | 'seasonal'

interface MetricDetail {
  title: string
  value: string
  unit?: string
  target: string
  state: string
  why: string
  dependencies: string[]
}

// ─── Color System ─────────────────────────────────────────────────────────────
const C = {
  basalt: '#1C1916',
  basaltMid: '#2A2520',
  basaltLight: '#3A342E',
  stone: '#4A4440',
  iron: '#6B5F58',
  earth: '#8C7B6E',
  mist: '#B0A498',
  linen: '#D4CFC5',
  parchment: '#EDE9E2',
  mineral: '#F2EFE9',
  sage: '#4A7A58',
  sageMid: '#3D6649',
  sageLight: '#6E9C7C',
  sagePale: '#C8DDD0',
  amber: '#8B6914',
  amberMid: '#A67C20',
  amberLight: '#C4A450',
  amberPale: '#E8D9A8',
  sienna: '#7A4030',
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const energyData24hr = [
  { t: '00', gen: 0, use: 12, store: 78 },
  { t: '03', gen: 0, use: 10, store: 75 },
  { t: '06', gen: 14, use: 11, store: 72 },
  { t: '09', gen: 62, use: 22, store: 86 },
  { t: '12', gen: 88, use: 26, store: 96 },
  { t: '15', gen: 74, use: 30, store: 92 },
  { t: '18', gen: 30, use: 36, store: 78 },
  { t: '21', gen: 6, use: 26, store: 64 },
  { t: '24', gen: 0, use: 16, store: 58 },
]

const energyDataSeasonal = [
  { t: 'Jan', gen: 22, use: 44, store: 62 },
  { t: 'Feb', gen: 28, use: 40, store: 66 },
  { t: 'Mar', gen: 38, use: 36, store: 72 },
  { t: 'Apr', gen: 52, use: 30, store: 80 },
  { t: 'May', gen: 68, use: 26, store: 88 },
  { t: 'Jun', gen: 82, use: 24, store: 96 },
  { t: 'Jul', gen: 88, use: 22, store: 98 },
  { t: 'Aug', gen: 84, use: 24, store: 96 },
  { t: 'Sep', gen: 66, use: 28, store: 88 },
  { t: 'Oct', gen: 46, use: 34, store: 78 },
  { t: 'Nov', gen: 28, use: 40, store: 68 },
  { t: 'Dec', gen: 18, use: 46, store: 58 },
]

const recoveryData = [
  { day: 'M', recovery: 68, hrv: 42 },
  { day: 'T', recovery: 72, hrv: 45 },
  { day: 'W', recovery: 76, hrv: 49 },
  { day: 'Th', recovery: 80, hrv: 52 },
  { day: 'F', recovery: 85, hrv: 56 },
  { day: 'Sa', recovery: 88, hrv: 59 },
  { day: 'Su', recovery: 91, hrv: 63 },
]

// ─── Metric Detail Library ────────────────────────────────────────────────────
const METRICS: Record<string, MetricDetail> = {
  energy: {
    title: 'Energy Autonomy',
    value: '78',
    unit: '% modeled',
    target: '80% target — high resilience threshold',
    state: 'Solar generation covering 78% of daily load on modeled peak summer day. Battery reserve holds 96% at noon peak.',
    why: 'Remote property resilience depends on energy independence. Grid failure or supply disruption should not affect the guest experience.',
    dependencies: ['Solar Array Output', 'Battery Storage System', 'Load Demand Profile', 'Reserve Horizon'],
  },
  water: {
    title: 'Water Storage',
    value: '94',
    unit: '% capacity',
    target: '85% minimum — seasonal resilience target',
    state: 'Above target. Current daily demand at 4.2k gal. Watershed recovery condition: active. Seasonal threshold monitoring active.',
    why: 'Water autonomy defines true remote resilience. A ranch operating above minimum storage has capacity to absorb demand spikes and drought conditions.',
    dependencies: ['Watershed Catchment', 'Storage Capacity', 'Daily Demand', 'Greywater Recovery Rate'],
  },
  connectivity: {
    title: 'Dual-Path Connectivity',
    value: '91',
    unit: '% modeled uptime',
    target: '99.9% combined-path availability target',
    state: 'Primary satellite link active at 85% capacity. Microwave relay backup online. Failover latency: &lt;2s.',
    why: 'In a remote environment, connectivity is infrastructure. A single-path system is a single point of failure for operations, safety, and guest experience.',
    dependencies: ['Satellite Link', 'Microwave Relay', 'Failover System', 'Operations Bandwidth'],
  },
  ecology: {
    title: 'Ecological Health Index',
    value: '68',
    unit: '/ 100 modeled',
    target: '75 — regeneration milestone target',
    state: 'Soil organic matter trending positive. Riparian corridor stable. Grazing rotation active. Bull Trout habitat index improving.',
    why: 'Ecological health is not separate from the guest experience — it is the experience. Landscape integrity defines authenticity.',
    dependencies: ['Soil Organic Matter', 'Riparian Corridor', 'Wildlife Corridor', 'Watershed Health'],
  },
  recovery: {
    title: 'Guest Recovery Index',
    value: '91',
    unit: '/ 100 conceptual',
    target: 'No fixed target — trend matters more than score',
    state: 'Recovery index trending strongly positive over 7-day stay. Environmental context: low noise, natural light, 19°C, 6.2h outdoors daily.',
    why: 'A proposed framework, not medical measurement. The hypothesis: environmental conditions correlate with guest recovery. The design question: can a property be designed to support this?',
    dependencies: ['Acoustic Environment', 'Thermal Comfort', 'Circadian Light', 'Outdoor Time', 'Sleep Quality'],
  },
  soil: {
    title: 'Soil Organic Matter',
    value: '+1',
    unit: '% SOM — research benchmark',
    target: 'Each 1% SOM increase → ≈16,500 gal/acre additional water-holding capacity',
    state: 'Research benchmark, not current telemetry. Modeled relationship between grazing rotation, cover cropping, and SOM accumulation.',
    why: 'Soil is the primary water infrastructure of the landscape. Healthy soil holds more water, feeds the riparian system, and sustains the ecosystem that defines the guest experience.',
    dependencies: ['Grazing Rotation', 'Cover Cropping', 'Water Retention', 'Riparian Health'],
  },
}

// ─── Utility Components ───────────────────────────────────────────────────────
function Eyebrow({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '9px',
      letterSpacing: '0.15em',
      color: color ?? C.earth,
      textTransform: 'uppercase' as const,
      margin: 0,
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Fraunces', serif",
      fontSize: '30px',
      fontWeight: 300,
      color: C.basalt,
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
      margin: '6px 0 0',
    }}>
      {children}
    </h2>
  )
}

function MetricLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'block',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '9px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
      color: C.earth,
      marginBottom: '3px',
    }}>
      {children}
    </span>
  )
}

function StatusDot({ status }: { status: WatchLevel }) {
  const colors: Record<WatchLevel, string> = {
    stable: C.sage,
    watch: C.amberLight,
    monitor: C.mist,
    target: C.sageLight,
  }
  return (
    <span style={{
      display: 'inline-block',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: colors[status],
      flexShrink: 0,
    }} />
  )
}

function Card({
  children,
  style = {},
  onClick,
  hoverable,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
  hoverable?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        backgroundColor: hovered ? C.parchment : C.parchment,
        border: `1px solid ${hovered ? C.mist : C.linen}`,
        borderRadius: '3px',
        padding: '22px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        boxShadow: hovered ? '0 2px 12px rgba(28,25,22,0.06)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function TimeframeToggle({
  value,
  onChange,
}: {
  value: Timeframe
  onChange: (t: Timeframe) => void
}) {
  return (
    <div style={{
      display: 'inline-flex',
      border: `1px solid ${C.linen}`,
      borderRadius: '3px',
      overflow: 'hidden',
    }}>
      {(['24hr', 'seasonal'] as Timeframe[]).map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            padding: '6px 12px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            backgroundColor: value === t ? C.basalt : 'transparent',
            color: value === t ? C.parchment : C.earth,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

// ─── Metric Detail Panel ──────────────────────────────────────────────────────
function MetricDetailPanel({
  metric,
  onClose,
}: {
  metric: MetricDetail
  onClose: () => void
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(28,25,22,0.5)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '420px',
          maxWidth: '100vw',
          backgroundColor: C.basalt,
          padding: '32px',
          borderTop: `2px solid ${C.sage}`,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <Eyebrow color={C.earth}>Metric Detail</Eyebrow>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '22px',
              fontWeight: 300,
              color: C.parchment,
              margin: '6px 0 0',
            }}>
              {metric.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${C.stone}`,
              borderRadius: '2px',
              padding: '4px 10px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: C.earth,
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>

        {/* Value */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '6px',
          marginBottom: '6px',
        }}>
          <span style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '52px',
            fontWeight: 300,
            color: C.parchment,
            lineHeight: 1,
          }}>
            {metric.value}
          </span>
          {metric.unit && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: C.earth,
            }}>
              {metric.unit}
            </span>
          )}
        </div>

        <div style={{ height: '1px', backgroundColor: C.basaltMid, margin: '16px 0' }} />

        {/* Target */}
        <div style={{ marginBottom: '16px' }}>
          <Eyebrow color={C.stone}>Target</Eyebrow>
          <p style={{ fontSize: '12px', color: C.mist, lineHeight: 1.6, marginTop: '5px' }}>{metric.target}</p>
        </div>

        {/* Current State */}
        <div style={{ marginBottom: '16px' }}>
          <Eyebrow color={C.stone}>Current Modeled State</Eyebrow>
          <p
            style={{ fontSize: '12px', color: C.mist, lineHeight: 1.6, marginTop: '5px' }}
            dangerouslySetInnerHTML={{ __html: metric.state }}
          />
        </div>

        {/* Why it matters */}
        <div style={{
          padding: '14px',
          backgroundColor: C.basaltMid,
          borderLeft: `2px solid ${C.sage}`,
          borderRadius: '1px',
          marginBottom: '16px',
        }}>
          <Eyebrow color={C.stone}>Why it matters</Eyebrow>
          <p style={{ fontSize: '12px', color: C.mist, lineHeight: 1.65, marginTop: '6px' }}>{metric.why}</p>
        </div>

        {/* Dependencies */}
        <div>
          <Eyebrow color={C.stone}>System Dependencies</Eyebrow>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
            {metric.dependencies.map(dep => (
              <span
                key={dep}
                style={{
                  padding: '4px 10px',
                  border: `1px solid ${C.stone}`,
                  borderRadius: '2px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.06em',
                  color: C.earth,
                }}
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  section,
  setSection,
  onMethodology,
  onTwin,
}: {
  section: Section
  setSection: (s: Section) => void
  onMethodology: () => void
  onTwin: () => void
}) {
  const primary: Array<{ key: Section; label: string }> = [
    { key: 'overview', label: 'Overview' },
    { key: 'resource', label: 'Resource' },
    { key: 'experience', label: 'Experience' },
    { key: 'stewardship', label: 'Stewardship' },
    { key: 'operations', label: 'Operations' },
  ]

  return (
    <aside style={{
      width: '200px',
      minWidth: '200px',
      backgroundColor: C.basalt,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{ padding: '24px 20px 20px', borderBottom: `1px solid ${C.basaltMid}` }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '7px',
          letterSpacing: '0.18em',
          color: C.iron,
          textTransform: 'uppercase',
          marginBottom: '7px',
        }}>
          Infrastructure
        </p>
        <p style={{
          fontFamily: "'Fraunces', serif",
          fontSize: '16px',
          fontWeight: 300,
          color: C.parchment,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
        }}>
          Sovereignty OS
        </p>
        <p style={{
          fontFamily: "'Work Sans', sans-serif",
          fontSize: '10px',
          color: C.stone,
          marginTop: '5px',
          lineHeight: 1.4,
        }}>
          Environmental Experience Platform
        </p>
      </div>

      {/* Primary Nav */}
      <nav style={{ paddingTop: '14px', flex: 1 }}>
        {primary.map(({ key, label }) => {
          const active = section === key
          return (
            <button
              key={key}
              onClick={() => setSection(key)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '9px 20px',
                fontFamily: "'Work Sans', sans-serif",
                fontSize: '11px',
                fontWeight: active ? 500 : 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: active ? C.parchment : C.iron,
                backgroundColor: active ? C.basaltMid : 'transparent',
                border: 'none',
                borderLeft: `2px solid ${active ? C.sage : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {label}
            </button>
          )
        })}
      </nav>

      {/* Secondary Nav */}
      <div style={{ borderTop: `1px solid ${C.basaltMid}`, paddingTop: '10px', paddingBottom: '10px' }}>
        {[
          { label: 'System Status', action: undefined as (() => void) | undefined },
          { label: 'Digital Twin', action: onTwin },
          { label: 'Methodology', action: onMethodology },
        ].map(({ label, action }) => (
          <button
            key={label}
            onClick={action}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '6px 20px',
              fontFamily: "'Work Sans', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: C.stone,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: action ? 'pointer' : 'default',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Conceptual Indicator */}
      <div style={{ padding: '14px 20px', borderTop: `1px solid ${C.basaltMid}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
          <span style={{
            width: '5px', height: '5px',
            borderRadius: '50%',
            backgroundColor: C.amberLight,
            display: 'inline-block',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '7px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: C.amberLight,
          }}>
            Conceptual System
          </span>
        </div>
        <p style={{
          fontFamily: "'Work Sans', sans-serif",
          fontSize: '9px',
          color: C.stone,
          lineHeight: 1.5,
          margin: 0,
        }}>
          Design research prototype. Not live property telemetry.
        </p>
      </div>
    </aside>
  )
}

// ─── Mobile Bottom Nav ─────────────────────────────────────────────────────────
function MobileNav({ section, setSection }: { section: Section; setSection: (s: Section) => void }) {
  const tabs: Array<{ key: Section; label: string; icon: string }> = [
    { key: 'overview', label: 'Overview', icon: '◎' },
    { key: 'resource', label: 'Resource', icon: '◇' },
    { key: 'experience', label: 'Human', icon: '○' },
    { key: 'stewardship', label: 'Ecology', icon: '⬡' },
    { key: 'operations', label: 'Ops', icon: '▦' },
  ]
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      backgroundColor: C.basalt,
      borderTop: `1px solid ${C.basaltMid}`,
      display: 'flex',
      zIndex: 40,
    }}>
      {tabs.map(tab => {
        const active = section === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => setSection(tab.key)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px 4px 12px',
              backgroundColor: 'transparent',
              border: 'none',
              borderTop: `2px solid ${active ? C.sage : 'transparent'}`,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span style={{ fontSize: '13px', color: active ? C.parchment : C.iron, marginBottom: '2px' }}>{tab.icon}</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '7px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: active ? C.parchment : C.iron,
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

// ─── Overview Section ─────────────────────────────────────────────────────────
function OverviewSection({
  isMobile,
  onMetric,
}: {
  isMobile: boolean
  onMetric: (key: string) => void
}) {
  const dims: Array<{ key: string; label: string; value: number; state: string; status: WatchLevel }> = [
    { key: 'energy', label: 'Energy', value: 82, state: 'High resilience', status: 'stable' },
    { key: 'water', label: 'Water', value: 74, state: 'Monitoring', status: 'watch' },
    { key: 'connectivity', label: 'Connectivity', value: 91, state: 'Dual-path active', status: 'stable' },
    { key: 'ecology', label: 'Ecological Health', value: 68, state: 'Regeneration target active', status: 'target' },
  ]

  const watchItems: Array<{ label: string; level: WatchLevel }> = [
    { label: 'Water demand approaching seasonal threshold', level: 'watch' },
    { label: 'Connectivity redundancy reduced — backup online', level: 'monitor' },
    { label: 'Battery reserve below 60% overnight target', level: 'watch' },
    { label: 'Migration period approaching — virtual fence active', level: 'stable' },
    { label: 'Envelope performance review due Q4', level: 'monitor' },
  ]

  const watchColors: Record<WatchLevel, string> = {
    watch: C.amberLight, monitor: C.mist, stable: C.sage, target: C.sageLight,
  }

  return (
    <div>
      {/* ── Editorial header ─────────────────────── */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Eyebrow>Environmental Experience OS — Conceptual Operating Layer</Eyebrow>
          <span style={{ color: C.linen, fontSize: '9px' }}>·</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <StatusDot status="stable" />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: C.sage,
            }}>Operational — Modeled</span>
          </div>
        </div>

        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: isMobile ? '34px' : '52px',
          fontWeight: 300,
          color: C.basalt,
          lineHeight: 1.0,
          letterSpacing: '-0.025em',
          margin: '0 0 18px',
        }}>
          Environmental<br />Experience OS
        </h1>

        <p style={{
          fontSize: '13px',
          color: C.earth,
          maxWidth: '500px',
          lineHeight: 1.7,
          borderLeft: `2px solid ${C.linen}`,
          paddingLeft: '14px',
          margin: 0,
        }}>
          A conceptual operating layer connecting environmental resilience, guest experience,
          infrastructure, and ecological stewardship. All data is modeled or research-benchmarked
          — not live property telemetry.
        </p>
      </div>

      {/* ── Resilience Index ──────────────────────── */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '18px',
        }}>
          <div>
            <Eyebrow>Composite Resilience Assessment</Eyebrow>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '18px',
              fontWeight: 400,
              color: C.basalt,
              margin: '4px 0 0',
            }}>
              Environmental Resilience Index
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '56px',
              fontWeight: 300,
              color: C.basalt,
              lineHeight: 1,
            }}>78</span>
            <span style={{
              display: 'block',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px',
              color: C.earth,
              letterSpacing: '0.1em',
            }}>/ 100 — modeled composite</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {dims.map(dim => (
            <div
              key={dim.key}
              onClick={() => onMetric(dim.key)}
              title="Click to explore this metric"
              style={{
                backgroundColor: C.parchment,
                border: `1px solid ${C.linen}`,
                borderRadius: '3px',
                padding: '14px 18px',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = C.mist)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = C.linen)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '9px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <StatusDot status={dim.status} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: C.iron,
                  }}>{dim.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '11px', color: C.earth }}>{dim.state}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px',
                    fontWeight: 500,
                    color: C.basalt,
                    minWidth: '32px',
                    textAlign: 'right',
                  }}>{dim.value}%</span>
                  <span style={{ fontSize: '9px', color: C.mist }}>→</span>
                </div>
              </div>
              <div style={{ height: '2px', backgroundColor: C.linen, borderRadius: '1px', position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  width: `${dim.value}%`,
                  backgroundColor: dim.status === 'stable' ? C.sage : dim.status === 'watch' ? C.amberLight : C.sageLight,
                  borderRadius: '1px',
                  transition: 'width 0.7s ease',
                }} />
              </div>
            </div>
          ))}
        </div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '8px',
          color: C.mist,
          marginTop: '8px',
          letterSpacing: '0.08em',
        }}>
          Click any dimension to explore metric detail, targets, and system dependencies.
        </p>
      </div>

      {/* ── Status + Watch ────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '14px',
        marginBottom: '32px',
      }}>
        <Card>
          <Eyebrow>System Status</Eyebrow>
          <div style={{ marginTop: '14px' }}>
            {[
              { system: 'Energy', state: 'High resilience', status: 'stable' as WatchLevel },
              { system: 'Water', state: 'Monitoring', status: 'watch' as WatchLevel },
              { system: 'Connectivity', state: 'Dual-path available', status: 'stable' as WatchLevel },
              { system: 'Ecology', state: 'Regeneration target active', status: 'target' as WatchLevel },
            ].map((item, i, arr) => (
              <div key={item.system} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '9px 0',
                borderBottom: i < arr.length - 1 ? `1px solid ${C.linen}` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StatusDot status={item.status} />
                  <span style={{ fontSize: '13px', fontWeight: 500, color: C.basalt }}>{item.system}</span>
                </div>
                <span style={{ fontSize: '11px', color: C.earth }}>{item.state}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <Eyebrow>System Watch</Eyebrow>
          <div style={{ marginTop: '14px' }}>
            {watchItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                padding: '8px 0',
                borderBottom: i < watchItems.length - 1 ? `1px solid ${C.linen}` : 'none',
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '7px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: watchColors[item.level],
                  marginTop: '3px',
                  minWidth: '42px',
                }}>
                  {item.level}
                </span>
                <span style={{ fontSize: '11px', color: C.iron, lineHeight: 1.5 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── System Relationships ──────────────────── */}
      <div>
        <Eyebrow>System Relationships</Eyebrow>
        <h3 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: '18px',
          fontWeight: 400,
          color: C.basalt,
          margin: '4px 0 16px',
        }}>
          How the systems connect
        </h3>
        <SystemRelationships isMobile={isMobile} />
      </div>
    </div>
  )
}

function SystemRelationships({ isMobile }: { isMobile: boolean }) {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const nodes = [
    { id: 'energy', label: 'Energy', x: 100, y: 90 },
    { id: 'water', label: 'Water', x: 300, y: 90 },
    { id: 'ecology', label: 'Ecology', x: 500, y: 90 },
    { id: 'landscape', label: 'Landscape', x: 300, y: 230 },
    { id: 'operations', label: 'Operations', x: 100, y: 230 },
    { id: 'experience', label: 'Guest\nExperience', x: 500, y: 230 },
  ]

  const edges = [
    { from: 'energy', to: 'operations' },
    { from: 'water', to: 'landscape' },
    { from: 'ecology', to: 'landscape' },
    { from: 'landscape', to: 'experience' },
    { from: 'operations', to: 'experience' },
    { from: 'energy', to: 'water' },
    { from: 'water', to: 'ecology' },
    { from: 'operations', to: 'landscape' },
    { from: 'ecology', to: 'experience' },
  ]

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  const chains = [
    { label: 'Soil → Water Retention → Landscape → Guest Experience', color: C.sage },
    { label: 'Infrastructure Resilience → Operational Reliability → Guest Confidence', color: C.amberLight },
    { label: 'Wildlife Protection → Landscape Integrity → Authentic Experience', color: C.sageLight },
  ]

  return (
    <Card>
      {!isMobile && (
        <div style={{ marginBottom: '16px' }}>
          <svg width="100%" viewBox="0 0 620 320" fill="none">
            {/* Edges */}
            {edges.map(({ from, to }, i) => {
              const a = nodeMap[from]
              const b = nodeMap[to]
              const active = activeNode === from || activeNode === to
              return (
                <line
                  key={i}
                  x1={a.x} y1={a.y}
                  x2={b.x} y2={b.y}
                  stroke={active ? C.sage : C.linen}
                  strokeWidth={active ? 1.5 : 1}
                  opacity={active ? 0.8 : 0.6}
                  style={{ transition: 'all 0.2s ease' }}
                />
              )
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const active = activeNode === node.id
              const lines = node.label.split('\n')
              return (
                <g
                  key={node.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <circle
                    cx={node.x} cy={node.y} r={36}
                    fill={active ? C.basalt : C.mineral}
                    stroke={active ? C.sage : C.linen}
                    strokeWidth={active ? 1.5 : 1}
                    style={{ transition: 'all 0.2s ease' }}
                  />
                  {lines.map((line, li) => (
                    <text
                      key={li}
                      x={node.x}
                      y={node.y + (lines.length === 1 ? 5 : li === 0 ? -2 : 12)}
                      textAnchor="middle"
                      fill={active ? C.parchment : C.basalt}
                      fontSize="11"
                      fontFamily="Work Sans, sans-serif"
                      fontWeight="500"
                      style={{ transition: 'all 0.2s ease' }}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              )
            })}

            {/* Annotation */}
            <text x={310} y={310} textAnchor="middle" fill={C.mist} fontSize="9" fontFamily="JetBrains Mono, monospace">
              Hover nodes to reveal connections — CONCEPTUAL SYSTEM MODEL
            </text>
          </svg>
        </div>
      )}

      {/* Chain relationships */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
        gap: '12px',
      }}>
        {chains.map((chain, ci) => (
          <div key={ci} style={{
            padding: '12px',
            backgroundColor: C.mineral,
            border: `1px solid ${C.linen}`,
            borderTop: `2px solid ${chain.color}`,
            borderRadius: '2px',
          }}>
            <p style={{ fontSize: '11px', color: C.iron, lineHeight: 1.6, margin: 0 }}>{chain.label}</p>
          </div>
        ))}
      </div>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '7px',
        color: C.mist,
        marginTop: '10px',
        letterSpacing: '0.08em',
      }}>
        CONCEPTUAL SYSTEM RELATIONSHIPS — DESIGN HYPOTHESIS
      </p>
    </Card>
  )
}

// ─── Resource Section ─────────────────────────────────────────────────────────
function ResourceSection({
  isMobile,
  timeframe,
  setTimeframe,
  onMetric,
}: {
  isMobile: boolean
  timeframe: Timeframe
  setTimeframe: (t: Timeframe) => void
  onMetric: (key: string) => void
}) {
  const energyData = timeframe === '24hr' ? energyData24hr : energyDataSeasonal

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <Eyebrow>System Layer 01</Eyebrow>
          <SectionTitle>Resource Autonomy</SectionTitle>
          <p style={{ fontSize: '13px', color: C.earth, marginTop: '10px', maxWidth: '440px', lineHeight: 1.65 }}>
            How independently can the property sustain the guest experience?
          </p>
        </div>
        <TimeframeToggle value={timeframe} onChange={setTimeframe} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '14px',
        marginBottom: '14px',
      }}>
        {/* Energy Card */}
        <Card hoverable onClick={() => onMetric('energy')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <Eyebrow>Energy</Eyebrow>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '6px' }}>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: '38px', fontWeight: 300, color: C.basalt, lineHeight: 1 }}>78%</span>
              </div>
              <p style={{ fontSize: '11px', color: C.earth, marginTop: '2px' }}>
                Modeled autonomy — {timeframe === '24hr' ? '24-hour cycle' : 'seasonal profile'}
              </p>
            </div>
            <StatusDot status="stable" />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
            {[
              { label: 'Generation', color: C.amberLight },
              { label: 'Consumption', color: C.sienna },
              { label: 'Storage %', color: C.sage },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '14px', height: '2px', backgroundColor: l.color, display: 'inline-block', borderRadius: '1px' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: C.earth }}>{l.label}</span>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={energyData} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
              <defs>
                <linearGradient id="gradGen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.amberLight} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={C.amberLight} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradStore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.sage} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={C.sage} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="t" tick={{ fontSize: 8, fill: C.earth, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ backgroundColor: C.basalt, border: 'none', borderRadius: '3px', fontSize: '10px', color: C.parchment, fontFamily: 'JetBrains Mono' }}
                itemStyle={{ color: C.parchment }}
                cursor={{ stroke: C.linen, strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="store" stroke={C.sage} strokeWidth={1.5} fill="url(#gradStore)" name="Storage %" />
              <Area type="monotone" dataKey="gen" stroke={C.amberLight} strokeWidth={1.5} fill="url(#gradGen)" name="Generation kW" />
              <Area type="monotone" dataKey="use" stroke={C.sienna} strokeWidth={1} fill="none" name="Consumption kW" strokeDasharray="3 2" />
            </AreaChart>
          </ResponsiveContainer>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: C.mist, marginTop: '6px', letterSpacing: '0.08em' }}>
            {timeframe === '24hr'
              ? 'Can the property sustain resilience through a 24-hour cycle?'
              : 'How does solar generation track across seasons at this latitude?'}
          </p>
        </Card>

        {/* Water Card */}
        <Card hoverable onClick={() => onMetric('water')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <Eyebrow>Water</Eyebrow>
              <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
                <div>
                  <MetricLabel>Storage</MetricLabel>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 400, color: C.basalt }}>94%</span>
                </div>
                <div>
                  <MetricLabel>Daily demand</MetricLabel>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 400, color: C.basalt }}>4.2k</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: C.earth }}>gal/day</span>
                  </div>
                </div>
              </div>
            </div>
            <StatusDot status="watch" />
          </div>
          <WaterFlowDiagram />
        </Card>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '14px',
      }}>
        <Card hoverable onClick={() => onMetric('connectivity')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
            <div>
              <Eyebrow>Connectivity</Eyebrow>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 400, color: C.basalt, margin: '4px 0 0' }}>
                Dual-Path Resilience
              </h3>
            </div>
            <StatusDot status="stable" />
          </div>
          <ConnectivityDiagram />
        </Card>

        <Card>
          <div style={{ marginBottom: '18px' }}>
            <Eyebrow>Supply Autonomy</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: '32px', fontWeight: 300, color: C.basalt }}>21</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: C.earth }}>day target horizon</span>
            </div>
          </div>
          <SupplyBars />
        </Card>
      </div>
    </div>
  )
}

function WaterFlowDiagram() {
  const steps = [
    { label: 'Rain / Snow', note: 'Watershed input' },
    { label: 'Capture', note: 'Surface collection' },
    { label: 'Storage', note: '94% capacity' },
    { label: 'Distribution', note: '4.2k gal/day' },
    { label: 'Recovery', note: 'Greywater treatment' },
    { label: 'Landscape', note: 'Return to ecosystem' },
  ]
  return (
    <div>
      {steps.map((step, i) => (
        <div key={step.label}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '7px 10px',
            backgroundColor: i === 0 || i === steps.length - 1 ? C.mineral : 'transparent',
            border: `1px solid ${C.linen}`,
            borderRadius: '2px',
            gap: '10px',
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: C.earth, minWidth: '16px' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '12px', color: C.basalt, flex: 1 }}>{step.label}</span>
            <span style={{ fontSize: '10px', color: C.mist }}>{step.note}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: '1px', height: '6px', backgroundColor: C.linen, marginLeft: '18px' }} />
          )}
        </div>
      ))}
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: C.mist, marginTop: '8px', letterSpacing: '0.08em' }}>
        WATERSHED SYSTEM — RESEARCH BENCHMARK / MODELED FLOW
      </p>
    </div>
  )
}

function ConnectivityDiagram() {
  const paths = [
    { label: 'Primary', type: 'Satellite Link', latency: '42ms', status: 'stable' as WatchLevel, bandwidth: 85 },
    { label: 'Backup', type: 'Microwave Relay', latency: '28ms', status: 'monitor' as WatchLevel, bandwidth: 38 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {paths.map(path => (
        <div key={path.label} style={{
          padding: '14px',
          backgroundColor: C.mineral,
          border: `1px solid ${C.linen}`,
          borderRadius: '3px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <StatusDot status={path.status} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.earth }}>{path.label}</span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: C.mist }}>{path.latency}</span>
          </div>
          <div style={{ fontSize: '13px', color: C.basalt, marginBottom: '8px' }}>{path.type}</div>
          <div style={{ height: '2px', backgroundColor: C.linen, borderRadius: '1px', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              width: `${path.bandwidth}%`,
              backgroundColor: path.status === 'stable' ? C.sage : C.amberLight,
              borderRadius: '1px',
            }} />
          </div>
        </div>
      ))}
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: C.mist, letterSpacing: '0.08em' }}>
        DUAL-PATH — REMOTE RESILIENCE DESIGN CONCEPT. Click to explore.
      </p>
    </div>
  )
}

function SupplyBars() {
  const items = [
    { label: 'Food', days: 24, color: C.sage },
    { label: 'Fuel', days: 18, color: C.amberLight },
    { label: 'Critical Supplies', days: 28, color: C.sageLight },
    { label: 'Maintenance Materials', days: 14, color: C.iron },
  ]
  const max = 35
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {items.map(item => (
        <div key={item.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '12px', color: C.basalt }}>{item.label}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: item.days >= 21 ? C.sage : C.amberLight, fontWeight: 500 }}>
              {item.days}d
            </span>
          </div>
          <div style={{ height: '2px', backgroundColor: C.linen, borderRadius: '1px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${(item.days / max) * 100}%`, backgroundColor: item.color, borderRadius: '1px' }} />
            <div style={{ position: 'absolute', left: `${(21 / max) * 100}%`, top: '-4px', width: '1px', height: '10px', backgroundColor: C.iron, opacity: 0.4 }} />
          </div>
        </div>
      ))}
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: C.mist, letterSpacing: '0.08em' }}>
        VERTICAL MARKER = 21-DAY RESILIENCE HORIZON TARGET
      </p>
    </div>
  )
}

// ─── Experience Section ───────────────────────────────────────────────────────
function ExperienceSection({
  isMobile,
  onMetric,
}: {
  isMobile: boolean
  onMetric: (key: string) => void
}) {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <Eyebrow>System Layer 02</Eyebrow>
        <SectionTitle>Human Environment</SectionTitle>
        <p style={{ fontSize: '13px', color: C.earth, marginTop: '10px', maxWidth: '500px', lineHeight: 1.65 }}>
          Environmental performance becomes perceptible through comfort, recovery, privacy, and sensory quality.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
        <Card hoverable onClick={() => onMetric('recovery')}>
          <div style={{ marginBottom: '14px' }}>
            <Eyebrow>Recovery Coefficient</Eyebrow>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 400, color: C.basalt, margin: '4px 0 6px' }}>
              Conceptual Guest Recovery Model
            </h3>
            <p style={{ fontSize: '10px', color: C.earth, lineHeight: 1.6, margin: 0 }}>
              A proposed framework exploring relationships between environmental conditions and guest recovery. Not medical monitoring.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            {[{ label: 'Recovery Index', color: C.sage }, { label: 'HRV Score', color: C.amberLight }].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '12px', height: '1.5px', backgroundColor: l.color, display: 'inline-block' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: C.earth }}>{l.label}</span>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={110}>
            <LineChart data={recoveryData} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
              <XAxis dataKey="day" tick={{ fontSize: 8, fill: C.earth, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis hide domain={[35, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: C.basalt, border: 'none', borderRadius: '3px', fontSize: '10px', color: C.parchment, fontFamily: 'JetBrains Mono' }}
                cursor={{ stroke: C.linen, strokeWidth: 1 }}
              />
              <Line type="monotone" dataKey="recovery" stroke={C.sage} strokeWidth={2} dot={false} name="Recovery Index" />
              <Line type="monotone" dataKey="hrv" stroke={C.amberLight} strokeWidth={1.5} dot={false} name="HRV Score" strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>

          <div style={{ height: '1px', backgroundColor: C.linen, margin: '14px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { label: 'Sleep Quality', value: '88%', up: true },
              { label: 'HRV', value: '63ms', up: true },
              { label: 'Recovery Index', value: '91', up: true },
              { label: 'Resting HR', value: '52 bpm', up: false },
            ].map(m => (
              <div key={m.label} style={{ padding: '8px 10px', backgroundColor: C.mineral, borderRadius: '2px', border: `1px solid ${C.linen}` }}>
                <MetricLabel>{m.label}</MetricLabel>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 400, color: C.basalt }}>{m.value}</span>
                  <span style={{ fontSize: '11px', color: C.sage }}>{m.up ? '↑' : '↓'}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '12px', padding: '10px 12px', backgroundColor: C.mineral, borderLeft: `2px solid ${C.amberLight}`, borderRadius: '1px' }}>
            <p style={{ fontSize: '10px', color: C.earth, lineHeight: 1.55, fontStyle: 'italic', margin: 0 }}>
              Context: Low noise (&lt;35 dB), natural light, 19°C ambient, 6.2h outdoors.
              Design hypothesis — not scientific measurement.
            </p>
          </div>
        </Card>

        <Card>
          <div style={{ marginBottom: '18px' }}>
            <Eyebrow>Sensory Sovereignty</Eyebrow>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 400, color: C.basalt, margin: '4px 0 0' }}>
              Environmental Quality Targets
            </h3>
          </div>
          <SensoryModules />
        </Card>
      </div>
    </div>
  )
}

function SensoryModules() {
  const lightHours = [
    { h: '06', lux: 160 }, { h: '08', lux: 420 }, { h: '10', lux: 900 },
    { h: '12', lux: 1200 }, { h: '14', lux: 1500 }, { h: '16', lux: 1100 },
    { h: '18', lux: 580 }, { h: '20', lux: 220 }, { h: '22', lux: 80 },
  ]
  const maxLux = 1500

  const [hoveredAcoustic, setHoveredAcoustic] = useState(false)
  const [hoveredThermal, setHoveredThermal] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Acoustic */}
      <div
        onMouseEnter={() => setHoveredAcoustic(true)}
        onMouseLeave={() => setHoveredAcoustic(false)}
        style={{
          padding: '14px',
          backgroundColor: C.mineral,
          border: `1px solid ${hoveredAcoustic ? C.mist : C.linen}`,
          borderRadius: '3px',
          transition: 'border-color 0.15s ease',
          position: 'relative',
        }}
      >
        <MetricLabel>Acoustic Environment</MetricLabel>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '6px' }}>
          <div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 400, color: C.basalt }}>
              {'<35'} <span style={{ fontSize: '14px' }}>dB</span>
            </span>
            <p style={{ fontSize: '10px', color: C.earth, marginTop: '2px', marginBottom: 0 }}>Target: low mechanical noise</p>
          </div>
          <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', marginBottom: '4px' }}>
            {[12, 18, 14, 22, 10, 16, 12, 8, 14, 11, 9, 13].map((h, i) => (
              <div key={i} style={{
                width: '3px',
                height: `${Math.max(4, h * 1.8)}px`,
                backgroundColor: h < 15 ? C.sagePale : C.linen,
                borderRadius: '1px',
              }} />
            ))}
          </div>
        </div>
        {hoveredAcoustic && (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: '6px',
            padding: '8px 12px',
            backgroundColor: C.basalt,
            borderRadius: '3px',
            fontSize: '10px',
            color: C.parchment,
            width: '220px',
            lineHeight: 1.5,
            fontFamily: "'Work Sans', sans-serif",
            zIndex: 10,
          }}>
            Target acoustic profile: predominantly natural sounds. Mechanical noise &lt;35 dB supports sleep quality and cognitive restoration.
          </div>
        )}
      </div>

      {/* Thermal */}
      <div
        onMouseEnter={() => setHoveredThermal(true)}
        onMouseLeave={() => setHoveredThermal(false)}
        style={{
          padding: '14px',
          backgroundColor: C.mineral,
          border: `1px solid ${hoveredThermal ? C.mist : C.linen}`,
          borderRadius: '3px',
          transition: 'border-color 0.15s ease',
          position: 'relative',
        }}
      >
        <MetricLabel>Thermal Comfort</MetricLabel>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
          <div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', fontWeight: 400, color: C.basalt }}>19°C</span>
            <p style={{ fontSize: '10px', color: C.earth, marginTop: '2px', marginBottom: 0 }}>Target range: 18 – 25°C</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: C.earth }}>18°</span>
            <div style={{ width: '72px', height: '4px', backgroundColor: C.linen, borderRadius: '2px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', backgroundColor: C.sagePale, borderRadius: '2px' }} />
              <div style={{ position: 'absolute', left: '14%', top: '-3px', width: '3px', height: '10px', backgroundColor: C.sage, borderRadius: '1px' }} />
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: C.earth }}>25°</span>
          </div>
        </div>
        {hoveredThermal && (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: '6px',
            padding: '8px 12px',
            backgroundColor: C.basalt,
            borderRadius: '3px',
            fontSize: '10px',
            color: C.parchment,
            width: '220px',
            lineHeight: 1.5,
            fontFamily: "'Work Sans', sans-serif",
            zIndex: 10,
          }}>
            18–25°C is the ASHRAE comfort zone for sedentary activity. 19°C supports deeper sleep onset and recovery.
          </div>
        )}
      </div>

      {/* Circadian */}
      <div style={{ padding: '14px', backgroundColor: C.mineral, border: `1px solid ${C.linen}`, borderRadius: '3px' }}>
        <MetricLabel>Circadian Lighting</MetricLabel>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 0 10px' }}>
          <p style={{ fontSize: '10px', color: C.earth, margin: 0 }}>150 lux rest → 1500 lux task</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '44px' }}>
          {lightHours.map(point => (
            <div key={point.h} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{
                width: '100%',
                height: `${Math.max(3, (point.lux / maxLux) * 40)}px`,
                backgroundColor: point.lux > 900 ? C.amberLight : point.lux > 400 ? C.amberMid : point.lux > 150 ? C.amber : C.linen,
                borderRadius: '1px 1px 0 0',
                opacity: 0.75,
              }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
          {lightHours.map(p => (
            <span key={p.h} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: C.mist, flex: 1, textAlign: 'center' }}>{p.h}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Stewardship Section ──────────────────────────────────────────────────────
function StewardshipSection({ isMobile, onMetric }: { isMobile: boolean; onMetric: (key: string) => void }) {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <Eyebrow>System Layer 03</Eyebrow>
        <SectionTitle>Living Landscape</SectionTitle>
        <p style={{ fontSize: '13px', color: C.earth, marginTop: '10px', maxWidth: '500px', lineHeight: 1.65 }}>
          The ranch operates not only as a destination, but as a biological system.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        <Card hoverable onClick={() => onMetric('soil')}>
          <Eyebrow>Soil Health</Eyebrow>
          <div style={{ margin: '8px 0 6px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: '40px', fontWeight: 300, color: C.sage, lineHeight: 1 }}>+1%</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: C.earth }}>SOM</span>
            </div>
            <p style={{ fontSize: '12px', color: C.iron, lineHeight: 1.55, maxWidth: '260px', marginTop: '4px' }}>
              Approximately 16,500 additional gallons of water-holding capacity per acre
            </p>
          </div>
          <div style={{ padding: '6px 10px', backgroundColor: C.mineral, border: `1px solid ${C.linen}`, borderRadius: '2px', marginBottom: '16px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: C.mist, letterSpacing: '0.1em' }}>
              RESEARCH BENCHMARK / MODELED RELATIONSHIP — NOT CURRENT TELEMETRY
            </span>
          </div>
          <SoilDiagram />
        </Card>

        <Card>
          <Eyebrow>Water / Fishery</Eyebrow>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 400, color: C.basalt, margin: '4px 0 16px' }}>
            Watershed System
          </h3>
          <WatershedDiagram />
          <div style={{ marginTop: '14px', padding: '12px', backgroundColor: C.mineral, border: `1px solid ${C.linen}`, borderRadius: '2px' }}>
            <MetricLabel>Bull Trout — Ecological Indicator</MetricLabel>
            <p style={{ fontSize: '11px', color: C.earth, marginTop: '5px', lineHeight: 1.55, margin: '5px 0 0' }}>
              Cold-water habitat integrity signals systemic watershed health. System relationships
              matter more than population counts.
            </p>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
        <Card>
          <Eyebrow>Wildlife Migration</Eyebrow>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 400, color: C.basalt, margin: '4px 0 16px' }}>
            Migration Corridor
          </h3>
          <WildlifeMap />
        </Card>
        <Card>
          <Eyebrow>Agrivoltaics</Eyebrow>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '17px', fontWeight: 400, color: C.basalt, margin: '4px 0 16px' }}>
            Solar + Grazing Integration
          </h3>
          <AgrivoltaicsDiagram />
        </Card>
      </div>
    </div>
  )
}

function SoilDiagram() {
  const layers = [
    { label: 'Surface Organic', depth: '0–4 cm', w: '30%', color: '#3E2A1A' },
    { label: 'Topsoil / A Horizon', depth: '4–22 cm', w: '50%', color: '#5C3D22' },
    { label: 'Subsoil / B Horizon', depth: '22–60 cm', w: '66%', color: '#7A5232' },
    { label: 'Parent Material / C', depth: '60+ cm', w: '82%', color: '#9B6B42' },
  ]
  return (
    <div>
      {layers.map((layer, i) => (
        <div key={layer.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{ width: layer.w, minWidth: '20px', height: '18px', backgroundColor: layer.color, borderRadius: '1px', opacity: 0.75 - i * 0.1, flexShrink: 0 }} />
          <span style={{ fontSize: '11px', color: C.basalt }}>{layer.label}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: C.earth }}>{layer.depth}</span>
        </div>
      ))}
    </div>
  )
}

function WatershedDiagram() {
  const steps = [
    { label: 'Rain / Snow', icon: '◇', note: 'Watershed input' },
    { label: 'Landscape Absorption', icon: '▽', note: 'Infiltration' },
    { label: 'Riparian System', icon: '～', note: 'Stream corridor' },
    { label: 'Water Retention', icon: '○', note: 'Wetland buffering' },
    { label: 'Fish Habitat', icon: '◁', note: 'Ecological indicator' },
  ]
  return (
    <div>
      {steps.map((step, i) => (
        <div key={step.label}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: C.sage, width: '16px', textAlign: 'center', flexShrink: 0 }}>{step.icon}</span>
            <span style={{ fontSize: '12px', color: C.basalt, flex: 1 }}>{step.label}</span>
            <span style={{ fontSize: '10px', color: C.mist }}>{step.note}</span>
          </div>
          {i < steps.length - 1 && <div style={{ width: '1px', height: '6px', backgroundColor: C.linen, marginLeft: '7px' }} />}
        </div>
      ))}
    </div>
  )
}

function WildlifeMap() {
  return (
    <div style={{ backgroundColor: C.mineral, border: `1px solid ${C.linen}`, borderRadius: '3px', overflow: 'hidden' }}>
      <svg width="100%" viewBox="0 0 340 175" fill="none">
        {[0.25, 0.4, 0.55, 0.7, 0.85].map((y, i) => (
          <path key={i} d={`M0 ${y * 175} Q85 ${(y - 0.06) * 175} 170 ${y * 175} Q255 ${(y + 0.05) * 175} 340 ${y * 175}`} stroke={C.linen} strokeWidth="1" />
        ))}
        <rect x={45} y={22} width={210} height={130} rx={2} stroke={C.mist} strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 10 65 Q 90 48 170 60 Q 250 72 340 54" stroke={C.sage} strokeWidth="2.5" strokeDasharray="7 4" opacity="0.65" />
        <polygon points="332,50 342,54 332,58" fill={C.sage} opacity="0.65" />
        {[95, 165, 235].map((x, i) => (
          <circle key={i} cx={x} cy={56 + (x - 165) * 0.045} r={5} fill={C.amberLight} opacity={0.85} stroke={C.parchment} strokeWidth="1" />
        ))}
        <text x={260} y={18} fill={C.mist} fontSize="9" fontFamily="JetBrains Mono, monospace">RANCH BOUNDARY</text>
        <text x={12} y={42} fill={C.sage} fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.8">MIGRATION CORRIDOR</text>
        <text x={110} y={76} fill={C.amberLight} fontSize="8" fontFamily="JetBrains Mono, monospace">VIRTUAL FENCE</text>
        <text x={60} y={162} fill={C.earth} fontSize="8" fontFamily="JetBrains Mono, monospace">SEASONAL MOVEMENT — PROPOSED SYSTEM</text>
      </svg>
    </div>
  )
}

function AgrivoltaicsDiagram() {
  return (
    <div>
      <svg width="100%" viewBox="0 0 300 130" style={{ display: 'block' }}>
        <rect x={0} y={96} width={300} height={34} fill={C.mineral} />
        <rect x={0} y={94} width={300} height={3} fill={C.linen} />
        {[30, 90, 150, 210].map(x => (
          <g key={x}>
            <line x1={x + 22} y1={94} x2={x + 22} y2={56} stroke={C.iron} strokeWidth="2" opacity="0.6" />
            <rect x={x} y={43} width={44} height={15} rx="1" fill={C.amberLight} opacity={0.65} />
            <line x1={x + 15} y1={43} x2={x + 15} y2={58} stroke={C.amber} strokeWidth="0.5" opacity="0.4" />
            <line x1={x + 29} y1={43} x2={x + 29} y2={58} stroke={C.amber} strokeWidth="0.5" opacity="0.4" />
          </g>
        ))}
        {[62, 122, 182, 242].map(x => (
          <g key={x}>
            <ellipse cx={x} cy={92} rx={9} ry={4} fill={C.mist} opacity={0.55} />
            <circle cx={x + 7} cy={88} r={4} fill={C.mist} opacity={0.55} />
          </g>
        ))}
        <circle cx={270} cy={24} r={14} fill={C.amberLight} opacity={0.25} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
          <line key={angle}
            x1={270 + Math.cos((angle * Math.PI) / 180) * 16} y1={24 + Math.sin((angle * Math.PI) / 180) * 16}
            x2={270 + Math.cos((angle * Math.PI) / 180) * 21} y2={24 + Math.sin((angle * Math.PI) / 180) * 21}
            stroke={C.amberLight} strokeWidth="1.5" opacity={0.35}
          />
        ))}
        <text x={8} y={114} fill={C.earth} fontSize="8" fontFamily="JetBrains Mono, monospace">GRAZING BENEATH</text>
        <text x={90} y={34} fill={C.earth} fontSize="8" fontFamily="JetBrains Mono, monospace">SOLAR GENERATION ABOVE</text>
      </svg>
      <p style={{ fontSize: '11px', color: C.earth, lineHeight: 1.55, marginTop: '8px' }}>
        Elevated arrays enable dual-use land productivity — generation and managed
        grazing beneath. Proposed agrivoltaic system concept.
      </p>
    </div>
  )
}

// ─── Operations Section ───────────────────────────────────────────────────────
function OperationsSection({
  twinMode, setTwinMode,
  serviceLayer, setServiceLayer,
  isMobile,
}: {
  twinMode: TwinMode
  setTwinMode: (m: TwinMode) => void
  serviceLayer: ServiceLayer
  setServiceLayer: (l: ServiceLayer) => void
  isMobile: boolean
}) {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <Eyebrow>System Layer 04</Eyebrow>
        <SectionTitle>Invisible Service</SectionTitle>
        <p style={{ fontSize: '13px', color: C.earth, marginTop: '10px', maxWidth: '500px', lineHeight: 1.65 }}>
          High service fidelity with minimal disruption to guest solitude.
          Conceptual service-flow orchestration — not surveillance.
        </p>
      </div>

      {/* Digital Twin */}
      <Card style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <Eyebrow>Digital Twin</Eyebrow>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 400, color: C.basalt, margin: '4px 0 0' }}>
              Property Model
            </h3>
          </div>
          <div style={{ display: 'flex', border: `1px solid ${C.linen}`, borderRadius: '3px', overflow: 'hidden' }}>
            {(['experience', 'infrastructure'] as const).map(mode => (
              <button key={mode} onClick={() => setTwinMode(mode)} style={{
                padding: '7px 14px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                backgroundColor: twinMode === mode ? C.basalt : 'transparent',
                color: twinMode === mode ? C.parchment : C.earth,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}>
                {mode}
              </button>
            ))}
          </div>
        </div>
        <DigitalTwinMap mode={twinMode} />
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: C.mist, marginTop: '10px', letterSpacing: '0.08em' }}>
          The visible ranch experience is supported by an invisible environmental and operational infrastructure.
        </p>
      </Card>

      {/* Service Flow */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <Eyebrow>Service Flow</Eyebrow>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 400, color: C.basalt, margin: '4px 0 0' }}>
              Spatial Orchestration
            </h3>
          </div>
          <div style={{ display: 'flex', border: `1px solid ${C.linen}`, borderRadius: '3px', overflow: 'hidden' }}>
            {(['guest', 'staff', 'infrastructure'] as const).map(layer => (
              <button key={layer} onClick={() => setServiceLayer(layer)} style={{
                padding: '7px 10px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                backgroundColor: serviceLayer === layer ? C.basalt : 'transparent',
                color: serviceLayer === layer ? C.parchment : C.earth,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}>
                {layer}
              </button>
            ))}
          </div>
        </div>
        <ServiceMap layer={serviceLayer} />
      </Card>
    </div>
  )
}

function DigitalTwinMap({ mode }: { mode: TwinMode }) {
  const isExp = mode === 'experience'
  return (
    <div style={{
      position: 'relative',
      height: '220px',
      backgroundColor: isExp ? C.mineral : C.basalt,
      border: `1px solid ${C.linen}`,
      borderRadius: '3px',
      overflow: 'hidden',
      transition: 'background-color 0.4s ease',
    }}>
      <svg width="100%" height="100%" viewBox="0 0 560 220" fill="none">
        {[0.25, 0.45, 0.65, 0.82].map((y, i) => (
          <path key={i} d={`M0 ${y * 220} Q140 ${(y - 0.05) * 220} 280 ${y * 220} Q420 ${(y + 0.04) * 220} 560 ${y * 220}`}
            stroke={isExp ? C.linen : C.basaltMid} strokeWidth="1" />
        ))}
        {isExp ? (
          <>
            <rect x={220} y={80} width={90} height={55} rx={2} fill={C.parchment} stroke={C.linen} strokeWidth="1.5" />
            <text x={265} y={111} textAnchor="middle" fill={C.basalt} fontSize="10" fontFamily="Work Sans, sans-serif" fontWeight="500">Lodge</text>
            {[{ x: 80, y: 65, label: 'Cabin A' }, { x: 390, y: 58, label: 'Cabin B' }, { x: 75, y: 148, label: 'Cabin C' }, { x: 395, y: 150, label: 'Cabin D' }, { x: 238, y: 165, label: 'Barn' }].map(c => (
              <g key={c.label}>
                <rect x={c.x} y={c.y} width={52} height={36} rx={1} fill={C.linen} stroke={C.mist} strokeWidth="1" />
                <text x={c.x + 26} y={c.y + 22} textAnchor="middle" fill={C.iron} fontSize="9" fontFamily="JetBrains Mono, monospace">{c.label}</text>
              </g>
            ))}
            <path d="M106 83 Q163 80 220 98" fill="none" stroke={C.mist} strokeWidth="1.5" strokeDasharray="5 3" />
            <path d="M442 76 Q380 82 310 100" fill="none" stroke={C.mist} strokeWidth="1.5" strokeDasharray="5 3" />
            <text x={280} y={210} textAnchor="middle" fill={C.mist} fontSize="9" fontFamily="JetBrains Mono, monospace">EXPERIENCE LAYER — GUEST DESTINATIONS</text>
          </>
        ) : (
          <>
            {[
              { x: 60, y: 34, label: 'Solar Array', icon: '▦' },
              { x: 460, y: 34, label: 'Water Tank', icon: '◎' },
              { x: 490, y: 110, label: 'Satellite', icon: '◈' },
              { x: 40, y: 118, label: 'Battery', icon: '▣' },
              { x: 270, y: 28, label: 'Eco Zone', icon: '⬡' },
              { x: 270, y: 150, label: 'Micro Relay', icon: '◇' },
            ].map(el => (
              <g key={el.label}>
                <circle cx={el.x + 16} cy={el.y + 16} r={18} fill={C.basaltMid} stroke={C.sage} strokeWidth="0.75" />
                <text x={el.x + 16} y={el.y + 21} textAnchor="middle" fill={C.sage} fontSize="12" fontFamily="Work Sans">
                  {el.icon}
                </text>
                <text x={el.x + 16} y={el.y + 40} textAnchor="middle" fill={C.iron} fontSize="8" fontFamily="JetBrains Mono, monospace">
                  {el.label}
                </text>
              </g>
            ))}
            {[[76, 50, 46, 136], [76, 50, 286, 44], [476, 50, 286, 44], [476, 50, 506, 128], [506, 128, 286, 166], [46, 136, 286, 166]].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.sage} strokeWidth="0.75" opacity="0.3" strokeDasharray="4 3" />
            ))}
            <text x={280} y={210} textAnchor="middle" fill={C.iron} fontSize="9" fontFamily="JetBrains Mono, monospace">INFRASTRUCTURE LAYER — ENVIRONMENTAL SYSTEMS</text>
          </>
        )}
      </svg>
    </div>
  )
}

function ServiceMap({ layer }: { layer: ServiceLayer }) {
  return (
    <div style={{ backgroundColor: C.mineral, border: `1px solid ${C.linen}`, borderRadius: '3px', overflow: 'hidden' }}>
      <svg width="100%" viewBox="0 0 560 190" fill="none">
        {[
          { x: 214, y: 68, w: 95, h: 50, label: 'Main Lodge', main: true },
          { x: 70, y: 55, w: 55, h: 38, label: 'Cabin A', main: false },
          { x: 390, y: 55, w: 55, h: 38, label: 'Cabin B', main: false },
          { x: 70, y: 130, w: 55, h: 38, label: 'Cabin C', main: false },
          { x: 390, y: 130, w: 55, h: 38, label: 'Cabin D', main: false },
          { x: 455, y: 148, w: 70, h: 32, label: 'Back of House', main: false },
        ].map(b => (
          <g key={b.label}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={1} fill={b.main ? C.linen : C.parchment} stroke={C.mist} strokeWidth="1" />
            <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 4} textAnchor="middle" fill={C.iron} fontSize="9" fontFamily="JetBrains Mono, monospace">{b.label}</text>
          </g>
        ))}
        {layer === 'guest' && (
          <>
            <path d="M125 74 Q170 72 214 86" fill="none" stroke={C.sage} strokeWidth="2" strokeDasharray="6 3" opacity="0.8" />
            <path d="M390 74 Q350 72 309 86" fill="none" stroke={C.sage} strokeWidth="2" strokeDasharray="6 3" opacity="0.8" />
            <path d="M125 149 Q170 160 214 155" fill="none" stroke={C.sage} strokeWidth="2" strokeDasharray="6 3" opacity="0.8" />
            <path d="M390 149 Q350 160 309 155" fill="none" stroke={C.sage} strokeWidth="2" strokeDasharray="6 3" opacity="0.8" />
            <circle cx={170} cy={73} r={4} fill={C.sage} />
            <circle cx={348} cy={73} r={4} fill={C.sage} />
            <text x={280} y={182} textAnchor="middle" fill={C.sage} fontSize="8" fontFamily="JetBrains Mono, monospace">GUEST MOVEMENT — MODELED PATHS</text>
          </>
        )}
        {layer === 'staff' && (
          <>
            <path d="M490 164 Q480 152 460 140 Q430 118 410 92" fill="none" stroke={C.amberLight} strokeWidth="2" opacity="0.75" />
            <path d="M490 164 Q420 172 360 162 Q300 148 309 135" fill="none" stroke={C.amberLight} strokeWidth="2" opacity="0.75" />
            <path d="M490 164 Q430 175 320 170 Q260 165 260 145" fill="none" stroke={C.amberLight} strokeWidth="2" opacity="0.75" />
            <circle cx={410} cy={92} r={4} fill={C.amberLight} />
            <circle cx={260} cy={145} r={4} fill={C.amberLight} />
            <text x={280} y={182} textAnchor="middle" fill={C.amberLight} fontSize="8" fontFamily="JetBrains Mono, monospace">STAFF SERVICE ROUTES — CONCEPTUAL ORCHESTRATION</text>
          </>
        )}
        {layer === 'infrastructure' && (
          <>
            {[{ x: 20, y: 20, label: 'Solar' }, { x: 510, y: 20, label: 'Water' }, { x: 20, y: 170, label: 'Power' }, { x: 510, y: 170, label: 'Comm' }].map(node => (
              <g key={node.label}>
                <circle cx={node.x} cy={node.y} r={9} fill={C.parchment} stroke={C.sage} strokeWidth="1.5" />
                <text x={node.x} y={node.y + 22} textAnchor="middle" fill={C.sage} fontSize="8" fontFamily="JetBrains Mono, monospace">{node.label}</text>
                <line x1={node.x} y1={node.y} x2={261} y2={93} stroke={C.sage} strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
              </g>
            ))}
            <text x={280} y={182} textAnchor="middle" fill={C.sage} fontSize="8" fontFamily="JetBrains Mono, monospace">INFRASTRUCTURE CONNECTIONS — CONCEPTUAL SYSTEM</text>
          </>
        )}
      </svg>
    </div>
  )
}

// ─── Methodology Panel ────────────────────────────────────────────────────────
function MethodologyPanel({ onClose }: { onClose: () => void }) {
  const steps = [
    { label: 'Research', desc: 'Environmental systems literature, remote property operations, ecological indicators, hospitality resilience patterns.' },
    { label: 'System Model', desc: 'Information architecture mapping relationships between infrastructure, ecology, and lived experience.' },
    { label: 'Environmental Metrics', desc: 'Energy autonomy, water retention, acoustic quality, thermal comfort, circadian alignment.' },
    { label: 'Experience Metrics', desc: 'Conceptual recovery correlation, sensory sovereignty, operational invisibility indices.' },
    { label: 'Operational Decisions', desc: 'Resource allocation, service orchestration, stewardship interventions.' },
    { label: 'Stewardship Feedback', desc: 'Ecological health as operational outcome, not a separate mandate. The land responds to decisions.' },
  ]
  return (
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(28,25,22,0.55)', zIndex: 50, display: 'flex', alignItems: 'stretch', justifyContent: 'flex-end' }}
      onClick={onClose}
    >
      <div
        style={{ width: '480px', maxWidth: '100vw', backgroundColor: C.mineral, padding: '40px 32px', overflowY: 'auto', boxShadow: '-4px 0 32px rgba(0,0,0,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <Eyebrow>Methodology</Eyebrow>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 300, color: C.basalt, marginTop: '6px' }}>
              How this system works
            </h2>
          </div>
          <button onClick={onClose} style={{ backgroundColor: 'transparent', border: `1px solid ${C.linen}`, borderRadius: '2px', padding: '5px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.earth, cursor: 'pointer' }}>
            Close
          </button>
        </div>

        {steps.map((step, i) => (
          <div key={step.label} style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `1px solid ${C.linen}`, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: C.parchment }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: C.iron }}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              {i < steps.length - 1 && <div style={{ width: '1px', flex: 1, backgroundColor: C.linen, margin: '5px 0' }} />}
            </div>
            <div style={{ paddingBottom: i < steps.length - 1 ? '20px' : 0 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '16px', fontWeight: 400, color: C.basalt, marginBottom: '5px' }}>{step.label}</div>
              <p style={{ fontSize: '12px', color: C.earth, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          </div>
        ))}

        <div style={{ marginTop: '32px', padding: '18px', backgroundColor: C.parchment, border: `1px solid ${C.linen}`, borderLeft: `3px solid ${C.sage}`, borderRadius: '2px' }}>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: '14px', fontWeight: 300, color: C.basalt, lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
            "Luxury in a remote environment is not the absence of infrastructure. It is infrastructure
            so intelligently designed that resilience becomes part of the experience — and stewardship
            becomes part of the luxury."
          </p>
        </div>

        <div style={{ marginTop: '24px' }}>
          <Eyebrow>Portfolio Context</Eyebrow>
          <p style={{ fontSize: '12px', color: C.earth, lineHeight: 1.6, marginTop: '8px' }}>
            Independent research and design exploration. All data shown is conceptual, modeled,
            or research-benchmarked. Not affiliated with or representing any specific property.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [section, setSection] = useState<Section>('overview')
  const [twinMode, setTwinMode] = useState<TwinMode>('experience')
  const [serviceLayer, setServiceLayer] = useState<ServiceLayer>('guest')
  const [methodologyOpen, setMethodologyOpen] = useState(false)
  const [activeMetric, setActiveMetric] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<Timeframe>('24hr')
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const openMetric = (key: string) => {
    if (METRICS[key]) setActiveMetric(key)
  }

  return (
    <div style={{
      fontFamily: "'Work Sans', sans-serif",
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: C.mineral,
      color: C.basalt,
    }}>
      {!isMobile && (
        <Sidebar
          section={section}
          setSection={setSection}
          onMethodology={() => setMethodologyOpen(true)}
          onTwin={() => setSection('operations')}
        />
      )}

      <main style={{
        flex: 1,
        overflowY: 'auto',
        padding: isMobile ? '28px 20px 90px' : '44px 52px',
      }}>
        {isMobile && (
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', letterSpacing: '0.16em', color: C.earth, textTransform: 'uppercase', margin: 0 }}>
              Infrastructure Sovereignty OS
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: C.amberLight, display: 'inline-block' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.amberLight }}>Conceptual</span>
            </div>
          </div>
        )}

        {section === 'overview' && <OverviewSection isMobile={isMobile} onMetric={openMetric} />}
        {section === 'resource' && (
          <ResourceSection
            isMobile={isMobile}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            onMetric={openMetric}
          />
        )}
        {section === 'experience' && <ExperienceSection isMobile={isMobile} onMetric={openMetric} />}
        {section === 'stewardship' && <StewardshipSection isMobile={isMobile} onMetric={openMetric} />}
        {section === 'operations' && (
          <OperationsSection
            twinMode={twinMode} setTwinMode={setTwinMode}
            serviceLayer={serviceLayer} setServiceLayer={setServiceLayer}
            isMobile={isMobile}
          />
        )}
      </main>

      {isMobile && <MobileNav section={section} setSection={setSection} />}

      {methodologyOpen && <MethodologyPanel onClose={() => setMethodologyOpen(false)} />}

      {activeMetric && METRICS[activeMetric] && (
        <MetricDetailPanel
          metric={METRICS[activeMetric]}
          onClose={() => setActiveMetric(null)}
        />
      )}
    </div>
  )
}

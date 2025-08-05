import { useMemo } from 'react';
import { InvestmentScenario } from '../types';
import styles from './InvestmentChart.module.scss';

const CONFIG = {
  width: 800,
  height: 600,
  pad: { t: 10, r: 40, b: 60, l: 100 },
  tickCount: 6,
  stroke: 2,
  point: 3,
};

const COLORS = {
  optimistic: '#4CAF50',
  conservative: '#FF8C42',
  expected: '#FFD700',
  grid: '#E0E0E0',
  text: '#666',
};

const FONT_FAMILY = 'Nunito';

const format = (v: number) => `$${Math.round(v).toLocaleString()}`;

export const InvestmentChart = ({ data }: { data: InvestmentScenario[] }) => {
  const id = useMemo(() => `ch-${Math.random().toString(36).slice(2, 9)}`, []);
  const years = data.map((d) => d.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const vals = data.flatMap((d) => [d.optimistic, d.conservative, d.expected]);
  const minV = Math.max(0, Math.min(...vals) - (Math.max(...vals) - Math.min(...vals)) * 0.1);
  const maxV = Math.max(...vals) + ((Math.max(...vals) - minV) * 0.5 || 10000);
  const w = CONFIG.width - CONFIG.pad.l - CONFIG.pad.r;
  const h = CONFIG.height - CONFIG.pad.t - CONFIG.pad.b;
  const sx = (year: number): number => ((year - minYear) / (maxYear - minYear || 1)) * w;
  const sy = (v: number): number => h - ((v - minV) / (maxV - minV || 1)) * h;
  const ticksY = Array.from(
    { length: CONFIG.tickCount },
    (_, i) => minV + (i * (maxV - minV)) / (CONFIG.tickCount - 1)
  );

  const minorCount = 2;
  const minorTicksY: number[] = [];
  for (let i = 0; i < ticksY.length - 1; i++) {
    const a = ticksY[i];
    const b = ticksY[i + 1];
    for (let j = 1; j <= minorCount; j++) {
      minorTicksY.push(a + ((b - a) * j) / (minorCount + 1));
    }
  }

  const makePath = (key: keyof InvestmentScenario) =>
    data.map((d, i) => `${i ? 'L' : 'M'} ${sx(d.year)} ${sy(d[key])}`).join(' ');

  const makeArea = (top: keyof InvestmentScenario, bottom: keyof InvestmentScenario): string => {
    return `M ${data.map((d) => `${sx(d.year)},${sy(d[top])}`).join(' L ')} L ${[...data]
      .reverse()
      .map((d) => `${sx(d.year)},${sy(d[bottom])}`)
      .join(' L ')} Z`;
  };

  return (
    <div className={styles.chartContainer}>
      <svg width={CONFIG.width} height={CONFIG.height} style={{ maxWidth: '100%' }}>
        <defs>
          <linearGradient id={`optimisticG-${id}`} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={COLORS.optimistic} stopOpacity='0.3' />
            <stop offset='100%' stopColor={COLORS.optimistic} stopOpacity='0.1' />
          </linearGradient>
          <linearGradient id={`conservativeG-${id}`} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={COLORS.conservative} stopOpacity='0.3' />
            <stop offset='100%' stopColor={COLORS.conservative} stopOpacity='0.1' />
          </linearGradient>
          <linearGradient id={`expectedG-${id}`} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={COLORS.expected} stopOpacity='0.3' />
            <stop offset='100%' stopColor={COLORS.expected} stopOpacity='0.1' />
          </linearGradient>
        </defs>
        <g transform={`translate(${CONFIG.pad.l}, ${CONFIG.pad.t})`}>
          {minorTicksY.map((tick) => (
            <line
              key={'minor-' + tick}
              x1={0}
              y1={sy(tick)}
              x2={w}
              y2={sy(tick)}
              stroke={COLORS.grid}
              strokeWidth={1}
            />
          ))}

          {ticksY.map((tick) => (
            <g key={tick}>
              <line
                x1={0}
                y1={sy(tick)}
                x2={w}
                y2={sy(tick)}
                stroke={COLORS.grid}
                strokeWidth={1}
              />
              <text
                x={-10}
                y={sy(tick)}
                textAnchor='end'
                fontSize='14'
                fill={COLORS.text}
                fontFamily={FONT_FAMILY}
              >
                {format(tick)}
              </text>
            </g>
          ))}
          {years.map((year) => (
            <line
              key={year}
              x1={sx(year)}
              y1={0}
              x2={sx(year)}
              y2={h}
              stroke={COLORS.grid}
              strokeWidth={1}
            />
          ))}
          {data.length > 1 && (
            <>
              <path d={makeArea('expected', 'conservative')} fill={`url(#expectedG-${id})`} />
              <path d={makeArea('conservative', 'optimistic')} fill={`url(#conservativeG-${id})`} />
              <path
                d={`M ${data.map((d) => `${sx(d.year)},${sy(d.optimistic)}`).join(' L ')} L ${[
                  ...data,
                ]
                  .reverse()
                  .map((d) => `${sx(d.year)},${h}`)
                  .join(' L ')} Z`}
                fill={`url(#optimisticG-${id})`}
              />
            </>
          )}
          <path
            d={makePath('optimistic')}
            fill='none'
            stroke={COLORS.optimistic}
            strokeWidth={CONFIG.stroke}
          />
          <path
            d={makePath('conservative')}
            fill='none'
            stroke={COLORS.conservative}
            strokeWidth={CONFIG.stroke}
          />
          <path
            d={makePath('expected')}
            fill='none'
            stroke={COLORS.expected}
            strokeWidth={CONFIG.stroke}
          />
          {data.map((d) =>
            ['optimistic', 'conservative', 'expected'].map((k) => (
              <circle
                key={k + d.year}
                cx={sx(d.year)}
                cy={sy(d[k as keyof InvestmentScenario])}
                r={CONFIG.point}
                fill={COLORS[k as keyof typeof COLORS]}
              />
            ))
          )}
          {years.map((year) => (
            <text
              key={year}
              x={sx(year)}
              y={h + 20}
              textAnchor='middle'
              fontSize='12'
              fill={COLORS.text}
              fontFamily={FONT_FAMILY}
            >
              {year}
            </text>
          ))}
        </g>
        <g transform={`translate(${CONFIG.width / 2 - 240}, ${CONFIG.height - 10})`}>
          {[
            { color: COLORS.optimistic, label: 'Optimistic Estimate', x: 0 },
            { color: COLORS.conservative, label: 'Conservative Estimate', x: 160 },
            { color: COLORS.expected, label: 'Expected Yield', x: 320 },
          ].map(({ color, label, x }) => (
            <g key={label} transform={`translate(${x}, 0)`}>
              <line x1={-8} y1={0} x2={8} y2={0} stroke={color} strokeWidth={CONFIG.stroke} />
              <circle cx={0} cy={0} r={CONFIG.point} fill={color} />
              <text x={15} y={4} fontSize='14' fill={COLORS.text} fontFamily={FONT_FAMILY}>
                {label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

import { useMemo } from 'react';
import { ServerResultItem } from '../types';
import styles from './InvestmentChart.module.scss';

const CONFIG = {
  width: 860,
  height: 600,
  pad: { t: 10, r: 40, b: 60, l: 150 },
  tickCount: 6,
  stroke: 2,
  point: 3,
} as const;

const COLORS = {
  primary: '#4CAF50',
  grid: '#E0E0E0',
  text: '#666',
} as const;

const FONT_FAMILY = 'Nunito';

const formatCurrency = (value: number): string => `$${Math.round(value).toLocaleString()}`;

interface SingleInvestmentChartProps {
  data: ServerResultItem[];
}

export const SingleInvestmentChart = ({ data }: SingleInvestmentChartProps) => {
  const chartId = useMemo(() => `single-chart-${Math.random().toString(36).slice(2, 9)}`, []);

  const chartData = useMemo(() => {
    if (!data.length) return null;

    const years = data.map((d) => d.year);
    const fundSizes = data.map((d) => d.fund_size);

    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const minValue = Math.max(
      0,
      Math.min(...fundSizes) - (Math.max(...fundSizes) - Math.min(...fundSizes)) * 0.1
    );
    const maxValue = Math.max(...fundSizes) + ((Math.max(...fundSizes) - minValue) * 0.1 || 10000);

    return { years, fundSizes, minYear, maxYear, minValue, maxValue };
  }, [data]);

  const yTicks = useMemo(() => {
    if (!chartData) return [];
    const { minValue, maxValue } = chartData;
    return Array.from(
      { length: CONFIG.tickCount },
      (_, i) => minValue + (i * (maxValue - minValue)) / (CONFIG.tickCount - 1)
    );
  }, [chartData]);

  const minorYTicks = useMemo(() => {
    if (!yTicks.length) return [];
    const minorTicks: number[] = [];
    const minorCount = 2;

    for (let i = 0; i < yTicks.length - 1; i++) {
      const current = yTicks[i];
      const next = yTicks[i + 1];

      for (let j = 1; j <= minorCount; j++) {
        minorTicks.push(current + ((next - current) * j) / (minorCount + 1));
      }
    }
    return minorTicks;
  }, [yTicks]);

  const linePath = useMemo(() => {
    if (!chartData) return '';
    const { minYear, maxYear, minValue, maxValue } = chartData;
    const chartWidth = CONFIG.width - CONFIG.pad.l - CONFIG.pad.r;
    const chartHeight = CONFIG.height - CONFIG.pad.t - CONFIG.pad.b;

    const scaleX = (year: number): number =>
      ((year - minYear) / (maxYear - minYear || 1)) * chartWidth;
    const scaleY = (value: number): number =>
      chartHeight - ((value - minValue) / (maxValue - minValue || 1)) * chartHeight;

    return data
      .map(
        (item, index) => `${index === 0 ? 'M' : 'L'} ${scaleX(item.year)} ${scaleY(item.fund_size)}`
      )
      .join(' ');
  }, [data, chartData]);

  const areaPath = useMemo(() => {
    if (!chartData) return '';
    const { minYear, maxYear, minValue, maxValue } = chartData;
    const chartWidth = CONFIG.width - CONFIG.pad.l - CONFIG.pad.r;
    const chartHeight = CONFIG.height - CONFIG.pad.t - CONFIG.pad.b;

    const scaleX = (year: number): number =>
      ((year - minYear) / (maxYear - minYear || 1)) * chartWidth;
    const scaleY = (value: number): number =>
      chartHeight - ((value - minValue) / (maxValue - minValue || 1)) * chartHeight;

    const topPath = data
      .map((item) => `${scaleX(item.year)},${scaleY(item.fund_size)}`)
      .join(' L ');
    const bottomPath = data
      .map((item) => `${scaleX(item.year)},${chartHeight}`)
      .reverse()
      .join(' L ');
    return `M ${topPath} L ${bottomPath} Z`;
  }, [data, chartData]);

  if (!chartData) return null;

  const { years, minYear, maxYear, minValue, maxValue } = chartData;
  const chartWidth = CONFIG.width - CONFIG.pad.l - CONFIG.pad.r;
  const chartHeight = CONFIG.height - CONFIG.pad.t - CONFIG.pad.b;

  const scaleX = (year: number): number =>
    ((year - minYear) / (maxYear - minYear || 1)) * chartWidth;
  const scaleY = (value: number): number =>
    chartHeight - ((value - minValue) / (maxValue - minValue || 1)) * chartHeight;

  return (
    <div className={styles.chartContainer}>
      <svg width={CONFIG.width} height={CONFIG.height} style={{ maxWidth: '100%' }}>
        <defs>
          <linearGradient id={`gradient-${chartId}`} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={COLORS.primary} stopOpacity='0.3' />
            <stop offset='100%' stopColor={COLORS.primary} stopOpacity='0.1' />
          </linearGradient>
        </defs>

        <g transform={`translate(${CONFIG.pad.l}, ${CONFIG.pad.t})`}>
          {minorYTicks.map((tick) => (
            <line
              key={`minor-${tick}`}
              x1={0}
              y1={scaleY(tick)}
              x2={chartWidth}
              y2={scaleY(tick)}
              stroke={COLORS.grid}
              strokeWidth={0.5}
              opacity={0.5}
            />
          ))}

          {yTicks.map((tick) => (
            <g key={`major-${tick}`}>
              <line
                x1={0}
                y1={scaleY(tick)}
                x2={chartWidth}
                y2={scaleY(tick)}
                stroke={COLORS.grid}
                strokeWidth={1}
              />
              <text
                x={-10}
                y={scaleY(tick)}
                textAnchor='end'
                dominantBaseline='middle'
                fontSize='14'
                fill={COLORS.text}
                fontFamily={FONT_FAMILY}
              >
                {formatCurrency(tick)}
              </text>
            </g>
          ))}

          {years.map((year) => (
            <line
              key={`grid-${year}`}
              x1={scaleX(year)}
              y1={0}
              x2={scaleX(year)}
              y2={chartHeight}
              stroke={COLORS.grid}
              strokeWidth={1}
              opacity={0.3}
            />
          ))}

          {data.length > 1 && <path d={areaPath} fill={`url(#gradient-${chartId})`} />}

          <path
            d={linePath}
            fill='none'
            stroke={COLORS.primary}
            strokeWidth={CONFIG.stroke}
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          {data.map((item) => (
            <circle
              key={`point-${item.year}`}
              cx={scaleX(item.year)}
              cy={scaleY(item.fund_size)}
              r={CONFIG.point}
              fill={COLORS.primary}
              stroke='white'
              strokeWidth={1}
            />
          ))}

          {years
            .filter((_, index) => {
              const totalYears = years.length;
              let interval = 1;

              if (totalYears > 40) interval = 10;
              else if (totalYears > 20) interval = 5;
              else if (totalYears > 10) interval = 2;

              return index % interval === 0 || index === totalYears - 1;
            })
            .map((year) => (
              <text
                key={`label-${year}`}
                x={scaleX(year)}
                y={chartHeight + 20}
                textAnchor='middle'
                fontSize='12'
                fill={COLORS.text}
                fontFamily={FONT_FAMILY}
              >
                {year}
              </text>
            ))}
        </g>

        <g transform={`translate(${CONFIG.width / 2 - 60}, ${CONFIG.height - 10})`}>
          <line x1={-8} y1={0} x2={8} y2={0} stroke={COLORS.primary} strokeWidth={CONFIG.stroke} />
          <circle cx={0} cy={0} r={CONFIG.point} fill={COLORS.primary} />
          <text x={15} y={4} fontSize='14' fill={COLORS.text} fontFamily={FONT_FAMILY}>
            Fund Size
          </text>
        </g>
      </svg>
    </div>
  );
};

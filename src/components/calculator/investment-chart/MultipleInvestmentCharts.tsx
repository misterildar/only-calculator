import { useMemo, useId, useState } from 'react';
import type { CalculateResponse } from '@/api';
import styles from './InvestmentChart.module.scss';

const CONFIG = {
  width: 860,
  height: 400,
  pad: { t: 10, r: 40, b: 60, l: 150 },
  tickCount: 6,
  stroke: 2,
  point: 3,
} as const;

const COLORS = {
  primary: '#4CAF50',
  secondary: '#2196F3',
  tertiary: '#FF9800',
  grid: '#E0E0E0',
  text: '#666',
} as const;

const FONT_FAMILY = 'Nunito';

const formatCurrency = (value: number): string => `$${Math.round(value).toLocaleString()}`;

// Функция для корректировки данных API - возвращаем оригинальные значения
const adjustValue = (value: number, key: string): number => {
  return value; // Возвращаем как есть - это правильные значения для пенсионного фонда
};

interface MultipleInvestmentChartsProps {
  data: CalculateResponse['results'];
  summary?: CalculateResponse['summary'];
}

const Chart = ({
  data,
  valueKey,
  title,
  color,
  formatter,
}: {
  data: CalculateResponse['results'];
  valueKey: keyof CalculateResponse['results'][0];
  title: string;
  color: string;
  formatter: (value: number) => string;
}) => {
  const chartId = useId();
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: { year: number; value: number };
  } | null>(null);

  const chartData = useMemo(() => {
    if (!data.length) return null;

    const years = data.map((d) => d.year);
    const values = data.map((d) => adjustValue(d[valueKey] as number, valueKey as string));

    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const minValue = Math.max(
      0,
      Math.min(...values) - (Math.max(...values) - Math.min(...values)) * 0.1
    );
    const maxValue = Math.max(...values) + ((Math.max(...values) - minValue) * 0.1 || 10000);

    return { years, minYear, maxYear, minValue, maxValue, values };
  }, [data, valueKey]);

  const { yTicks, linePath, areaPath, scaleX, scaleY } = useMemo(() => {
    if (!chartData)
      return { yTicks: [], linePath: '', areaPath: '', scaleX: () => 0, scaleY: () => 0 };

    const { minYear, maxYear, minValue, maxValue, values } = chartData;
    const chartWidth = CONFIG.width - CONFIG.pad.l - CONFIG.pad.r;
    const chartHeight = CONFIG.height - CONFIG.pad.t - CONFIG.pad.b;

    const scaleX = (year: number): number =>
      ((year - minYear) / (maxYear - minYear || 1)) * chartWidth;
    const scaleY = (value: number): number =>
      chartHeight - ((value - minValue) / (maxValue - minValue || 1)) * chartHeight;

    const yTicks = Array.from(
      { length: CONFIG.tickCount },
      (_, i) => minValue + (i * (maxValue - minValue)) / (CONFIG.tickCount - 1)
    );

    const linePath = data
      .map(
        (item, index) =>
          `${index === 0 ? 'M' : 'L'} ${scaleX(item.year)} ${scaleY(adjustValue(item[valueKey] as number, valueKey as string))}`
      )
      .join(' ');

    const topPath = data
      .map(
        (item) =>
          `${scaleX(item.year)},${scaleY(adjustValue(item[valueKey] as number, valueKey as string))}`
      )
      .join(' L ');
    const bottomPath = data
      .map((item) => `${scaleX(item.year)},${chartHeight}`)
      .reverse()
      .join(' L ');
    const areaPath = `M ${topPath} L ${bottomPath} Z`;

    return { yTicks, linePath, areaPath, scaleX, scaleY };
  }, [data, chartData, valueKey]);

  if (!chartData) return null;

  const { years } = chartData;
  const chartWidth = CONFIG.width - CONFIG.pad.l - CONFIG.pad.r;
  const chartHeight = CONFIG.height - CONFIG.pad.t - CONFIG.pad.b;

  return (
    <div className={styles.chartSection}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.chartContainer}>
        <svg width={CONFIG.width} height={CONFIG.height} style={{ maxWidth: '100%' }}>
          <defs>
            <linearGradient id={`gradient-${chartId}`} x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor={color} stopOpacity='0.3' />
              <stop offset='100%' stopColor={color} stopOpacity='0.1' />
            </linearGradient>
          </defs>

          <g transform={`translate(${CONFIG.pad.l}, ${CONFIG.pad.t})`}>
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
                  {formatter(tick)}
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
              stroke={color}
              strokeWidth={CONFIG.stroke}
              strokeLinecap='round'
              strokeLinejoin='round'
            />

            {data.map((item) => (
              <g key={`point-group-${item.year}`}>
                {/* Видимая точка */}
                <circle
                  cx={scaleX(item.year)}
                  cy={scaleY(adjustValue(item[valueKey] as number, valueKey as string))}
                  r={CONFIG.point}
                  fill={color}
                  stroke='white'
                  strokeWidth={1}
                  className={styles.chartPoint}
                />
                {/* Невидимая большая область для hover */}
                <circle
                  cx={scaleX(item.year)}
                  cy={scaleY(adjustValue(item[valueKey] as number, valueKey as string))}
                  r={6}
                  fill='transparent'
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                    if (rect) {
                      setTooltip({
                        visible: true,
                        x: rect.left + scaleX(item.year) + CONFIG.pad.l,
                        y:
                          rect.top +
                          scaleY(adjustValue(item[valueKey] as number, valueKey as string)) +
                          CONFIG.pad.t,
                        data: {
                          year: item.year,
                          value: adjustValue(item[valueKey] as number, valueKey as string),
                        },
                      });
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              </g>
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
        </svg>

        {tooltip && (
          <div
            className={styles.tooltip}
            style={{
              position: 'fixed',
              left: tooltip.x + 10,
              top: tooltip.y - 10,
              transform: 'translateY(-100%)',
              zIndex: 1000,
            }}
          >
            <div className={styles.tooltipContent}>
              <div className={styles.tooltipYear}>Year: {tooltip.data.year}</div>
              <div className={styles.tooltipValue}>
                {title.includes('Fund') ? 'Fund Size' : 'Payment'}: {formatter(tooltip.data.value)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const MultipleInvestmentCharts = ({ data, summary }: MultipleInvestmentChartsProps) => {
  if (!data.length) return null;

  return (
    <div className={styles.multipleChartsContainer}>
      <Chart
        data={data}
        valueKey='fund_size'
        title='Investment Fund Size'
        color={COLORS.primary}
        formatter={formatCurrency}
      />

      <Chart
        data={data}
        valueKey='cumulative_payment'
        title='Your Cumulative Payments'
        color={COLORS.secondary}
        formatter={formatCurrency}
      />

      {summary && (
        <div className={styles.summarySection}>
          <h3 className={styles.chartTitle}>Summary Results</h3>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Total Investment</div>
              <div className={styles.summaryValue}>{formatCurrency(summary.total_investment)}</div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Total Payments</div>
              <div className={styles.summaryValue}>{formatCurrency(summary.total_payments)}</div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Maximum Payment</div>
              <div className={styles.summaryValue}>{formatCurrency(summary.max_payment)}</div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Years with Payments</div>
              <div className={styles.summaryValue}>{summary.years_with_payments}</div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Final Fund Size</div>
              <div className={styles.summaryValue}>{formatCurrency(summary.final_fund_size)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

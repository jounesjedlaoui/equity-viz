import { useEffect, useRef, useState } from "react";
import type { DataDisplayProps } from "../../types/propTypes";
import {
  createChart,
  type IChartApi,
  type CandlestickData,
  CandlestickSeries,
  type Time,
  type ISeriesApi,
} from 'lightweight-charts';
import { orderedIntervals, type Candle, type IntervalKey } from "../../types/types";
import { getItem } from "../../modules/api";
import { intervalsInMs } from "../../modules/helpers";

export default function DataDisplay({type, ticker} : DataDisplayProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const dataRef = useRef<Candle[] | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    const [timespan, setTimespan] = useState<IntervalKey>('month');

    useEffect(() => {
        if (!containerRef.current || chartRef.current) return;


        const chartOptions = { 
            width: containerRef.current!.clientWidth, 
            height: 600 , 
            layout: { 
                textColor: 'white', 
                background: { color: '#000' } 
                } 
            };
        const options = { 
            upColor: '#26a69a', 
            downColor: '#ef5350', 
            borderVisible: false, 
            wickUpColor: '#26a69a', 
            wickDownColor: '#ef5350', 
            wickVisible: true
        };
    
        chartRef.current = createChart(containerRef.current!, chartOptions);
        seriesRef.current = chartRef.current.addSeries(CandlestickSeries, options);
    }, [])


    useEffect(() => {
        console.log(dataRef.current)
        if (!chartRef.current || !seriesRef.current) return;

        const D = new Date();
        const F = new Date(D.getTime() - intervalsInMs[timespan]);

        const to = `${D.getFullYear()}-${String(D.getMonth() + 1).padStart(2, '0')}-${String(D.getDate()).padStart(2, '0')}`;
        const from = `${F.getFullYear()}-${String(F.getMonth() + 1).padStart(2, '0')}-${String(F.getDate()).padStart(2, '0')}`;

        console.log( timespan ,orderedIntervals.indexOf(timespan) -2)
        let rangeTimespan = orderedIntervals[orderedIntervals.indexOf(timespan) - 2];
        rangeTimespan = rangeTimespan === 'second' ? 'hour' : rangeTimespan;

        getItem({
            url: `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/${rangeTimespan}/${from}/${to}?adjusted=true&sort=asc&limit=120`,
        }).then((res) => {
                const candles: CandlestickData[] = res.results.map((d: Candle) => ({
                open: d.o,
                high: d.h,
                low: d.l,
                close: d.c,
                time: Math.floor(d.t / 1000) as Time,
            }));

            seriesRef.current!.setData(candles);
            chartRef.current!.timeScale().fitContent();
        })
        .catch((e) => console.log("Error fetching chart data:", e));
    }, [timespan, ticker]);

    return (
        <>
            <div className="interval-selection">
                <button style={{backgroundColor: timespan === 'day' ? '#646cff':''}} onClick={() => setTimespan('day')}>1 Day</button>
                <button style={{backgroundColor: timespan === 'week' ? '#646cff':''}} onClick={() => setTimespan('week')}>1 Week</button>
                <button style={{backgroundColor: timespan === 'month' ? '#646cff':''}} onClick={() => setTimespan('month')}>1 Month</button>
                <button style={{backgroundColor: timespan === 'quarter' ? '#646cff':''}} onClick={() => setTimespan('quarter')}>1 Quarter</button>
                <button style={{backgroundColor: timespan === 'year' ? '#646cff':''}} onClick={() => setTimespan('year')}>1 Year</button>
            </div>
            <div ref={containerRef} className="chart-container"></div>
        </>
    )
}
import type { presetIntervals } from "../types/types";

/**
 * Formats a large number to be more easily readable
 * @param value Raw marketcap
 * @returns string - formatted Market cap (1.5B, 23M,...)
 */
export function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000_000) {
    return (value / 1_000_000_000_000).toFixed(1) + "T";
  } else if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1) + "B";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + "K";
  } else {
    return value.toString();
  }
}

/**
 * static durations of intervals for data display to - from params
 */
export const intervalsInMs: presetIntervals = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,                        // 3,600,000
    day: 1000 * 60 * 60 * 24,                    // 86,400,000
    week: 1000 * 60 * 60 * 24 * 7,               // 604,800,000
    month: 1000 * 60 * 60 * 24 * 30.44,          // ~2,629,743,999.9999995 (average month)
    quarter: 1000 * 60 * 60 * 24 * 30.44 * 3,    // ~7,889,231,999.999999
    year: 1000 * 60 * 60 * 24 * 365.25,  
}
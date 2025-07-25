/**
 * User type. Ended up not being used
 */
export type User = {
    username: string,
}


/**
 * Simple GET-Request. using in api.tsx
 */
export type GetRequest = {
    url: string
}

/**
 * Single Candle-Graph Column
 */
export type Candle = {
    v: number,
    vw: number,
    o: number,
    c: number,
    h: number,
    l: number,
    t: number,
    n: number
}

/**
 * Data displayed in dataDisplay
 */
export type ChartData = {
    data: Candle[],
}

/**
 * PreviousDay Response Object
 */
export type PrevDayResponse = {
    T: "AAPL",
    v: number,
    vw: number,
    o: number,
    c: number,
    h: number,
    l: number,
    t: number,
    n: number
}

/**
 * Respose object for polygon query
 */
export type PolygonSearchResponse = {
    active: boolean,
    currency_name: string,
    last_updated_utc: Date ,
    locale: string,
    market: string,
    name: string,
    primary_exchange: string,
    share_class_figi: string,
    ticker: string,
    type: string,
}

/**
 * Inerval enums. Represent timeframes to be inspected in chart
 */
export type IntervalKey = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
// Exist to dynamically select values by key in orderedIntervals
export type presetIntervals = Record<IntervalKey, number>;
export const orderedIntervals: IntervalKey[] = ['second', 'minute' , 'hour', 'day', 'week', 'month', 'quarter', 'year'];

export type User = {
    username: string,
}



export type GetRequest = {
    url: string
}

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

export type ChartData = {
    data: Candle[],
}

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


export type IntervalKey = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

export type presetIntervals = Record<IntervalKey, number>;
export const orderedIntervals: IntervalKey[] = ['second', 'minute' , 'hour', 'day', 'week', 'month', 'quarter', 'year'];

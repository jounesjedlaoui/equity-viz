import type { Candle } from "./types"

export type TickerCardProps = {
      ticker: string,
      name: string,
      market: string,
      locale: string,
      primary_exchange: string,
      type: string,
      active: boolean,
      currency_name: string,
      composite_figi: string,
      share_class_figi: string
      last_updated_utc: string,
}

export type TickerDetailProps = {
    id: string
}

export type DataDisplayProps = {
    type: string,
    ticker: string
}

export type previousDayProps = {
  currency_name: string,
  ticker: string
}

export type DailyTicketSummary = {
  status: string,
  from: string,
  symbol: string,
  open: number
  high: number
  low: number
  close: number,
  volume: number,
  afterHours: number,
  preMarket: number
}
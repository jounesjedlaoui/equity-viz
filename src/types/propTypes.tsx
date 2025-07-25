
/**
 * Theoretically for a reusable Card. Was not really worth using with the limit on amount of requests
 */
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

/**
 * Props for DataDisplay Component. type could be used to switch between different chart types
 */
export type DataDisplayProps = {
    type: string,
    ticker: string
}

/**
 * Props for previousDay Component.
 */
export type previousDayProps = {
  currency_name: string,
  ticker: string
}

/**
 * Props for 
 */
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
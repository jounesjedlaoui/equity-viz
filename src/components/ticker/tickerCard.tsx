import type { TickerCardProps } from "../../types/propTypes";

export default function TickerCard(props: TickerCardProps) {
    // const dummy = {
    //   active: true,
    //   cik: "0001090872",
    //   composite_figi: "BBG000BWQYZ5",
    //   currency_name: "usd",
    //   last_updated_utc: "2021-04-25T00:00:00Z",
    //   locale: "us",
    //   market: "stocks",
    //   name: "Agilent Technologies Inc.",
    //   primary_exchange: "XNYS",
    //   share_class_figi: "BBG001SCTQY4",
    //   ticker: "A",
    //   type: "CS"
    // }
    return (
        <>
            <div className="ticker-card">
                <section>
                    <h4>{props.ticker}</h4>
                    <div>{props.active}</div>
                </section>

                <section>
                    <p>{props.market}</p>
                </section>

            </div>
        </>
    )

}
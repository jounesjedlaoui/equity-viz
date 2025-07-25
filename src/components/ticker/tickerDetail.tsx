import { useEffect, useRef, useState } from "react"
import type { TickerDetailProps, DailyTicketSummary } from "../../types/propTypes"
import DataDisplay from "./dataDisplay"
import PreviousDay from "./previousDay"
import './tickerDetail.css'
import { getItem } from "../../modules/api"
import { useGlobalStore } from "../../modules/store"
import { formatMarketCap } from "../../modules/helpers"




export default function TickerDetail({id}: TickerDetailProps) {
    const dailySummary= useRef<DailyTicketSummary | null>(null)
    const isInitialized = useRef<boolean>(false);
    const {selectedTicker} = useGlobalStore();
    const [currentTicker, setCurrentTicker] = useState({
        branding: {icon_url: ''},
        locale: 'us',
        ticker: 'AAPL',
        name: 'Apple Inc',
        currency_name: 'USD',
        market_cap: 0,
    });    

    useEffect(() => {
        if(dailySummary.current || isInitialized.current) return;

        fetch(`https://api.polygon.io/v3/reference/tickers/${selectedTicker}?apiKey=FkWqVMJsI09MUDdKC2T50_Mq8IxNCzRR`)
        .then(res => {
            console.log(res)
            res.json()
            .then(r => {
                console.log(r)
                setCurrentTicker(r.results)
            });
        })
        
    }, [selectedTicker])
    
    return (
        <>
            { currentTicker && 
            <div className="ticker-detail" >
                <section className="left-side">
                    <header className="td-header" >
                        <div>
                            <div className="td-icon">
                                <img className="stock-icon" src={currentTicker.branding.icon_url + '?apiKey=FkWqVMJsI09MUDdKC2T50_Mq8IxNCzRR'} />
                                <h1>{currentTicker.ticker}</h1>
                                <button>+Watchlist</button>
                                <div  style={{backgroundColor: currentTicker.active ? 'green' : 'red'}}></div>

                            </div>  
                            
                            <h3>{currentTicker.name}</h3>
                        </div>
                        
                            

                        <PreviousDay ticker={selectedTicker} currency_name={currentTicker.currency_name.toUpperCase()}/>

                    </header>

                    <hr />
                    <section>
                        
                        <DataDisplay type={"candlestick"} ticker={selectedTicker}/>
                    </section>

                </section>
                <section>
                
                <section className="right-side">
                    <h2>Details</h2>
                    <p>{currentTicker.description}</p>
                    <hr/>
                    <p><strong>SIC Description: </strong>{currentTicker.sic_description}</p>
                    <p><strong>Market: </strong>{currentTicker.primary_exchange}</p>
                    <p><strong>Market Cap: </strong>{formatMarketCap(currentTicker.market_cap)}</p>
                    <p><strong>Location: </strong>{currentTicker.locale.toUpperCase()}, {currentTicker.address?.city}</p>


                </section>
                </section>
            </div>
            
            }
        </>
    )
}
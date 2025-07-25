import { useEffect, useRef, useState } from "react";
import { getItem } from "../../modules/api";
import type { previousDayProps } from "../../types/propTypes";
import type { PrevDayResponse } from "../../types/types";

export default function PreviousDay({currency_name, ticker} : previousDayProps) {
    // Dummy response in case Polygon free tier runs out
    const dummy_response: PrevDayResponse = {
            T: "AAPL",
            v: 46404072,
            vw: 213.6492,
            o: 213.14,
            c: 214.4,
            h: 214.95,
            l: 212.2301,
            t: 1753214400000,
            n: 549182
    }
    const [prevDay, setPrevDay] = useState<PrevDayResponse>(dummy_response);
    const [closeDifference, setCloseDifference] = useState('');
    const [differencePercentage, setDifferencePercentage] = useState(0);
    const [differenceIsPositive, setDifferenceIsPositive] = useState(false);

    const isInitialized = useRef<boolean>(false);

    useEffect(() => {
        try {
            if(isInitialized.current) return;

            getItem({url: `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true` }).then(res => {
                setPrevDay(res.results[0])
    
                setCloseDifference((prevDay.c - prevDay.o).toFixed(2));
                setDifferencePercentage(((prevDay.c - prevDay.o) / prevDay.c) * 100);
                setDifferenceIsPositive(Number(closeDifference) > 0);

                isInitialized.current = true;
            })
            
        } catch(e) {
            console.log(e)
        }
    })

    return (
        <>
            <div className="previous-day">
                <p>Previous day closing price</p>

                <div className="pd-close">
                    <h3>{currency_name}</h3>
                    <h1>{prevDay.c}</h1>
                </div>
                <div className="pd-trend" style={{color: differenceIsPositive ? 'green' : 'red'} }>
                    <h4>{`${differenceIsPositive ? '+' : '-'}${closeDifference}`}</h4>
                    <h4>{`${differenceIsPositive ? '+' : '-'}${differencePercentage.toFixed(2) + '%'}`}</h4>
                </div>
            </div>
        </>
    )
}


import { useState } from 'react'
import './App.css'
import Header from './components/header/header'
import TickerDetail from './components/ticker/tickerDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <Header/>
      </header>

      <main className="main-container">
        <TickerDetail id="AAPL" />
      </main>

  
    </>
  )
}

export default App

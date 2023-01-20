import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Demo from './Components/Demo';
import Ingresos from './Components/Ingresos';
import Gastos from './Components/Gastos';
import Inversiones from './Components/Inversiones'
import Cashflow from './Components/Cashflow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Demo />}>
        </Route>
        <Route exact path="/ingresos" element={<Ingresos />}>
        </Route>
        <Route exact path="/gastos" element={<Gastos />}>
        </Route>
        <Route exact path="/inversiones" element={<Inversiones />} />
        <Route exact path="/cashflow" element={<Cashflow />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

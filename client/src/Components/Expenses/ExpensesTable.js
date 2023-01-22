import { useState, useEffect } from 'react'

function ExpensesTables () {

    const [lastExpenses, setLastExpenses] = useState([])

    const getLastTenExpenses = () => {
        const requiredOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch('/expenses', requiredOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setLastExpenses(data);
            })
    }

    useEffect(() => getLastTenExpenses(), [])

    return (
        <table className='table table-striped'>
        <thead>
            <tr>
                <th scope='col'>Fecha</th>
                <th scope='col'>Cuenta</th>
                <th scope='col'>Moneda</th>
                <th scope='col'>Importe</th>
                <th scope='col'>Medio de pago</th>
            </tr>
        </thead>
        <tbody>
        {
            lastExpenses.map(e => <tr>
                <td>{e.date}</td>
                <td>{e.debit}</td>
                <td>{e.debitCurrency}</td>
                <td>{e.debitAmount}</td>
                <td>{e.credit}</td>
            </tr>)
        }
        </tbody>
    </table>

    )
}

export default ExpensesTables
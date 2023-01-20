import { useState, useEffect } from 'react'

function Cashflow() {

    const [cashflow, setCashflow] = useState([])

    const getCashFlows = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'password-security': 'g4t0n3gr0' }
        };

        await fetch('/cashflow/flow', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setCashflow(data);
                console.log(data)
            })
    }

    useEffect(() => getCashFlows, [])

    return (
        <div className='container'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Bono</th>
                        <th scope='col'>Fecha de pago</th>
                        <th scope='col'>Monto de pago</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cashflow.map(e => <tr>
                        <td>{e.bondName}</td>
                        <td>{e.dateInterest}</td>
                        <td>{e.amountInterest}</td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default Cashflow
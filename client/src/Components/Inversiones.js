import { useState, useEffect } from 'react'

function Inversiones() {
    // cargar cotizaciones
    const guardarCotizaciones = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quotes: mensaje })
        };

        fetch("/quotes", requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))

        console.log("paso1")
        
        fetch("/tir/daily")
            .then((res) => res.json())
            .then((data) => console.log(data))

        console.log("paso2")
    }

    const [mensaje, setMensaje] = useState(0)

    const handleChange = (event) => {
        setMensaje(event.target.value)
    }

    // ver cotizaciones
    const [cotizacion, setCotizacion] = useState([])
    const verCotizaciones = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch("/lastvalue", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setCotizacion(data)
                console.log(data)
            });
    }

    useEffect(() => verCotizaciones(), []);

    return (
        <div className="container">
            <h1>Inversiones</h1>
            <h3>Ingrese las cotizaciones en formato JSON aquí:</h3>
            <textarea rows={10} cols={50} className="form-control" onChange={handleChange}></textarea>
            <button onClick={guardarCotizaciones} className="btn btn-dark">Actualizar cotizaciones</button>
            <button onClick={verCotizaciones} className="btn btn-dark">Ver cotizaciones</button>

            <table className='table table-striped'>
                <thead>
                <tr>
                    <th scope='col'>Ticket</th>
                    <th scope='col'>Fecha</th>
                    <th scope='col'>Ùltimo precio</th>
                    <th scope='col'>Precio de cierre</th>
                    <th scope='col'>Volumen</th>
                    <th scope='col'>TIR</th>
                </tr>
                </thead>
                <tbody>
                {
                    cotizacion.map(e => <tr>
                        <td>{e.bondName}</td>
                        <td>{e.date}</td>
                        <td>{e.lastPrice}</td>
                        <td>{e.closePrice}</td>
                        <td>{e.volume}</td>
                        <td></td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default Inversiones
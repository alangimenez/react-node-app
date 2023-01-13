import { useState, useEffect } from 'react'

function Inversiones() {
    // cargar cotizaciones
    const guardarCotizaciones = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quotes: mensaje, password: mensajeInput })
        };

        const requestOptionsTir = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({password: mensajeInput})
        }

        const throwError = () => {
            throw Error("I'm an error");
            };

        try {
            console.log("0")

            await fetch("/quotes", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if(data.error_message) {
                    console.log(data.error_message);
                    throwError()
                } else {
                    console.log(data)
                }
            })
        
        console.log("1")

        await fetch("/lastvalue", requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))

        console.log("2")

        await fetch("/tir/daily", requestOptionsTir)
            .then((res) => res.json())
            .then((data) => console.log(data))

        console.log("3")

        await fetch("/lastvalue/tir")
            .then((res) => res.json())
            .then((data) => {
                setCotizacion(data)
                console.log(data)
            })

        } catch (e) {
            console.log("hoal" + e)
        }
    }

    const [mensaje, setMensaje] = useState(0)

    const handleChangeTextarea = (event) => {
        setMensaje(event.target.value)
    }

    const [mensajeInput, setMensajeInput] = useState("")

    const handleChangeInput = (event) => {
        setMensajeInput(event.target.value)
    }

    // ver cotizaciones
    const [cotizacion, setCotizacion] = useState([])
    const verCotizaciones = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch("/lastvalue/tir", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setCotizacion(data)
                console.log(data)
            });
    }

    // useEffect(() => verCotizaciones(), []);

    return (
        <div className="container">
            <h1>Inversiones</h1>
            <h3>Ingrese las cotizaciones en formato JSON aquí:</h3>
            <textarea rows={10} cols={50} className="form-control" onChange={handleChangeTextarea}></textarea>
            <button onClick={guardarCotizaciones} className="btn btn-dark">Actualizar cotizaciones</button>
            <button onClick={verCotizaciones} className="btn btn-dark">Ver cotizaciones</button>
            <div >
                <label htmlFor='password'>Password</label>
                <input id="password" className='form-control' onChange={handleChangeInput} style={{width: 200 + 'px'}} type='password'></input>
            </div>

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
                        <td>{e.tir}</td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default Inversiones
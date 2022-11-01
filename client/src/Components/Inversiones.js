import {useState} from 'react'

function Inversiones() {
    const guardarCotizaciones = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quotes: mensaje })
        };

        fetch("/quotes", requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data));
    }
    const [mensaje, setMensaje] = useState(0)

    const handleChange = (event) => {
        setMensaje(event.target.value)
    }

    return (
        <div className="container">
            <h1>Inversiones</h1>
            <h3>Ingrese las cotizaciones en formato JSON aquí:</h3>
            <textarea rows={10} cols={50} className="form-control" onChange={handleChange}></textarea>
            <button onClick={guardarCotizaciones} className="btn btn-dark">Actualizar cotizaciones</button>
        </div>
    )
}

export default Inversiones
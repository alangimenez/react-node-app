import { useState, useEffect } from 'react'

function Inversiones() {
    // cargar cotizaciones

    const [mensajeInput, setMensajeInput] = useState("")

    const handleChangeInput = (event) => {
        setMensajeInput(event.target.value)
    }
    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'password-security': mensajeInput }
    }

    const guardarCotizaciones = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'password-security': mensajeInput },
            body: JSON.stringify({ quotes: mensaje })
        };

        const requestOptionsTir = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'password-security': mensajeInput },
            body: JSON.stringify({ password: mensajeInput })
        }

        const throwError = () => {
            throw Error("I'm an error");
        };

        try {

            await fetch("/quotes", requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    if (data.error_message) {
                        console.log(data.error_message);
                        throwError()
                    } else {
                        console.log(data)
                    }
                })


            await fetch("/lastvalue", requestOptions)
                .then((res) => res.json())
                .then((data) => console.log(data))


            await fetch("/tir/daily", requestOptionsTir)
                .then((res) => res.json())
                .then((data) => console.log(data))



            await fetch("/lastvalue/tir", requestOptionsGet)
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


    // ver cotizaciones
    const [cotizacion, setCotizacion] = useState([])
    const verCotizaciones = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch("/lastvalue/tir", requestOptionsGet)
            .then((res) => res.json())
            .then((data) => {
                setCotizacion(data)
                console.log(data)
            });
    }

    // save investment register
    const saveInvestment = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'password-security': mensajeInput },
            body: JSON.stringify({
                "name": document.getElementById("nameOfAsset").value,
                "ticket": document.getElementById("ticket").value,
                "purchaseDate": document.getElementById("purchaseDate").value,
                "quantity": document.getElementById("quantity").value,
                "purchasePrice": document.getElementById("purchasePrice").value,
                "currency": document.getElementById("currency").value,
                "assetType": document.getElementById("assetType").value,
                "operation": document.getElementById("operation").value
            })
        }

        fetch('/investment', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))
    }

    useEffect(() => { }, [cotizacion]);

    return (
        <div className="container">
            <h1>Inversiones</h1>
            <h3>Ingrese las cotizaciones en formato JSON aquí:</h3>
            <textarea rows={10} cols={50} className="form-control" onChange={handleChangeTextarea}></textarea>
            <button onClick={guardarCotizaciones} className="btn btn-dark">Actualizar cotizaciones</button>
            <button onClick={verCotizaciones} className="btn btn-dark">Ver cotizaciones</button>
            <div >
                <label htmlFor='password'>Password</label>
                <input id="password" className='form-control' onChange={handleChangeInput} style={{ width: 200 + 'px' }} type='password'></input>
            </div>


            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

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

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>


                                <div className="form-group">
                                    <label htmlFor="nameOfAsset">Name of asset</label>
                                    <input className="form-control" id="nameOfAsset" aria-describedby="emailHelp"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ticket">Ticket</label>
                                    <input className="form-control" id="ticket"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="purchaseDate">Purchase date</label>
                                    <input type="date" className="form-control" id="purchaseDate"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input type="number" className="form-control" id="quantity"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="purchasePrice">Purchase price</label>
                                    <input type="number" className="form-control" id="purchasePrice"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="currency">Currency</label>
                                    <select id="currency" className="form-control">
                                        <option selected>USD</option>
                                        <option>ARS</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="assetType">Asset Type</label>
                                    <select id="assetType" className="form-control">
                                        <option selected>ADR</option>
                                        <option>CEDEAR</option>
                                        <option>Obligación negociable</option>
                                        <option>Título público</option>
                                        <option>Cripto</option>
                                        <option>FCI</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="operation">Operation</label>
                                    <select id="operation" className="form-control">
                                        <option selected>Buy</option>
                                        <option>Sell</option>
                                    </select>
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveInvestment}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Inversiones
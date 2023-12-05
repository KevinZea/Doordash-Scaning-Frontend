import React from 'react'
import './Page1.css'
import { useEffect, useState } from 'react'

import shield from './img/shield.svg'
import logo from './img/logo.svg'
import telefono from './img/telefono1x.png'
import mensaje from './img/mensaje_negro1x.png'
import person from './img/person-walking-solid.svg'
import mensaje1x from './img/mensaje1x.png'
import algo from './img/algo_largo1x.png'
import once from './img/el_11x.png'
import suspensive from './img/suspensive.svg'
import shop from './img/shop.svg'

import axios from 'axios'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'

export default function Page1() {
    const { id } = useParams()
    const api = process.env.REACT_APP_API
    const [nombre, setNombre] = useState("")
    const [items, setItems] = useState([])
    const [hora, setHora] = useState("")
    const [restaurant, setRestaurant] = useState("")
    const [status, setStatus] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios(api + id);
                const { data } = response
                if (data) {
                    setNombre(data.name);
                    let arrayPedido = data.pedido.split(",");
                    arrayPedido.pop();
                    setItems(arrayPedido);
                    setRestaurant(data.restaurant)
                    setStatus(data.status)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        const ahora = new Date();
        const horas = ahora.getHours();
        const minutos = ahora.getMinutes();

        // Formatear la hora en formato de 12 horas
        const formato12Horas = (horas % 12 || 12) + ':' + (minutos < 10 ? '0' : '') + minutos;

        setHora(formato12Horas);

    }, [])

    async function handleStatus(){
        await axios.put(api + "status/" + id, {status: true})
    }
    return (
        <div>
            <nav>
                <ul>
                    <NavLink exact to={"/"}>
                        <a>
                            <li>
                                <i class="fa-solid fa-arrow-left" style={{ "color": "#131313;" }} />
                            </li>
                        </a>
                    </NavLink>
                </ul>

                <h1>Pick up by {hora}...</h1>

                <ul>

                    <i class="fa-solid fa-list-ul" style={{ "color": "#131313;" }}></i>

                    <div class="escudo">

                        <img src={shield} alt="" />
                    </div>

                    <i class="fa-regular fa-circle-question" style={{ "color": "#131313;" }}></i>

                </ul>
            </nav>
            <div>
                <section>


                    <div class="cajaespacio"></div>


                    <div class="fila1">

                        <div class="cajatextos">

                            <div class="logo">

                                <img src={logo} />

                                <div class="titulo">

                                    <h3>Order for</h3>

                                </div>



                            </div>

                        </div>

                        <div class="cajasicon">

                            <div class="caja1">

                                <img src={telefono} />
                            </div>

                            <div class="caja2">

                                <img src={mensaje} />
                            </div>

                        </div>

                    </div>

                    <div class="titulo2">

                        <h1>{nombre}</h1>

                    </div>


                    <hr class="linea"></hr>

                    <div class="fila2">

                        <div class="mensaje">
                            <img src={person} />
                        </div>

                        <div class="cajitatextual">

                            <p>Pickup Window</p>
                            <h4>Pick up in the lobby. If the lobby is closed <br /> closed, then use drive-thru lane.</h4>

                        </div>

                    </div>

                    <hr class="linea"></hr>

                    <div class="fila3">

                        <div class="cajitatextual">

                            <div class="mensaje">
                                <img src={mensaje1x} />
                            </div>

                            <div class="titulolinea">

                                <p>Frequently Missed Items</p>

                            </div>

                        </div>

                        <div class="flecha">

                            <i class="fa-solid fa-angle-down" style={{ "color": "#131313;" }}></i>

                        </div>


                    </div>

                    <h4>Sauce packets are frequently missing <br /> from customer orders. Please confirm s...</h4>



                    <hr class="linea"></hr>

                    <div class="fila4">

                        <div class="cajitatextual">

                            <div class="mensaje">
                                <img src={algo} />
                            </div>

                            <div class="titulolinea">

                                <p>1 item</p>

                            </div>

                        </div>

                        <div class="flecha">

                            <i class="fa-solid fa-angle-up" style={{ "color": "#000000;" }}></i>

                        </div>


                    </div>
                    {items.length > 0 && (
                        items.map((p) => {
                            return (

                                <div class="cajitatextual2">

                                    <div class="mensaje2">
                                        <img src={once} />

                                        <div class="titulolinea2">

                                            <h2>{p}</h2>

                                            <div class="imagen">
                                                <div class="puntos">
                                                    <img src={suspensive} alt="" />

                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            )
                        })
                    )}


                    <div class="contendor">

                        {/* <div class="parrafo">

                            <p>Three-Chesse Blend - Would you <br /> like to change this?: Three-Chesse <br />Blend <br /> Creamy Jalapeño Sauce - Wolud <br /> you like to change this?: Creamy <br /> Jalapeño Sauce</p>


                        </div> */}

                        {/* <div class="imagen">
                            <div class="puntos">
                                <img src={suspensive} alt="" />

                            </div>
                        </div> */}

                    </div>

                    <hr class="linea"></hr>

                    <div class="fila5">

                        <div class="cajitatextual">

                            <div class="mensaje">
                                <img src={shop} />
                            </div>



                            <div class="titulolinea">

                                <p>{restaurant}</p>

                            </div>

                        </div>

                        <div class="contendor">

                            <div class="flecha">

                                <img src={telefono} />

                            </div>

                        </div>


                    </div>


                    <hr class="linea"></hr>
                    <NavLink exact to={"/page2/" + id} onClick={(e) => {handleStatus(e)}}>

                        <div class="cajaboton">
                            <div class="boton">
                                <h1>Continue</h1>
                            </div>

                        </div>
                    </NavLink>
                </section>
            </div >
        </div >
    )
}

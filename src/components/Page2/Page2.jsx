import React from 'react';
import './Page2.css'; // Cambié el nombre del archivo CSS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

import mapaImage from './img/mapa.png';
import shieldImage from './img/shield.svg';
import telefonoImage from './img/telefono1x.png';
import mensajeNegroImage from './img/mensaje_negro1x.png';
import casitaImage from './img/casita1x.png';
import mensajeImage from './img/mensaje1x.png';
import algoLargoImage from './img/algo_largo1x.png';
import elImage from './img/el_11x.png';

const TuComponente = () => {
    const { id } = useParams()
    const api = process.env.REACT_APP_API
    const [nombre, setNombre] = useState("")
    const [items, setItems] = useState([])
    const [hora, setHora] = useState("")
    const [restaurant, setRestaurant] = useState("")

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
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, []);
    return (
        <>
            <div>
                {/* NAV */}
                <nav className="tu-nav"> {/* Cambié la clase */}
                    <ul className="tu-ul"> {/* Cambié la clase */}
                        <NavLink exact to={"/page1/" + id}>
                            <li>
                                <i className="fa-solid fa-arrow-left" style={{ color: '#131313' }}></i>
                            </li>
                        </NavLink>
                    </ul>

                    <h1>Deliver by 2:47...</h1>

                    <ul className="tu-ul"> {/* Cambié la clase */}
                        <i className="fa-solid fa-list-ul" style={{ color: '#131313' }}></i>

                        <div className="tu-escudo"> {/* Cambié la clase */}
                            <img src={shieldImage} alt="" />
                        </div>

                        <i className="fa-regular fa-circle-question" style={{ color: '#131313' }}></i>
                    </ul>
                </nav>

                {/* CONTENIDO */}
                {/* MAPA */}
                <section className="tu-section"> {/* Cambié la clase */}
                    <div className="tu-mapa"> {/* Cambié la clase */}
                        <img src={mapaImage} alt="Mapa" />

                        <div className="tu-caja1"> {/* Cambié la clase */}
                            <h2>$25.00</h2>
                            <p>this dash</p>
                        </div>

                        <div className="tu-caja2"> {/* Cambié la clase */}
                            <h2>$0.00</h2>
                            <p>this offer</p>
                        </div>
                    </div>

                    <div className="tu-slide"> {/* Cambié la clase */}
                        <div className="tu-hijo"></div>
                    </div>

                    {/* FILA 1 */}
                    <div className="tu-fila1"> {/* Cambié la clase */}
                        <div className="tu-cajatextos"> {/* Cambié la clase */}
                            <h3>Delivery for</h3>
                            <h1>{nombre}</h1>
                            <h2>Order includes</h2>
                        </div>

                        <div className="tu-cajasicon"> {/* Cambié la clase */}
                            <div className="tu-caja1"> {/* Cambié la clase */}
                                <img src={telefonoImage} alt="Teléfono" />
                            </div>

                            <div className="tu-caja2"> {/* Cambié la clase */}
                                <img src={mensajeNegroImage} alt="Mensaje Negro" />
                            </div>
                        </div>
                    </div>
                    <div className="tu-boton"></div>

                    <hr className="tu-linea" />

                    {/* FILA 2 */}
                    <div className="tu-fila2"> {/* Cambié la clase */}
                        <div className="tu-casa"> {/* Cambié la clase */}
                            <img src={casitaImage} alt="Casita" />
                        </div>

                        <div className="tu-cajatextos"> {/* Cambié la clase */}
                            <h2>50 Greenwich Street</h2>
                            <p>New York, NY 10006, USA</p>
                        </div>
                    </div>

                    <div className="tu-dessert2"> {/* Cambié la clase */}
                        <i className="fa-solid fa-diamond-turn-right" style={{ color: '#000000' }}></i>
                        <h5>Directions</h5>
                    </div>

                    <hr className="tu-linea" />

                    {/* FILA 3 */}
                    <div className="tu-fila3"> {/* Cambié la clase */}
                        <div className="tu-mensaje"> {/* Cambié la clase */}
                            <img src={mensajeImage} alt="Mensaje" />
                        </div>

                        <div className="tu-cajitatextual"> {/* Cambié la clase */}
                            <p>Leave it at the door</p>
                            <h4>Leave it at the door</h4>
                        </div>
                    </div>

                    <hr className="tu-linea" />

                    {/* FILA 4 */}
                    <div className="tu-fila4"> {/* Cambié la clase */}
                        <div className="tu-titulo1"> {/* Cambié la clase */}
                            <div className="tu-prueba"> {/* Cambié la clase */}
                                <div className="tu-mensajelargo"> {/* Cambié la clase */}
                                    <img src={algoLargoImage} alt="Algo Largo" />
                                </div>
                                <div className="tu-titulo1">
                                    <h4>{restaurant} ({items.length} item)</h4>
                                </div>
                            </div>
                            <div className="tu-flecha"> {/* Cambié la clase */}
                                <i className="fa-solid fa-angle-up" style={{ color: '#000000' }}></i>
                            </div>
                        </div>
                        {items.length > 0 && (
                            items.map((p) => {
                                return (
                                    <div className="tu-titulo2">
                                        <div className="tu-circulo">
                                            <img src={elImage} alt="El" />
                                        </div>
                                        <h3>{p}</h3>
                                    </div>
                                )
                            })
                        )}

                    </div>

                    <div className="tu-dessert3"> {/* Cambié la clase */}
                        <i className="fa-solid fa-ice-cream" style={{ color: '#00968b' }}></i>
                        <h5>Dessert</h5>
                    </div>

                    <hr className="tu-linea" />

                    {/* BOTON */}
                    <div className="tu-cajaboton"> {/* Cambié la clase */}
                        <div className="tu-boton"> {/* Cambié la clase */}
                            <h1>Complete delivery steps</h1>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default TuComponente;

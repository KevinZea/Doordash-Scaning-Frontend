// Importar los componentes necesarios de react, chakra ui y axios
import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, IconButton, useColorModeValue, Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Tarjeta from '../Tarjeta/Tarjeta'
import Install from '../Install/Install'
import { NavLink } from "react-router-dom";

const api = process.env.REACT_APP_API

// Definir el componente Vacio que se muestra cuando el arreglo de la api está vacío
const Vacio = () => {
  // Definir el color del texto y el botón según el tema naranja oscuro
  const color = useColorModeValue("orange.600", "orange.800");

  // Retornar el componente que muestra el título y el botón que redirige a /send
  return (
    <Box w="full" h="full" p="4" textAlign="center">
      <Heading as="h3" size="lg" color={color}>
        Aún no tienes nada agregado
      </Heading>
      <Button
        mt="4"
        colorScheme="orange"
        onClick={() => {
          // Redirigir a /send
          window.location.href = "/send";
        }}
      >
        Agregar
      </Button>
      <Install></Install>
    </Box>
  );
};

// Definir el componente principal que consume la api y genera las tarjetas
// Definir el componente principal que consume la api y genera las tarjetas
const Componente = () => {
  // Definir el estado que almacena el arreglo de datos de la api
  const [datos, setDatos] = useState([]);

  // Definir el efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Definir la función asíncrona que hace la petición a la api
    const fetchData = async () => {
      try {
        // Obtener la respuesta de la api
        const response = await axios.get(api);
        // Actualizar el estado con los datos de la respuesta
        setDatos(response.data);
      } catch (error) {
        // Manejar el error
        console.error(error);
      }
    };
    // Invocar la función
    fetchData();
  }, []);

  // Retornar el componente que muestra las tarjetas o el componente vacío según el estado
  return (
    <Box w="full" h="full" p="4">
      {datos.length > 0 ? (
        // Si el arreglo de datos no está vacío, mostrar las tarjetas
        <Flex wrap="wrap" justify="center" align="center" flexDirection={"column"}>
          {datos.map((dato) => (
            // Para cada elemento del arreglo, crear una tarjeta con sus propiedades
            <Tarjeta
              key={dato.id}
              nombre={dato.name}
              status={dato.status}
              id={dato.id}
            />
          ))}
          <NavLink exact to={"/send"}>
            <IconButton
              aria-label="Agregar"
              icon={<FaPlus />}
              colorScheme="orange"
              size="lg"

            />
          </NavLink>
        </Flex>
      ) : (
        // Si el arreglo de datos está vacío, mostrar el componente vacío
        <Vacio />
      )}
      <Install></Install>

    </Box>
  );
};


// Exportar el componente principal
export default Componente;

// Importar los componentes necesarios de react y chakra ui
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Box, Heading, FormControl, FormLabel, Input, Button, useColorModeValue, useToast, Text } from "@chakra-ui/react";
import axios from "axios";
// Definir el componente que muestra el formulario
const Formulario = () => {
  const { id } = useParams()
  const api = process.env.REACT_APP_API
  // Definir el estado que almacena los valores de los campos
  const [nombre, setNombre] = useState("");
  const [pedido, setPedido] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [status, setStatus] = useState(false)

  // Definir el color del texto y el botón según el tema naranja oscuro
  const color = useColorModeValue("orange.600", "orange.800");

  // Definir el hook useToast para mostrar mensajes estilizados
  const toast = useToast();
  // setear los datos guardados
  useEffect(async () => {
    try {
      const { data } = await axios(api + id)
      setNombre(data.name)
      setPedido(data.pedido)
      setRestaurante(data.restaurant)
      setStatus(data.status)

    } catch (error) {
      console.log(error)
    }
  }, [])
  // Definir la función que se ejecuta al hacer clic en el botón de confirmar
  const handleClick = async () => {
    // Verificar si los campos están llenos
    if (nombre && pedido && restaurante) {
      try {

        await axios.put(api + "update/" + id, { name: nombre, pedido, restaurant: restaurante })
        toast({
          title: "Formulario enviado",
          description: `Gracias, ${nombre}. Tu pedido de ${pedido} en el restaurante ${restaurante} ha sido editado.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Reiniciar los valores de los campos
        localStorage.setItem("response", '')
        setNombre("");
        setPedido("");
        setRestaurante("");
        window.location.href = "/"
      } catch (error) {
        console.log(error)
      }
      // Mostrar un mensaje de éxito estilizado
    } else {
      // Mostrar un mensaje de error estilizado
      toast({
        title: "Formulario incompleto",
        description: "Por favor, llena todos los campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  async function handleStatus() {
    await axios.put(api + "status/" + id, { status: !status })
    window.location.reload()
  }

  // Retornar el componente que muestra el título y los campos del formulario
  return (
    <Box w="full" h="full" p="4" textAlign="center">
      <Heading as="h3" size="lg" color={color}>
        Formulario de pedido
      </Heading>
      <FormControl id="nombre" mt="4">
        <FormLabel>Nombre</FormLabel>
        <Input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </FormControl>
      <FormControl id="pedido" mt="4">
        <FormLabel>Pedido</FormLabel>
        <Input
          type="text"
          value={pedido}
          onChange={(e) => setPedido(e.target.value)}
        />
      </FormControl>
      <FormControl id="restaurante" mt="4">
        <FormLabel>Restaurante</FormLabel>
        <Input
          type="text"
          value={restaurante}
          onChange={(e) => setRestaurante(e.target.value)}
        />
      </FormControl>
      <Box>
        <Button colorScheme="orange" mt="3" onClick={handleStatus}>
          Cambiar Status
        </Button>
        {status ? (

          <Text color={"green"}>Confirmado</Text>

        ) :
          <Text color={"red"}>Sin Confirmar</Text>
        }
      </Box>
      <Button colorScheme="orange" mt="4" onClick={handleClick}>
        Confirmar
      </Button>
    </Box>
  );
};

// Exportar el componente
export default Formulario;

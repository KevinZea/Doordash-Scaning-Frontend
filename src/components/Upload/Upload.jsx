// Importar los componentes necesarios de react, chakra ui y axios
import React, { useState } from "react";
import { Box, Heading, Button, Input, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
// Definir el componente que permite subir un archivo y verificar si es una imagen
const SubirArchivo = () => {
    // Definir el estado que almacena el archivo seleccionado
    const [archivo, setArchivo] = useState(null);

    // Definir el color del texto y el botón según el tema naranja oscuro
    const color = useColorModeValue("orange.600", "orange.800");

    // Definir el hook useToast para mostrar mensajes estilizados
    const toast = useToast();

    // Definir la función que se ejecuta al cambiar el valor del input
    const handleChange = (e) => {
        // Obtener el archivo seleccionado
        const file = e.target.files[0];
        // Actualizar el estado con el archivo
        setArchivo(file);
    };

    // Definir la función que se ejecuta al hacer clic en el botón de subir
    const handleClick = async () => {
        // Verificar si el archivo es una imagen
        if (archivo && archivo.type.startsWith("image/")) {
            try {
                // Crear un objeto FormData para enviar el archivo a la api
                const formData = new FormData();
                formData.append("file", archivo);

                // Obtener la url de la api desde el archivo .env
                const url = process.env.REACT_APP_API + "upload";
                // console.log(url)
                // Enviar la petición de subir el archivo a la api con el método post
                const response = await axios.post(url, formData);
                localStorage.setItem('response', JSON.stringify(response))

                // Reiniciar el estado del archivo
                setArchivo(null);

                // Redirigir a /confirm
                window.location.href = "/confirm";
            } catch (error) {
                // Manejar el error
                console.error(error);
            }
        } else {
            // Mostrar un mensaje de error estilizado
            toast({
                title: "Archivo inválido",
                description: "Por favor, selecciona una imagen",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Retornar el componente que muestra el título, el input y el botón
    return (
        <Box w="full" h="full" p="4" textAlign="center">
            <Heading as="h3" size="lg" color={color}>
                Subir archivo
            </Heading>
            <Input
                type="file"
                accept="image/*"
                mt="4"
                mb="2"
                onChange={handleChange}
            />
            <Button colorScheme="orange" onClick={handleClick}>
                Subir
            </Button>
        </Box>
    );
};


// Exportar el componente
export default SubirArchivo;

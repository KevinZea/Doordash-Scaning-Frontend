// Importar la función useRef de react
import React, { useState, useRef } from "react";
import { Box, Flex, Heading, Text, IconButton, useColorModeValue, Button, Menu, MenuButton, MenuList, MenuItem, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import { NavLink } from "react-router-dom";
// Definir el componente Tarjeta que recibe los datos de cada elemento del arreglo de la api
const Tarjeta = ({ nombre, status, id }) => {
  const api = process.env.REACT_APP_API
  // Definir el color de fondo de la tarjeta según el tema naranja oscuro
  const bgColor = useColorModeValue("orange.600", "orange.800");

  // Definir el estado que almacena si se muestra o no el diálogo de confirmación para eliminar
  const [isOpen, setIsOpen] = useState(false);

  // Definir la referencia para el botón de cancelar
  const cancelRef = useRef();

  // Definir la función que se ejecuta al cerrar el diálogo
  const onClose = () => setIsOpen(false);

  // Definir la función que se ejecuta al confirmar la eliminación
  const onConfirm = async () => {
    try {
      // Enviar la petición de eliminar a la api con el id del elemento
      await axios.delete(api + "delete/" + id);
      window.location.reload()
      // Cerrar el diálogo
      onClose();
      // Actualizar el estado de los datos (aquí se puede usar una función que se pase como prop desde el componente principal)
      // Por ejemplo: actualizarDatos();
    } catch (error) {
      // Manejar el error
      console.error(error);
    }
  };

  // Retornar el componente que muestra el nombre, el status y el icono de opciones
  return (
    <Box
      w="300px"
      h="100px"
      p="4"
      m="2"
      bg={bgColor}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <NavLink exact to={"/page1/" + id}>
            <Heading as="h4" size="md" color="white">
              {nombre}
            </Heading>
          </NavLink>
          <Text fontSize="sm" color="whiteAlpha.900">
            {status ? (
              <span style={{ color: "green" }}>Confirmado</span>
            ) :
              <span style={{ color: "red" }}>Sin confirmar</span>
            }
          </Text>
        </Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Opciones"
            icon={<FaEllipsisV />}
            colorScheme="whiteAlpha"
          />
          <MenuList>
            <MenuItem
              onClick={() => {
                // Redirigir a /confirm/:id
                window.location.href = `/edit/${id}`;
              }}
            >
              Editar
            </MenuItem>
            <MenuItem
              onClick={() => {
                // Abrir el diálogo de confirmación para eliminar
                setIsOpen(true);
              }}
            >
              Eliminar
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar eliminación
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que quieres eliminar este elemento?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={onConfirm} ml={3}>
                Sí
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Tarjeta
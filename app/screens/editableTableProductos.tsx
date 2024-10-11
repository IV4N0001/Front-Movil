import React, { useState } from 'react';
import { API_URL } from '@/constants/config';
import EditableTable from '../../components/editableTable';
import AddGenericForm from '../../components/addGenericForm'; // Importa el formulario
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'nombre', title: 'Nombre' },
  { key: 'id_linea', title: 'ID Línea' },
  { key: 'id_sublinea', title: 'ID Sublínea' },
  { key: 'id_marca', title: 'ID Marca' }
];

const apiUrls = {
  fetchAll: `${API_URL}/productos/getProductos`,
  fetchById: (id: number) => `${API_URL}/productos/getProductosByID/${id}`,
  create: `${API_URL}/productos/registrarProducto`,
  update: (id: number) => `${API_URL}/productos/actualizarProducto/${id}`,
  delete: (id: number) => `${API_URL}/productos/eliminarProducto/${id}`,
};

export default function EditableTableProductos() {
  // Estado para controlar la visibilidad del formulario
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Manejo de la lógica al agregar un producto
  const handleAddProducto = (data: { nombre: string; id_marca: string; id_linea: string; id_sublinea: string; }) => {
    fetch(apiUrls.create, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Producto agregado exitosamente!');
          setIsFormVisible(false); // Oculta el formulario después de agregar
          // Aquí podrías actualizar la tabla para reflejar el nuevo producto
        } else {
          console.error('Error al agregar el producto:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error al hacer la solicitud:', error);
      });
  };

  return (
    <>
      {/* Aquí se renderiza la tabla editable */}
      <EditableTable columns={columns} apiUrls={apiUrls} entityName="Producto" />
      
      {/* Botón para abrir el formulario */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsFormVisible(true)}>
          <FontAwesome6 name="plus" size={24} color="white" />
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>

      {/* Renderiza el formulario si isFormVisible es true */}
    
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
});

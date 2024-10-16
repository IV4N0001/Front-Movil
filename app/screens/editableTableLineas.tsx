//editableTableLineas.tsx

import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import EditableTable from '../../components/editableTable';
import { API_URL } from '@/constants/config';
import AddGenericForm from '@/components/addGenericForm';

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'nombre', title: 'Nombre' },
];

export default function EditableTableLineas() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  const handleAddLinea = () => {
    // Aquí puedes agregar lógica adicional después de agregar la línea, como refrescar datos
    setIsFormVisible(false);
  };

  // Definimos las URLs de la API
  const apiUrls = {
    fetchAll: `${API_URL}/lineas/getLineas`,
    fetchById: (id: number) => `${API_URL}/lineas/getLineasByID/${id}`,
    create: `${API_URL}/lineas/registrarLinea`,
    update: (id: number) => `${API_URL}/lineas/actualizarLinea/${id}`,
    delete: (id: number) => `${API_URL}/lineas/eliminarLinea/${id}`,
  };

  return (
    <>
      {/* Renderiza la tabla editable */}
      <EditableTable columns={columns} entityName="linea" apiUrls={apiUrls} />

      {/* Botón para abrir el formulario */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsFormVisible(true)}>
          <FontAwesome6 name="plus" size={24} color="white" />
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>

      {/* Renderiza el formulario si isFormVisible es true */}
      {isFormVisible && (
        <AddGenericForm
          onAdd={handleAddLinea} // Llama a `handleAddLinea` para actualizar la tabla tras agregar la línea
          onCancel={handleCancel}
          apiUrls={apiUrls} // Pasamos la URL para crear la línea
          entityName={'linea'}        
        />
      )}
    </>
  );
}

// Estilos para el botón
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



import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import AddLineaForm from './addLineaForm';
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

  return (
    <>
      {/* Renderiza la tabla editable */}
      <EditableTable columns={columns} entityName="linea" apiUrls={{
        fetchAll: '',
        fetchById: () => { throw new Error('Function not implemented.'); },
        create: '',
        update: () => { throw new Error('Function not implemented.'); },
        delete: () => { throw new Error('Function not implemented.'); },
      }} />

      {/* Botón para abrir el formulario */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsFormVisible(true)}>
          <FontAwesome6 name="plus" size={24} color="white" />
          <Text style={styles.buttonText}>Agregar Línea</Text>
        </TouchableOpacity>
      </View>

      {/* Renderiza el formulario si isFormVisible es true */}
      {isFormVisible && (
        <AddGenericForm
          onAdd={handleAddLinea}
          onCancel={handleCancel}
          apiEndpoint={`${API_URL}/lineas/registrarLinea`} // Pasamos la URL aquí
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

import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { API_URL } from '@/constants/config';

interface LineaFormProps {
  onAdd: () => void; // Cambiamos aquí para indicar que no necesita parámetros
  onCancel: () => void;
}

const AddLineaForm: React.FC<LineaFormProps> = ({ onAdd, onCancel }) => {
  const [nombre, setNombre] = useState('');

  const handleAdd = async () => {
    const newLinea = { nombre };

    try {
      const response = await fetch(`${API_URL}/lineas/registrarLinea`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLinea),
      });

      if (response.ok) {
        console.log('Línea agregada exitosamente!');
        setNombre(''); // Reinicia el campo de entrada
        onAdd(); // Llama a la función onAdd para cerrar el formulario
      } else {
        console.error('Error al agregar la línea:', response.statusText);
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddLineaForm;

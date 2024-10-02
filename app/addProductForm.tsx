import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

interface ProductFormProps {
  onAdd: (product: { nombre: string; marca: string; cantidad: number }) => void;
  onCancel: () => void;
}

const AddProductForm: React.FC<ProductFormProps> = ({ onAdd, onCancel }) => {
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [cantidad, setCantidad] = useState(0);

  const handleAdd = async () => {
    const newProduct = { nombre, marca, cantidad };
    
    try {
      const response = await fetch('http://localhost:3000/products/createProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        onAdd(newProduct); // Llama a la función onAdd con el nuevo producto
        setNombre('');
        setMarca('');
        setCantidad(0);
      } else {
        console.error('Error al agregar el producto:', response.statusText);
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
      <TextInput
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
        style={styles.input}
      />
      <TextInput
        placeholder="Cantidad"
        value={String(cantidad)}
        onChangeText={(text) => setCantidad(Number(text))}
        keyboardType="numeric"
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

export default AddProductForm;

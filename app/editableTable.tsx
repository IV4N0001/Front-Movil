import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, TextInput, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

// Define la interfaz para los productos
interface Product {
  id: number;
  nombre: string;
  marca: string;
  cantidad: number;
}

export default function EditableTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [isFormVisible, setIsFormVisible] = useState(false); // Estado para el formulario
  const [newProduct, setNewProduct] = useState({ nombre: '', marca: '', cantidad: 0 }); // Estado para el nuevo producto

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/getProducts');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const from = page * rowsPerPage;
  const to = Math.min((page + 1) * rowsPerPage, products.length);

  const handleAddProduct = () => {
    // Lógica para agregar producto (aquí puedes enviar el nuevo producto a tu API)
    console.log('Nuevo producto:', newProduct);
    setIsFormVisible(false); // Ocultar formulario después de agregar
  };

  return (
    <SafeAreaView style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title>Marca</DataTable.Title>
          <DataTable.Title numeric>Cantidad</DataTable.Title>
        </DataTable.Header>

        {products.slice(from, to).map((product) => (
          <DataTable.Row key={product.id}>
            <DataTable.Cell style={styles.cell}>{product.id}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{product.nombre}</DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{product.marca}</DataTable.Cell>
            <DataTable.Cell style={styles.cell} numeric>{product.cantidad}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(products.length / rowsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`Página ${page + 1} de ${Math.ceil(products.length / rowsPerPage)}`}
        numberOfItemsPerPage={rowsPerPage}
        onItemsPerPageChange={(num) => {
          setRowsPerPage(num);
          setPage(0);
        }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setIsFormVisible(true)} // Mostrar formulario
        >
          <FontAwesome6 name="add" size={24} color="white" />
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>

      {/* Formulario flotante */}
      {isFormVisible && (
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Nombre"
            value={newProduct.nombre}
            onChangeText={(text) => setNewProduct({ ...newProduct, nombre: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Marca"
            value={newProduct.marca}
            onChangeText={(text) => setNewProduct({ ...newProduct, marca: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Cantidad"
            value={String(newProduct.cantidad)}
            onChangeText={(text) => setNewProduct({ ...newProduct, cantidad: Number(text) })}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Agregar" onPress={handleAddProduct} />
          <Button title="Cancelar" onPress={() => setIsFormVisible(false)} color="red" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 50,
    flex: 1,
  },
  cell: {
    paddingHorizontal: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: '10%',
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
    paddingHorizontal: 10,
  },
});

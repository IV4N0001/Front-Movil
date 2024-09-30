import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import AddProductForm from './addProductForm'; // Importa el nuevo componente

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
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  const handleAddProduct = (newProduct: { nombre: string; marca: string; cantidad: number }) => {
    // Aquí puedes enviar el nuevo producto a tu API y actualizar el estado
    console.log('Nuevo producto:', newProduct);
    setIsFormVisible(false);
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
          onPress={() => setIsFormVisible(true)} 
        >
          <FontAwesome6 name="add" size={24} color="white" />
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>

      {/* Muestra el formulario solo si está visible */}
      {isFormVisible && (
        <AddProductForm 
          onAdd={handleAddProduct} 
          onCancel={() => setIsFormVisible(false)} 
        />
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
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
});

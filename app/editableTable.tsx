import { Feather, FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import AddProductForm from './addProductForm';

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
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [editedFields, setEditedFields] = useState<{ [key: string]: any }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Para el modal

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products/getProducts');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const from = page * rowsPerPage;
  const to = Math.min((page + 1) * rowsPerPage, products.length);

  const handleAddProduct = (newProduct: { nombre: string; marca: string; cantidad: number }) => {
    setIsFormVisible(false);
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/products/deleteProduct/${id}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSave = async (id: number) => {
    const updatedProduct = { ...editedFields };
    try {
      await fetch(`http://localhost:3000/products/updateProduct/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );

      setEditingProduct(null);
      setEditedFields({});
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setEditedFields((prev) => ({ ...prev, [field]: value }));
  };

  // Función para abrir el modal
  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.titleCell}>ID</DataTable.Title>
              <DataTable.Title style={styles.titleCell}>Nombre</DataTable.Title>
              <DataTable.Title style={styles.titleCell}>Marca</DataTable.Title>
              <DataTable.Title numeric style={styles.titleCell}>Cantidad</DataTable.Title>
              <DataTable.Title numeric style={styles.titleCell}>Editar</DataTable.Title>
              <DataTable.Title numeric style={styles.titleCell}>Eliminar</DataTable.Title>
              <DataTable.Title numeric style={styles.titleCell}>Guardar</DataTable.Title>
            </DataTable.Header>

            {products.slice(from, to).map((product) => (
              <DataTable.Row key={product.id}>
                <DataTable.Cell style={styles.cell}>
                  <TouchableOpacity onPress={() => openModal(product)}>
                    <Text>{product.id}</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <TextInput
                    value={editingProduct === product.id ? (editedFields.nombre !== undefined ? editedFields.nombre : product.nombre) : product.nombre}
                    onChangeText={(text) => editingProduct === product.id && handleFieldChange('nombre', text)}
                    style={styles.input}
                    editable={editingProduct === product.id}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <TextInput
                    value={editingProduct === product.id ? (editedFields.marca !== undefined ? editedFields.marca : product.marca) : product.marca}
                    onChangeText={(text) => editingProduct === product.id && handleFieldChange('marca', text)}
                    style={styles.input}
                    editable={editingProduct === product.id}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <TextInput
                    value={editingProduct === product.id ? (editedFields.cantidad !== undefined ? editedFields.cantidad : product.cantidad) : product.cantidad}
                    onChangeText={(text) => editingProduct === product.id && handleFieldChange('cantidad', Number(text))}
                    keyboardType="numeric"
                    style={styles.input}
                    editable={editingProduct === product.id}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <TouchableOpacity onPress={() => setEditingProduct(product.id)}>
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <TouchableOpacity onPress={() => handleDelete(product.id)}>
                    <Feather name="delete" size={24} color="black" />
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <TouchableOpacity onPress={() => handleSave(product.id)} disabled={editingProduct !== product.id}>
                    <Feather name="save" size={24} color={editingProduct === product.id ? "black" : "gray"} />
                  </TouchableOpacity>
                </DataTable.Cell>
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
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsFormVisible(true)}>
          <FontAwesome6 name="add" size={24} color="white" />
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>

      {isFormVisible && (
        <AddProductForm 
          onAdd={handleAddProduct} 
          onCancel={() => setIsFormVisible(false)} 
        />
      )}

      {/* Modal para mostrar detalles del producto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedProduct}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Text style={styles.modalTitle}>{`Producto ID: ${selectedProduct.id}`}</Text>
                <Text>{`Nombre: ${selectedProduct.nombre}`}</Text>
                <Text>{`Marca: ${selectedProduct.marca}`}</Text>
                <Text>{`Cantidad: ${selectedProduct.cantidad}`}</Text>
              </>
            )}
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Obtener el ancho de la ventana
const { width: windowWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: windowWidth, 
    overflow: 'hidden',
  },
  tableContainer: {
    width: '100%', 
    maxWidth: windowWidth, 
    overflow: 'hidden', 
  },
  cell: {
    paddingVertical: 5,
    paddingHorizontal: -5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    minWidth: 50,
  },
  titleCell: {
    flex: 1,
    minWidth: 50,
  },
  input: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    width: '90%',
  },
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
  },
});

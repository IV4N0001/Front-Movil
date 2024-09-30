import { TextInput, StyleSheet, StatusBar, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// Define the props type
interface CustomButtonProps {
    title: string;
    onPress: () => void;
    style?: object; // Prop para estilo opcional
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}> {/* Asegúrate de aplicar el estilo aquí */}
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

export default function Product() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <CustomButton title="Agregar" onPress={() => alert("Agregar")} />
                <CustomButton title="Eliminar" onPress={() => alert("Eliminar")} />
                <CustomButton title="Actualizar" onPress={() => alert("Actualizar")} />
            </View>

            <TextInput style={styles.input} placeholder="Producto" placeholderTextColor="#1c2833" />
            <TextInput style={styles.input} placeholder="Marca" placeholderTextColor="#1c2833" />
            <TextInput style={styles.input} placeholder="Cantidad" placeholderTextColor="#1c2833" />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight || 0,
        marginBottom: 250,
    },
    buttonContainer: {
        flexDirection: 'row', // Establece la dirección del flex
        justifyContent: 'space-between', // Espacio entre botones
        width: '80%', // Ancho total del contenedor de botones
    },
    button: {
        backgroundColor: '#3498db', // Color de fondo
        paddingVertical: 15, // Espacio vertical
        flex: 1, // Hace que los botones ocupen el mismo ancho
        margin: 5, // Espacio entre botones
        borderRadius: 10, // Esquinas redondeadas
        elevation: 3, // Sombra en Android
        shadowColor: '#000', // Color de sombra
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
    },
    buttonText: {
        color: '#fff', // Color del texto
        fontSize: 12, // Tamaño del texto
        textAlign: 'center', // Centrar el texto
    },
    input: {
        height: 50,
        margin: 12,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f8f9f9',
        width: '80%',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 5,
    },
});

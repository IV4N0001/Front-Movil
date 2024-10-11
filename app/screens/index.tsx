import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
const logo = require('C:/Users/Desarrollo2/Desktop/front-movil/app-movil/assets/images/logo_babatsa.png');
/*
<Image 
    source={logo} // Ruta relativa
    style={styles.image}
/>
*/
const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la Aplicación</Text>
            <Text>BALEROS BANDAS Y TORNILLOS S.A. DE C.V.</Text>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16, // Añade algo de espacio alrededor
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    image: {
        width: '100%', // Ajusta al 100% del ancho del contenedor
        height: undefined, // Mantiene la proporción de aspecto
        aspectRatio: 3 / 1, // Ajusta la relación de aspecto según la imagen
        borderRadius: 10, // (Opcional) Añade bordes redondeados
    },
});

export default Home;

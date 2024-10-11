import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome5

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen 
                    name="index"
                    options={{
                        title: "Home",
                        drawerLabel: 'Home',
                        drawerIcon: () => (
                            <FontAwesome5 
                                name="home" // Specify the icon name
                                size={24} // Icon size
                                color="black" // Change color as needed
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="editableTableLineas"
                    options={{
                        title: "Líneas",
                        drawerLabel: "Lineas",
                        drawerIcon: () => (
                            <MaterialIcons name="factory" size={24} color="black" />                        
                        )
                    }}
                />
                <Drawer.Screen 
                    name="editableTableSublineas"
                    options={{
                        title: "Sublíneas",
                        drawerLabel: 'Sublineas',
                        drawerIcon: () => (
                            <FontAwesome5 name="industry" size={24} color="black" />                        
                        )
                    }}
                />
                <Drawer.Screen 
                    name="editableTableProductos" // Subimos dos niveles para llegar a components
                    options={{
                        title: "Productos",
                        drawerLabel: 'Productos',
                        drawerIcon: () => (
                            <MaterialIcons name="emoji-objects" size={24} color="black" />                        
                        )
                    }}
                />
                <Drawer.Screen 
                    name="editableTableMarcas" // Subimos dos niveles para llegar a components
                    options={{
                        title: "Marcas",
                        drawerLabel: 'Marcas',
                        drawerIcon: () => (
                            <MaterialCommunityIcons name="registered-trademark" size={24} color="black" />    
                        )
                    }}
                />
                <Drawer.Screen 
                    name="editableTableSucursales" // Subimos dos niveles para llegar a components
                    options={{
                        title: "Sucursales",
                        drawerLabel: 'Sucursales',
                        drawerIcon: () => (
                            <MaterialIcons name="point-of-sale" size={24} color="black" />    
                        )
                    }}
                />
                <Drawer.Screen 
                    name="logout"
                    options={{
                        drawerLabel: 'Logout',
                        drawerIcon: () => (
                            <Entypo name="log-out" size={24} color="black" />
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

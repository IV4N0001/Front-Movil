import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome5

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen 
                    name="index"
                    options={{
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
                    name="product"
                    options={{
                        drawerLabel: 'Productos',
                        drawerIcon: () => (
                            <MaterialIcons name="inventory" size={24} color="black" />
                        ),
                    }}
                />
                <Drawer.Screen 
                    name="editableTable"
                    options={{
                        drawerLabel: 'Lista',
                        drawerIcon: () => (
                            <FontAwesome5 name="search" size={24} color="black" />                        
                        ),
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

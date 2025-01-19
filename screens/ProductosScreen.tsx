import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList } from 'react-native';
import React from 'react';

interface Producto {
    id: number;
    nombre: string;
    cantidad: number;
    precio_final: number;
}

const productos: Producto[] = [
    { id: 1, nombre: 'Producto 1', cantidad: 2, precio_final: 20 },
    { id: 2, nombre: 'Producto 2', cantidad: 1, precio_final: 15 },
    { id: 3, nombre: 'Producto 3', cantidad: 3, precio_final: 30 },
    // Agrega más productos según sea necesario
];

export default function ProductosScreen() {
    const ProductoItem = ({ producto }: { producto: Producto }) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    Alert.alert(
                        'Producto Seleccionado',
                        `Producto: ${producto.nombre}\nCantidad: ${producto.cantidad}\nPrecio Final: $${producto.precio_final}`
                    )
                }
            >
                <View style={styles.item}>
                    <Text style={styles.productName}>{producto.nombre}</Text>
                    <Text style={styles.productDetails}>
                        Cantidad: {producto.cantidad} | Precio: ${producto.precio_final}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Productos</Text>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductoItem producto={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    item: {
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    productDetails: {
        fontSize: 14,
        color: '#777',
    },
});

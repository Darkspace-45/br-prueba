import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList } from "react-native";
import { db } from "../config/Config";
import { ref, onValue } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";

interface Producto {
    id: string;
    producto: string;
    cantidad: number;
    precio_final: number;
}

export default function ProductosScreen() {
    const [productos, setProductos] = useState<Producto[]>([]);

    // Función para obtener los productos desde Firebase
    useEffect(() => {
        const productosRef = ref(db, "productos");

        const unsubscribe = onValue(productosRef, (snapshot) => {
            const data = snapshot.val();
            console.log("Datos desde Firebase:", data);  // Verificar los datos obtenidos
            if (data) {
                const productosList: Producto[] = [];
                Object.keys(data).forEach((key) => {
                    const producto = data[key];
                    productosList.push({
                        id: key,
                        producto: producto.producto || "Producto Desconocido",
                        cantidad: producto.cantidad || 0,
                        precio_final: producto.precio_final || 0,
                    });
                });
                setProductos(productosList);
            } else {
                setProductos([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleProductoSelect = (producto: Producto) => {
        Alert.alert(
            "Producto Seleccionado",
            `Producto: ${producto.producto}\nCantidad: ${producto.cantidad}\nPrecio Final: $${producto.precio_final}`
        );
    };

    const ProductoItem = ({ producto }: { producto: Producto }) => {
        return (
            <TouchableOpacity onPress={() => handleProductoSelect(producto)}>
                <View style={styles.item}>
                    <Text style={styles.productName}>{producto.producto}</Text>
                    <Text style={styles.productDetails}>
                        Cantidad: {producto.cantidad} | Precio: ${producto.precio_final}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lista de Productos</Text>
            {productos.length > 0 ? (
                <FlatList
                    data={productos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ProductoItem producto={item} />}
                />
            ) : (
                <Text>No hay productos disponibles.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    item: {
        padding: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    productDetails: {
        fontSize: 14,
        color: "#777",
    },
});

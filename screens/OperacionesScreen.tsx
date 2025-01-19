import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { db } from "../config/Config";
import { ref, set } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";

export default function OperacionesScreen() {
    const [producto, setProducto] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [id, setId] = useState("");

    const handleGuardar = async () => {
        if (!producto || !precio || !cantidad || !id) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        if (parseFloat(precio) < 0) {
            Alert.alert("Error", "El precio no puede ser negativo.");
            return;
        }

        if (parseInt(cantidad) === 0) {
            Alert.alert("Advertencia", "La cantidad es 0. ¿Deseas continuar?", [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Aceptar",
                    onPress: async () => await guardarProducto(),
                },
            ]);
            return;
        }

        await guardarProducto();
    };

    const guardarProducto = async () => {
        const precioFinal = parseFloat(precio) * 1.15;

        try {
            const productosRef = ref(db, "productos/" + id);
            await set(productosRef, {
                producto,
                precio: parseFloat(precio),
                cantidad: parseInt(cantidad),
                precio_final: precioFinal,
            });

            Alert.alert("Éxito", "Producto guardado correctamente.");
            setId("");
            setProducto("");
            setPrecio("");
            setCantidad("");
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el producto.");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestión de Productos</Text>
            <View style={styles.inputContainer}>
                <Ionicons name="id-card" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="ID"
                    keyboardType="numeric"
                    value={id}
                    onChangeText={setId}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="pricetag" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Producto"
                    value={producto}
                    onChangeText={setProducto}
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="cash" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Precio"
                    keyboardType="numeric"
                    value={precio}
                    onChangeText={setPrecio}
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="layers" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Cantidad"
                    keyboardType="numeric"
                    value={cantidad}
                    onChangeText={setCantidad}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                <Text style={styles.buttonText}>Guardar Producto</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

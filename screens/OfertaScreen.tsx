import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function OfertaScreen() {
    const [productos, setProductos] = useState([]);
    const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://jritsqmet.github.io/web-api/productos2.json')
            .then(response => response.json())
            .then(data => {
                setProductos(data.productos); // Accedemos a la propiedad productos
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const handleItemPress = (imagenUrl: string) => {
        setImagenSeleccionada(imagenUrl);
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => handleItemPress(item.media.imagen_portada)}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.titulo}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ofertas</Text>

            {productos.length === 0 ? (
                <Text>No se han encontrado productos.</Text>
            ) : (
                <FlatList
                    data={productos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}

            {imagenSeleccionada && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imagenSeleccionada }} style={styles.selectedImage} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    itemName: {
        fontSize: 18,
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    selectedImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});

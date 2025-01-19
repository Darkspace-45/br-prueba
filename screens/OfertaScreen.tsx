import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

interface Oferta {
    id: number;
    nombre: string;
    precio_final: number;
    imagen: string;
}

export default function OfertaScreen() {
    const [ofertas, setOfertas] = useState<Oferta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://jritsqmet.github.io/web-api/productos2.json')
            .then((response) => response.json())
            .then((data) => {
                setOfertas(data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error al cargar los productos.');
                setLoading(false);
            });
    }, []);

    const OfertaItem = ({ oferta }: { oferta: Oferta }) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    Alert.alert('Producto en Oferta', `Precio Final: $${oferta.precio_final}`, [
                        { text: 'OK' },
                        {
                            text: 'Ver Imagen',
                            onPress: () => Alert.alert('Imagen', '', [{ text: 'Cerrar', onPress: () => { } }]),
                        },
                    ])
                }
            >
                <View style={styles.item}>
                    <Text style={styles.productName}>{oferta.nombre}</Text>
                    <Text style={styles.productPrice}>${oferta.precio_final}</Text>
                    <Image source={{ uri: oferta.imagen }} style={styles.image} />
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Cargando productos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Productos en Oferta</Text>
            <FlatList
                data={ofertas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <OfertaItem oferta={item} />}
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
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#007bff',
        marginVertical: 10,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'red',
    },
});

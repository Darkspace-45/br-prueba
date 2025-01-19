import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function WelcomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>WELCOME</Text>
            <Image source={require('../assets/img/tienda-de-juegos.png')}
                style={styles.image}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() => navigation.navigate('Login')}
                >Login</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>Diseñado por: Brian Rodriguez</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#531f32',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#531f32',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        marginTop: 30,
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});
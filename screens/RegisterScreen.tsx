import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../config/Config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);

                Alert.alert("Registro exitoso", "Te has registrado correctamente.");

                navigation.navigate('Login');
            } catch (error: any) {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert("Error", "Este correo electrónico ya está en uso.");
                } else if (error.code === 'auth/invalid-email') {
                    Alert.alert("Error", "Correo electrónico inválido.");
                } else if (error.code === 'auth/weak-password') {
                    Alert.alert("Error", "La contraseña es muy débil.");
                } else {
                    Alert.alert("Error", error.message);
                }
            }
        } else {
            Alert.alert("Error", "Por favor, ingresa todos los campos.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#777',
    },
    linkText: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

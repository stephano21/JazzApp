import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { colores } from '../../theme/appTheme';
import { NavigationContainer } from '@react-navigation/native';

interface OptionCardProps {
    iconSource: ImageSourcePropType;
    title: string;
    description: string;
    info: string;
    percent?: number;
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
}

export const HorizontalCard: React.FC<OptionCardProps> = ({ iconSource, title, description, info, percent, onPress, onLongPress }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.6}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Image source={iconSource} style={styles.icon} />

            <View style={styles.separator} />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.info}>{info}</Text>
                <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: percent ? `${percent}%` : '0%' }]} />

                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colores.primaryLight, //'#1E1E1E',  // Fondo oscuro
        borderRadius: 10,
        marginVertical: 10,
        padding: 15,
        elevation: 5,
        marginHorizontal: 10,
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    separator: {
        width: 1,  // Borde vertical para separación
        backgroundColor: colores.inactive, //'#B0B0B0',  // Gris claro para el borde
        marginHorizontal: 15,  // Espacio entre la imagen y el texto
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colores.primary,  // Texto principal en blanco
    },
    description: {
        fontSize: 14,
        color: colores.textSecondary,  // También blanco
        marginVertical: 2,
    },
    info: {
        fontSize: 12,
        color: '#B0B0B0',  // Texto secundario en gris claro
        marginBottom: 5,
    },
    progressBarContainer: {
        backgroundColor: colores.inactiveLight,  // Fondo oscuro para el progreso
        height: 5,
        borderRadius: 5,
        width: '100%',
        overflow: 'hidden',  // Para que el progreso no se salga de los bordes
    },
    progressBar: {
        height: 5,
        borderRadius: 5,
        backgroundColor: colores.primary,
        
    }
});

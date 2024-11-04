import React, { ReactNode, MouseEvent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { colores } from '../../theme/appTheme';

interface CardHorizontalProps {
    title: string;
    description: string;
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
}

export const Card: React.FC<CardHorizontalProps> = ({ title, description, onPress, onLongPress }) => {
    return (
        <TouchableOpacity 
        activeOpacity={0.6} 
        onPress={onPress} 
        onLongPress={onLongPress} 
        style={styles.card}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        margin: 5,
        backgroundColor: colores.secondary,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: colores.textPrimary,

    },
    description: {
        fontSize: 16,
        color: colores.textSecondary,
    },
    sindescription: {
        fontSize: 16,
        color: colores.inactive,
        fontStyle:"italic",
    },
});

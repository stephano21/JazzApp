import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { colores } from "../theme/appTheme";
import { IScore } from "../interfaces/ScoreInteface";

interface Props {
    color?: string;
    bagraundIcon?: string;
    colorTexto?: string;
    colorScore?: string;
    title?: string;
    width?: number | string;
    tamañoIcon?: number;
    redondo?: boolean;
    data?: IScore[];
    itemsPerRow?: number;
}

export const Counter = ({
    colorScore= colores.azul,
    data = [],
    itemsPerRow = 4
}: Props) => {
    const { UserData } = useContext(AuthContext);

    const itemWidth = 100 / (itemsPerRow+1)+3;

    return (
        <View style={styles.Container}>
            {data.map((item, index) => {
                return (
                    <View key={index} style={[styles.Sections, { width: `${itemWidth}%`, flexShrink: 0 }]}>
                        <View style={styles.iconArea}>
                            <Text style={[styles.number,{color:colorScore}]}>{item.score}</Text>
                        </View>
                        <View style={styles.textArea}>
                            <Text style={styles.label}>{item.label}</Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    Sections: {
        borderRadius: 8,
        margin: 2,
        flexDirection: 'column-reverse',
        alignItems: 'center',
        backgroundColor: colores.azulClaro,
        elevation: 5,
    },
    iconArea: {
        marginTop: 0
    },
    textArea: {
        marginTop: 0,
        width: '100%',
        padding: 0,
        backgroundColor: colores.azul
    },
    label: {
        color: colores.blanco,
        fontSize: 15,
        textAlign: 'center',
    },
    number: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sindescription: {
        fontSize: 16,
        color: colores.plomo,
        fontStyle: "italic",
    },
});

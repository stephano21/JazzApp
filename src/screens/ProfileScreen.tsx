import React, { useContext } from 'react';
import { BaseScreen } from '../templates/BaseScreen';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, iconos } from '../theme/appTheme';
import { ProfileStringsEs } from '../global/ProfileStrings';
import { ButtonWithText } from '../components/BaseComponents/ButtonWithText';

export const ProfileScreen = () => {
  const { UserData } = useContext(AuthContext);
  return (
    <BaseScreen>
      <>
        <Text style={styles.tilte} >{ProfileStringsEs.Title}</Text>
        <View style={styles.container}>
          <View >
            <Icon name={iconos.IonicIcons.usuario} size={50} color={colores.primario} />
            <Text style={styles.content}>{UserData.fullName}</Text>
          </View>
          <Text>{UserData.username}</Text>
          <Text>{UserData.role}</Text>
          <Text>{UserData.env}</Text> 
          <ButtonWithText
            anyfunction={() => { }}
            icon={iconos.IonicIcons.crear}
            color={colores.blanco}
            colorTexto={colores.primario}
            bagraundIcon={colores.blanco}
            title='Editar'></ButtonWithText>
        </View>
      </>
    </BaseScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colores.blanco,
    width: '90%',
    borderRadius: 20,
    padding: 20,
    borderWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  tilte: {
    fontSize: 30,
    color: colores.azul,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'left',
  },
  content: {
    fontSize: 20,
    color: colores.negro,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'left',
  },
});
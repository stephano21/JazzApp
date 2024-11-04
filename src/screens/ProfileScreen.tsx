import React, { useContext } from 'react';
import { BaseScreen } from '../templates/BaseScreen';
import { Text } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, iconos } from '../theme/appTheme';
import { ProfileStringsEs } from '../global/ProfileStrings';
import { ButtonWithText } from '../components/BaseComponents/ButtonWithText';
import { IconComponent } from '../components/BaseComponents/IconComponent';
import { Alert } from '../utils/Alert/Alert';

export const ProfileScreen = () => {
  const { UserData, logOut } = useContext(AuthContext);
  const logout = () => {
    Alert.show('yesno', {
      title: 'Aviso',
      message: '¿Desea cerrar sesión?',
      OkFunction: logOut,
    });
  };

  return (
    <BaseScreen>
      <>
        <Text style={styles.tilte} >{ProfileStringsEs.Title}</Text>
        <TouchableOpacity onPress={logout} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconComponent
              iconType="IonicIcon"
              icon={iconos.IonicIcons.logout}
              size={25}
              color={colores.error}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 5,
                color: colores.error,
              }}>
              Cerrar Sesión
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.container}>
          <View >
            <Icon name={iconos.IonicIcons.usuario} size={50} color={colores.primary} />
            <Text style={styles.content}>{UserData.fullName}</Text>
          </View>
          <Text>{UserData.username}</Text>
          <Text>{UserData.role}</Text>
          <Text>{UserData.env}</Text>
          <ButtonWithText
            anyfunction={() => { }}
            icon={iconos.IonicIcons.crear}
            color={colores.background}
            colorTexto={colores.primary}
            bagraundIcon={colores.background}
            title='Editar'></ButtonWithText>
        </View>
      </>
    </BaseScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colores.background,
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
    color: colores.primary,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'left',
  },
  content: {
    fontSize: 20,
    color: colores.black,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'left',
  },
});
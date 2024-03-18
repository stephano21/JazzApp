import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles, colores, iconos} from '../theme/appTheme';
import {AuthContext} from '../context/AuthContext';
import {StackOption} from './StackOption';
import {DrawerHeader} from './DrawerHeader';
import {NextScreen} from '../screens/NextScreen';
import {Tabs} from './Tabs';
/* import {RayadosScreen} from '../screens/RayadosScreen';
import {SocketScreen} from '../screens/SocketScreen';
import {DinamicQuestionsScreen} from '../screens/DinamicQuestionsScreen'; */
import {Alert} from '../utils/Alert/Alert';
import {IconComponent} from '../components/BaseComponents/IconComponent';
/* import {DynamicCamera} from '../screens/DynamicCamera';
import { ProfileScreen } from '../screens/ProfileScreen'; */

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      defaultStatus="open"
      drawerContent={props => <MenuInterno {...props} />}
      screenOptions={{
        headerShown: true,
        //drawerType: width >= 768 ? 'permanent' : 'front',
        header: ({route: {params}}: any) => (
          <DrawerHeader
            title={params !== undefined ? params.title : ''}></DrawerHeader>
        ),
      }}>
      <Drawer.Screen name="Tabs" component={Tabs} />
      <Drawer.Screen name="NextScreen" component={NextScreen} />
      {/* <Drawer.Screen name="RayadosScreen" component={RayadosScreen} />
      <Drawer.Screen name="SocketScreen" component={SocketScreen} />
      <Drawer.Screen
        name="DinamicQuestionsScreen"
        component={DinamicQuestionsScreen}
      />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="DynamicCamera" component={DynamicCamera} /> */}
    </Drawer.Navigator>
  );
};

//#region Menu Interno
const MenuItems = [
  {
    icon: iconos.IonicIcons.home,
    name: 'Inicio',
    title: '',
    route: 'Tabs',
  },
  {
    icon: iconos.IonicIcons.ubicacion,
    name: 'Next Screen',
    title: 'Next Screen',
    route: 'NextScreen',
  },
  {
    icon: iconos.IonicIcons.imagen,
    name: 'Rayados',
    title: 'Rayados',
    route: 'RayadosScreen',
  },
  {
    icon: iconos.IonicIcons.advertencia,
    name: 'Socket',
    title: 'Socket',
    route: 'SocketScreen',
  },
  {
    icon: iconos.IonicIcons.lista,
    name: 'Preguntas dinamicas',
    title: 'Preguntas dinamicas',
    route: 'DinamicQuestionsScreen',
  },
  {
    icon: iconos.IonicIcons.camara,
    name: 'Camara Dinamica',
    title: 'Camara Dinamica',
    route: 'DynamicCamera',
  },
  {
    icon: iconos.IonicIcons.perfil,
    name: 'Profile',
    title: 'Profile',
    route: 'ProfileScreen',
  },
];

const MenuInterno = ({navigation, state}: DrawerContentComponentProps) => {
  const {logOut} = useContext(AuthContext);
  let username = 'React Native';

  const logout = () => {
    Alert.show('yesno', {
      title: 'Aviso',
      message: '¿Desea cerrar sesión?',
      OkFunction: logOut,
    });
  };

  return (
    <>
      <DrawerContentScrollView
        style={{
          backgroundColor: colores.blanco,
          //...styles.sombra,
          borderRadius: 0,
        }}>
        {/* Parte del avatar */}
        <View style={{...styles.avatarContainer}}>
          <View
            style={{...styles.sombra, ...styles.avatar, overflow: 'hidden'}}>
            <Image
              style={{
                ...styles.avatar,
                backgroundColor: colores.blanco,
                resizeMode: 'contain',
              }}
              source={require('../assets/logo.gif')}></Image>
            <View
              style={{
                flexDirection: 'row',
                ...styles.centerItems,
              }}></View>
          </View>
          <Text
            style={{...styles.textButton, color: colores.primario, margin: 0}}>
            Hola,{' '}
            <Text
              style={{
                ...styles.textButtonBold,
                color: colores.primario,
                padding: 0,
              }}>
              {username}
            </Text>
          </Text>
        </View>
        {/* Opciones de menu */}
        <View style={styles.menuContainer}>
          {MenuItems.map(({route, title, name, icon}, index) => (
            <StackOption
              key={index}
              action={() => navigation.navigate(route, {title})}
              icono={icon}
              tituloItem={name}
              isfocused={
                state.routes.findIndex(e => e.name === route) === state.index
              }></StackOption>
          ))}
          <StackOption
            action={() => logout()}
            icono={iconos.IonicIcons.logout}
            tituloItem={'Cerrar sesión'}></StackOption>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingLeft: '5%',
          backgroundColor: colores.blanco,
          borderTopWidth: 0.88,
          borderTopColor: colores.primarioclaro,
        }}>
        <TouchableOpacity onPress={logout} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconComponent
              iconType="IonicIcon"
              icon={iconos.IonicIcons.logout}
              size={25}
              color={colores.primario}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 5,
                color: colores.primario,
              }}>
              Cerrar Sesión
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

//#endregion

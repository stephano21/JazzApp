import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {colores} from '../theme/appTheme';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {HomeScreen} from '../screens/HomeScreen';
import {iconos} from '../theme/appTheme';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TaskScreen } from '../screens/TaskScreen';

const TabOptions = [
  {
    name: 'HomeScreen',
    title: 'Inicio',
    icon: iconos.IonicIcons.home,
    component: HomeScreen,
  },
  {
    name: 'TaskScreen',
    title: 'Notas',
    icon: iconos.IonicIcons.lupa,
    component: TaskScreen,
  }, /* 
  {
    name: 'Tareas',
    title: 'Favoritos',
    icon: iconos.IonicIcons.favorito,
    component: TaskScreen,
  },
  {
    name: 'ProfileScreen',
    title: 'Perfil',
    icon: 'aperture-outline',
    component: ProfileScreen,
  },*/
];

export const Tabs = () => {
  return Platform.OS === 'ios' ? (
    <TabsIOS></TabsIOS>
  ) : (
    <TabsAndroid></TabsAndroid>
  );
};

const TabAndroid = createMaterialBottomTabNavigator();

const TabsAndroid = () => {
  return (
    <TabAndroid.Navigator
      sceneAnimationEnabled={true}
      barStyle={{backgroundColor: colores.blanco}}
      style={{marginBottom: 10}}
      activeColor={colores.primario}
      activeIndicatorStyle={{backgroundColor: colores.azulClaro, borderRadius: 20}}
      inactiveColor={colores.plomo}>
      {TabOptions.map(({name, title, icon, component}, index) => (
        <TabAndroid.Screen
          key={index}
          name={name}
          options={{
            title,
            tabBarIcon: () => (
              <Icon name={icon} size={25} color={colores.primario} />
            ),
          }}
          component={component}
        />
      ))}
    </TabAndroid.Navigator>
  );
};

const TabIOS = createBottomTabNavigator();

const TabsIOS = () => {
  return (
    <TabIOS.Navigator sceneContainerStyle={{backgroundColor: 'white'}}>
      {TabOptions.map(({name, title, icon, component}, index) => (
        <TabIOS.Screen
          key={index}
          name={name}
          options={{
            title,
            tabBarIcon: () => (
              <Icon name={icon} size={25} color={colores.secundario} />
            ),
          }}
          component={component}
        />
      ))}
    </TabIOS.Navigator>
  );
};

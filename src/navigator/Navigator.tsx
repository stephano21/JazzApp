import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {AuthContext} from '../context/AuthContext';
import {LoadingScreen} from '../screens/LoadingScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {PermissionsContext} from '../context/PermissionsContext';
import {MenuLateral} from './MenuLateral';
import {colores} from '../theme/appTheme';
import {StackHeader} from './StackHeader';
import {RegisterScreen} from '../screens/RegisterScreen';
import {RecoveryPasswordScreen} from '../screens/RecoveryPasswordScreen';
import { NextScreen } from '../screens/NextScreen';
import { DrawerHeader } from './DrawerHeader';
import { Tabs } from './Tabs';

const Stack = createStackNavigator();
export const Navigator = () => {
  const {status} = useContext(AuthContext);
  const {permissions} = useContext(PermissionsContext);

  if (permissions === 'unavailable' || status === 'checking'){
    console.log('Navigator');
    return <LoadingScreen></LoadingScreen>;
  }
  console.log('Status:',status);
  return (
    <>
      {status === 'notauthenticated' ? (
        <>
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: colores.azul,
              },
              headerTintColor: colores.blanco,
              cardStyle: {
                backgroundColor: colores.blanco,
              },
            }}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                header: props => <StackHeader title={''}></StackHeader>,
              }}
            />
            <Stack.Screen
              name="RecoveryPasswordScreen"
              component={RecoveryPasswordScreen}
              options={{
                header: props => <StackHeader title={''}></StackHeader>,
              }}
            />
          </Stack.Navigator>
        </>
      ) : (
        <>
          {permissions !== 'granted' ? (
            <WelcomeScreen></WelcomeScreen>
          ) : (
            <>
             <>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: colores.azul,
                    },
                    headerTintColor: colores.blanco,
                    cardStyle: {
                      backgroundColor: colores.plomoclaro,
                    },
                  }}>
                  <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                    options={{
                      header: prop => <DrawerHeader title={''}></DrawerHeader>,
                    }}
                  />

                  <Stack.Screen
                    name="NextScreen"
                    component={NextScreen}
                    options={{
                      header: props => (
                        <StackHeader title={'NextScreen'}></StackHeader>
                      ),
                    }}
                  />
                </Stack.Navigator>
              </>
            </>
          )}
        </>
      )}
    </>
  );
};

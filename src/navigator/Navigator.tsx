import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { WelcomeScreen } from '../screens/Auth/WelcomeScreen';
import { PermissionsContext } from '../context/PermissionsContext';
import { colores } from '../theme/appTheme';
import { StackHeader } from './StackHeader';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { RecoveryPasswordScreen } from '../screens/Auth/RecoveryPasswordScreen';
import { DrawerHeader } from './DrawerHeader';
import { Tabs } from './Tabs';

const Stack = createStackNavigator();
export const Navigator = () => {
  const { status, UserData } = useContext(AuthContext);
  const { permissions } = useContext(PermissionsContext);

  if (permissions === 'unavailable' || status === 'checking') {
    console.log('Navigator');
    return <LoadingScreen></LoadingScreen>;
  }
  console.log('Status:', status);
  console.log(UserData.auth.access_Token);
  return (
    <>
      {status === 'notauthenticated'|| (UserData?.auth?.access_Token ?? '').length === 0 ? (
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
                header: props => <StackHeader title={'Register'}></StackHeader>,
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


                </Stack.Navigator>
              </>
            </>
          )}
        </>
      )}
    </>
  );
};

import React from 'react';
import { BaseScreen } from '../templates/BaseScreen';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const ProfileScreen = () => {
    return (
        <BaseScreen>
      <>
        <Text>Profile Screen</Text>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
    </LinearGradient> 
      </>
    </BaseScreen>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
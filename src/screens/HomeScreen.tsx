import React, { useContext, useEffect, useState } from 'react';
import Share from 'react-native-share';
import { Text, Button, StyleSheet, View, useWindowDimensions, RefreshControl } from 'react-native';
import { BaseScreen } from '../templates/BaseScreen';
import { DocumentViewContext } from '../context/DocumentViewContext';
import { useRequest } from '../api/useRequest';
import { colores } from '../theme/appTheme';
import { AuthContext } from '../context/AuthContext';
import { Counter } from '../components/CounterComponent';
import { IScore } from '../interfaces/ScoreInteface';
import { ButtonWithText } from '../components/BaseComponents/ButtonWithText';
import { HomeStrings } from '../global/HomeStrings';
var Data: IScore[] = [
  {
    score: 12,
    label: "Besitos"
  },
  {
    score: 3,
    label: "KFC"
  },
  {
    score: 4,
    label: "Fotos"
  },
  {
    score: 5,
    label: "Cine"
  }
]
export const HomeScreen = () => {
  const { UserData } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const { showDocument } = useContext(DocumentViewContext);
  const { postRequest } = useRequest();
  const sharedFuntion = async (message: string) => {
    await Share.open({
      message: message,
      title: message,
      //url: FirmaB64.quemado,
      //url: `file://${peth}`,
      //type: 'application/pdf',
    })
      .then(a => {
        console.log("Succes",a);
      })
      .catch(a => console.error(a));
  };
  return (
    <BaseScreen>
      <>
        <View style={styles.welcome}>
          <Text style={styles.text}>{HomeStrings.welcomeEn+UserData.fullName}</Text>
        </View>
        <Counter data={Data}></Counter>
        <ButtonWithText title={HomeStrings.besitosButton} anyfunction={() => sharedFuntion(UserData.fullName+HomeStrings.besitosMessagge)}></ButtonWithText>
      </>
    </BaseScreen>
  );
};
const styles = StyleSheet.create({

  welcome: {
    width: '100%'
  },
  text: {
    color: colores.azul,
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 1,
  },

});
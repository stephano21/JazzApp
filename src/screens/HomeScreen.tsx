import React, { useContext, useEffect, useState } from 'react';
import Share from 'react-native-share';
import { Text, Button, StyleSheet, View, useWindowDimensions, RefreshControl, Image } from 'react-native';
import { BaseScreen } from '../templates/BaseScreen';
import { DocumentViewContext } from '../context/DocumentViewContext';
import { useRequest } from '../api/useRequest';
import { colores } from '../theme/appTheme';
import { AuthContext } from '../context/AuthContext';
import { Counter } from '../components/CounterComponent';
import { IScore } from '../interfaces/ScoreInteface';
import { ButtonWithText } from '../components/BaseComponents/ButtonWithText';
import { HomeStringsEs } from '../global/HomeStrings';
import { Card } from 'react-native-paper';
import { HorizontalCard } from '../components/BaseComponents/HorizontalCard';
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
      title: "message",
      //url: FirmaB64.quemado,
      //url: `file://${peth}`,
      //type: 'application/pdf',
    })
      .then(a => {
        console.log("Succes", a);
      })
      .catch(a => console.error(a));
  };
  return (
    <BaseScreen>
      <>
        <View style={styles.welcome}>
          <Text style={styles.text}>{HomeStringsEs.welcome + UserData.fullName}</Text>
        </View>
        {/* <Counter data={Data}></Counter> */}
        <HorizontalCard
          onPress={() => sharedFuntion(UserData.fullName + HomeStringsEs.besitosMessagge)}
          iconSource={{ uri: 'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f618.png' }}
          title="Besitos"
          description="Válido para reclamar besitos ricos"
          info="9/10"
        />
        <HorizontalCard
          onPress={() => sharedFuntion(UserData.fullName + HomeStringsEs.besitosMessagge)}
          iconSource={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7C05gvEdFCmomeMPqCZEdsoluTsclPAuwbg&s' }}
          title="Besitos"
          description="Válido para reclamar besitos ricos"
          info="9/10"
        />
        <HorizontalCard
          onPress={() => sharedFuntion(UserData.fullName + HomeStringsEs.besitosMessagge)}
          iconSource={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7C05gvEdFCmomeMPqCZEdsoluTsclPAuwbg&s' }}
          title="Besitos"
          description="Válido para reclamar besitos ricos"
          info="9/10"
          percent={15}
        />
      </>
    </BaseScreen>
  );
};
const styles = StyleSheet.create({

  welcome: {
    paddingLeft: 20,
    paddingBottom: 10,
    width: '100%'
  },
  text: {
    color: colores.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#d400d4',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },

});
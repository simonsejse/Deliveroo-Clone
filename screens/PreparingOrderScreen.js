import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';

import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 3000);
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-[#00CCBB] justify-center items-center'>
      <Animatable.Image
        source={require('../assets/preloader.gif')}
        animation='slideInUp'
        iterationCount={1}
        className='h-48 w-full'
      ></Animatable.Image>
      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg my-20 text-white font-bold text-center'
      >
        Afventer svar fra restauranten om de kan modtage din ordre!
      </Animatable.Text>
      <Animatable.View animation='slideInUp' iterationCount={1}>
        <Progress.Circle size={60} indeterminate={true} color='white' />
      </Animatable.View>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;

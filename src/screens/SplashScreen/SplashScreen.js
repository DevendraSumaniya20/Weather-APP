import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import NavigationStringPath from '../../constants/NavigationStringPath';
import LottieView from 'lottie-react-native';
import animation from '../../constants/animation';
import * as Animatable from 'react-native-animatable'; // Import the Animatable library

const SplashScreen = () => {
  const navigation = useNavigation();

  const animationDuration = 2000;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(NavigationStringPath.HOME);
    }, 1500);
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={70}
        style={styles.imageBackground}
        source={require('../../assets/images/bg1.jpg')}>
        <LottieView
          style={styles.lottieAnimation}
          source={animation.SPLASH_ANIMATION}
          autoPlay
          loop
          duration={animationDuration}
        />

        <Animatable.Text
          animation="fadeInUpBig"
          iterationCount={'infinite'}
          duration={animationDuration}
          style={styles.text}>
          Weather Impact
        </Animatable.Text>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

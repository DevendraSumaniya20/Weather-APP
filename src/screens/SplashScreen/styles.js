import {
  responsiveScreenHeight as rh,
  responsiveScreenWidth as rw,
  responsiveScreenFontSize as rf,
} from 'react-native-responsive-dimensions';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: rw(100),
    height: rh(100),
  },
  lottieAnimation: {
    marginTop: rh(15),
    width: rw(90),
    height: rh(50),
    alignSelf: 'center',
  },
  text: {
    fontSize: rh(3.2),
    color: '#FFFFFF',
    fontFamily: 'LEMONMILK-MediumItalic',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default styles;

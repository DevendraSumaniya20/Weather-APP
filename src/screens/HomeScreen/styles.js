import {
  responsiveScreenHeight as rh,
  responsiveScreenWidth as rw,
  responsiveScreenFontSize as rf,
} from 'react-native-responsive-dimensions';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: rw(100),
    height: rh(100),
  },

  textInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: rh(1),
    borderColor: '#fff',
    padding: rh(1),
    width: rw(95),
    alignItems: 'center',
    marginTop: rh(1.5),
    marginHorizontal: rw(2),
  },
  locationsSearchView: {
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    borderRadius: 20,
    width: '95%',
    padding: rh(0.2),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'absolute',
    top: rh(13),
    marginHorizontal: rh(1.5),
  },

  textInput: {
    color: 'white',
    fontSize: rf(2),
  },
  touchableOpacityView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  showLocationTouchable: {
    margin: rh(1),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    gap: 15,
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
  lastLocationTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    width: '100%',
    overflow: 'hidden',
  },
  locationDataText: {
    fontSize: rf(2.5),
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },

  forcastView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: rh(1.5),
  },
  locationText: {
    fontSize: rf(2.2),
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  countryText: {
    fontSize: rf(2.2),
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  forecastImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },

  forecastImage: {
    width: rw(60),
    height: rh(25.5),
    marginTop: rh(1.5),
    alignSelf: 'center',
  },
  degree_celciusView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rh(3),
  },
  degree_celciusText: {
    fontSize: rf(3),
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  degree_celciusTypeText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: rf(2),
    textAlign: 'center',
  },
  extraContentView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: rh(3),
  },
  extraContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  extraContentImage1: {
    width: rw(9),
    height: rh(4),
    tintColor: '#fff',
  },

  extraContentImage2: {
    width: rw(8),
    height: rh(5),
    tintColor: 'rgb(12, 148, 239)',
  },
  extraContentImage3: {
    width: rw(10.3),
    height: rh(5),
    tintColor: 'rgb(255, 224, 24)',
  },
  extraContentText: {
    color: 'white',
    fontSize: rf(2.2),
    fontWeight: '400',
  },
  forcastforNextdayInnerView: {
    alignItems: 'center',
    gap: 5,
    marginTop: rh(5),
  },
  forcastViewDailyforecastView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  forcastforNextdayInnerText: {
    color: '#fff',
    fontSize: rf(2.5),
    fontWeight: 'bold',
  },

  dayView: {
    width: rw(38),
    height: rh(19),
    margin: rh(2),
    backgroundColor: '#AAAA',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayWeatherIcon: {
    width: rw(14),
    height: rh(6),
    marginBottom: 6,
  },
  dayText: {
    fontSize: rf(2),
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  dayDegreeText: {
    fontSize: rf(2),
    fontWeight: '500',
    color: '#fff',
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

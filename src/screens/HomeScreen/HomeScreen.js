import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon, CalendarIcon} from 'react-native-heroicons/solid';

import {
  responsiveScreenHeight as rh,
  responsiveScreenWidth as rw,
  responsiveScreenFontSize as rf,
} from 'react-native-responsive-dimensions';
import {debounce} from 'lodash';
import {fetchLocations, fetchWeatherForecast} from '../../api/Weather';
import ImagePath from '../../constants/ImagePath';
import {theme} from '../../theme';
import * as Progress from 'react-native-progress';
import {getData, storeData} from '../../utils/AsyncStorage';

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleLocation = loc => {
    storeData('city', loc.name);
    setLocations([]);
    toggleSearch(false);
    fetchMyWeatherData(loc.name);
  };

  const handleSearch = value => {
    setSearchValue(value);
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async location => {
    let myCity = await getData('city');
    let cityName = 'ahmedabad';
    if (myCity) cityName = myCity;
    setLoading(true);
    fetchWeatherForecast({
      cityName: cityName,
      days: '7',
    })
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching weather data:', error);
      });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {current, location} = weather;

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={70}
        style={styles.imageBackground}
        source={require('../../assets/images/bg.png')}>
        {loading ? (
          <View style={styles.progressContainer}>
            <Progress.Bar
              size={150}
              indeterminate={true}
              thickness={10}
              color="#255685"
            />
          </View>
        ) : (
          <SafeAreaView style={styles.container}>
            <View
              style={[
                styles.textInputView,
                {
                  backgroundColor: showSearch
                    ? theme.bgWhite(0.1)
                    : 'transparent',
                },
              ]}>
              <View>
                {showSearch ? (
                  <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search City"
                    placeholderTextColor="lightgray"
                    style={styles.textInput}
                  />
                ) : null}
              </View>
              <TouchableOpacity
                style={styles.touchableOpacityView}
                onPress={() => {
                  toggleSearch(!showSearch);
                }}>
                <MagnifyingGlassIcon color="#fff" size={25} />
              </TouchableOpacity>
            </View>

            {locations.length > 0 && showSearch ? (
              <View style={styles.locationsSearchView}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 !== locations.length;
                  let borderClass = showBorder
                    ? styles.showLocationTouchable
                    : styles.lastLocationTouchable;

                  return (
                    <TouchableOpacity
                      key={index}
                      style={borderClass}
                      onPress={() => {
                        handleLocation(loc);
                      }}>
                      <MapPinIcon color={'#000'} size={30} />
                      <Text numberOfLines={1} style={styles.locationDataText}>
                        {loc?.name},{loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}

            {/* Forecast */}
            <View style={styles.forcastView}>
              <Text style={styles.locationText}>{'' + location?.name} ,</Text>
              <Text style={styles.countryText}> {location?.country} </Text>
            </View>
            <View style={styles.forecastImageView}>
              <Image
                source={
                  ImagePath[
                    current?.condition?.text ||
                      require('../../assets/images/sun.png')
                  ]
                }
                style={styles.forecastImage}
              />
            </View>

            {/* Degree Celsius */}
            <View style={styles.degree_celciusView}>
              <Text style={styles.degree_celciusText}>
                {current?.temp_c}&deg;
              </Text>
              <Text style={styles.degree_celciusTypeText}>
                {current?.condition?.text}
              </Text>
            </View>
            {/* Extra content */}
            <View style={styles.extraContentView}>
              <View style={styles.extraContent}>
                <Image
                  source={require('../../assets/icons/wind.png')}
                  style={styles.extraContentImage1}
                />
                <Text style={styles.extraContentText}>
                  {current?.wind_kph}km
                </Text>
              </View>
              <View style={styles.extraContent}>
                <Image
                  source={require('../../assets/icons/drop.png')}
                  style={styles.extraContentImage2}
                />
                <Text style={styles.extraContentText}>
                  {current?.humidity}%
                </Text>
              </View>
              <View style={styles.extraContent}>
                <Image
                  source={require('../../assets/icons/sun.png')}
                  style={styles.extraContentImage3}
                />
                <Text style={styles.extraContentText}>
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
            {/* Forecast for the next days */}
            <View style={styles.forcastforNextdayInnerView}>
              <View style={styles.forcastViewDailyforecastView}>
                <CalendarIcon color={'#fff'} size={25} />
                <Text style={styles.forcastforNextdayInnerText}>
                  Daily forecast
                </Text>
              </View>

              <ScrollView
                horizontal
                contentContainerStyle={{paddingHorizontal: 15}}
                showsHorizontalScrollIndicator={false}>
                {weather?.forecast?.forecastday
                  ?.slice(0, 7)
                  ?.map((item, index) => {
                    let date = new Date(item.date);
                    let options = {weekday: 'long'};
                    let dayName = date.toLocaleDateString('en-US', options);
                    dayName = dayName.split(',')[0];

                    return (
                      <View style={styles.dayView} key={index}>
                        <Image
                          style={styles.dayWeatherIcon}
                          source={
                            ImagePath[
                              item?.day?.condition?.text ||
                                require('../../assets/images/sun.png')
                            ]
                          }
                        />
                        <Text style={styles.dayText}>{dayName}</Text>
                        <Text style={styles.dayDegreeText}>
                          {item?.day?.avgtemp_c}&deg;
                        </Text>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
          </SafeAreaView>
        )}
      </ImageBackground>
    </View>
  );
};

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
    top: rh(9.3),
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
    width: rw(55),
    height: rh(26),
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

export default HomeScreen;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Platform,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {COLORS, FONTS, icons, SIZES} from '../helpers';
import AsyncStorage from '@react-native-community/async-storage';
import APIKit from '../helpers/apiKit';
import GetLocation from 'react-native-get-location';
import AudioRecord from 'react-native-audio-record';
import {BASE_URL} from '../../Config/index';
import Tts from 'react-native-tts';
const Location = ({route, navigation}) => {
  const mapView = React.useRef();
  const initialCurrentLocation = {
    streetName: 'Colombo',
    // // near race co
    // gps: {
    //   latitude: 6.9057696676889115,
    //   longitude: 79.86027893592619,
    // },

    // // // vihara
    // gps: {
    //   latitude: 6.914376,
    //   longitude: 79.864088,
    // },

    // // ccc
    gps: {
      latitude: 6.924152501842479,
      longitude: 79.85221046796326,
    },
  };
  const nearbyLocation = {
    location: {
      latitude: 6.90762293818244,
      longitude: 79.86422714747269,
    },
  };useEffect(() => {
    const _toggleDrawer = () => {
      navigation.toggleDrawer();
    };
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };

    AudioRecord.init(options);
    Tts.speak(
      'Welcome to Voice Assistant. You can find bus routes, find other services.',
      {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      },
    );
    console.log('use effect home');
  }, [navigation, theme.colors.headerTitle]);
  const record = () => {
    console.log('record');

    AudioRecord.start();
    timeout;
    let timeout = setTimeout(() => {
      stopRecord();
      console.log('hello');
    }, 5000);
  };

  const stopRecord = async () => {
    console.log('recordStop ');
    const audioFile = await AudioRecord.stop();
    AudioRecord.on('data', (data) => {});
    console.log('audioFile latees ????????', audioFile);
    initialRec(audioFile);
    // AudioRecord.stop();
  };
  const initialRec = (audioFile) => {
    uploadAudio(audioFile);
    console.log('initialRec', audioFile);
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };
  };
  const uploadAudio = async (fileUrl) => {
    console.log('upload');
    console.log('??????????????????????', fileUrl);
    let formData = new FormData();
    formData.append('audioFile', {
      uri: 'file:///data/user/0/com.easy_boiler/files/test.wav',
      type: 'audio/wav',
      name: 'test.wav',
    });
    formData.append('orderId', 3);
    console.log(formData);

    fetch(`${BASE_URL}/voicebot/en`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      // .then((response) => response.json())
      .then((response) => {
        console.log('response ', response.flag);
        console.log(response);
        if (response.flag == 'back') {
          navigation.navigate('language-success');
        }
        if (response.flag == 'command-error') {
          Tts.speak(response.msg, {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
        }
        if (response.flag == 'list-coupon-success') {
          navigation.navigate('list-coupon-success');
        }
        if (response.flag == 'list-offer-success') {
          const resDataNews = response;
          storeData(response);
          console.log(resDataNews.listOffers);

          // navigation.navigate('list-offer-success', resDataNews);
        }
        if (response.flag == 'coupon-success') {
          navigation.navigate('coupon-success');
        }
        if (response.flag == 'order-menu') {
          navigation.navigate('order-menu');
        }
        // if (!response.flag == 'navigation-error') {
        //   navigation.navigate(response.flag);
        // } else {
        //   console.log('route error');
        // }

        // console.log(JSON.stringify(response));
      })
      .catch((err) => console.error(err));
  }; const record = () => {
    console.log('record');

    AudioRecord.start();
    timeout;
    let timeout = setTimeout(() => {
      stopRecord();
      console.log('hello');
    }, 5000);
  };

  const stopRecord = async () => {
    console.log('recordStop ');
    const audioFile = await AudioRecord.stop();
    AudioRecord.on('data', (data) => {});
    console.log('audioFile latees ????????', audioFile);
    initialRec(audioFile);
    // AudioRecord.stop();
  };
  const initialRec = (audioFile) => {
    uploadAudio(audioFile);
    console.log('initialRec', audioFile);
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };
  };
  const uploadAudio = async (fileUrl) => {
    console.log('upload');
    console.log('??????????????????????', fileUrl);
    let formData = new FormData();
    formData.append('audioFile', {
      uri: 'file:///data/user/0/com.easy_boiler/files/test.wav',
      type: 'audio/wav',
      name: 'test.wav',
    });
    formData.append('orderId', 3);
    console.log(formData);

    fetch(`${BASE_URL}/voicebot/en`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      // .then((response) => response.json())
      .then((response) => {
        console.log('response ', response.flag);
        console.log(response);
        if (response.flag == 'back') {
          navigation.navigate('language-success');
        }
        if (response.flag == 'command-error') {
          Tts.speak(response.msg, {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
        }
        if (response.flag == 'list-routes') {
          navigation.navigate('list-coupens');
        }
        if (response.flag == 'near-by') {
          const resDataNews = response;
          storeData(response);
          console.log(resDataNews.listOffers);

          // navigation.navigate('list-offer-success', resDataNews);
        }
        if (response.flag == 'stop') {
          navigation.navigate('stop');
        }
      
      })
      .catch((err) => console.error(err));
  };
  const [packages, setPackage] = React.useState('');
  const [nearLocation, setNearLocation] = React.useState('');
  const [user, setUser] = React.useState('');
  
  // const [location, setLocation] = React.useState('');
  const [streetName, setStreetName] = React.useState('');
  const [fromLocation, setFromLocation] = React.useState(
    initialCurrentLocation.gps,
  );
  const [currLocation, setCurrLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(nearbyLocation.location);
  const [region, setRegion] = React.useState(null);

  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [angle, setAngle] = React.useState(0);


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@package');
      const packageName = JSON.parse(jsonValue);
      console.log('packageName ????', packageName);
      setPackage(packageName);
    } catch (e) {
      console.log('ee', e);
    }
  };
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const packageName = JSON.parse(jsonValue);
      console.log('packageName ????', packageName);
      setUser(packageName);
    } catch (e) {
      console.log('ee', e);
    }
  };

  

  function getLocationNearest(location) {
    return fetch(`127.0.0.1:5000/:${location}`)
      .then(response => response.json())
      .then(responseJson => {
        setNearLocation(responseJson);
        // console.log(nearLocation);
        // return responseJson;
      })
      .catch(error => {
        console.error(error);
      });
  }

  

  const getDirection = (lat1, lon1, lat2, lon2, unit) => {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    // console.log('disat', dist);

    return dist;
  };
  const getDire = currGps => {
    var poslat = currGps.latitude;
    var poslng = currGps.longitude;
    var smallest = {
      location: {
        latitude: 6.913660659567421,
        longitude: 79.86175634588763,
        name: '',
        dist: 5,
      },
    };
    console.log(`object`, poslat);
    for (var i = 0; i < data.length; i++) {
      // console.log(
      //   getDirection(poslat, poslng, data[i].lat, data[i].lng, 'K'),
      //   data[i].location,
      // );
      if (
        getDirection(poslat, poslng, data[i].lat, data[i].lng, 'K') <
        smallest.location.dist
      ) {
        smallest = getDirection(poslat, poslng, data[i].lat, data[i].lng, 'K');
        smallest = {
          location: {
            latitude: parseFloat(data[i].lat),
            longitude: parseFloat(data[i].lng),
            name: data[i].location,
            dist: getDirection(poslat, poslng, data[i].lat, data[i].lng, 'K'),
          },
        };
      } else {
        console.log('error smalesr');
      }
    }
    console.log('smallest-->', smallest);
    setToLocation(smallest.location);
    test;
    const test = setTimeout(function () {
      console.log('call');
      getRoutes(smallest, packages);
    }, 3000);
  };
  var data = [
    {
      code: '0001',
      lat: '6.905141258229491',
      lng: ' 79.86350831547918',
      location: 'Race Course',
    },
    {
      code: '0002',
      lat: '6.917638298275269',
      lng: '79.85516576032148',
      location: 'CCC',
    },
    {
      code: '0003',
      lat: '6.914976444483723',
      lng: '79.86291069755504',
      location: 'Viharamaha devi park',
    },
  ];
  function getLocation(currGps) {
    const lat = currGps.latitude;
    const lng = currGps.longitude;
    console.log('lat, latlng');
    console.log(lat, lng);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC8NRchVH4Jh7zfydVZ28NOham4son244A`,
      )
      .then(function (response) {
        // console.log('lca', response.data.results[0].formatted_address);
        const locationName = response.data.results[0].formatted_address;
        var myArray = locationName.split(',');
        setStreetName(myArray[0]);
      })
      .catch(function (error) {
        console.log('error ', error);
      });
  }
  React.useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        const currGps = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        setCurrLocation(currGps);
        setFromLocation(currGps);
        getDire(currGps);
        getLocation(currGps);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn('location error-->', code, message);
      });

    getData();
    
    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    // setFromLocation(fromLoc);
    setRegion(mapRegion);
  }, [packages]);

  function calculateAngle(coordinates) {
    let startLat = coordinates[0]['latitude'];
    let startLng = coordinates[0]['longitude'];
    let endLat = coordinates[1]['latitude'];
    let endLng = coordinates[1]['longitude'];
    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  function zoomIn() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function zoomOut() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function renderMap() {
    const destinationMarker = () => (
      <Marker coordinate={toLocation}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: COLORS.secondary,
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: COLORS.primary,
            }}>
            <Image
              source={icons.pin}
              style={{
                width: 25,
                height: 25,
                // tintColor: COLORS.primary,
              }}
            />
          </View>
        </View>
      </Marker>
    );

    const carIcon = () => (
      <Marker
        coordinate={fromLocation}
        anchor={{x: 0.5, y: 0.5}}
        flat={true}
        rotation={angle}>
        <Image
          source={icons.car}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Marker>
    );

    return (
      <View style={{flex: 1}}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{flex: 1}}>
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey="AIzaSyC8NRchVH4Jh7zfydVZ28NOham4son244A"
            strokeWidth={5}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
            onReady={result => {
              setDuration(result.duration);

              if (!isReady) {
                mapView.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: SIZES.width / 20,
                    bottom: SIZES.height / 4,
                    left: SIZES.width / 20,
                    top: SIZES.height / 8,
                  },
                });

                // Reposition the car
                let nextLoc = {
                  latitude: result.coordinates[0]['latitude'],
                  longitude: result.coordinates[0]['longitude'],
                };

                if (result.coordinates.length >= 2) {
                  let angle = calculateAngle(result.coordinates);
                  setAngle(angle);
                }

                setFromLocation(nextLoc);
                setIsReady(true);
              }
            }}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  }

  function renderDestinationHeader() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 0,
          right: 0,
          // height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: COLORS.black,
            height: 40,
            width: SIZES.width * 0.5,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderTopLeftRadius: 30,
            margin: 10,
            marginLeft: SIZES.width * 0.4,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: 'red',
            shadowOffset: {
              width: 12,
              height: 12,
            },
            shadowOpacity: 0.98,
            shadowRadius: 16.0,
            elevation: 24,
            paddingHorizontal: 10,
          }}>
          <Text style={{...FONTS.h4, color: COLORS.white}}>Nearby Buses</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            shadowOffset: {
              width: 12,
              height: 12,
            },
            elevation: 24,
            shadowOpacity: 0.98,
            shadowRadius: 16.0,
          }}>
          <Image
            source={icons.loc}
            style={{
              width: 20,
              height: 20,
              marginRight: SIZES.padding,
            }}
          />

          <View style={{flex: 1}}>
            <Text style={{...FONTS.body3}}>{streetName}</Text>
          </View>

          <Text style={{...FONTS.body3, color: COLORS.primary}}>
            {Math.ceil(duration)} mins
          </Text>
        </View>
      </View>
    );
  }

  function renderInfo() {
    let Image_Http_URL = {
      uri: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80',
    };
    return (
      <View
        style={{
          position: 'absolute',
          top: SIZES.height * 0.5,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}>
        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          height={250}
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 90 : 80,
            paddingHorizontal: 10,
            flex: 1,
          }}
          contentInset={{
            // iOS only
            top: 0,
            left: 0,
            bottom: 0,
            right: 20,
          }}
          contentContainerStyle={{
            paddingRight: Platform.OS === 'android' ? 20 : 0,
          }}>
          {routess
            ? routess.map((routes, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    padding: 8,
                    // paddingHorizontal: 20,
                    marginHorizontal: 10,
                    shadowColor: '#ccc',
                    shadowOffset: {width: 0, height: 3},
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    elevation: 10,
                  }}>
                  {/* {category.routes_name} */}

                  <Image
                    source={{uri: routes.image}}
                    resizeMode="contain"
                    style={{
                      resizeMode: 'cover',
                      borderRadius: 5,
                      width: SIZES.width * 0.6,
                      height: SIZES.width * 0.2,
                    }}
                  />
                 
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: SIZES.width * 0.6,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{...FONTS.body4, color: COLORS.black}}>
                      {routes.routes_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: SIZES.width * 0.2,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}>
                      <Icon
                        name="swimming-pool"
                        size={15}
                        color={COLORS.secondary}
                      />
                      <Icon name="hot-tub" size={15} color={COLORS.secondary} />
                      <Icon name="bed" size={15} color={COLORS.secondary} />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      maxHeight: 40,
                      margin: 4,
                      backgroundColor: COLORS.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      width: SIZES.width * 0.3,
                    }}
                    onPress={() => {
                      toroutes(routes);
                    }}>
                    <Text style={{...FONTS.b4, color: COLORS.white}}>
                      Book Now
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            : null}
        </ScrollView>
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.35,
          right: SIZES.padding * 2,
          width: 60,
          height: 130,
          justifyContent: 'space-between',
        }}>
        {/* Zoom In */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => zoomIn()}>
          <Text style={{...FONTS.body1}}>+</Text>
        </TouchableOpacity>

        {/* Zoom Out */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => zoomOut()}>
          <Text style={{...FONTS.body1}}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderInfo()}
      {renderButtons()}
    </View>
  );
};

export default Location;
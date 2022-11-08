/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import Toast from 'react-native-simple-toast';
import APIKit, {setClientToken} from '../helpers/apiKit';
import {authRegAPI} from '../api/authRegAPI';

import AsyncStorage from '@react-native-community/async-storage';
const RegisterScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConf, setUserPasswordConf] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const passwordInputRef = createRef();

  const showToast = message => {
    Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
  };
  const onPressReg = () => {
    const payload = {
      username: userName,
      email: userEmail,
      password: userPassword,
      roles: ['user'],
    };

    setLoading(true);
    console.log(payload);
    authRegAPI(payload)
      .then(response => {
        if (response.error) {
          console.log('error__<', response.error);
          showToast('try again');
          return;
        }
        const {data} = response;
        console.log('res', response.data);
        console.log('token', data.access);
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log('error-->', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <ImageBackground
      style={styles.mainBody}
      source={require('../assets/images/regBg.jpeg')}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          width: SIZES.width,
          alignItems: 'center',
          alignContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.centerFlex}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                width: SIZES.width * 0.3,
                height: SIZES.width * 0.3,
                marginBottom: SIZES.height * 0.03,
              marginTop: SIZES.height * 0.25,
              }}
            />
          </View>
          <View style={styles.rowFlex}>
            {/* <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            /> */}
            <View style={styles.SectionStyle}>
              <TextInput
                style={[
                  styles.inputStyle,
                  userNameError ? styles.inputStyleError : '',
                ]}
                onChangeText={UserName => setUserName(UserName)}
                placeholder="User Name"
                placeholderTextColor={COLORS.white}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
          </View>
          <View style={styles.rowFlex}>
            {/* <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            /> */}
            <View style={styles.SectionStyle}>
              <TextInput
                style={[
                  styles.inputStyle,
                  userNameError ? styles.inputStyleError : '',
                ]}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                placeholder="Email"
                placeholderTextColor={COLORS.white}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
          </View>

          <View style={styles.rowFlex}>
            {/* <Image
              source={icons.lock}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            /> */}
            <View style={styles.SectionStyle}>
              <TextInput
                style={[
                  styles.inputStyle,
                  passwordError ? styles.inputStyleError : '',
                ]}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                placeholder="Password" //12345
                placeholderTextColor={COLORS.white}
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
          </View>
          <View style={styles.centerFlex}>
            <View style={styles.centerFlex}>
              <TouchableOpacity
                // style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('LogIn')}>
                <Text style={styles.buttonTextStyle2}>
                  Don't have an account? register here.
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => onPressReg()}>
              <Text style={styles.buttonTextStyle}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonTextStyle2: {
    color: COLORS.secondary,

    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: SIZES.width * 0.3,
  },
  rowFlex: {
    flexDirection: 'row',
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: SIZES.width * 0.1,
    alignContent: 'center',
  },
  mainBody: {
    // backgroundColor: '#FAFAFA',
    flex: 1,
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  SectionStyle: {
    // backgroundColor: COLORS.secondary,
    borderRadius: 10,
    borderColor: COLORS.white,
    borderWidth: 1,
    height: 40,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    color: COLORS.white,
    height: 40,
    width: 130,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    color: COLORS.third,
    paddingLeft: 15,
    paddingRight: 15,
    width: SIZES.width * 0.7,
  },
  inputStyleError: {
    flex: 1,
    color: COLORS.third,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
    width: SIZES.width * 0.7,
  },
  registerTextStyle: {
    color: '#4c5a5b',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});

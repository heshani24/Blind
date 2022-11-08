/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
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
import {login} from '../api/authAPI';
import {storeUserToken, getUserToken} from '../shared/asyncStorage';
import {setClientToken} from '../shared/axios';
import {useDispatch} from 'react-redux';
import {authSuccess} from '../redux/authSlice';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const passwordInputRef = createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserToken().then(token => {
      if (token) {
        setClientToken(token);
        dispatch(authSuccess(token));
        navigation.navigate('Home');
      }
    });
  });
  const showToast = message => {
    Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
  };
  const onPressLogin = () => {
    navigation.navigate('Home');

    const payload = {
      username: userEmail,
      password: userPassword,
    };
    console.log(payload);
    setLoading(true);

    login(payload)
      .then(response => {
        if (response.error) {
          console.log('error__<', response.error);
          showToast('try again');
          return;
        }
        const {data} = response;
        console.log('res', response.data);

        console.log('token', data.accessToken);
        setClientToken(data.accessToken);
        storeUserToken(data.accessToken).then(result =>
          console.log('Remove me if not needed', result),
        );
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('error-->', error);

        // showToast(error.responses);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <ImageBackground
      style={styles.mainBody}
      source={require('../assets/backlg.png')}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          width: SIZES.width,
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
        }}>
        <View style={styles.centerFlex}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              width: SIZES.width * 0.3,
              height: SIZES.width * 0.3,
              marginBottom: SIZES.height * 0.03,
              marginTop: SIZES.height * 0.45,
              // tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                placeholder="Username"
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
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonTextStyle2}>
                  Don't have an account? register here.
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => onPressLogin()}>
              <Text style={styles.buttonTextStyle}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
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
  child: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  SectionStyle: {
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
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonStyle2: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    color: COLORS.white,
    height: 30,
    width: 130,
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonTextStyle2: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: SIZES.width * 0.3,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
    color: COLORS.white,
    paddingLeft: 15,
    // paddingRight: 15,
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

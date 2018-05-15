import React from "react";
import {
    AppRegistry,
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert,
    TextInput,
    ScrollView
} from 'react-native';

 
import Icon from 'react-native-vector-icons/FontAwesome';

import Container from './components/container';
import Button from './components/button';
import Label from './components/label';
import { Input } from './components/textInput';

const styles = StyleSheet.create({
  scroll: {
      backgroundColor: '#E1D7D8',
      padding: 30,
      flexDirection: 'column'
  },
  label: {
      color: '#0d8898',
      fontSize: 20
  },
  alignRight: {
      alignSelf: 'flex-end'
  },
  transparentButton: {
      marginTop: 30,
      borderColor: '#3B5699',
      borderWidth: 2
  },
  buttonBlueText: {
      fontSize: 20,
      color: '#3B5699'
  },
  buttonBigText: {
      fontSize: 20,
      fontWeight: '700'
  },
  inline: {
      flexDirection: 'row'
  },
  buttonWhiteText: {
      fontSize: 20,
      color: '#FFF',
  },
  buttonBlackText: {
      fontSize: 20,
      color: '#595856',

  },
  primaryButton: {
      backgroundColor: '#34A853'
  },
  footer: {
     marginTop: 50
  }
});


export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            username: {
                value: '',
                validate: true
            },
            password: {
                value: '',
                validate: true
            }
        };
    }

    handleUsername = (username) => {
        if(username.length === 0){
            this.setState({ username: {
                value: username,
                validate: false
            }})
        }
        else{
            this.setState({ username: {
                value: username,
                validate: true
            }})
        }
    }

    handlePassword = (password) => {
        if(password.length === 0){
            this.setState({ password: {
                value: password,
                validate: false
            }})
        }
        else{
            this.setState({ password: {
                value: password,
                validate: true
            }})
        }
    }

    async _onValueChange(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
            console.log(AsyncStorage.getItem('STORAGE_KEY'));
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    };

    async _userLogout() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            Alert.alert("Logout Success!")
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    };

    _userLogin() {
        const { username, password } = this.state;

        if (!username.value || !password.value) { // if validation fails, value will be null
          this.setState({ 
            username: {
                value: username.value,
                validate: false
            },
            password: {
                value: password.value,
                validate: false
            }
          });
          return ;
        }

        fetch("http://192.168.43.123:3000/api/signin", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            Alert.alert(
                "Connexion réussie!"
            ),
            this._onValueChange('STORAGE_KEY', responseData.token)
        })
        .done();
    };

    press(){

    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <ScrollView style={styles.scroll}>
                      <Container>
                          <Label text="Identifiant" />
                          <Input
                              validate={this.state.username.validate}
                              placeholder="Identifiant"
                              onChangeText={this.handleUsername}
                              value={this.state.username.value}
                              underlineColorAndroid="transparent"
                          />
                      </Container>
                      <Container>
                          <Label text="Mot de passe" />
                          <Input
                              secureTextEntry={true}
                              validate={this.state.password.validate}
                              placeholder="Mot de passe"
                              onChangeText={this.handlePassword}
                              value={this.state.password.value}
                              underlineColorAndroid="transparent"
                          />
                      </Container>
                      <View style={styles.footer}>
                          <Container>
                              <Button 
                                  label="Connexion"
                                  styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                                  onPress={this._userLogin.bind(this)} />
                          </Container>
                          <Container>
                              <Button 
                                  label="Vous n'avez pas de compte ? Cliquez ici pour vous inscrire"
                                  styles={{label: styles.buttonBlackText}} 
                                  onPress={() => this.props.navigation.navigate('Signup')} />
                          </Container>
                      </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
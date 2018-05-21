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

import Container from '../common/container';
import Button from '../common/button';
import Label from '../common/label';
import { Input } from '../common/textInput';

import { API_URL } from '../../../api_url.js';

const styles = StyleSheet.create({
  scroll: {
      backgroundColor: '#E1D7D8',
      padding: 30,
      flexDirection: 'column'
  },
  label: {
      color: '#fff',
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
      color: '#000'
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
      color: '#fff',
  },
  buttonBlackText: {
      fontSize: 20,
      color: '#000',
  },
  primaryButton: {
      backgroundColor: '#750e13'
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

        fetch(API_URL+"api/signin", {
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
            this._onValueChange('userToken', responseData.token),
            this._onValueChange('userNickname', responseData.user),
            console.log(responseData.token),
            this.props.navigation.navigate('App');
        })
        .done();
    };


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
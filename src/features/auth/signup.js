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

export default class Signup extends React.Component {

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            username: {
                value: '',
                validate: true,
            },
            password: {
                value: '',
                validate: true,
            },
            nickname: {
                value: '',
                validate: true,
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
                validate: false,
                hasBeenTyped: true
            }})
        }
        else{
            this.setState({ password: {
                value: password,
                validate: true,
                hasBeenTyped: true
            }})
        }
    }

    handleNickname = (nickname) => {
        if(nickname.length === 0){
            this.setState({ nickname: {
                value: nickname,
                validate: false,
                hasBeenTyped: true
            }})
        }
        else{
            this.setState({ nickname: {
                value: nickname,
                validate: true,
                hasBeenTyped: true
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

    _userSignup() {
        const { username, password, nickname } = this.state;

        if (!username.value || !password.value || !nickname.value) { // if validation fails, value will be null
          this.setState({ 
            username: {
                value: username.value,
                validate: false
            },
            password: {
                value: password.value,
                validate: false
            },
            nickname: {
                value: nickname.value,
                validate: false
            }
          });
          return ;
        }
        fetch("http://192.168.43.123:3000/api/signup", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                nickname: nickname.value,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            this._onValueChange('userToken', responseData.token)
            this._onValueChange('userNickname', responseData.userNickname)
            this.props.navigation.navigate('App');
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
                              hasBeenTyped={this.state.username.hasBeenTyped}
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
                              hasBeenTyped={this.state.password.hasBeenTyped}
                              placeholder="Mot de passe"
                              onChangeText={this.handlePassword}
                              value={this.state.password.value}
                              underlineColorAndroid="transparent"
                          />
                      </Container>
                      <Container>
                          <Label text="Pseudonyme" />
                          <Input
                              validate={this.state.nickname.validate}
                              hasBeenTyped={this.state.nickname.hasBeenTyped}
                              placeholder="Identifiant"
                              onChangeText={this.handleNickname}
                              value={this.state.nickname.value}
                              underlineColorAndroid="transparent"
                          />
                      </Container>
                      <View style={styles.footer}>
                          <Container>
                              <Button 
                                  label="S'inscrire"
                                  styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                                  onPress={this._userSignup.bind(this)} />
                          </Container>
                          <Container>
                              <Button 
                                  label="Vous avez déjà un compte ? Cliquez ici pour vous connecter"
                                  styles={{label: styles.buttonBlackText}} 
                                  onPress={() => this.props.navigation.navigate('Login')} />
                          </Container>
                      </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
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
import { Main } from '../common/view';

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


export default class Search extends React.Component {

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            search: {
                value: '',
                validate: true
            }
        };
    }

    handleSearch = (search) => {
        if(search.length === 0){
            this.setState({ search: {
                value: search,
                validate: false
            }})
        }
        else{
            this.setState({ search: {
                value: search,
                validate: true
            }})
        }
    }

    _search() {
        const { search } = this.state;

        if (!search.value) { // if validation fails, value will be null
          this.setState({ 
            search: {
                value: search.value,
                validate: false
            }
          });
          return ;
        }

        fetch(API_URL+"api/search/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keyword: search.value,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.props.navigation.navigate('Search_Result', {
              movies: responseData.movies,
            });
        })
        .done();
    };


    render(){
        return(
            <Main>
                <View>
                    <ScrollView>
                      <Container>
                          <Input
                              placeholder="Recherche"
                              onChangeText={this.handleSearch}
                              value={this.state.search.value}
                              underlineColorAndroid="transparent"
                          />
                      </Container>
                      <View>
                          <Container>
                              <Button 
                                  label="Rechercher"
                                  styles="" 
                                  onPress={this._search.bind(this)} />
                          </Container>
                      </View>
                    </ScrollView>
                </View>
            </Main>
        );
    }
}

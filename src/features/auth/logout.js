import React from "react";
import {
    AppRegistry,
    AsyncStorage,
    StyleSheet,
    View,
    Alert,
    ScrollView
} from 'react-native';

import Container from '../common/container';
import Button from '../common/button';

export default class Logout extends React.Component {

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
        };
    }

    async _userLogout() {
        try {
            AsyncStorage.clear();
            this.props.navigation.navigate('Auth');
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    };


    render() {
        return (
            <View>
                <View>
                    <ScrollView>
                        <Container>
                            <Button 
                                label="Déconnexion"
                                styles="" 
                                onPress={this._userLogout.bind(this)} />
                        </Container>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
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

const styles = StyleSheet.create({
});


export default class Logout extends React.Component {

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
        };
    }

    async _userLogout() {
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Auth');
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <ScrollView style={styles.scroll}>
                        <Container>
                            <Button 
                                label="Déconnexion"
                                styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                                onPress={this._userLogout.bind(this)} />
                        </Container>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
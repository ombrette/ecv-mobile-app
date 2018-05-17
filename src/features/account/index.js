import React from 'react';
import { FlatList, ActivityIndicator, Text, View, AsyncStorage } from 'react-native';

import Logout from '../auth/logout';

export default class Account extends React.Component {

    constructor(props){
        super(props);
        this.state ={ 
            userNickname: '',
        }

    }

    componentDidMount() {
        AsyncStorage.getItem('userNickname')
        .then((value) => {
            this.setState({ 'userNickname': value });
        })

    }

    render(){
        return(
            <View style={{flex: 1, paddingTop:20}}>
                <Text>Bonjour {this.state.userNickname} </Text>
                <Logout/>
            </View>
        );
    }
}

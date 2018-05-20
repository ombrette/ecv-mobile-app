import React from 'react';
import { FlatList, ActivityIndicator, Text, View, AsyncStorage } from 'react-native';
import { Main } from '../common/view';
import { LittleSpeech } from '../common/text';

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
            <Main>
                <LittleSpeech> 
                    Hello {this.state.userNickname}!{"\n\n"}
                    Toi aussi tu trouves que c'est un peu vide ici...{"\n"}
                    J'ai demandé à ma créatrice de se dépêcher de rajouter les autres fonctionnalités.{"\n"}
                    C'est pour bientôt promis!
                </LittleSpeech>
                <Logout/>
            </Main>
        );
    }
}

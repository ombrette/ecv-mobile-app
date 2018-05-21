import React from "react";
import { 
    FlatList,
    ActivityIndicator,
    View, 
    Text, 
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import Container from '../common/container';
import Button from '../common/button';
import { Main } from '../common/view';
import { Question, Answer } from '../common/text';
import { AnswerContainer } from '../common/touchable';

import { API_URL } from '../../../api_url.js';

export default class Genre extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            type: 'genre',
            finished: false
        }
    }

    componentDidMount(){
        // Ici on récupère d'abord les paramètres envoyés par le component Reason et on va chercher les questions sur les genres
        const { navigation } = this.props;
        const { type } = this.state;
        const mood = navigation.getParam('mood', 'Joyeux');
        const reason = navigation.getParam('reason');
        var url= '';

        if (reason) {
            url = API_URL+'api/question/{"type": "genre", "mood":  "'+mood+'", "reason":  "'+reason+'"}'
        }else{
            url = API_URL+'api/question/{"type": "genre", "mood":  "'+mood+'"}'
        }

        return fetch(url, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
                isLoading: false,
                questions: responseJson.question
            });
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        // On affiche ici la question suivie des réponses
        return(
            <Main>
                <Question>{this.state.questions.content}</Question>
                <FlatList
                    data={this.state.questions.answers}
                    renderItem={({item}) =>
                        <View style={{flex:1, flexDirection: 'row'}}>
                        
                            <AnswerContainer 
                              onPress={() => {
                                this.props.navigation.navigate('Result', {
                                  genre_ids: item.answer_genre,
                                });
                              }}>
                                <Answer>{item.answer_content}</Answer>
                            </AnswerContainer>
             
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </Main>
        );
    }
}
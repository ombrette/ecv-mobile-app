import React from "react";
import { 
    FlatList,
    ActivityIndicator,
    View, 
    Text, 
    ScrollView,
    TouchableOpacity
} from "react-native";

import Container from '../common/container';
import Button from '../common/button';
import { Main } from '../common/view';
import { Question, Answer } from '../common/text';
import { AnswerContainer } from '../common/touchable';

import { API_URL } from '../../../api_url.js';

export default class Quiz extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
        }
    }

    componentDidMount(){
        // Ici on récupère les premières questions sur l'humeur
        return fetch(API_URL+'api/question/{"type": "humeur"}', {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
                isLoading: false,
                questions: responseJson.question,
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
                                var q_type = '';
                                var q_route = '';
                                if (item.answer_mood == 'Neutre') {
                                    q_type = 'genre';
                                    q_route = 'Genre';
                                }else{
                                    q_type = 'raison';
                                    q_route = 'Reason';
                                }
                                this.props.navigation.navigate(q_route, {
                                  type: q_type,
                                  mood: item.answer_mood,
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
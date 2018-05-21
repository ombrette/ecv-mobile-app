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

const styles = StyleSheet.create({
 
MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: 20,
 
},
 
textView: {
 
    width:'100%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
}
});

export default class Reason extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true
        }
    }

    componentDidMount(){
        // Ici on récupère d'abord les paramètres envoyés par le component Quiz et on va chercher les questions sur les raisons de l'humeur/les envies
        const { navigation } = this.props;
        const mood = navigation.getParam('mood', 'Joyeux');

        return fetch(API_URL+'api/question/{"type": "raison", "mood":  "'+mood+'"}', {
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

        return(
            <Main>
                <Question>{this.state.questions.content}</Question>
                <FlatList
                    data={this.state.questions.answers}
                    renderItem={({item}) =>
                        <View style={{flex:1, flexDirection: 'row'}}>
                        
                            <AnswerContainer 
                              onPress={() => {
                                this.props.navigation.navigate('Genre', {
                                  type: 'raison',
                                  mood: this.state.questions.mood,
                                  reason: item.answer_reason,
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
import React from "react";
import { 
    FlatList,
    ActivityIndicator,
    View, 
    Text, 
    ScrollView,
    StyleSheet,
    Image
} from "react-native";

import Container from '../common/container';
import Button from '../common/button';
import { Main } from '../common/view';
import { Question, Answer } from '../common/text';
import { AnswerContainer } from '../common/touchable';

import { API_URL } from '../../../api_url.js';

export default class Result extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            finished: true
        }
    }

    componentDidMount(){
        // Ici on récupère d'abord les paramètres envoyés par le component Genre et on va chercher les films correspondants aux genres
        const { navigation } = this.props;
        const { type } = this.state;
        var genres = navigation.getParam('genre_ids', '35');
        console.log(genres);
        var genre_ids = '';

        if(genres[0] != ''){
            for (var i = genres.length - 1; i >= 0; i--) {
                genre_ids += genres[i].id+', ';
            }
        }

        return fetch(API_URL+'api/movies_genres/{"type": "movie", "genres": "'+genre_ids+'"}', {
            method: "GET",
        })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
                isLoading: false,
                movies: responseJson.movies,
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

        // On affiche ici la liste des films
        return(
            <Main>
                <FlatList
                    data={this.state.movies}
                    renderItem={({item}) => 
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <AnswerContainer 
                              onPress={() => {
                                this.props.navigation.navigate('Single', {
                                  single_movie: item.id,
                                });
                              }}>
                                <Answer>{item.title}</Answer>
                            </AnswerContainer>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </Main>
        );
    }
}
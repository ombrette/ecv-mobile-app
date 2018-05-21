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

const styles = StyleSheet.create({
 
MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: 20,
 
},
 
textView: {
 
    width:'50%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
}
});

export default class Result extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            finished: true
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
        const { type } = this.state;
        var genres = navigation.getParam('genre_ids', '35');

        var genre_ids = '';

        for (var i = genres.length - 1; i >= 0; i--) {
            genre_ids += ', '+genres[i].id;
        }

        return fetch(API_URL+'api/search/{"type": "movie", "genres": "'+genre_ids+'"}', {
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
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
import { Title, Answer, Subtitle, Content } from '../common/text';

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

export default class Single extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
        const { type } = this.state;
        var movie_id = navigation.getParam('single_movie');

        console.log(movie_id);

        return fetch(API_URL+'api/movie/'+movie_id, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
                isLoading: false,
                movie: responseJson.movie
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
        var hours = Math.floor( this.state.movie.runtime / 60);
        var minutes = this.state.movie.runtime % 60;

        var image = "https://image.tmdb.org/t/p/w300_and_h450_bestv2"+this.state.movie.poster_path;

        return(
            <Main style={{flex: 1, paddingTop:20}}>
                <ScrollView>
                    <Title>{this.state.movie.title}</Title>
                    <View>
                        <Subtitle>Synopsis</Subtitle>
                        <Content>{this.state.movie.overview}</Content>
                    </View>
                    <View>
                        <Subtitle>Durée</Subtitle>
                        <Content>{hours}h{minutes}m</Content>
                    </View>
                    <View>
                        <Image
                          style={{width: 66, height: 58}}
                          source={{uri: image}}
                        />
                    </View>
                    <Container>
                        <Button 
                            label="Retour à l'accueil"
                            styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                            onPress={() => this.props.navigation.navigate('Home')} />
                    </Container>
                </ScrollView>
            </Main>
        );
    }
}
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

const styles = StyleSheet.create({
 
MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: 20,
 
},

imageView: {
 
    width: '50%',
    height: 100 ,
    margin: 7,
    borderRadius : 7
 
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


        return fetch('http://192.168.1.37:3000/api/search/{"type": "movie", "genres": "'+genre_ids+'"}', {
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

    singleMovie(item) {
        var image_path = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + item.poster_path;
        return <View style={{flex:1, flexDirection: 'row'}}>
                  <Image source = {{ uri: image_path }} style={styles.imageView} />
                
                  <Text style={styles.textView} >{item.title}</Text>
     
                </View>;
    }

    render(){
        if(this.state.isLoading){
            return(
                <Main style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </Main>
            )
        }

        return(
            <Main>
                <FlatList
                    data={this.state.movies}
                    renderItem={({item}) => 
                        {
                            console.log(this.singleMovie(item));
                            this.singleMovie(item);
                        }
                    }
                    keyExtractor={(item, index) => index}
                />
            </Main>
        );
    }
}
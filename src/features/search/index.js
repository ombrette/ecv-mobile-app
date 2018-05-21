import React from 'react';
import { FlatList, ActivityIndicator, Text, View, AsyncStorage, StyleSheet, Image } from 'react-native';
import Config from 'react-native-config';
import { API_URL } from '../../../api_url.js';

const styles = StyleSheet.create({
 
MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: 20,
 
},
 
// imageView: {
 
//     width: '50%',
//     height: 100 ,
//     margin: 7,
//     borderRadius : 7

// },
 
textView: {
 
    width:'50%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
}
});

export default class Search extends React.Component {

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
        }
    }

    componentDidMount() {
        return fetch(API_URL+'api/search/{"params": "movie"}', {
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
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                    data={this.state.movies}
                    renderItem={({item}) => 
                        <View style={{flex:1, flexDirection: 'row'}}>
        
                          <Image source = {{ uri: "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + item.poster_path }} />
                        
                          <Text style={styles.textView} >{item.title}</Text>
             
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

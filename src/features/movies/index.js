import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class Movies extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        return fetch('https://api.themoviedb.org/3/discover/movie?&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1', {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + DEMO_TOKEN
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.results,
                }, function(){

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
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

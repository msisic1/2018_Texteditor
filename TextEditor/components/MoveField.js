// OVO JE NADJA PISALA

import React from 'react';
import { Dimensions, View, Text, TextInput, Button } from 'react-native';

export class MoveField extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            filename: '',
            destination : ''
        };
    }

    render() {
        return(
            <View style = {{ padding: 10, paddingBottom: 0, backgroundColor: "#2a2a2a" }}>

                <TextInput
                    style = {{
                        backgroundColor: '#1b1b1b',
                        color: 'darkgray',
                        paddingLeft: 4,
                        paddingRight: 4,
                        marginBottom: 10
                    }}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={false}
                    placeholder= "File path"
                    onChangeText={(text) => this.setState({filename: text})}
                    value={this.state.filename}
                    //onSubmitEditing={(event) => this.startSearch()}
                    underlineColorAndroid='Color.rgba(0,0,0,0)'
                />

                <TextInput
                    style = {{
                        backgroundColor: '#1b1b1b',
                        color: 'darkgray',
                        paddingLeft: 4,
                        paddingRight: 4,
                        marginBottom: 10
                    }}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={false}
                    placeholder='Destination'
                    onChangeText={(text) => this.setState({destination: text})}
                    value={this.state.destination}

                    underlineColorAndroid='Color.rgba(0,0,0,0)'
                />

                <View
                    style = {{
                        paddingLeft:1,
                        flexDirection:'row',
                        justifyContent : 'space-around',
                        marginBottom: 10
                    }}
                >
                    <Button
                        title = 'Move'
                        style={{fontSize: 20, flex : 1}}
                        color="#841584"
                        //styleDisabled={{color: 'red'}}
                        onPress={this.onPressMove} />
                </View>

            </View>
        );
    }

    onPressMove(event) {
        console.log("Moving file")
    }
}

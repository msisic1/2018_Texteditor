// OVO JE TIN PISAO

import React from 'react';
import { Dimensions, View, Text, TextInput, Button } from 'react-native';

export class SearchField extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            findText: '',
            replaceWithText: ''
        };
    }

    render() {
        return(
            <View style = {{ padding: 10, paddingBottom: 0, backgroundColor: "#2a2a2a" }}>

                <TextInput
                    style = {{
                        backgroundColor: '#1b1b1b',
                        color: 'darkgray',
                        padding: 0,
                        paddingLeft: 4,
                        paddingRight: 4,
                        marginBottom: 10
                    }}
                    autoCorrect={false}
                    autoFocus={false}
                    placeholder= "Search"
                    placeholderTextColor= 'gray'
                    onChangeText={this.onChangeFindText.bind(this)}
                    value={this.state.findText}
                    //onSubmitEditing={(event) => this.startSearch()}
                    underlineColorAndroid='Color.rgba(0,0,0,0)'
                />

                <TextInput
                    style = {{
                        backgroundColor: '#1b1b1b',
                        color: 'darkgray',
                        padding: 0,
                        paddingLeft: 4,
                        paddingRight: 4,
                        marginBottom: 10
                    }}
                    autoCorrect={false}
                    autoFocus={false}
                    placeholder="Replace with"
                    placeholderTextColor= 'gray'
                    onChangeText={(text) => this.setState({replaceWithText: text})}
                    value={this.state.replaceWithText}

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
                        title = 'Replace all'
                        style={{fontSize: 20, flex : 1}}
                        color="#841584"
                        //styleDisabled={{color: 'red'}}
                        onPress={this.props.onPressReplaceAll} />

                    <Button
                        title = 'Replace next'
                        style={{fontSize: 20, flex : 1}}
                        color="#841584"
                        //styleDisabled={{color: 'red'}}
                        onPress={this.props.onPressReplace} />
                </View>

            </View>
        );
    }

    onChangeFindText(text) {
        this.setState({findText: text}, this.props.onChangeFindText(text));
    }
}

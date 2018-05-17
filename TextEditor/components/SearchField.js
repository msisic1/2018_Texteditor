// OVO JE TIN PISAO

import React from 'react';
import {View, Text, TextInput, Button } from 'react-native';

export class SearchField extends React.Component {
constructor(props){
    super(props);

    this.state = {

                  newBuffer : ''
                 };

    this.isOpen = false;
    this.U9 = '#U9';


}
render() {
    return(
        <View style = {{ backfaceVisibility : 'hidden'}}>

          <TextInput
          autoCorrect={false}
          autoFocus={false}
          placeholder= "Find in current buffer"
          onChangeText={this.props.onChangeFindText}
          value={this.state.findText}
          //onSubmitEditing={(event) => this.startSearch()}
          underlineColorAndroid='Color.rgba(0,0,0,0)'
          />

          <TextInput
          autoCorrect={false}
          autoFocus={false}
          placeholder="Replace with, in current buffer"
          onChangeText={this.props.onChangeReplaceWithText}
          value={this.state.replaceWithText}

          underlineColorAndroid='Color.rgba(0,0,0,0)'
          />

          <View style = {{flexDirection:'row', justifyContent : 'space-between'}}>

            <Button
            title = 'Replace all'
            style={{fontSize: 20, flex : 1}}
            color="#841584"
            //styleDisabled={{color: 'red'}}
            onPress={this.props.onPressReplaceAll}
            >
            </Button>

            <Button
            title = 'Replace next'
            style={{fontSize: 20, flex : 1}}
            color="#841584"
            //styleDisabled={{color: 'red'}}
            onPress={this.props.onPressReplaceNext}
            >
            </Button>

          </View>

        </View>

        );
}



}

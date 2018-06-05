import React from 'react';
import { ScrollView, Image } from 'react-native';

import { Footer, Button, Icon } from 'native-base'

export class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Footer style={{backgroundColor:'#303030', height:45}}>
                <ScrollView horizontal={true} overScrollMode={'never'} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <Button transparent onPress={this.props.undo} style={{justifyContent:'center',width:50}}>
                        <Image source={require('../res/images/undo.png')} style={{width: 25, height: 25}}/>
                    </Button>
                    <Button transparent style={{justifyContent:'center',width:50}}>
                        <Image source={require('../res/images/redo.png')} style={{width: 25, height: 25}}/>
                    </Button>
                    <Button transparent onPress = {this.props.onSearchButtonPress} style={{justifyContent:'center',width:50}}>
                        <Image source={require('../res/images/search.png')} style={{width: 30, height: 30}}/>
                    </Button>
                    <Button transparent onPress = {this.props.changeMod} style={{justifyContent:'center',width:50}}>
                        <Image source={require('../res/images/sun.png')} style={{width: 30, height: 30}}/>
                    </Button>
                    <Button transparent><Icon style={{color:'darkgray'}} name="help" /></Button>
                    <Button transparent><Icon style={{color:'darkgray'}} name="help" /></Button>
                    <Button transparent><Icon style={{color:'darkgray'}} name="help" /></Button>
                    <Button transparent><Icon style={{color:'darkgray'}} name="help" /></Button>
                    <Button transparent><Icon style={{color:'darkgray'}} name="help" /></Button>
                    <Button transparent><Icon style={{color:'darkgray'}} name="help" /></Button>
                    <Button transparent><Icon style={{color:'darkgray'}} name="help" /></Button>
                    <Button transparent><Icon style={{color:'darkgray'}} name="help" /></Button>
                </ScrollView>
            </Footer>
        );
    }
}

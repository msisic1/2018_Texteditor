import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { Container, Header, Button } from 'native-base'

export class HelpScreen extends React.Component {
    render() {
        return (
            <Container>
                 <Header
                    style = {{
                        backgroundColor:'#303030',
                        height:45,
                        paddingLeft:0,
                        paddingRight:0
                    }}    
                    androidStatusBarColor="#2a2a2a"
                >
                    <Button
                        transparent
                        onPress = {() => { this.props.navigation.goBack()}}
                        width={50}
                    >
                        <Image source={require('../res/images/back.png')} style={{width: 30, height: 30}}/>
                    </Button>
                    <View style={{flex:1}} />
                </Header>

                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: '#424242',
                        padding: 10
                    }}
                >
                    <Text
                        style={{
                            color: '#f2f2f2',
                            fontSize: 16
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        {"\n\n"}Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        {"\n\n"}Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
            </Container>
        );
    }
}
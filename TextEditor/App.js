import React from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput } from 'react-native';

import { Font } from 'expo';

import { Spinner, Container, Body, Header, Footer, Button, Icon, Left, Right } from 'native-base'

import Drawer from 'react-native-drawer'
import TreeView from '@zaguini/react-native-tree-view'


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            text: "",
            fontLoaded: false,
            lines: '1\n2',
            linesNum: 2,
            selectionStart: 0,
            selectionEnd: 0,
            scrollWidth: 0,
            contentLoaded: false,
            contentHeight: 0,
            contentWidth: 0
        };

        var drawerIsOpen = false
    }

    async componentDidMount() {
        await Font.loadAsync({
            'VeraMono': require('./res/fonts/VeraMono.ttf'),
            'Inconsolata': require('./res/fonts/Inconsolata.otf')
        });
        this.setState({fontLoaded:true})
    }

    render() {
        if(!this.state.fontLoaded) {
            return (<Spinner color='gray' style={{flex: 1, backgroundColor:'#303030'}} />);
        }
        
        return (
            <Container>
                <Header style={{backgroundColor:'#303030', height:24}} />{/* status bar */}

                <Header androidStatusBarColor="#2a2a2a" style={{backgroundColor:'#303030', height:45, paddingLeft:0, paddingRight:0}}>
                    <Button transparent onPress={this.onPressMenu.bind(this)}>
                        <Icon name="menu" />
                    </Button>

                    <View style={{flex:1}}>

                    </View>

                    <Button transparent onPress={this.onPressMore.bind(this)}>
                        <Icon name="more" />
                    </Button>
                </Header>

                <Drawer
                    type="overlay"
                    ref={(ref) => this._drawer = ref}
                    content={
                        <View style={{flex:1, backgroundColor: '#2a2a2a', justifyContent:'center', alignItems:'center'}}>
                            <Text>Drawer</Text>
                        </View>
                    }
                    
                    elevation={10}
                    tapToClose={true}
                    openDrawerOffset={0.2} // 20% gap on the right side of drawer
                    panOpenMask={0.15}
                    panCloseMask={0.2}
                    closedDrawerOffset={-3}
                    tweenHandler={(ratio) => ({
                        mainOverlay: { backgroundColor:'black', opacity:ratio/3.6 }
                    })}
                    tweenDuration={100}

                    onOpen={() => this.drawerIsOpen = true}
                    onClose={() => this.drawerIsOpen = false}
                >
                    <ScrollView ref='content' onLayout={this.onContentLayout.bind(this)} overScrollMode={'never'} style={{backgroundColor:'#424242'}}>
                        <View style={{flexDirection: 'row'}}>
                            { this.state.contentLoaded &&
                            <Text onLayout={this.onNumLineLayout.bind(this)} style={{
                                    backgroundColor: '#383838',
                                    color: 'gray',
                                    minWidth: 40,
                                    margin: 0,
                                    padding: 0,
                                    paddingTop: 2.8,
                                    paddingLeft: 4,
                                    paddingRight: 4,
                                    textAlign: 'right',
                                    lineHeight: 20,
                                    fontFamily: 'VeraMono',
                                }}>
                                    {this.state.lines}
                            </Text>}
                            <ScrollView horizontal={true} overScrollMode={'never'} style={{flex: 1}}>
                                <TextInput style={{
                                        //backgroundColor: 'rgba(0,0,0,0.1)',
                                        textAlign: 'left',
                                        textAlignVertical: 'top',
                                        fontFamily: "VeraMono",
                                        color: '#f2f2f2', 
                                        margin: 0,
                                        padding: 0,
                                        paddingTop: 2.4,
                                        paddingLeft: 4,
                                        paddingRight: 30,
                                        paddingBottom: 38,
                                        lineHeight: 20
                                    }}

                                    ref={(ref) => this._code = ref}
                                    disableFullscreenUI={true}
                                    minHeight = {this.state.contentHeight}
                                    minWidth = {this.state.contentWidth}
                                    underlineColorAndroid='Color.rgba(0,0,0,0)'
                                    multiline
                                    onChangeText={(text) => this.setState({text})}
                                    onContentSizeChange={this.onChangeSize.bind(this)}
                                    onSelectionChange={this.onSelectionChange.bind(this)}
                                >

                                </TextInput>
                            </ScrollView>
                        </View>
                    </ScrollView>

                    <Footer style={{backgroundColor:'#303030', height:45}}>
                        <ScrollView horizontal={true} overScrollMode={'never'} showsHorizontalScrollIndicator={false}>
                            <Button transparent><Icon style={{color:'darkgray'}} name="undo" /></Button>
                            <Button transparent><Icon style={{color:'darkgray'}} name="redo" /></Button>
                            <Button transparent><Icon style={{color:'darkgray'}} name="search" /></Button>
                            <Button transparent><Icon style={{color:'darkgray'}} name="help" /></Button>
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
                </Drawer>
            </Container>
        );
    }

    onContentLayout(event) {
        this.setState({
            contentLoaded: true,
            contentHeight: event.nativeEvent.layout.height,
            scrollWidth: event.nativeEvent.layout.width,
        })
    }

    onNumLineLayout(event) {
        this.setState({
            contentWidth: this.state.scrollWidth -  event.nativeEvent.layout.width
        })
    }

    onPressMenu(event) {
        this.drawerIsOpen ? this._drawer.close() : this._drawer.open()
    }

    onPressMore(event) {
        console.log("More")
    }

    onSelectionChange(event) {
        this.setState({
            yarn: event.nativeEvent.selection.start,
            selectionEnd:  event.nativeEvent.selection.end
        })
    }

    onChangeSize(event){
        var ln = this.state.text.split('\n').length + 1
        if(ln != this.state.linesNum) {
            var str = Array.from(new Array(ln),(v,i)=>i+1).join('\n')

            this.setState({
                linesNum: ln,
                lines: str,
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
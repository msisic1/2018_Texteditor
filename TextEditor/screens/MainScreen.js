import React from 'react';
import { View, KeyboardAvoidingView, Text, ToastAndroid } from 'react-native';

import { Spinner, Container } from 'native-base'

import { EditText } from '../components/EditText';
import { Toolbar } from '../components/Toolbar';
import { Actionbar } from '../components/Actionbar'
import { CustomDrawer } from '../components/CustomDrawer'
import { SearchField } from '../components/SearchField'
import { Button } from 'react-native';
import { MoveField } from '../components/MoveField';
import { NewField } from '../components/NewField';

export class MainScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: true,
            searchPressed : false,
            //findText : '', //TIN txt za pretragu koji se treba zamjeniti
            //replaceWithText : '', //TIN text kojim se mijenja findText
            currentIndex: 0,
            movePressed: false,
            newPressed: false
        };

    }

    render() {
        if(!this.state.loaded) {
            return (
                <Spinner
                    style = {{ flex: 1, backgroundColor: '#303030' }}
                    color = 'gray'  />
            );
        }

        return (
            <Container>
                <Actionbar
                    onPressMenu = {this.onPressMenu.bind(this)}
                    onPressMore = {this.onPressMore.bind(this)} />

                <CustomDrawer
                    ref={(ref) => this._drawer = ref}
                    content={
                    <View
                        style = {{
                            flex:1,
                            backgroundColor: '#2a2a2a',
                            //justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >  
                        <Button
                            style={{fontSize: 20, color: 'blue'}}
                            styleDisabled={{color: 'red'}}
                            onPress={this.onPressNewFile.bind(this)}
                            title="New file"
                        >
                            New file
                        </Button>
                            
                        <Button
                            style={{fontSize: 20, color: 'blue'}}
                            styleDisabled={{color: 'red'}}
                            onPress={this.onPressMoveFile.bind(this)}
                            title="Move file"
                        >
                            Move file
                        </Button>

                        <Button
                            style={{fontSize: 20, color: 'blue'}}
                            styleDisabled={{color: 'red'}}
                            onPress={this.onPressHelp.bind(this)}
                            title="Help"
                        >
                            Move file
                        </Button>

                    </View>
                    }
                    onOpen = {() => this.drawerIsOpen = true}
                    onClose = {() => this.drawerIsOpen = false}
                >

                        <View style={{flex:1}}>
                            <EditText ref={(ref) => this._editText = ref} />
                        </View>

                        { this.state.searchPressed &&
                            <SearchField
                                ref={(ref) => this._searchField = ref}
                                buffer = {this.state.text}
                                //findText = {this.state.findText}
                    
                                onPressReplaceAll = {this.onPressReplaceAll.bind(this)}
                                onPressReplace = {this.onPressReplace.bind(this)}
                                onChangeFindText = {(text) => {
                                    this.setState({currentIndex: 0});
                                    this.findNext({text: text})
                                }}
                                //onChangeFindText = { (findText) => this.setState({findText})}
                                //onChangeReplaceWithText = {(replaceWithText) => this.setState({replaceWithText})}
                            />
                            //TIN ukoliko je search dugme pritisnuto renderuje se SearchField komponenta
                        }

                        { this.state.newPressed &&
                            <NewField
                                ref={(ref) => this._newField = ref}
                            />
                        }
                        { this.state.movePressed &&
                            <MoveField
                                ref={(ref) => this._moveField = ref}
                                //onPressMove = {this.onPressMove.bind(this)}
                            />
                            //NAĐA ukoliko je move dugme pritisnuto renderuje se MoveField komponenta
                        }
                        

                        <Toolbar
                            //TIN funkcija koja updateuje searchpressed stanje ukoliko se unutar toolbara klikne na search dugme
                            onSearchButtonPress = {() => this.setState({searchPressed: !this.state.searchPressed})}/>
                </CustomDrawer>
            </Container>
        );
    }

    onPressMenu(event) {
        this._editText.blur()
        this.drawerIsOpen ? this._drawer.close() : this._drawer.open()
    }

    onPressMore(event) {
        console.log("More")
    }

    findNext({text, searchText}) {
        var currentIndex = this.state.currentIndex

        text = text ? text : this._editText.state.text
        searchText = searchText ? searchText : this._searchField.state.findText

        if(currentIndex < 0 || currentIndex >= text.length)
            currentIndex = 0
        
        currentIndex = text.regexIndexOf(searchText, currentIndex)

        if(currentIndex >= 0)
            this._editText.setSelection(currentIndex, currentIndex + searchText.length)
    }

    //TIN funkcija koja mijenja sve specificirane instance stringa u dokumentu, na pritisak replace all dugmeta unutar SearchField komponente
    onPressReplaceAll(event) {
        if(this._searchField.state.findText === '')
            ToastAndroid.showWithGravityAndOffset('Enter search string', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 150);
        else {
            text = this._editText.state.text.replaceAll(
                this._searchField.state.findText,
                this._searchField.state.replaceWithText)
            this._editText.setState({text});
        }
    }

    onPressReplace(event) {
        if(this._searchField.state.findText === '')
            ToastAndroid.showWithGravityAndOffset('Enter search string', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 150);
        else {
            if(this._editText.state.selectionStart >= 0) {
                text = [ this._editText.state.text.slice(0, this._editText.state.selectionStart),
                            this._searchField.state.replaceWithText,
                            this._editText.state.text.slice(this._editText.state.selectionEnd)].join('')
                
                this._editText.setSelection(this._editText.state.selectionStart, this._editText.state.selectionStart)
                this._editText.setState({text})
                
                this.findNext({text})
            }
        }
    }

    onPressNewFile(event){
        console.log("New file")
        this.setState({newPressed: !this.state.newPressed})
    }

    onPressMoveFile(event){
        console.log("Move file")
        this.setState({movePressed: !this.state.movePressed})
    }

    onPressHelp() {
        this.props.navigation.push('Help')
    }
}
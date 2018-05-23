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

//import FileSystem from 'react-native-filesystem-v1';

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

    //async function writeToFile() {
    //    const isAppend = true; // If this variable is set to true, content will be appended to the file.
    //    const fileContents = 'This is a my content.';
    //    await FileSystem.writeToFile('my-directory/my-file.txt', fileContents, isAppend);
    //    console.log('file is written');
    //}
    

    render() {
        if(!this.state.loaded) {
            return (
                <Spinner
                    style = {{ flex: 1, backgroundColor: '#303030' }}
                    color = 'gray'  />
            );
        }

        //writeToFile()

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
                                onChangeFindText = {(text) => { this.findFirst({text: text}) }}
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

    findFirst({text, searchText}) {
        if(!text) text = this._editText.state.text
        if(!searchText) searchText = this._searchField.state.findText
        
        this.setState({currentIndex: text.regexIndexOf(searchText)})
    }

    findNext({text, searchText}) {
        if(!text) text = this._editText.state.text
        if(!searchText) searchText = this._searchField.state.findText
        
        this.setState({currentIndex: text.regexIndexOf(searchText, this.state.currentIndex)})
    }

    //TIN funkcija koja mijenja sve specificirane instance stringa u dokumentu, na pritisak replace all dugmeta unutar SearchField komponente
    onPressReplaceAll(event) {
        if(this._searchField.state.findText === '')
            ToastAndroid.showWithGravityAndOffset('Enter search string', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 150);
        else {
            text = this._editText.state.text.replaceAll(
                this._searchField.state.findText,
                this._searchField.state.replaceWithText)

                console.log('text: |' + text)
            this._editText.setState({text});
        }
    }

    onPressReplace(event) {
        if(this._searchField.state.findText === '')
            ToastAndroid.showWithGravityAndOffset('Enter search string', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 150);
        else {
            console.log('i:' + this.state.currentIndex)

            if(this.state.currentIndex >= 0 && this.state.currentIndex < this._editText.state.text.length) {
                text = [ this._editText.state.text.slice(0, this.state.currentIndex),
                            this._searchField.state.replaceWithText,
                            this._editText.state.text.slice(this.state.currentIndex + this._searchField.state.findText.length)].join('')

                console.log('text: |' + text)
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
        this.props.navigation.navigate('Help')
    }
}

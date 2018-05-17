import React from 'react';
import { View, Text } from 'react-native';

import { Font } from 'expo';

import { Spinner, Container } from 'native-base'

import { EditText } from './components/EditText';
import { Toolbar } from './components/Toolbar';
import { Actionbar } from './components/Actionbar'
import { CustomDrawer } from './components/CustomDrawer'
import { SearchField } from './components/SearchField'

//import TreeView from '@zaguini/react-native-tree-view'

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            text: "", //TIN text koji koristi komponenta EditText, izvucen u klasu app, radi istovremenog i pojediancnog refaktorisanja
            loaded: false,
            searchPressed : false,
            findText : '', //TIN txt za pretragu koji se treba zamjeniti
            replaceWithText : '', //TIN text kojim se mijenja findText
        };

        var drawerIsOpen = false
    }

    async componentDidMount() {
        await Font.loadAsync({
            'VeraMono': require('./res/fonts/VeraMono.ttf'),
            'Inconsolata': require('./res/fonts/Inconsolata.otf')
        });
        this.setState({loaded:true})
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
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text>Drawer</Text>
                        </View>
                    }
                    onOpen = {() => this.drawerIsOpen = true}
                    onClose = {() => this.drawerIsOpen = false}
                >


                {

                    this.state.searchPressed &&
                    <SearchField buffer = {this.state.text} onPressReplaceAll = {this.onPressReplaceAll.bind(this)} onPressReplaceNext = {this.onPressReplaceNext.bind(this)}  onChangeFindText = { (findText) => this.setState({findText})} onChangeReplaceWithText = {(replaceWithText) => this.setState({replaceWithText})}></SearchField>
                    //TIN ukoliko je search dugme pritisnuto renderuje se SearchField komponenta
                }

                    <EditText text = {this.state.text} ref={(ref) => this._editText = ref} onChangeText = {(text) => this.setState({text})}/>

                    <Toolbar onSearchButtonPress = {this.onPressSearch.bind(this)}/>
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
    //TIN funkcija koja updateuje searchpressed stanje ukoliko se unutar toolbara klikne na search dugme
    onPressSearch(event)
    {
      this.setState({searchPressed: !this.state.searchPressed});

    }

    //TIN funkcija koja mijenja sve specificirane instance stringa u dokumentu, na pritisak replace all dugmeta unutar SearchField komponente
    onPressReplaceAll(event){

      if(this.state.findText === '')
      {
        alert("Please specify a search criteria!");
      }
      else {

        if(this.state.replaceWithText === '') this.state.replaceWithText = " ";

        let originalBuffer = this.state.text;
        let UpdatedBuffer = originalBuffer.replace(this.state.findText, this.state.replaceWithText);
        while(UpdatedBuffer !== UpdatedBuffer.replace(this.state.findText, this.state.replaceWithText))
        {
          UpdatedBuffer = UpdatedBuffer.replace(this.state.findText, this.state.replaceWithText);
        }



        this.setState({text: UpdatedBuffer});

      }

    }

    onPressReplaceNext(event)
    {
      if(this.state.findText === '')
      {
        alert("Please specify a search criteria!");
      }
      else {

        if(this.state.replaceWithText === '') this.state.replaceWithText = " ";

        let originalBuffer = this.state.text;
        let UpdatedBuffer = originalBuffer.replace(this.state.findText, this.state.replaceWithText);

        //alert(UpdatedBuffer);

        this.setState({text: UpdatedBuffer});

      }

    }



}

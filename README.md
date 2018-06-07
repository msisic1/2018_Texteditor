# 2018_Texteditor

## Pokretanje aplikacije
Jedan od načina za pokretanje aplikacije je kreiranje nove React Native aplikacije (više informacija o tome na: https://facebook.github.io/react-native/docs/getting-started.html), nakon čega je potrebno kopirati "components", "res" i "screens" foldere, kao i App.js fajl u novu aplikaciju koju ste kreirali.

## Pokretanje aplikacije koristeći Expo
Nakon kopiranja potrebnih podataka, ako ste kreirali novu aplikaciju koristeći komandu "create-react-native-app", potrebno je da instalirate Expo (https://expo.io/) na uređaj na kojem želite pokrenuti aplikaciju. 
Nakon kucanja komande "npm start" pojaviti će se QR code u terminalu. Koristeći Expo aplikaciju potrebno je skenirati taj QR code, nakon čega se pokreće vaša aplikacija.

## Pokretanje koristeći emulatora
Nakon kopiranja potrebnih podataka, ako ste kreirali novu aplikaciju koristeći komandu "react-native init", potrebno je da instalirate Android Studio i sve potrebne dodatke (više informacija o tome na: https://facebook.github.io/react-native/docs/getting-started.html pod tabom "Building Projects with Native Code").
Također je potrebno da instalirate Java Development Kit (http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).  
Nakon pokretanja emulatora kroz Android Studio, potrebno je da pokrenete komandu "react-native run-android" nakon čega se pokreće vaša aplikacija na virtualnom uređaju.

# Two Tired
## App installieren / starten
Template: https://reactnative.dev/docs/typescript
* Android Emulator laufen haben

```
yarn install
yarn android
``` 

## MVP

* Einstellungen:
    * Anzahl Ritzel vorne
    * Anzahl Ritzel hinten
    * Anzahl der Zähne pro Ritzel
    * Bevorzugte Trittfrequenz
    * Reifengröße
    
* Main Window
    * Optimale Ritzel für bevorzugte Trittfrequenz
    * Geschwindigkeit
    * Energieverbrauch (in Optimalbedingungen)
        * eben
        * kein Wind
        * Asphalt

**TODO: Mockups einfügen**

## Mögliche Erweiterungen

* Trittfrequenzsensor verbinden
* An Kartenmaterial verbinden
    * Höhendaten
        * Optimierung der Energiefunktion
        * Schaltvorrausschau ("Gleich musst du runter schalten")
    * Routing
    * 

# Quellen:
* React + Redux + Typescript: https://medium.com/@killerchip0/react-native-redux-typescript-guide-f251db03428f
* React Navigation: https://reactnavigation.org/docs/getting-started
* React Localization: https://medium.com/cybermonkey/multiple-language-support-in-react-native-part-1-fa6966b62332
* React Persist: https://github.com/rt2zz/redux-persist#storage-engines
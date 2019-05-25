Title: Beacons - Shiny Style
Published: 05/20/2019
Tags:
    - Xamarin
    - OSS
    - Shiny
---

Shiny provides the first fully managed beacon implementation for Android & UWP.  It's reach is only limited currently by the reach of Shiny.BluetoothLE

## Terminology

* Identifier - this is a string, for you to set how you see fit (within reasons obviously)
* UUID - Universally Unique Identifier - This is a GUID in .NET terms.  You could equate this to the city where you live
* Major - This is a ushort (uint16).  This would equate to the street on which you live
* Minor - This is also a ushort (uint16).  This would equate to your street number.  Thereby, giving you the greatest precision in identification.


## Ranging

The term "ranging" in beacon lingo means to locate all beacons within a specific UUID.  

### How-TO Range

## Monitoring

Monitoring is for the most part - a background task.  It is also quite a bit different than ranging and comes with a different set of rules.


### How to Monitor in Shiny (like a boss!)

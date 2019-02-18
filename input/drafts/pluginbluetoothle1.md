Title: Plugin.BluetoothLE Part 1 
Lead: Getting Started with Plugin.BluetoothLE
Published: 2/9/2019
Tags:
    - Xamarin
    - BluetoothLE
    - OSS
---
Bluetooth (specifically LE) has been a big project of mine for some time.  The reason I like BLE so much is that it is the one protocol that just works on all platforms.  You don't need internet, you don't need any weird permission or to beg the user to do much beyond asking "can we use your bluetooth radio"?  

Over the last few years though, I've seen people really get BLE wrong.  In an era of web devs, working with bytes often seems to be a lost art.  BLE allows you to send 20 bytes per packet.

* Sending 8k worth of JSON and complaining things are slow
* 


## Android Pain
Android is a finnicky beast ESPECIALLY when it comes to BluetoothLE.  The protocol, while being asynchronous in nature, is anything but async on Android.  If you execute reads or writes on top of each other, it often leads to the dreaded GATT 133 error.
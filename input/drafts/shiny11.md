Title: Shiny 1.1
Published: 2/28/2020
Image: images/shiny_logo.png
Tags:
    - Xamarin
    - OSS
    - Shiny
---

It's only been a month since the 1.0 release and 1.1 is already here!  1.1 is packed with a ton of updates though.  Make sure to read to the end, the new Push library is pretty epic in my opinion.


Easier Boilerplate
---

I found that users were often missing some of the unfortunate boilerplate code that is necessary to integrate with the OS.  With 1.1, I set out to make the discovery a bit easier to work with.  

Shiny.Integrations.XamarinForms


AndroidX
---
AndroidX is now supported in most of the Shiny packages where possible.  Simply upgrade your Android target framework in your head project to use Android 10 and voila, you will automatically have the new AndroidX Shiny libraries.

There is really only 1 significant upgrade other than freeing yourself from those evil support libraries.  I've replaced the default JobScheduler engine with the new shiny WorkManager.  The awesome part, you don't have to change a thing in your job code to get the benefits of this!

Other Core Updates
---
Connectivity
Network

Notifications
---
There are several minor, but nice updates to the local notifications library
* A better way to set sounds either from custom or system
* AndroidX upgrade - remove those pesky support libraries!
* Android now allows you to use Big text styles and large icons - check the Notification.AndroidOptions

Location Updates
---
Mostly bugfixes for this one with some minor updates
* We are now checking for the new Android 10 background location permission as necessary
* The addition of a pure GPS to Geofence module.  Some customers have stated they don't like the requirement on Google Play Services for many reasons, thus, I wanted to give this option.

```csharp
// in your shiny startup file
services.UseGpsDirectGeofencing<YourGeofenceDelegate>()
```


More Platforms
---
I have also continued to work on expanding the platform offering within Shiny.  This release does contain some early beta stuff for Tizen & macOS.

Push
---
It turns out, a lot of people started to use AppCenter push notifications and like most push centers, it will be disappearing into the wind.  What if you could have a push notification engine that had "one easy abstraction to rule them all"?  This is what I set out to do. 

Currently, Shiny supports the default native OS push mechanisms as well as Firebase & Azure Push Notifications


```csharp
// install Shiny.Push.AzureNotifications nuget into your netstandard project
services.UsePushAzureNotificationHubs<PushDelegate>("Your listener connection string", "your hub name");

// install Shiny.Push.FirebaseNotifications nuget into your netstandard project
services.UseFirebaseMessaging<PushDelegate>();

// don't want any of those provider and like going your own - simply install 
services.UsePushNotifications<PushDelegate>();
```

Note that there are several other arguments you can (should) pass to the notification provider such as categories & actions if you use them in your notifications.  Also, you can have Shiny request permission to use push notifications right off the app start.


The push delegate is where you can integrate with data in your backend


The push abstraction has a few "neat" additions.  If you have a UI that listens for silent notifications like I often do, you need an easy way for listening to those notifications. 

```csharp
// this uses the static host, but you really should DI this!
ShinyPushManager.WhenPushReceived().Subscribe(x => {
    // x is a dictionary that contains the data section of your push notification
})
```
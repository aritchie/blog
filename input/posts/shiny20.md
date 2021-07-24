Title: Shiny 2.0 For Xamarin - Shinier Than Ever
Published: 5/5/2021
Image: images/shiny_logo.png
Tags:
    - Xamarin
    - OSS
    - Shiny
---

## The Path to 2.0

Shiny is a Xamarin Framework designed to make dealing with device & background services easy by bringing things like dependency injection, logging, and lots of utilities to bring your workflows to the background
in friendly, testable, way!

Version 2.0 is months of work, hundreds of commits (1166 to be exact), and a lot of discovery around how to improve the end experience.  This release focused on improving the background experience
even more especially on Android.  Android is the source of great pain when it comes to backgrounding and especially around expectations that people
have (for instance, real time background GPS).  As such, Shiny now uses foreground services in most of these places.  As a developer using Shiny, this is completely 
transparent change for you unless you want to customize the notification.

Now that I'm done with the boring rant.  Let's talk about some of the cool new features

* <a href="#death-to-boilerplate-code">Boilerplate Code</a>
* <a href="#static-class-generation">Static Class Generation</a>
* <a href="#logging">Microsoft Extensions Logging</a>
* <a href="#bluetooth-le">BluetoothLE</a>
* <a href="#notifications">Local Notifications</a>
* <a href="#push-notifications">Push Notifications</a>
* <a href="#beacons">Beacons</a>


## Death to Boilerplate Code
---
This was the first source of support pain and issues that users had was usually missed (or wrong) setup.  In 2.0, I set out for how to remove this issue.  With the latest C# 9/.NET5 release,
source generators were released.  This allows for code to be injected in the places Shiny needed it.  To make things even more convenient for users, I can also wire up all of their 
Xamarin Forms, Xamarin Essentials, and other 3rd party source code.

To get an idea, here is a before and after showing both iOS and Android boilerplate

<?# TabGroup ?>
<?*
tabs:
  - name: Android Before
    include: "../../includes/shiny20/androidbefore.md"

  - name: Android After
    include: "../../includes/shiny20/androidafter.md"

  - name: iOS Before
    include: "../../includes/shiny20/iosbefore.md"

  - name: iOS After
    include: "../../includes/shiny20/iosafter.md"
?>
<?#/ TabGroup ?>

To get this "voodoo" magic.  Simply install the <?# NugetShield "Shiny" "Shiny" /?> nuget package into your head projects and add the attribute as shown in the "after" tabs above.  Also note how the activity and appdelegate are partial.
These new generators can even build your entire startup class, but that's a discussion for a future article :)

**NOTE: If you are using this on Azure DevOps or CI systems, MSBuild 16.8 is required which is not part of Mono yet.  You need to use a tool like Boots to update to the latest beta OR simply use the "BEFORE" versions above and install <?# NugetShield "Shiny.Core" "Shiny.Core" /?> instead**


## Static Class Generation
---
There are a lot of users that don't like dependency injection.  I can't see or live in a world without it (for now).  
With those thoughts in mind, source generators once again came to the rescue.  All you need to do is install the <?! NugetShield "Shiny" "Shiny" /?> in the library where you want the classes generated and add the attribute in any file as shown below.
For any Shiny library you have installed in your library, the source generator will create a static equivalent class of the interface.

```csharp
[assembly: StaticClasses("ILikeStatics")]

// core jobs
ILikeStatics.ShinyJobs.Register(...);

// ble
ILikeStatics.ShinyBle.Scan();

```

Pretty statics and NO dependency injection to be seen anywhere.  You still have to create a startup file though ;) 


## Logging
---
Logging is generally something you want in your app.  When you work in the background, you can't rely on the general dev experience of errors appearing in your VS output window.  
While libraries like AppCenter and Firebase help with crashes, it can be quite dangerous to build them directly into all of your views/viewmodels/classes/etc. Logging providers also tend to disappear and change over time.

With that being said, I also didn't want to write new providers to plugin into Shiny.  There was an easy answer to this problem - Use Microsoft.Extensions.Logging - the exact same library used by ASP.NET Core devs!  It is a fantastical abstraction 
to build on and support DI out of the gate!  The only thing that was missing was logging providers for AppCenter & Firebase - so I've added the following libs to Shiny

<?# NugetShield "Shiny.Logging.Firebase" "Shiny.Logging.Firebase" /?>
<?# NugetShield "Shiny.Logging.AppCenter" "Shiny.Logging.AppCenter" /?>


Wiring providers up is also almost just like ASP.NET Core.  In your Shiny startup file:

```csharp
using System;
using Shiny;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;


namespace YourApp
{
    public class YourStartup : ShinyStartup
    {
        public override void ConfigureLogging(ILoggingBuilder builder, IPlatform platform)
        {
			builder.AddFirebase();
			builder.AddAppCenter("your appcenter key");
        }
	}
}

```


## Notifications
---
Notifications in Shiny still provide all of the features imaginable for your Xamarin cross platform needs.
* Scheduling
* Actions
* Sounds
* Priorities

With 2.0, Notifications had to undergo some changes to make sure things like sounds worked and response actions from notifications were consistent across platforms, thus, channels were 
created as to play ball properly with channels on Android and to a far lesser degree, categories on iOS.  

Channels are essentially configuration groups.  This provides equivalent functionality to what you find on Android 8+ such as
* Priority
* Sounds
* Actions - Text Replies, Buttons, etc

With iOS, "channels" equate in a way to categories, but apply more to the available actions on a given notification.  With that in mind, I had to bring these two
worlds together for a consistent design between them (oh... and that UWP thing can come along too).  What's better, channel is required on Android - if you don't care 
about the additional functionality - omit it and Shiny will default it for you!


```cs
var manager = ShinyHost.Resolve<Shiny.Notifications.INotificationManager>(); // INJECT THIS
await manager.AddChannel(new Channel 
{
	Identifier = "YourChannelName",
	Description = "This is your channel",
	Importance = ChannelImportance.Normal // normal+ will add default sounds on android
	CustomSoundPath = "notification.mp3",
	Actions =
	{
		new ChannelAction
		{
			Identifier = "message",
			Title = "Leave a Message",
			ActionType = ChannelActionType.TextReply
		},
		new ChannelAction
		{
			Identifier = "freeticket",
			Title = "Free Ticket",
			ActionType = ChannelActionType.Destructive
		}
	}
});

// BONUS - got a resource file that you want to use instead - make sure to call this before AddChannel
channel.SetSoundFromEmbeddedResource(this.GetType().Assembly, "Samples.Resources.notification.mp3");


// now to use it
await manager.Send(
	"WELCOME TO THE CN Tower",
	"What would you like to do?",
	"YourChannelName"
)

```

Which gives you this!

![Actions1](images/shiny20/notificationactions.gif)



## Push Notifications
---
Over the last few years, push notification providers have come and gone.  Google has gone from GCM to Firebase - Other 3rd party push providers have dropped like flies for one reasons or another (ie. AppCenter).
If you don't have a good design pattern in place, you aren't left a rough spot of being forced to refactor things. 

As of the 2.0 release, Shiny supports:
* Native
* Firebase
* Azure Notification Hubs
* With OneSignal & AWS coming in the near future

Why is this such an awesome API? Because you can swap between push notification providers with 1 single line of code:

<?! Startup ?>
				// NATIVE
				services.UsePush<MyPushDelegate>(); // native
       
				// OR FIREBASE 
				services.UseFirebaseMessaging<MyPushDelegate>();

				// OR AZURE NOTIFICATION HUBS
				services.UsePushAzureNotificationHubs<MyPushDelegate>(
					"Your Listener Connection String",
					"Your Hub Name"
				);
<?!/ Startup ?>

This doesn't cover the general push setup like the Info/Entitlements.plist setup and google-services.json.  This will be covered in the docs.

Now that we've wired it up, let's request the user permission and get a token.

```csharp
var result = await ShinyHost.Resolve<Shiny.Push.IPushManager>.RequestAccess();
if (result.Status == Shiny.AccessState.Available) 
{
    result.RegistrationToken; // maybe you want to send this to your server to use in notifications
}

```

And lastly, how you actually get "pushes".  This method is particularily useful if you are doing a real time app for something like chat.

***Foreground***

```csharp
var subscription = ShinyHost
	.Resolve<Shiny.Push.IPushManager>()
	.WhenReceived(push => {
		var value = push.Data["ThisIsADictionary"];
		var title = push.Notification?.Title; // warning: notifications can be null
	});

// make sure to dispose when you're done or going to the background
subscription.Dispose();
```

***Background (this still runs in the foreground)***
The background, as with all things in Shiny, is where things begin to shine. The OnReceived is where most of the magic will happen for you.  From here, you can process a push notification
and do things like call out to an HTTP service to refresh data, maybe acknowledge that your user is available for shift work if they have "punched" into your app.  

<?! IncludeCode "../../CodeSamples/shiny20/MyPushDelegate.cs" /?> 


### Tag Support
Tags are a way of telling the push provider (if supported), I want to listen to these "topics".  This is supported by all of the 3rd party 
messaging systems like Firebase & Azure Notifications Hubs.

```csharp
// will not be null if supported
var tagPushManager = ShinyHost.Resolve<IPushManager>() as IPushTagSupport;
await tagPushManager.AddTag("YourTag");
await tagPushManager.RemoveTag("YourTag");
await tagPushManager.ClearTags();
await tagPushManager.SetTags("tag1", "tag2"); // remove tags that aren't present and add new tags
tagPushManager.RegisteredTags; // your current set of registered tags

// OR use the friendly extension methods off the push manager
var push = ShinyHost.Resolve<IPushManager>();
await push.TryAddTag(...);
await push.TryRemoveTag(...);
await push.TryClearTags(...);

```


## Bluetooth LE
---
I really went through all of the API calls this library had to offer.  

BLE is still firmly (and always will be) rooted in Reactive Extensions, but I wanted to make the APIs easier to consume for all users including myself.

Today, I'm only going to talk about 2 of the super cool features that are new with 2.0.  The Managed BLE mechanics:

#### Managed Scans
Scanning was riddled with potential issues
* maintaining a list of unique peripherals while still watching things like the RSSI and name changes
* synchronizing list updates to your UI
* Removing a device from the list that hasn't been heard in a specific time
* preventing the scan from overwhelming your UI with redraws (and subsequently making sure you're on the UI thread when doing anything)

It took a fair of code to manage this even with Shiny, but with the new managed scanner - take a look at the difference:

<?# TabGroup ?>
<?*
tabs:
  - name: Before
    include: "../../includes/shiny20/blescanbefore.md"

  - name: After
    include: "../../includes/shiny20/blescanafter.md"
?>
<?#/ TabGroup ?>

#### Managed Peripheral
The problem with traditional peripheral managed is that with every connection, you had to rescan for all of the services and characteristics you had.  You also had to restore any notifications you had.
This was painful.

Managed peripheral to the rescue. The managed peripheral will
* Work like a ViewModel - you can even have it broadcast it's changes on the UI thread for you to bind to
* Reconnect automatically
* Restore any characteristic subscription
* Read/Writes will redetect the characteristics as you used them.  This saves using GetCharacteristic to continously and thereby increasing performance
* Keeps a list of characteristics you've used instead of having to call GetServices/GetCharacteristics over and over

<?# TabGroup ?>
<?*
tabs:
  - name: Before
    include: "../../includes/shiny20/bleperipheralbefore.md"

  - name: After
    include: "../../includes/shiny20/bleperipheralafter.md"
?>
<?#/ TabGroup ?>

## Beacons
---
Beacons aren't really new, but there has always been a bit of a gap here in the Xamarin community.  You also had to always count on the beacon manufacturer supplying an SDK.
With Shiny, you get iBeacon (yes the Apple Beacons) out of the box on all of the platforms Shiny supports.  The thing I love about this library is that it is 100% C# and supports all of the monitoring/background scenarios
on Android as well!

Here's a quick look at the main beacon features

### The Wireup

<?! Startup ?>
				// NOTE: there are 2 different services for beacons 
				// for ranging - finding individual beacons in the foreground
				services.UseBeaconRanging();
       
				// for monitoring - finding beacon groups (not individual beacons) in the background
				services.UseBeaconMonitoring<MyBeaconMonitorDelegate>();
<?!/ Startup ?>

#### Background Beacons
Setting up background monitoring is pretty simple.  Once you've registered, simply call:

Here's your delegate:
<?! IncludeCode "../../CodeSamples/shiny20/MyBeaconMonitorDelegate.cs" /?> 

and the code to start monitoring:

```csharp
await ShinyHost
	.Resolve<Shiny.Beacons.IBeaconMonitorManager>()
	.StartMonitoring(new BeaconRegion(...)) // from here, simply setup the filter criteria you need - remember you only get 20 on iOS!
```

Simple right!?  StartMonitoring will even request all of the appropropriate permissions!

#### Managed Ranging Scan
This essentially works identical to the new managed BLE scan shown earlier with all of the same benefits
* It will use best practices to ensure your UI isn't overwhelmed with updates
* It will ensure that the bound collection is properly synchronized to prevent crashes
* It will remove beacons from your list that haven't been "heard" in a configurable timestamp
* It will manage the individual items with proximity changes

<?# TabGroup ?>
<?*
tabs:
  - name: Before
    include: "../../includes/shiny20/beaconscanbefore.md"

  - name: After
    include: "../../includes/shiny20/beaconscanafter.md"
?>
<?#/ TabGroup ?>

## In Closing
This article only scrapped the surface of the 2.0 upgrade.  There's more articles to come and the docs are shaping up nicely.  There are also other packages like NFC, Speech to Text, BLE Hosting, Sensors, and HTTP Transfers that all still exists.  They just didn't see any
huge feature updates in this release. 

I want to thank my good friend [Dan Siegel](https://twitter.com/DanJSiegel) of Prism fame for all of the help, testing, tooling, suggesting, blog articles, and poking (cough...nagging).  Shiny and the Xamarin community as a whole is a better place because of him.
His work on [Mobile Build Tools](https://mobilebuildtools.com/) was also immensely helpful for the Shiny samples and integration tests.

The future of Shiny now begins to look towards app services which moves from device & background servicing to truly solving real world business cases.  Some of the things I'm working on:
* GeoDispatch - Push + GPS for incident management scenarios
* GPS Tags - like the airtags but with normal beacons and GPS
* Trip Tracker - tracks your runs, walks, drives, etc in one easy to use API
* OBD Communications - Talking to these things even with the Shiny BLE API is still a bit of work.  This is going to make it easy!

I'm also still considering future platforms like WASM & macOS, but we'll see how the ecosystem shapes up.  I also want to mention that I've been working with the MAUI team on integrations.  I'll have more to share later this year as it stabilizes.

As with all OSS, Shiny is always looking for help.  Head over to GitHub if you've got an issue to report, an enhancement idea, or if you just want to help out.

## LINKS
* <?# ConfiguredLink "Documentation" /?>
* <?# ConfiguredLink "Samples" /?>
* <?# ConfiguredLink "GitHub" /?>
* <?# ConfiguredLink "AllNugets" /?>
Title: Introducing ACR Core
Published: 1/1/2019
Tags:
    - Xamarin
    - OSS
    - ACR Core
---
<?# Include "/posts/acrcore-links.md" /?>

ACR Core is a new OSS library that was built with the idea of making background operations easy in a cross platform way.  Initially, I am targeting Xamarin Android, Xamarin iOS & UWP platforms, but I've got my sights set on making it work on macOS, tizen, and possibly - Blazor & Meadow IoT in the near future.

ACR Core will provide many of the same functionality out of the box as Xamarin Essentials, but will also offer a jobs framework out of the box as well as every bit of functionality background modes such as geofences, gps, bluetoothle, etc require to function.

Lastly, it is built with dependency injection and reactive extensions in mind.  

Out of the box, CORE will offer the most of the same things Xamarin Essentials does
* Environment (App & Device Information)
* Connectivity
* File System & IO Extensions
* Power Watch
* Logging
* Settings
* Background Jobs
* Geofencing
* GPS (Foreground & Background)
* Bluetooth LE (GATT Peripheral & Central)
* Beacons
* Speech Recognition
* HTTP Uploads & Backgrounds
* Sensors
* Notifications


## Why Another Essentials?
Well - to be fair, I've had most of these libraries before some of the other plugins existed.  I also set out to offer a DI and background experience in a cross platform way first.  I also want to be able to bring these features to 

## Let's see it in action
I know some people aren't a fan of dependency injection, but for background jobs, it truly is a necessity.  Some people don't want to figure out if their services are singleton, scoped, transient, let alone what the words mean, as such, I set out to make DI for required services as easy and "non-DI-ish" as humanly possible

Step 1 - Install from nuget (given)
Step 2 - In your xplat project, create 
Step 3 - Create your "Startup" class
```csharp
// this sample uses everything imaginable in Core - YOU DO NOT NEED IT ALL
using Acr;
using Acr.BluetoothLE;
using Acr.Beacons;
using Acr.Logging;
using Acr.Locations;
using Acr.Notifications;
using Acr.Sensors;
using Acr.SpeechRecognition;
using Acr.Net.Http;
using Microsoft.Extensions.DependencyInjection;


namespace Samples
{
    public class SampleStart : IStartup
    {
        public void Configure(IServiceCollection builder)
        {
            Log.UseConsole();
            Log.UseDebug();
            Log.AddLogger(new AppCenterLogger(), true, false);

            // create your infrastructure
            builder.RegisterSingleton<SampleSqliteConnection, SampleSqliteConnection>();

            // register all of the acr stuff you want to use
            builder.UseHttpTransfers<SampleAllDelegate>();
            builder.UseBeacons<SampleAllDelegate>();
            builder.UseBleCentral<SampleAllDelegate>();
            builder.UseBlePeripherals();
            builder.UseGpsBackground<SampleAllDelegate>();
            builder.UseGeofencing<SampleAllDelegate>();
            builder.UseNotifications();
            builder.UseSpeechRecognition();

            builder.UseAccelerometer();
            builder.UseAmbientLightSensor();
            builder.UseBarometer();
            builder.UseCompass();
            builder.UseDeviceOrientationSensor();
            builder.UseMagnetometer();
            builder.UsePedometer();
            builder.UseProximitySensor();
        }
    }
}
```

## Step 4 - Create Some Delegates
```csharp
// again - using everything
```

### Step 5.1 - Initializing iOS
iOS is pretty easy - GO to AppDelegate and add the following stuff
```csharp
// in your FinishedLaunching method
AcrIosPlatform.Init(new Startup(), services => 
{
    // register any platform specific stuff you need here
});

// and add this guy - if you don't use jobs, you won't need it
public override void PerformFetch(UIApplication application, Action<UIBackgroundFetchResult> completionHandler)
{
    AcrIosPlatform.OnBackgroundFetch(completionHandler);
}
```


### Step 5.2 - Initializing Android
Android requires a fair bit more setup to get going 
```csharp
AcrAndroidPlatform.Init(new Startup(), services => {
    // register any platform specific stuff you need here
})
```


## I don't like RX or DI
I'm sorry to hear that, but if you are building an app of any significant size or with multiple team members, dependency injection is very necessary.  Testability is also a big part.  Please read [this article](posts/di-matters.html) for additional information on why dependency injection on mobile.  That all being said, I didn't want to cater this requirement a bit so there is a "pseudo" service locator called Services.  You can reference pretty much all services in a static fashion
```csharp
AcrPlatform.Container.Resolve<IJobManager>();
```


## Links
* [GitHub Samples](https://github.com/aritchie/core)
* [Nugets](https://nuget.org/profiles/aritchie)
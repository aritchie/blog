Title: Introducing ACR Core
Published: 1/1/2019
Tags:
    - Xamarin
    - OSS
    - ACR Core
---
<?# Include "acrcore-links.md" /?>

ACR Core is a new OSS library that was built with the idea of making background operations easy in a cross platform way.  Initially, I am targeting Xamarin Android, Xamarin iOS & UWP platforms, but I've got my sights set on making it work on macOS, tizen, and possibly - Blazor & Meadow IoT in the near future.

ACR Core will provide many of the same functionality out of the box as Xamarin Essentials, but will offer also offer a jobs framework out of the box as well as every bit of functionality background modes such as geofences, gps, bluetoothle, etc require to function.

Lastly, it is built with dependency injection and reactive extensions in mind.  

## Let's see it in action
I know some people aren't a fan of dependency injection, but for background jobs, it truly is a necessity.  Some people don't want to figure out if their services are singleton, scoped, transient, let alone what the words mean, as such, I set out to make DI for required services as easy and "non-DI-ish" as humanly possible

Step 1 - Install from nuget (given)
Step 2 - In your xplat project, create 
Step 3 - Create your "Application
```csharp
// this sample uses everything imaginable in Core - YOU DO NOT NEED IT ALL
using Acr;
using Acr.Autofac;
using Acr.BluetoothLE;
using Acr.Beacons;
using Acr.Logging;
using Acr.Locations;
using Acr.Notifications;
using Acr.Sensors;
using Acr.SpeechRecognition;
using Acr.Net.Http;


namespace Samples
{
    public class SampleAcrApplication : AcrAutofacApplication
    {
        protected override void RegisterDependencies(IContainerBuilder builder)
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
            builder.UseBlePeripherals(); // TODO: register server task instead?
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
            //builder.RegisterJob();
        }
    }
}
```

Step 4 - Create Some Delegates
```csharp
// again - using everything
```

Step 5.1 - Initializing iOS
iOS is pretty easy - GO to AppDelegate and add the following stuff
```csharp
// in your FinishedLaunching method
Plugin.Jobs.CrossJobs.Init();

// and add this guy
public override void PerformFetch(UIApplication application, Action<UIBackgroundFetchResult> completionHandler)
{
    Plugin.Jobs.CrossJobs.OnBackgroundFetch(completionHandler);
}
```


Step 5.2 - Initializing Android
Android requires a fair bit more setup to get going 

Step 5.3 - Initializing UWP

## I don't like RX
Please read [this article](posts/rx-matters.html)

## I don't like DI
I'm sorry to hear that, but if you are building an app of any significant size or with multiple team members, dependency injection is very necessary.  Testability is also a big part.  Please read [this article](posts/di-matters.html) for additional information on why dependency injection on mobile.  That all being said, I didn't want to cater this requirement a bit so there is a "pseudo" service locator called Services.  You can reference pretty much all services in a static fashion
```csharp
```

## Links
* [GitHub Samples](https://github.com/aritchie/core)
* [Nugets](https://nuget.org/profiles/aritchie)
Title: Introducing Shiny
Published: 3/20/2019
Tags:
    - Xamarin
    - OSS
    - Shiny
---

### What is it?

Shiny is a new OSS library that was built with the idea of making background operations easy in a cross platform way.  At its "core", it contains a lot of the same functionality as Xamarin Essentials, but was built with dependency injection and RX in mind.  Dependency injection is a very necessary set of principles for building testable services, but for background processes, it is absolutely essential as I'll show in future articles.

Initially, I am targeting Xamarin Android, Xamarin iOS & UWP platforms, but I've got my sights set on making it work on macOS, Tizen, and possibly - Blazor & Meadow IoT in the near future.


Out of the box, CORE will offer:
* A Centralized Structured Hosting Platform
* Environment (App & Device Information)
* Logging
* Connectivity
* File System & IO Extensions
* Power Management
* Permissions
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
* Integrations with 3rd Party MVVM Frameworks like Prism, ReactiveUI, & MvvmCross

### Why Another Essentials or Set of Plugins?
Well - to be fair, I've had most of these libraries before some of the other plugins existed.  I also set out to offer a DI and background experience in a cross platform way first.  I also wanted to open the door to other platforms like Tizen, macOS, Linux, Blazor, Uno, & possibly even Meadow as other platforms for the future.  This library has zero focus on UI and will only focus on service processes - I'll leave the frontend stuff to Xamarin Forms & Uno.

Current plugins also tend to lack features because they need an underlying layer to help keep things in check.  For instance, Plugin.Jobs (one of my plugins) spins up periodic jobs.  These jobs are essentially useless if you can't get your service layer into them in a consistent manner.  

## Main Objectives
The Xamarin Ecosystem has plenty of plugins, frameworks, & libraries.  There are great frameworks like Prism that help drive structured UI applications.  This framework set out to something no other Xamarin framework is doing, bring structure to your device service code from a backgrounding perspective.  However, we still need to be able to feed our services (GPS Manager, etc) into the general ecosystem like Prism.  Take a look at the [Shiny Samples](https://github.com/shinyorg/sjomu) to see Prism and Shiny working together.

### Let's see it in action
I know some people aren't a fan of dependency injection, but for background jobs, it truly is a necessity.  Some people don't want to figure out if their services are singleton, scoped, transient, let alone what the words mean, as such, I set out to make DI for required services as easy and "non-DI-ish" as humanly possible much like ASP.NET Core's new dependency injection.  In fact, we use the same Microsoft.Extensions.DependencyInjection

Step 1 - Install from nuget (given)
Step 2 - In your xplat project, create 
Step 3 - Create your "Startup" class
```csharp
// this sample uses everything imaginable in Core - YOU DO NOT NEED IT ALL
using Shiny;
using Shiny.BluetoothLE;
using Shiny.Beacons;
using Shiny.Logging;
using Shiny.Locations;
using Shiny.Notifications;
using Shiny.Sensors;
using Shiny.SpeechRecognition;
using Shiny.Net.Http;
using Microsoft.Extensions.DependencyInjection;


namespace Samples
{
    public class SampleStart : Startup
    {
        public override void ConfigureServices(IServiceCollection builder)
        {
            // custom logging
            Log.UseConsole();
            Log.UseDebug();
            Log.AddLogger(new AppCenterLogger(), true, false);

            // create your infrastructure
            builder.AddSingleton<SampleSqliteConnection, SampleSqliteConnection>();

            // register all of the acr stuff you want to use
            builder.UseHttpTransfers<SampleDelegate>();
            builder.UseBeacons<SampleDelegate>();
            builder.UseBleCentral<SampleDelegate>();
            builder.UseBlePeripherals();
            builder.UseGpsBackground<SampleDelegate>();
            builder.UseGeofencing<SampleDelegate>();
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

### Step 4 - Create Some Delegates
Notice those "SampleDelegate" generics above, that's where you register your background handler(s).  It is truly this simple to get up and running. 

```csharp
// again - this runs everything and the kitchen sink - pick and choose what you need
using System;
using System.Threading;
using System.Threading.Tasks;
using Shiny;
using Shiny.Beacons;
using Shiny.BluetoothLE.Central;
using Shiny.Locations;
using Shiny.Jobs;
using Shiny.Net.Http;
using Shiny.Notifications;
using Samples.Models;


namespace Samples
{
    public class SampleAllDelegate : IGeofenceDelegate,
                                     IGpsDelegate,
                                     IBeaconDelegate,
                                     IHttpTransferDelegate,
                                     IBleStateRestoreDelegate,
                                     IJob
    {
        // notice you can inject anything you registered in your application here
        readonly SampleSqliteConnection conn;
        readonly INotificationManager notifications;


        public SampleAllDelegate(SampleSqliteConnection conn, INotificationManager notifications)
        {
            this.conn = conn;
            this.notifications = notifications;
        }


        public void OnAdvertised(IScanResult result)
        {
        }


        public void OnConnected(IPeripheral peripheral)
        {
        }


        public async void OnStatusChanged(GeofenceState newStatus, GeofenceRegion region)
        {
            await this.conn.InsertAsync(new GeofenceEvent
            {
                Identifier = region.Identifier,
                Entered = newStatus == GeofenceState.Entered,
                Date = DateTime.UtcNow
            });
            await this.notifications.Send(new Notification
            {
                Title = "Geofences",
                Message = $"{region.Identifier} was {newStatus}"
            });
        }


        public async void OnStatusChanged(BeaconRegionState newStatus, BeaconRegion region)
        {
            await this.conn.InsertAsync(new BeaconEvent
            {
                Identifier = region.Identifier,
                Uuid = region.Uuid,
                Major = region.Major,
                Minor = region.Minor,
                Entered = newStatus == BeaconRegionState.Entered,
                Date = DateTime.UtcNow
            });
        }


        public async Task Run(JobInfo jobInfo, CancellationToken cancelToken)
        {
            await this.notifications.Send(new Notification
            {
                Title = "Job Started",
                Message = $"{jobInfo.Identifier} started"
            });

            var loops = jobInfo.Parameters.Get("Loops", 10);
            for (var i = 0; i < loops; i++)
            {
                if (cancelToken.IsCancellationRequested)
                    break;

                await Task.Delay(1000, cancelToken).ConfigureAwait(false);
            }
            await this.notifications.Send(new Notification
            {
                Title = "Job Finished",
                Message = $"{jobInfo.Identifier} Finished"
            });
        }


        public void OnStatusChanged(IHttpTransfer transfer)
        {
        }


        public async void OnReading(IGpsReading reading)
        {
            await this.conn.InsertAsync(new GpsEvent
            {
                Latitude = reading.Position.Latitude,
                Longitude = reading.Position.Longitude,
                Altitude = reading.Altitude,
                PositionAccuracy = reading.PositionAccuracy,
                Heading = reading.Heading,
                HeadingAccuracy = reading.HeadingAccuracy,
                Speed = reading.Speed,
                Date = reading.Timestamp
            });
        }
    }
}

```

### Step 5.1 - Initializing iOS
iOS is pretty easy - GO to AppDelegate and add the following stuff
```csharp
// in your FinishedLaunching method
IosShinyHost.Init(new Startup(), services => 
{
    // register any platform specific stuff you need here
});

// and add this guy - if you don't use jobs, you won't need it
public override void PerformFetch(UIApplication application, Action<UIBackgroundFetchResult> completionHandler)
    => IosShinyHost.OnBackgroundFetch(completionHandler);

```


#### Step 5.2 - Initializing Android
Android requires a fair bit more setup to get going.  Android requires a top level custom Application definition.  This is necessary as the Host needs to be initialized prior to any services or broadcast receivers warming up. 

```csharp
using System;
using Shiny;
using Android.App;
using Android.Runtime;


[Application]
public class YourApplication : Application
{
    public YourApplication(IntPtr handle, JniHandleOwnership transfer) : base(handle, transfer)
    {
    }


    public override void OnCreate()
    {
        base.OnCreate();
        AndroidShinyHost.Init(new Startup(), services => {
            // register any platform specific stuff you need here
        });
    }
}


// and lastly - in your main/current activity

public override void OnRequestPermissionsResult(int requestCode, string[] permissions, Permission[] grantResults)
    => AndroidShinyHost.OnRequestPermissionsResult(requestCode, permissions, grantResults);
```

### I Don't Like DI
I'm sorry to hear that - but the recent resurgence of ASP.NET Core is due to smart & proven architectural patterns being brought to the forefront instead of an afterthought.  ASP.NET Core did a wonderful thing though, they did a really good job of hiding alot of the complexity that can come with things.  I followed this model closely while building out the DI portion of Core.  In fact, if you do every thing by the books, you really won't ever see the DI container anywhere in your application!


### I Don't Like RX
Ya - I hear that a lot too.  I love RX.  RX appears complex at first, but actually is amazing at taking hard things and making them easy once you know how to work with the observable.  For libraries like BluetoothLE & GATT, I don't see any better mechanism for doing this.

```csharp
ShinyHost.Resolve<Shiny.Jobs.IJobManager>().Schedule(...);
ShinyHost.Resolve<Shiny.Locations.IGeofenceManager>().Add(...);
```

### Like What You See?
Head over to see the full [GitHub Samples](https://github.com/shinyorg/shiny) or official documentation located [here](/docs).  Packages on nuget can found [here](https://nuget.org/profiles/aritchie).

Follow the [links here](/tags/shiny) for more upcoming articles
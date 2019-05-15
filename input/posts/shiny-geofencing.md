Title: Geofencing with a pinch of Notifications - Shiny Style
Published: 12/15/2019
Tags:
    - Xamarin
    - OSS
    - Shiny
---

GPS & Geofencing is a common need for mobile and IoT platforms alike.  However, mobile platforms with backgrounding in this area are always painful and that is being nice.  We've tried several plugins over the years, but they have all some sort of pain point.  Shiny aims to solve all of these as it provides a lot of base infrastructure to make things... shiny ;)

We'll talk about GPS in a future article.  In this article, we'll focus on the geofencing and add in some notifications to make things awesome!


## Getting Started

Do all of your normal Shiny setup - you can create read my [Introducing Shiny](introducingshiny) to get going.

Shiny.Locations comes as a separate nuget package, but provides functionality for GPS & Geofencing.  
You'll also want to pickup Shiny.Notifications to complete the sample in this article.

### In Your Shared code

First, let's create our geofence delegate.  This is the guy that catches those events in the background.  As with all delegates in Shiny, you can inject your own services as long as they are registered with the Shiny container in your startup file.  

```csharp
using Shiny.Locations;

namespace MyNamespace
{
    public class MyGeofenceDelegate : IGeofenceDelegate
    {
        readonly INotificationManager notifications;

        public MyGeofenceDelegate(INotificationManager notifications)
        {
            this.notifications = notifications;
        }


        public async void OnStatusChanged(GeofenceState newStatus, GeofenceRegion region)
        {
            if (newState == GeofenceState.Entered)
            {
                await this.notifications.Send(new Notification 
                { 
                    Title = "WELCOME!",
                    Message = "It is good to have you back " + region.Identifier 
                });
            }
            else 
            {
                await this.notifications.Send(new Notification 
                { 
                    Title = "GOODBYE!", 
                    Message = "You will be missed at " + region.Identifier
                });
            }
        } 
    }
}
```

Now, let's hook this guy up to Shiny, so we can get everything running

```csharp
using System;
using Shiny;
using Shiny.Locations;
using Shiny.Notifications;
using Microsoft.Extensions.DependencyInjection;


public class SampleStartup : Startup
{
    public override void ConfigureServices(IServiceCollection builder)
    {
        builder.UseGeofencing<MyGeofenceDelegate>();
        builder.UseNotifications();
    }
}
```

### Android

Other than the normal Android setup for Shiny, you need to add the following to your manifest.xml
```xml
```

### iOS


## Registering an actual Geofence

In your viewmodel, you can now register a geofence.  

Please note that will registering a geofence will request the necessary user permissions through the OS.  If the permissions decline in any way, the method will toss an exception.  It is also a good time to request 

```csharp
using Shiny;
using Shiny.Locations;
using Shiny.Notifications;


public class YourViewModel
{
    public YourViewModel()
    {
        // shiny doesn't usually manage your viewmodels, so we'll do this for now
        var geofences = ShinyHost.Resolve<IGeofenceManager>();
        var notifications = ShinyHost.Resolve<INotificationManager>();

        Register = new Command(async () => 
        {
            // this is really only required on iOS, but do it to be safe
            var access = await notifications.RequestAccess();
            if (access == AccessState.Available)
            {
                await this.geofences.StartMonitoring(new GeofenceRegion(
                    "CN Tower - Toronto, Canada",
                    new Position(43.6425662, -79.3892508),
                    Distance.FromMeters(200)
                )
                {
                    NotifyOnEntry = true,
                    NotifyOnExit = true,
                    SingleUse = false
                });
            }
        });
    }

    public ICommand Register { get; }
}
```

## In Closing
Geofencing + Notifications is a powerful combination for things like marketing.  Hopefully, Shiny helps make this combo easy for you!

## Links
* [Source Code](https://github.com/shinyorg/shiny)
* [Samples](https://github.com/shinyorg/shiny)
* [Documentation](https://shinydocs.azurewebsites.net)
* Shiny.Core - [![NuGet](https://img.shields.io/nuget/v/Shiny.Core.svg?maxAge=2592000)](https://www.nuget.org/packages/Shiny.Core/)
* Shiny.Locations - [![NuGet](https://img.shields.io/nuget/v/Shiny.Core.svg?maxAge=2592000)](https://www.nuget.org/packages/Shiny.Locations/)
* Shiny.Notifications - [![NuGet](https://img.shields.io/nuget/v/Shiny.Core.svg?maxAge=2592000)](https://www.nuget.org/packages/Shiny.Notifications/)


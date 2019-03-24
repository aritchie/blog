Title: Background Jobs Using Shiny
Published: 3/21/2019
Tags:
    - Xamarin
    - OSS
    - Shiny
---

Performing background jobs on mobile is a necessity these days whether you are synchronizing data with your background, triggering notifications to say happy birthday, or just tracking your user for every step they make.  With Shiny, I set out to make this process a breeze.  Android has such a beautiful scheduled jobs engine that keeps improving.  iOS is painful mainly because Apple hates your code that isn't UI.  UWP does have a background tasks which work quite well, but lacks some structure.  I attempted to bring most of the "pretty" from Android to Xamarin cross platform! 

Jobs is something that is built into the main Shiny library as alot of what it does is the center point of the library and a lot of things will be built on it in the near future :)

---
## Getting Setup

Obviously, first things first - install the [NuGet](https://www.nuget.org/packages/Shiny/) package 

### Android
Add the following to your AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.BATTERY_STATS" />	
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
```

You need to have an actual Application class in your android project.  You can do this two ways:
```csharp
[Application]
public class YourApplication : Application
{
    public override void OnCreate()
    {
        base.OnCreate();
        AndroidShinyHost.Init(this, new Startup());
    }
}

```

### iOS
iOS doesn't have a set period.  It runs on background fetch which means when iOS feels like running it will.  To be fair, it is fairly intelligent when it does the sync (it knows when the user intends to be active, what the network is like, etc).  

To get iOS going, you have to wire the following into your AppDelegate:

```csharp
// in your FinishedLaunching method
IosShinyHost.Init(new Startup());

// and add this guy
public override void PerformFetch(UIApplication application, Action<UIBackgroundFetchResult> completionHandler)
{
    IosShinyHost.OnBackgroundFetch(completionHandler);
}
```

And for your Info.plist
```xml
<key>UIBackgroundModes</key>
<array>
	<string>fetch</string>
</array>
```

---
## Adhoc Jobs
Adhoc jobs are on-the-spot types of execution.  You need something to finish before your app takes a dirt nap... this is the guy to call:

```csharp
// IJobManager can and should be injected into your viewmodel code
ShinyHost.Resolve<Shiny.Jobs.IJobManager>().RunTask(async () => 
{
    // your code goes here - async stuff is welcome (and necessary)
});
```

---
## Scheduled Jobs
Scheduled jobs are the real meat though.  These are really what you need to make things happen when your app is backgrounded or needs to do something with some degree of regularity.  Don't go crazy, you still only get a finite amount of time to work with.  On iOS, this is 30 seconds and not a drop more.


So first things first, let's build a job.  Building a job is as simple as implementing Acr.Jobs.IJob.
```csharp
public class YourFirstJob : Shiny.Jobs.IJob
{
    public async Task Run(JobInfo jobInfo, CancellationToken cancelToken)
    {
        var id = jobInfo.GetValue("Id", 25); // we'll cover this in a minute
    }
}

```


Lastly, you have to register your job.  With scheduled jobs, I wanted to make sure that I could pass in metadata like last date run, some sort of identifiers, etc.  You also have the ability to set to preconditions of when your job is allowed to run.  Maybe you don't want to run unless you are on WiFi because you want to sync like 500+ megs?  Maybe you are going to run an infinite loop that melts the battery, so you want the battery to be charging or at least be above 20% - well, this is the place to make that happen

```csharp
var job = new JobInfo
{
    Name = "YourFirstJob",
    Type = typeof(YourFirstJob),

    // these are criteria that must be met in order for your job to run
    BatteryNotLow = true,
    DeviceCharging = false
    NetworkType = NetworkType.Any,
    Repeat = true //defaults to true, set to false to run once OR set it inside a job to cancel further execution
};

// you can pass variables to your job
job.SetValue("Id", 10);


// lastly, schedule it to go - don't worry about scheduling something more than once, we just update if your job name matches an existing one
ShinyHost.Resolve<Shiny.Jobs.IJobManager>().Schedule(job);
```

---
## Canceling Jobs
When your user logs out, you likely don't need to keep sucking away at their battery, so cancelling jobs is a necessary action to perform.  You have to ways to cancel jobs, by the specific ID of what you registered as the job name OR cancelling ALL jobs.  

```csharp
// Cancelling A Job
ShinyHost.Resolve<Shiny.Jobs.IJobManager>().Cancel("YourJobName");

// Cancelling All Jobs
ShinyHost.Resolve<Shiny.Jobs.IJobManager>().CancelAll();
```

---
## Running On-Demand
Unlike adhoc jobs, this is designed to run your registered job(s) when you need them.  On iOS, maybe you are using silent push notifications to give your app a kick to start pulling a gig of data?

```csharp
// Run All Jobs On-Demand
var results = await ShinyHost.Resolve<Shiny.Jobs.IJobManager>().RunAll();

// Run A Specific Job On-Demand
var result = await ShinyHost.Resolve<Shiny.Jobs.IJobManager>().Run("YourJobName");
```
NOTE: you can see the result(s) of a job pass by taking a look at the result object!

---
## Dependency Injection
You don't like all this static junk... GOOD ON YA because neither do I!!  This is a topic for another time though.  There is more indepth documentation on this on [GitHub](https://github.com/shinyorg/shiny).

## Links
* [GitHub](https://github.com/aritchie/introducingshiny) - Includes samples & the code itself
* [Documentation](/docs)
* [![NuGet](https://img.shields.io/nuget/v/Shiny.Core.svg?maxAge=2592000)](https://www.nuget.org/packages/Acr.Core/)
Title: Background Jobs Plugin for Xamarin
Published: 2/10/2019
Tags:
    - Xamarin
    - OSS
---

## First Post
Since this is my first post on my new blog, I thought I would start with one of my newest plugins!

[Plugin.Jobs](https://github.com/aritchie/jobs) is a cross platform plugin for Xamarin (and yes... that UWP thing too).  Background jobs are an essential part of any mobile application whether you need to send a notification at a set period of time or the most common of all, synchronize data with a backend database.  I know this was one of the key reasons I decided to build this.

Android has such a beautiful scheduled jobs engine that keeps improving.  iOS has zip mainly because Apple hates your code that isn't UI.  UWP does have a background tasks which work quite well, but lacks some structure.  I attempted to bring most of the "pretty" from Android to Xamarin cross platform! 

---
## Getting Setup

Obviously, first things first - install the [NuGet](https://www.nuget.org/packages/Plugin.Jobs/) package 

### Android
Add the following to your AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.BATTERY_STATS" />	
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
```

In your Main/Launch Activity.OnCreate - add the following
```csharp
Plugin.Jobs.CrossJobs.Init(this, savedInstanceState);
```

### iOS
iOS doesn't have a set period.  It runs on background fetch which means when iOS feels like running it will.  To be fair, it is fairly intelligent when it does the sync (it knows when the user intends to be active, what the network is like, etc).  

To get iOS going, you have to wire the following into your AppDelegate:

```csharp
// in your FinishedLaunching method
Plugin.Jobs.CrossJobs.Init();

// and add this guy
public override void PerformFetch(UIApplication application, Action<UIBackgroundFetchResult> completionHandler)
{
    Plugin.Jobs.CrossJobs.OnBackgroundFetch(completionHandler);
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
CrossJobs.Current.RunTask(async () => 
{
    // your code goes here - async stuff is welcome (and necessary)
});
```

---
## Scheduled Jobs
Scheduled jobs are the real meat though.  These are really what you need to make things happen when your app is backgrounded or needs to do something with some degree of regularity.  Don't go crazy, you still only get a finite amount of time to work with.  On iOS, this is 30 seconds and not a drop more.


So first things first, let's build a job.  Building a job is as simple as implementing Plugin.Jobs.IJob.
```csharp
public class YourFirstJob : Plugin.Jobs.IJob
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
CrossJobs.Current.Schedule(job);
```

---
## Canceling Jobs
When your user logs out, you likely don't need to keep sucking away at their battery, so cancelling jobs is a necessary action to perform.  You have to ways to cancel jobs, by the specific ID of what you registered as the job name OR cancelling ALL jobs.  

```csharp
// Cancelling A Job
CrossJobs.Current.Cancel("YourJobName");

// Cancelling All Jobs
CrossJobs.Current.CancelAll();
```

---
## Running On-Demand
Unlike adhoc jobs, this is designed to run your registered job(s) when you need them.  On iOS, maybe you are using silent push notifications to give your app a kick to start pulling a gig of data?

```csharp
// Run All Jobs On-Demand
var results = await CrossJobs.Current.RunAll();

// Run A Specific Job On-Demand
var result = await CrossJobs.Current.Run("YourJobName");
```
NOTE: you can see the result(s) of a job pass by taking a look at the result object!

---
## Dependency Injection
You don't like all this static junk... GOOD ON YA because neither do I!!  This is a topic for another time though.  There is more indepth documentation on this on [GitHub](https://github.com/aritchie/jobs).

## Links
* [GitHub](https://github.com/aritchie/jobs) - Includes samples & the code itself
* [![NuGet](https://img.shields.io/nuget/v/Plugin.Jobs.svg?maxAge=2592000)](https://www.nuget.org/packages/Plugin.Jobs/)
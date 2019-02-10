Title: Using Plugin.Jobs
Lead: Background Jobs for Xamarin
Published: 2/10/2019
Tags:
    - Xamarin
    - OSS
---
Since this is my first post on my new blog, I thought I would start with one of my newest plugins!

[Plugin.Jobs](https://github.com/aritchie/jobs) is a cross platform plugin for Xamarin (and yes... that UWP thing too).  Background jobs are an essential part of any mobile application whether you need to send a notification at a set period of time or the most common of all, synchronize data with a backend database.  I know this was one of the key reasons I decided to build this.

## Getting Setup

### Android
Add the following to your AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.BATTERY_STATS" />	
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
```

In your Main/Launch Activity.OnCreate - add the following
```csharp
Plugin.Jobs.CrossJobs.Init(this, savedInstanceState); // activity
```

### iOS


## Things to be aware of!
iOS doesn't have a set period.  It runs on background fetch which means when iOS feels like running it will.  To be fair, it is fairly intelligent when it does the sync (it knows when the user intends to be active, what the network is like, etc).

## Adhoc Jobs
Adhoc jobs are on-the-spot types of execution.  You need something to finish before your app takes a dirt nap... this is the guy to call:

## Links
[GitHub](https://github.com/aritchie/jobs)
[![NuGet](https://img.shields.io/nuget/v/Plugin.Jobs.svg?maxAge=2592000)](https://www.nuget.org/packages/Plugin.Jobs/)
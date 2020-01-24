Title: Shiny - Easy Mode
Published: 11/2/2019
Tags:
    - Xamarin
    - OSS
    - Shiny
---
To keep porting efforts down, Shiny now has static feature access along side the traditional DI approach.  You still need some of the Shiny startup boilerplate, but there are now ways to cut that down a great deal as well.

## Static Access

Let's start with the static accessors.  Essentially, if we have a service called Shiny.Jobs.IJobManager, we now have an equivalent CrossJobManager with all of the functions of the interface.  No more DI necessary.

```csharp
await CrossJobManager.Schedule(new JobInfo {

})
```

Don't like the boilerplate?  I can only get rid of so much, but I've made service registration match the Xamarin Forms assembly attribute.  

## Registering with Assemblies

This also includes jobs!


```csharp
iOSShinyHost.Init(ShinyStartup.FromAssemblyRegistration(typeof(App).Assembly));

[assembly: ShinySqliteIntegration(true, true, true, true, true)]
[assembly: ShinyJob(typeof(SampleJob), "MyIdentifier", BatteryNotLow = true, DeviceCharging = false, RequiredInternetAccess = Shiny.Jobs.InternetAccess.Any)]
[assembly: ShinyAppCenterIntegration(Constants.AppCenterTokens, true, true)]
[assembly: ShinyService(typeof(SampleSqliteConnection))]
[assembly: ShinyService(typeof(GlobalExceptionHandler))]
[assembly: ShinyService(typeof(CoreDelegateServices))]
[assembly: ShinyService(typeof(JobLoggerTask))]
[assembly: ShinyService(typeof(IUserDialogs), typeof(UserDialogs))]
[assembly: ShinyService(typeof(IFullService), typeof(FullService))]
[assembly: ShinyService(typeof(IAppSettings), typeof(AppSettings))]
```

## Auto-Registering Everything!
For any and all Shiny libraries, we automatically setup the services for you.  You don't even need a startup file (similar to registering with assembly attributes).  Note that if you do you use DI in your delegates, you will need to use assembly attribute registrations if you want to take a "bite of both pies".  With auto assemblies, we also go out and detect the appropriate delegates for each service type.  If one isn't found and it is required, we throw an exception during Init.

Auto-registration is by far the easiest way to get up and running, but it comes at the cost of startup performance.  On Android, you may notice it during startup.  You also may run into linker specific issues - my suggestion is to disable linking on Shiny libraries.

```csharp
// iOS - Normal AppDelegate addition
iOSShinyHost.Init(ShinyStartup.AutoRegister());

// Android - YourAndroidApplication.OnCreate
AndroidShinyHost.Init(ShinyStartup.AutoRegister());
```

We don't do this for jobs though.  You need to schedule those yourself just like before.


## Closing Thoughts

If speed and testability are things that are important to you, I don't recommend this approach for everyone.  Use the traditional mechanisms with DI.

## Links
* [Initial Shiny Setup](introducingshiny)
* [Samples](https://github.com/shinyorg/shinysamples/tree/master/Samples)
* [Documentation](https://shinylib.net)
* Shiny.Core - [![NuGet](https://img.shields.io/nuget/v/Shiny.Core.svg?maxAge=2592000)](https://www.nuget.org/packages/Shiny.Core/)
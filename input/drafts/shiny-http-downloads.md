Title: HTTP Background Downloads - Shiny Style
Published: 7/1/2019
Tags:
    - Xamarin
    - OSS
    - Shiny
---

Large background downloads where the OS kills your app is annoying and not trivial to fix.  Fortunately, Shiny has your back with [Shiny.Net.Http](https://www.nuget.org/packages/Shiny.Net.Http/).  This library allows your downloads to continue and allow the OS to manage things efficiently.  A few other things that aren't an out-of-box-experience (OOBE) with downloads (HttpClient or anything else of that matter) is tracking downloading progress, download speed, and time remaining until completion.  Shiny really provides an ALL-IN-ONE place to manage all of your HTTP transfers.  It also does uploads, but that is a different can of worms for another time.


## Progress
I have to admit, I'm impatient.  If I know how long something is going to take, I can go do something else while I wait.

```csharp

Shiny.ShinyHost.Resolve<IHttpTransferManager>();

```

## Background Operations

```csharp

public class YourHttpDelegate : IHttpDelegate
{

}
```
## Links
* [Initial Shiny Setup](introducingshiny)
* [Source Code](https://github.com/shinyorg/shiny)
* [Samples](https://github.com/shinyorg/shinysamples)
* [Documentation](https://shinylib.net)
* [![NuGet](https://img.shields.io/nuget/v/Shiny.Core.svg?maxAge=2592000)](https://www.nuget.org/packages/Shiny.Core/)
* [![NuGet](https://img.shields.io/nuget/v/Shiny.Net.Http.svg?maxAge=2592000)](https://www.nuget.org/packages/Shiny.Net.Http/)
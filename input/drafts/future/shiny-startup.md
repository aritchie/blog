Title: Startables and Modules - Shiny Style
Published: 5/15/2019
Tags:
    - Xamarin
    - OSS
    - Shiny
---

Shiny isn't all about backgrounding, DI, RX, and all of that cool stuff.  It actually provides a ton of utility functions as well.  

I love Autofac and a lot of the functions it has.  It really is a great DI framework though is known for being a tad on the slow side.  With Shiny, I went with Microsoft.Extensions.DependencyInjection.  It is fast, has "enough" features, built on a great set of abstractions, and has monolith company backing it.  However, it is no Autofac in terms of features - so I wanted to carry a few of them forward.  Namely, modules and startables.

## Modules
Inversion of Control (IoC) acts as the basic building blocks of your application.  However, as your application grows, registering all of these components within a single point of entry can lead to a fat file.

Modules help by alleviating this.  They help by decoupling your libraries, so that you can bundle up a set of related components behind a neatly wrapped package to simplify deployment and management of your library. Modules can also help by entangling bits of configuration code internal to library itself instead of literating your startup file with all of these additional flags.

```csharp
public class YourModule : IModule
{
     
}
```


## Startables
The IStartable/AutoActivate in Autofac is awesome as long as you used it in a smart way.  This concept does not exist in Microsoft's DI extensions.  These startables are something I use fairly frequently in my applications for various background tasks.  


Startable up tasks
Startup tasks in Shiny are similar to IStartable's in Autofac if you've ever used them.  Since Shiny is essentially DI agnostic, I wanted this feature to be available to all things DI.

### How do startup tasks differ from a job?
This is a great & likely common question I suspect, but also very easy to answer.  Startup tasks happen at the point of the container build when all of your services are ready to go.  The difference is that these tasks don't run in the background.  What they offer is a way of hooking up general pipeline logic within your app.  

### What would I do with one of these?

### How do I make one?

```csharp
public class YourStartupTask : Shiny.IStartupTask
{

    public void Start()
    {

    }
}

// in your shiny startup
public void ConfigureServices(IServiceCollection builder)
{
    builder.RegisterStartupTask<YourStartupTask>();
}
```

### Careful!!
These things should execute very quickly as you will pay a startup cost otherwise

## In Closing
Modules & startup tasks provide a great way to modulizing your application and providing a rich set of wiring services together without coupling them within your normal application logic (ie. ViewModels).  


## Links
* [Source Code](https://github.com/shinyorg/shiny)
* [Samples](https://github.com/shinyorg/shiny)
* [Documentation](https://shinydocs.azurewebsites.net)
* [![NuGet](https://img.shields.io/nuget/v/Shiny.Core.svg?maxAge=2592000)](https://www.nuget.org/packages/Shiny.Core/)

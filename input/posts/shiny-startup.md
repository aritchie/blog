Title: Startables and Modules - Shiny Style
Published: 12/15/2019
Tags:
    - Xamarin
    - OSS
    - Shiny
---

Autofac is a great DI product.  Though a bit slow and not used by Shiny in favor of Microsoft.Extensions.DependencyInjection - it did set some great principles that I wanted to carry forward.  Namely, modules and startables.

## Modules
Modules are a great of registrating a group of infrastructure within scope of your specific 


## Startables
The IStartable/AutoActivate in autofac was awesome as long as you used it in a smart way.  

Shiny does have background jobs and you will likely ask "what is the difference"?  Well - consider these startup tasks like a foreground service, but a service in a sense that it reacts to events 

Startable up tasks
Startup tasks in Shiny are similar to IStartable's in Autofac if you've ever used them.  Since Shiny is essentially DI agnostic, I wanted this feature to be available to all things DI.

## How do startup tasks differ from a job?

## How do I make one?

## Careful!!
These things should execute very quickly as you will pay a startup cost otherwise

## Links
* [Source Code](https://github.com/shinyorg/shiny)
* [Samples](https://github.com/shinyorg/shiny)
* [Documentation](https://shinydocs.azurewebsites.net)
* [![NuGet](https://img.shields.io/nuget/v/Shiny.Core.svg?maxAge=2592000)](https://www.nuget.org/packages/Shiny.Core/)

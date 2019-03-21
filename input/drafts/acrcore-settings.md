Title: Settings in ACR Core
Published: 3/10/2019
Tags:
    - Xamarin
    - OSS
    - Core
---
I know - Preferences & Settings are a dime a dozen these days, but I'm such a big advocated of decoupled software that I had to do things differently.

You've probably seen code similar to this before:
```csharp

public static class AppSettings
{
    public static string ApiBaseUri
    {
        get => Settings.Get("ApiBaseUri");
        set => Settings.Set("ApiBaseUri", value);
    }
}
```

### Why is this not ideal?
Several reasons 
* It is not a testable piece of code. 
* It creates some coupling (yes we can get around this though)
*


### Settings in a different light
Often people associate the INotifyPropertyChanged interface the ViewModel interface.  It is, but it can be used for many other cool things.  Let's look at this in a different way:

```csharp

```

### Messaging in a new REACTIVE light:


```csharp
```


### What about doing this on my ViewModel?

Sure, just make sure to unbind the ViewModel from settings when it is going away - Below is an example using Prism 


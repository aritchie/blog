Reactive matters

On mobile, async operations are a must.  Getting off that main UI thread so you can wait for slow network I/O requests to be serviced or because you need to suck in 20megs of JSON junk.


Why not events?
Well - events are better than asking all the time, but events can leak memory. 

Task are enough!

So RX
RX is async & events on steriods.  Every other major platform embraces RX with open arms.  Flutter uses streams which is an event stream that allows for much richer sets of event logic than .NET offers out of box.  Also, there is RX-Dart on top of that.  Let's not forget RXJava, and of course - RXJS.  I'm not sure why RX.NET is snubbed by the .NET presentationware devs, but don't knock it until you've written more than "hello world".  It is often seen as over complex.  My argument to this is, try to write 

```csharp
this.WhenAnyValue(x => x.SearchQuery)
    .Throttle(TimeSpan.FromSeconds(0.8), RxApp.TaskpoolScheduler)
    .Select(query => query?.Trim())
    .DistinctUntilChanged()
    .Where(query => !string.IsNullOrWhiteSpace(query))
    .ObserveOn(RxApp.MainThreadScheduler)
    .InvokeCommand(ExecuteSearch);
```
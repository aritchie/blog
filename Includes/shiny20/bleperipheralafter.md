```csharp
var scanner = ShinyHost.Resolve<Shiny.Beacons.IBeaconRangingManager().CreateManagedScan();


// your viewmodel/view binding collection - note that you aren't managing it :)
public ObservableCollection<ManagedBeacon> Beacons => this.scanner.Beacons;

// start the scan
scanner.Start(new BeaconRegion("your id", "your uuid"), RxApp.MainThreadScheduler);


// and when you're ready to stop
scanner.Stop();
```
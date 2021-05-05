```csharp

// your collection to bind to
public List<BeaconViewModel> Beacons { get; } = new List<BeaconViewModel>();

// don't forget to dispose of the subscription when you're done scanning
var scanSub = ShinyHost
    .Resolve<Shiny.Beacons.IBeaconRangingManager>()
    .WhenBeaconRanged(new BeaconRegion("yourid", "Your Beacon UUID"))
    .Synchronize(this.Beacons)
    .ObserveOn(RxApp.MainThreadScheduler) // borrowed from RX - if not, you can use XF Device.BeginInvokeOnMainThread in the subscribe
    .Subscribe(
        x =>
        {
            var beacon = this.Beacons.FirstOrDefault(y => x.Equals(y.Beacon));
            if (beacon == null)
                this.Beacons.Add(new BeaconViewModel(x));
            else
            {
                beacon.Proximity = x.Proximity;
                beacon.LastSeen = DateTime.UtcNow;
            }
        }
    );

// more to cleanup
Observable
    .Interval(TimeSpan.FromSeconds(5))
    .ObserveOn(RxApp.MainThreadScheduler) // again, borring from RXUI
    .Synchronize(this.Beacons)
    .Subscribe(_ =>
    {
        var maxAge = DateTimeOffset.UtcNow.Subtract(TimeSpan.FromSeconds(10));
        var tmp = this.Beacons.Where(x => x.LastSeen < maxAge).ToList();
        foreach (var beacon in tmp)
        {
            this.Beacons.Remove(beacon);
        }
    });

public class BeaconViewModel : ReactiveObject
{
    public BeaconViewModel(Beacon beacon)
    {
        this.Beacon = beacon;
        this.Proximity = beacon.Proximity;
        this.LastSeen = DateTime.UtcNow;
    }


    public Beacon Beacon { get; }
    public ushort Major => this.Beacon.Major;
    public ushort Minor => this.Beacon.Minor;
    public string Identifier => $"Major: {this.Major} - Minor: {this.Minor}";
    public DateTime LastSeen { get; set; }
    [Reactive] public Proximity Proximity { get; set; }
}
```
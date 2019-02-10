Title: My First Blog Post
Lead: I don't have anything to say yet!
Published: 2/9/2019
Tags:
    - Blog
---
So I've had people telling me for a while to start up a blog and seeing as though I'm almost finished a fairly large OSS project, I figured now was as good as time as any.

More to come!

Platform|Version
--------|-------
Android|4.3+
iOS|7+
macOS|Latest
tvOS|Latest
Windows UWP|16299+


**Android**

Add the following to your AndroidManifest.xml
_PLEASE NOTE THAT YOU HAVE TO REQUEST THESE PERMISSIONS USING [Activity.RequestPermission](https://developer.android.com/training/permissions/requesting)_ or a [Plugin](https://github.com/jamesmontemagno/PermissionsPlugin)

```xml
<uses-permission android:name="android.permission.BLUETOOTH"/>
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>

<!--this is necessary for Android v6+ to get the device name and address-->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

```


```csharp
var server = CrossBleAdapter.Current.CreateGattServer();
var service = server.AddService(Guid.NewGuid(), true);

var characteristic = service.AddCharacteristic(
    Guid.NewGuid(),
    CharacteristicProperties.Read | CharacteristicProperties.Write | CharacteristicProperties.WriteWithoutResponse,
    GattPermissions.Read | GattPermissions.Write
);

var notifyCharacteristic = service.AddCharacteristic
(
    Guid.NewGuid(),
    CharacteristicProperties.Indicate | CharacteristicProperties.Notify,
    GattPermissions.Read | GattPermissions.Write
);

IDisposable notifyBroadcast = null;
notifyCharacteristic.WhenDeviceSubscriptionChanged().Subscribe(e =>
{
    var @event = e.IsSubscribed ? "Subscribed" : "Unsubcribed";

    if (notifyBroadcast == null)
    {
        this.notifyBroadcast = Observable
            .Interval(TimeSpan.FromSeconds(1))
            .Where(x => notifyCharacteristic.SubscribedDevices.Count > 0)
            .Subscribe(_ =>
            {
                Debug.WriteLine("Sending Broadcast");
                var dt = DateTime.Now.ToString("g");
                var bytes = Encoding.UTF8.GetBytes(dt);
                notifyCharacteristic.Broadcast(bytes);
            });
    }
});

characteristic.WhenReadReceived().Subscribe(x =>
{
    var write = "HELLO";

    // you must set a reply value
    x.Value = Encoding.UTF8.GetBytes(write);

    x.Status = GattStatus.Success; // you can optionally set a status, but it defaults to Success
});
characteristic.WhenWriteReceived().Subscribe(x =>
{
    var write = Encoding.UTF8.GetString(x.Value, 0, x.Value.Length);
    // do something value
});

await server.Start(new AdvertisementData
{
    LocalName = "TestServer"
});
```
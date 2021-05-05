```csharp
// after a scan, you should have an IPeripheral
var managed = peripheral.CreateManaged(RxApp.MainThreadScheduler); // schedule 
managed.StartRssi(); // and StopRssi() later if you don't want it monitored

// now you can simply bind to these in your viewmodel
managed.Status;
managed.Rssi;
managed.Name;

// and the traditional methods
managed
    .WhenNotificationReceived(
        "serviceUUID",
        "characteristicUUID"
    )
    .Subscribe(x => {
        // data for your viewmodel
    });

// note that you don't have to request a connection
await managed.EnableNotification(true, "serviceUUID", "characteristicUUID").ToTask(); // pass false when done

var readData = await managed.Read("serviceUUID", "characteristicUUID").ToTask();
await managed.Write("serviceUUID", "characteristicUUID", new byte[1] { 0x0 }).ToTask();

// when you're done with this guy, just dispose of him and he'll clean himself up and cancel the connection
managed.Dispose();
```
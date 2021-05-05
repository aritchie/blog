```csharp
// after a scan, you should have an IPeripheral
IGattCharacteristic reader;
IGattCharacteristic writer;
IGattCharacteristic notifier;

peripheral
    .WhenStatusChanged()
    .Subscribe(status => Device.BeginInvokeOnMainThread(() =>
    {
        // let your user know what's going on
        ViewModelStatus = peripheral.Status;
    }));

peripheral
    .WhenConnected()
    .Subscribe(peripheral => 
    {
        // these have to be tossed everytime the connection state changes - if you used these out of scope (which you probably will), you need to safety them everywhere
        this.reader = await peripheral.GetCharacteristic("serviceUUID", "characteristic");
        this.writer = await peripheral.GetCharacteristic("serviceUUID", "characteristic");
        this.notifier = await peripheral.GetCharacteristic("serviceUUID", "characteristic");
       
        this.notifier
            .WhenNotificationReceived()
            .Subscribe(data => Device.BeginInvokeOnMainThread(() => {
                ViewModelProperty = ""; // transform the data to a user value
            }));

        await this.notifier.EnableNotifications(true); // manage the error here!?
    });

peripheral
    .WhenNameChanged()
    .Subscribe(name => Device.BeginInvokeOnMainThread(() => ViewModelDeviceName = name)));

peripheral
    .ReadRssiContinuously()
    .ObserveOn(RxApp.MainThreadScheduler)
    .Subscribe(x => {
        // bind this to a viewmodel property
    });

// MAKE SURE TO CLEAN/UNSUBSCRIBE all of this junk when you're done with it!
```
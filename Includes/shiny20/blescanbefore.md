This isn't even doing things like removing items if a peripheral isn't seen for a configured amount of seconds.

```csharp
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reactive.Linq;
using System.Windows.Input;
using ReactiveUI;
using ReactiveUI.Fody.Helpers;
using Samples.Infrastructure;
using Shiny;
using Shiny.BluetoothLE;


namespace Samples.BluetoothLE
{
    public class AdapterViewModel : ViewModel
    {
        IDisposable? scanSub;


        public AdapterViewModel(IBleManager bleManager)
        {
            this.ScanToggle = ReactiveCommand.CreateFromTask(
                async () =>
                {
                    if (this.IsScanning)
                    {
                        this.StopScan();
                    }
                    else
                    {
                        this.Peripherals.Clear();
                        this.IsScanning = true;

                        this.scanSub = bleManager
                            .Scan()
                            .Buffer(TimeSpan.FromSeconds(1))
                            .SubOnMainThread(
                                results =>
                                {
                                    var list = new List<PeripheralItemViewModel>();
                                    foreach (var result in results)
                                    {
                                        var peripheral = this.Peripherals.FirstOrDefault(x => x.Equals(result.Peripheral));
                                        if (peripheral == null)
                                            peripheral = list.FirstOrDefault(x => x.Equals(result.Peripheral));

                                        if (peripheral != null)
                                        {
                                            peripheral.Update(result);
                                        }
                                        else
                                        {
                                            peripheral = new PeripheralItemViewModel(result.Peripheral);
                                            peripheral.Update(result);
                                            list.Add(peripheral);
                                        }
                                    }
                                    if (list.Any())
                                    {
                                        // XF is not able to deal with an observablelist/addrange properly
                                        foreach (var item in list)
                                            this.Peripherals.Add(item);
                                    }
                                }
                            );
                    }
                }
            );
        }


        public ICommand ScanToggle { get; }
        public ObservableCollection<PeripheralItemViewModel> Peripherals { get; } = new ObservableCollection<PeripheralItemViewModel>();
        [Reactive] public PeripheralItemViewModel? SelectedPeripheral { get; set; }
        [Reactive] public bool IsScanning { get; private set; }


        void StopScan()
        {
            this.scanSub?.Dispose();
            this.scanSub = null;
            this.IsScanning = false;
        }
    }


    public class PeripheralItemViewModel : ViewModel
    {
        public PeripheralItemViewModel(IPeripheral peripheral)
            => this.Peripheral = peripheral;


        public override bool Equals(object obj)
            => this.Peripheral.Equals(obj);

        public IPeripheral Peripheral { get; }
        public string Uuid => this.Peripheral.Uuid;

        [Reactive] public string Name { get; private set; }
        [Reactive] public int Rssi { get; private set; }
        [Reactive] public string LocalName { get; private set; }
        [Reactive] public int TxPower { get; private set; }


        public void Update(ScanResult result)
        {
            this.Name = this.Peripheral.Name;
            this.Rssi = result.Rssi;
        }
    }
}
```
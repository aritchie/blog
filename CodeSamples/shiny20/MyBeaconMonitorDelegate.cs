using Shiny.Beacons;
using System.Threading.Tasks;

namespace Shiny20Sample
{
    public class MyBeaconMonitorDelegate : IBeaconMonitorDelegate
    {
        public async Task OnStatusChanged(BeaconRegionState newStatus, BeaconRegion region)
        {
            // send notifications to say hello or goodbyte
            // call an http service to track your users
        }
    }
}
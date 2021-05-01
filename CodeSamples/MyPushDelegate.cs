using Shiny.Push;
using System.Threading.Tasks;

namespace MyNamespace
{
    public class MyPushDelegate : IPushDelegate
    {
        public async Task OnEntry(PushNotificationResponse response)
        {
        }

        public async Task OnReceived(PushNotification notification)
        {
        }

        public async Task OnTokenChanged(string token)
        {
        }
    }
}

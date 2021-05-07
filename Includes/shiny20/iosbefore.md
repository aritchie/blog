```csharp
// iOS AppDelegate - all features used
public partial class AppDelegate
{
	public override bool FinishedLaunching(UIApplication app, NSDictionary options)
	{
		this.ShinyFinishedLaunching(new Samples.SampleStartup());
		global::Xamarin.Forms.Forms.Init();
		// third party inits
		this.LoadApplication(new Samples.App());
		return base.FinishedLaunching(app, options);
	}
	public override void RegisteredForRemoteNotifications(UIApplication application, NSData deviceToken) => this.ShinyRegisteredForRemoteNotifications(deviceToken);
	public override void DidReceiveRemoteNotification(UIApplication application, NSDictionary userInfo, Action<UIBackgroundFetchResult> completionHandler) => this.ShinyDidReceiveRemoteNotification(userInfo, completionHandler);
	public override void FailedToRegisterForRemoteNotifications(UIApplication application, NSError error) => this.ShinyFailedToRegisterForRemoteNotifications(error);
	public override void PerformFetch(UIApplication application, Action<UIBackgroundFetchResult> completionHandler) => this.ShinyPerformFetch(completionHandler);
	public override void HandleEventsForBackgroundUrl(UIApplication application, string sessionIdentifier, Action completionHandler) => this.ShinyHandleEventsForBackgroundUrl(sessionIdentifier, completionHandler);
}
```
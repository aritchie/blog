```csharp
[Register("AppDelegate")]
public partial class AppDelegate : Xamarin.Forms.Platform.iOS.FormsApplicationDelegate
{
}

[assembly: ShinyApplication(
	ShinyStartupTypeName = "Samples.SampleStartup",
	XamarinFormsAppTypeName = "Samples.App"
)]
```
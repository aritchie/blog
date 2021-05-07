```csharp
// Android Application - you don't even have to make one
// Android Activity
public partial class MainActivity : Xamarin.Forms.Platform.Android.FormsAppCompatActivity
{
}

[assembly: ShinyApplication(
	ShinyStartupTypeName = "Samples.SampleStartup",
	XamarinFormsAppTypeName = "Samples.App"
)]
```
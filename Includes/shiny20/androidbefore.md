```csharp
// Android App
[global::Android.App.ApplicationAttribute]
public partial class MainApplication : global::Android.App.Application
{
	public MainApplication(IntPtr handle, JniHandleOwnership transfer) : base(handle, transfer) {}

	public override void OnCreate()
	{
		this.ShinyOnCreate(new Samples.SampleStartup());
		global::Xamarin.Essentials.Platform.Init(this);
		base.OnCreate();
	}
}

// Android Activity
public partial class MainActivity
{
	protected override void OnCreate(Bundle savedInstanceState)
	{
		this.ShinyOnCreate();
		TabLayoutResource = Resource.Layout.Tabbar;
		ToolbarResource = Resource.Layout.Toolbar;
		base.OnCreate(savedInstanceState);
		global::Xamarin.Forms.Forms.Init(this, savedInstanceState);
		this.LoadApplication(new Samples.App());
	}

	protected override void OnNewIntent(Intent intent)
	{
		base.OnNewIntent(intent);
		this.ShinyOnNewIntent(intent);
	}

	protected override void OnActivityResult(int requestCode, Result resultCode, Intent data)
	{
		base.OnActivityResult(requestCode, resultCode, data);
		this.ShinyOnActivityResult(requestCode, resultCode, data);
	}

	public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Permission[] grantResults)
	{
		base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
		this.ShinyOnRequestPermissionsResult(requestCode, permissions, grantResults);
		global::Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);
	}
}
using System.Threading.Tasks;
using Blog.Shortcodes;
using Statiq.App;
using Statiq.Common;
using Statiq.Web;


namespace Blog
{
    public class Program
    {
        public static async Task<int> Main(string[] args) =>
            await Bootstrapper
                .Factory
                .CreateWeb(args)
                .DeployToGitHubPages(
                    "aritchie",
                    "aritchie.github.io",
                    Config.FromSetting<string>("GITHUB_TOKEN")
                )
                //.DeployToAzureAppService(
                //    "acrblog",
                //    "$acrblog",
                //    "tkYnfBba49SxktioengcZMWzulrFPWnJtNoi0kyp1hqfsiplK3Mxlo4ARfta"
                //)
                .AddShortcode<NugetShieldShortcode>("NugetShield")
                .AddShortcode<ConfiguredLinkShortcode>("ConfiguredLink")
                .AddShortcode<DefaultBlogLinksShortcode>("DefaultBlogLinks")
                .AddShortcode<StartupShortcode>("Startup")
                .RunAsync();
    }
}
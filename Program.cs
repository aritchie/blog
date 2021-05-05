using System.Threading.Tasks;
using Blog.Shortcodes;
using Devlead.Statiq.Code;
using Devlead.Statiq.Tabs;
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
                .DeployToAzureAppService(
                    "ftps://waws-prod-yq1-009.ftp.azurewebsites.windows.net/site/wwwroot",
                    "acrblog\\allanritchie",
                    "Blargh911!"
                )
                .AddTabGroupShortCode()
                .AddIncludeCodeShortCode()
                .AddShortcode<NugetShieldShortcode>("NugetShield")
                .AddShortcode<ConfiguredLinkShortcode>("ConfiguredLink")
                .AddShortcode<DefaultBlogLinksShortcode>("DefaultBlogLinks")
                .AddShortcode<StartupShortcode>("Startup")
                .RunAsync();
    }
}
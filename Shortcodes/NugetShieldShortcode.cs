using Statiq.Common;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Blog.Shortcodes
{
    //https://statiq.dev/framework/content/shortcodes
    public class NugetShieldShortcode : IShortcode
    {
        public async Task<IEnumerable<ShortcodeResult>> ExecuteAsync(KeyValuePair<string, string>[] args, string content, IDocument document, IExecutionContext context)
        {
            var packageName = args.FirstOrDefault().Value;
            var imageUrl = $"https://img.shields.io/nuget/v/{packageName}.svg?style=for-the-badge";
            if (args.Any(x => x.Key?.Equals("label") ?? false))
                imageUrl += $"&label={packageName}";

            var hrefUrl = $"https://www.nuget.org/packages/{packageName}/";
            return new[] { new ShortcodeResult($"<a href=\"{hrefUrl}\" target=\"{packageName}\"><img src=\"{imageUrl}\" /></a>") };
        }
    }
}

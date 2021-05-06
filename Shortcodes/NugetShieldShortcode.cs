using Statiq.Common;
using System.Collections.Generic;
using System.Linq;


namespace Blog.Shortcodes
{
    public class NugetShieldShortcode : SyncShortcode
    {
        public override ShortcodeResult Execute(KeyValuePair<string, string>[] args, string content, IDocument document, IExecutionContext context)
        {
            var packageName = args.FirstOrDefault().Value;
            var imageUrl = $"https://img.shields.io/nuget/v/{packageName}.svg?style=for-the-badge";
            if (args.Length == 2)
                imageUrl += $"&label={args[1].Value}";

            var hrefUrl = $"https://www.nuget.org/packages/{packageName}/";
            return new ShortcodeResult($"<a href=\"{hrefUrl}\" target=\"{packageName}\"><img src=\"{imageUrl}\" /></a>");
        }
    }
}

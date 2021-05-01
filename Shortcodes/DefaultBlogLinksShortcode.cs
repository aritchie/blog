using System.Collections.Generic;
using System.Threading.Tasks;
using Statiq.Common;


namespace Blog.Shortcodes
{
    public class DefaultBlogLinksShortcode : IShortcode
    {
        public async Task<IEnumerable<ShortcodeResult>> ExecuteAsync(KeyValuePair<string, string>[] args, string content, IDocument document, IExecutionContext context) => new []
        {
            new ShortcodeResult("*" + document.GetConfiguredAnchorTag("Documentation")),
            new ShortcodeResult("*" + document.GetConfiguredAnchorTag("Samples")),
            new ShortcodeResult("*" + document.GetConfiguredAnchorTag("GitHub")),
            new ShortcodeResult("*" + document.GetConfiguredAnchorTag("AllNugets"))
        };
    }
}

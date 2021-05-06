using System.Collections.Generic;
using System.Text;
using Statiq.Common;


namespace Blog.Shortcodes
{
    public class DefaultBlogLinksShortcode : SyncShortcode
    {
        public override ShortcodeResult Execute(KeyValuePair<string, string>[] args, string content, IDocument document, IExecutionContext context)
        {
            var links = new StringBuilder()
                .AppendLine("*" + document.GetConfiguredAnchorTag("Documentation"))
                .AppendLine("*" + document.GetConfiguredAnchorTag("Samples"))
                .AppendLine("*" + document.GetConfiguredAnchorTag("GitHub"))
                .AppendLine("*" + document.GetConfiguredAnchorTag("AllNugets"))
                .ToString();

            return new ShortcodeResult(links);
        }
    }
}

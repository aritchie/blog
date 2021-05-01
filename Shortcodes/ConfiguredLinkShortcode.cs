using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Statiq.Common;


namespace Blog.Shortcodes
{
    public class ConfiguredLinkShortcode : IShortcode
    {
        public async Task<IEnumerable<ShortcodeResult>> ExecuteAsync(KeyValuePair<string, string>[] args, string content, IDocument document, IExecutionContext context)
        {
            var config = args.FirstOrDefault().Value;
            var link = document.GetConfiguredAnchorTag(config);

            return new [] { new ShortcodeResult(link) };
        }
    }
}

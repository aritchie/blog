using System;
using System.Collections.Generic;
using System.Linq;
using Statiq.Common;


namespace Blog.Shortcodes
{
    public class ConfiguredLinkShortcode : SyncShortcode
    {
        public override ShortcodeResult Execute(KeyValuePair<string, string>[] args, string content, IDocument document, IExecutionContext context)
        {
            var config = args.FirstOrDefault().Value;
            var link = document.GetConfiguredAnchorTag(config);

            return new ShortcodeResult(link);
        }
    }
}

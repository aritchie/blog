using System;
using Statiq.Common;


namespace Blog.Shortcodes
{
    public static class Extensions
    {
        public static string GetConfiguredAnchorTag(this IDocument document, string key)
        {
            var url = document.GetString(key + "Url");
            var desc = document.GetString(key + "UrlDescription");
            if (desc == null)
                desc = key;

            return $"<a href=\"{url}\">{desc}</a>";
            //return asMarkdown
            //    ? $"[{desc}]({url})"
            //    : $"<a href=\"{url}\">{desc}</a>";
        }
    }
}

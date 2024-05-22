using Sitecore.Data.Fields;
using Sitecore.LayoutService.Helpers;
using Sitecore.Links;
using Sitecore.Resources.Media;
using System;

namespace ComponentsLibrary.SitecoreFieldHelpers
{
    public static class SitecoreLinkExtensions
    {
        public static string GetUrl(LinkField linkField)
        {
            string url = String.Empty;

            switch (linkField.LinkType)
            {
                case "internal":
                    url = LinkManager.GetItemUrl(linkField.TargetItem, ItemUrlHelper.GetLayoutServiceUrlOptions());
                    break;
                case "external":
                case "mailto":
                case "anchor":
                case "javascript":
                    url = linkField.Url;
                    break;
                case "media":
                    Sitecore.Data.Items.MediaItem media = new Sitecore.Data.Items.MediaItem(linkField.TargetItem);
                    url = Sitecore.StringUtil.EnsurePrefix('/',
                    Sitecore.Resources.Media.MediaManager.GetMediaUrl(media));
                    break;
                case "":
                    break;
                default:
                    string message = String.Format("Unknown link type");
                    Sitecore.Diagnostics.Log.Error(message, "SitecoreLinkExtensions");
                    break;
            }

            return url;
        }
        public static string GetTitle(LinkField linkField)
        {
            string title = String.Empty;

            switch (linkField.LinkType)
            {
                case "internal":
                    title = string.IsNullOrEmpty(linkField.Text) ? linkField.TargetItem?.Fields["title"].Value : linkField.Text;
                    break;
                case "external":
                case "mailto":
                case "anchor":
                case "javascript":
                    title = linkField.Text;
                    break;
                case "media":
                    Sitecore.Data.Items.MediaItem media = new Sitecore.Data.Items.MediaItem(linkField.TargetItem);
                    title = media.Title;
                    break;
                case "":
                    break;
                default:
                    string message = String.Format("Unknown link type");
                    Sitecore.Diagnostics.Log.Error(message, "SitecoreLinkExtensions");
                    break;
            }

            return title;
        }
        public static string GetImageUrl(this ImageField imageField)
        {
            string url = MediaManager.GetMediaUrl(imageField.MediaItem);
            return url;
        }

    }
}

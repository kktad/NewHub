using ComponentsLibrary.Interface;
using ComponentsLibrary.Model;
using ComponentsLibrary.Repositories;
using ComponentsLibrary.SitecoreFieldHelpers;
using Newtonsoft.Json.Linq;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Links;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Specialized;

namespace ComponentsLibrary.ContentResolvers
{
    public class LinkRenderingContentsResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }
        protected ILinkRepository _linkRepository { get; set; }
        public LinkRenderingContentsResolver()
        {
            _linkRepository = new LinkRepository();
        }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {

            JObject jobject = new JObject()
            {
                ["item"] = new JObject()
            };
            try
            {
                var model = (LinkRenderingModel)_linkRepository.GetModel();
                Item item = null;
                if (model.HyperlinkLinkType == LinkType.Specific)
                {
                    item = model.DataSourceItem;
                    LinkField linkField = item?.Fields["Link"];
                    jobject["item"] = new JObject()
                    {
                        ["url"] = SitecoreLinkExtensions.GetUrl(linkField),
                        ["text"] = SitecoreLinkExtensions.GetTitle(linkField),
                        ["className"] = linkField.Class,
                        ["target"] = linkField.Target,
                        ["linkType"] = linkField.LinkType
                    };
                }
                else
                {
                    item = model.AdjacentItem;
                    var datasource = model.DataSourceItem;
                    LinkField linkField = datasource?.Fields["Link"];
                    jobject["item"] = new JObject()
                    {
                        ["url"] = LinkManager.GetItemUrl(item),
                        ["text"] = item?.Fields["title"].Value,
                        ["className"] = linkField.Class,
                        ["target"] = linkField?.Target,
                        ["linkType"] = linkField?.LinkType
                    };

                }

            }
            catch (Exception ex)
            {
                Log.Error("LinkRenderingContentsResolver Error:" + ex.Message, ex, "LinkRenderingContentsResolver");
            }
            return jobject;
        }

    }
}

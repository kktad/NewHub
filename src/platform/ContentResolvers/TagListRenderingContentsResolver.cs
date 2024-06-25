using ComponentsLibrary.Interface;
using ComponentsLibrary.Model;
using ComponentsLibrary.Repositories;
using Newtonsoft.Json.Linq;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Specialized;

namespace ComponentsLibrary.ContentResolvers
{
    public class TagListRenderingContentsResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }

        public bool UseContextItem { get; set; }
        
        public string ItemSelectorQuery { get; set; }
        
        public NameValueCollection Parameters { get; set; }
        
        protected ITagListRepository _tagListRepository { get; set; }
        
        public TagListRenderingContentsResolver()
        {
            _tagListRepository = new TagListRepository();
        }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            var jobject = new JObject()
            {
                ["settings"] = new JObject(),
                ["tags"] = new JArray()
            };

            try
            {
                var model = (TagListRenderingModel)_tagListRepository.GetModel();
                jobject["settings"] = model.JsonDataProperties;
                jobject["tags"] = model.Tags;
            }
            catch (Exception ex)
            {
                Log.Error("AccordionRenderingContentsResolver Error:" + ex.Message, ex, "AccordionRenderingContentsResolver");
            }

            return jobject;
        }
    }
}

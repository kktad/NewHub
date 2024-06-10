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
    public class AccordionRenderingContentsResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }
        protected IAccordionRepository _accordionRepository { get; set; }
        public AccordionRenderingContentsResolver()
        {
            _accordionRepository = new AccordionRepository();
        }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {

            JObject jobject = new JObject()
            {
                ["settings"] = new JObject(),
                ["items"] = new JArray()
            };
            try
            {
                var model = (AccordionRenderingModel)_accordionRepository.GetModel();
                jobject["settings"] = model.JsonDataProperties;
                jobject["items"] = model.AccordionItems;
            }
            catch (Exception ex)
            {
                Log.Error("AccordionRenderingContentsResolver Error:" + ex.Message, ex, "AccordionRenderingContentsResolver");
            }
            return jobject;
        }

    }
}

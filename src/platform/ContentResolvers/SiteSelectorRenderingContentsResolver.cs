using ComponentsLibrary.Interface;
using ComponentsLibrary.Model;
using ComponentsLibrary.Repositories;
using Newtonsoft.Json.Linq;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web.Mvc;

namespace ComponentsLibrary.ContentResolvers
{
    public class SiteSelectorRenderingContentsResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }
        protected ISiteSelectorRepository _siteSelectorRepository { get; set; }
        public SiteSelectorRenderingContentsResolver()
        {
            _siteSelectorRepository = new SiteSelectorRepository();
        }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {

            JObject jobject = new JObject()
            {
                ["items"] = new JArray()
            };
            try
            {
                var model = (SiteSelectorRenderingModel)_siteSelectorRepository.GetModel();
                jobject["items"] = ProcessItems(model.SelectListItems);
            }
            catch (Exception ex)
            {
                Log.Error("SiteSelectorRenderingContentsResolver Error:" + ex.Message, ex, "SiteSelectorRenderingContentsResolver");
            }
            return jobject;
        }

        protected JArray ProcessItems(IEnumerable<SelectListItem> items)
        {
            JArray jarray = new JArray();
            if (items != null && items.Any())
            {
                foreach (SelectListItem obj in items)
                {
                    JObject jobject = new JObject
                    {
                        ["text"] = obj.Text,
                        ["value"] = obj.Value,
                        ["selected"] = obj.Selected

                    };
                    jarray.Add((JToken)jobject);
                }
            }
            return jarray;
        }

    }
}

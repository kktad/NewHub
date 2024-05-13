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

namespace ComponentsLibrary.ContentResolvers
{
    public class LanguageSelectorRenderingContentsResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }
        protected ILanguageSelectorRepository _languageSelectorRepository { get; set; }
        public LanguageSelectorRenderingContentsResolver()
        {
            _languageSelectorRepository = new LanguageSelectorRepository();
        }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {

            JObject jobject = new JObject()
            {
                ["activeItem"] = new JObject(),
                ["items"] = new JArray()
            };
            try
            {
                var model = (LanguageSelectorRenderingModel)_languageSelectorRepository.GetModel();
                jobject["items"] = ProcessItems(model.LanguageSelectorItems);
                jobject["activeItem"] = ProcessItem(model.ActiveItem);
            }
            catch (Exception ex)
            {
                Log.Error("LanguageSelectorRenderingContentsResolver Error:" + ex.Message, ex, "LanguageSelectorRenderingContentsResolver");
            }
            return jobject;
        }

        protected JArray ProcessItems(IList<LanguageSelectorItem> items)
        {
            JArray jarray = new JArray();
            if (items != null && items.Any())
            {
                foreach (LanguageSelectorItem obj in items)
                {
                    JObject jobject = ProcessItem(obj);
                    jarray.Add((JToken)jobject);
                }
            }
            return jarray;
        }

        protected JObject ProcessItem(LanguageSelectorItem item)
        {
            return new JObject
            {
                ["datalanguagecode"] = item.DataLanguageCode,
                ["datacountrycode"] = item.DataCountryCode,
                ["languagenativename"] = item.InnerItem.Language.CultureInfo.NativeName,
                ["href"] = item.Href

            };
        }

    }
}

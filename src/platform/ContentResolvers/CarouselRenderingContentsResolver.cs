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
    public class CarouselRenderingContentsResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }
        protected ICarouselRepository _carouselRepository { get; set; }
        public CarouselRenderingContentsResolver()
        {
            _carouselRepository = new CarouselRepository();
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
                var model = (CarouselRenderingModel)_carouselRepository.GetModel();
                jobject["settings"] = model.JsonDataProperties;
                jobject["items"] = model.CarouselSlides;
            }
            catch (Exception ex)
            {
                Log.Error("CarouselRenderingContentsResolver Error:" + ex.Message, ex, "CarouselRenderingContentsResolver");
            }
            return jobject;
        }

    }
}

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
    public class EventCalendarRenderingContentsResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }
        protected IEventCalendarRepository _eventCalendarRepository { get; set; }
        public EventCalendarRenderingContentsResolver()
        {
            _eventCalendarRepository = new EventCalendarRepository();
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
                var model = (EventCalendarRenderingModel)_eventCalendarRepository.GetModel();
                jobject["settings"] = model.JsonDataProperties;
                jobject["items"] = model.CalendarTypeItem;
            }
            catch (Exception ex)
            {
                Log.Error("EventCalendarRenderingContentsResolver Error:" + ex.Message, ex, "EventCalendarRenderingContentsResolver");
            }
            return jobject;        

        }
    }
}

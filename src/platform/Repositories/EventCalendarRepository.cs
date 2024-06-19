using ComponentsLibrary.Interface;
using ComponentsLibrary.Model;
using ComponentsLibrary.SitecoreFieldHelpers;
using Newtonsoft.Json.Linq;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.XA.Foundation.Common;
using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using Sitecore.XA.Foundation.RenderingVariants.Repositories;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;
using Sitecore.XA.Foundation.SitecoreExtensions.Utils;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ComponentsLibrary.Repositories
{
    public class EventCalendarRepository : VariantsRepository,
    IEventCalendarRepository,
    IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
        private CalendarSettings _settings;
        protected CalendarSettings Settings => this._settings ?? (this._settings = this.GetCalendarSettings());
        protected IEnumerable<Item> EventItems { get; set; }
        
        protected CalendarSettings GetCalendarSettings()
        {
            Dictionary<string, string> dictionary = this.Rendering.Parameters.ToDictionary<KeyValuePair<string, string>, string, string>((Func<KeyValuePair<string, string>, string>)(i => i.Key), (Func<KeyValuePair<string, string>, string>)(i => i.Value));
            return new CalendarSettings()
            {
                ShowPreviousNext = dictionary.GetBooleanValue("ShowPreviousNext"),
                ShowMonthCaptions = dictionary.GetBooleanValue("ShowMonthCaptions"),
                CompactView = dictionary.GetBooleanValue("CompactView"),                
            };           
        }
        protected JObject GetJsonDataProperties()
        {
            return new JObject
            {
                ["showPrevNext"] = this.Settings.ShowPreviousNext,
                ["showMonthCaptions"] = this.Settings.ShowMonthCaptions,
                ["compactView"] = this.Settings.CompactView,
            };
        }       

        public override IRenderingModelBase GetModel()
        {
            EventCalendarRenderingModel model = new EventCalendarRenderingModel();
            this.FillBaseProperties((object)model);
            model.JsonDataProperties = this.GetJsonDataProperties();
            model.CalendarTypeItem = GetCalendarTypes();
            return (IRenderingModelBase)model;
        }
        protected JArray GetCalendarTypes()
        {
            JArray jarray = new JArray();
            var calendarType = this.Rendering.Parameters["CalendarType"];
            List<string> calendarTypeItemIds = calendarType.Split('|').ToList();
            foreach (var id in calendarTypeItemIds)
            {
                var item = Sitecore.Context.Database.GetItem(new ID(id));
                JObject jobject = new JObject
                {
                    ["name"] = item.Fields["Value"].Value
                };
                jarray.Add((JToken)jobject);
            }

            return jarray;
        }        
    }
}
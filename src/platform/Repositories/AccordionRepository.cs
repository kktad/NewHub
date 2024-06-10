using ComponentsLibrary.Interface;
using ComponentsLibrary.Model;
using Newtonsoft.Json.Linq;
using Sitecore.Data.Items;
using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using Sitecore.XA.Foundation.RenderingVariants.Repositories;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ComponentsLibrary.Repositories
{
    public class AccordionRepository : VariantsRepository,
    IAccordionRepository,
    IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
        private AccordionSettings _settings;

        protected AccordionSettings Settings => this._settings ?? (this._settings = this.GetAccordionSettings());

        protected JObject GetJsonDataProperties()
        {
            return new JObject
            {
                ["expandOnHover"] = this.Settings.ExpandOnHover,
                ["expandedByDefault"] = this.Settings.ExpandedByDefault,
                ["speed"] = this.Settings.Speed,
                ["easing"] = this.Settings.Easing,
                ["canOpenMultiple"] = this.Settings.CanOpenMultiple,
                ["canToggle"] = this.Settings.CanToggle,

            };
        }

        protected AccordionSettings GetAccordionSettings()
        {
            Dictionary<string, string> dictionary = this.Rendering.Parameters.ToDictionary<KeyValuePair<string, string>, string, string>((Func<KeyValuePair<string, string>, string>)(i => i.Key), (Func<KeyValuePair<string, string>, string>)(i => i.Value));
            string str1 = dictionary.GetValue<string>("EasingFunction");
            string str2 = string.IsNullOrEmpty(str1) || str1 == "Swing" ? "swing" : "easeInOut" + str1;
            return new AccordionSettings()
            {
                Easing = str2,
                Speed = dictionary.GetIntValue("Speed"),
                CanOpenMultiple = dictionary.GetBooleanValue("CanOpenMultiple"),
                CanToggle = dictionary.GetBooleanValue("CanToggle"),
                ExpandOnHover = dictionary.GetBooleanValue("ExpandOnHover"),
                ExpandedByDefault = dictionary.GetBooleanValue("ExpandedByDefault")
            };
        }
        private JArray GetAccordionItems()
        {
            IEnumerable<Item> items = Rendering?.DataSourceItem?.Children;
            JArray jarray = new JArray();
            if (items != null && items.Any())
            {
                foreach (Item obj in items)
                {
                    JObject jobject = new JObject
                    {
                        ["heading"] = obj.Fields["Heading"].Value,
                        ["content"] = obj.Fields["Content"].Value

                    };
                    jarray.Add((JToken)jobject);
                }
            }
            return jarray;
        }

        public override IRenderingModelBase GetModel()
        {
            AccordionRenderingModel m = new AccordionRenderingModel();
            this.FillBaseProperties((object)m);
            m.JsonDataProperties = this.GetJsonDataProperties();
            m.AccordionItems = this.GetAccordionItems();
            return (IRenderingModelBase)m;
        }
    }
}
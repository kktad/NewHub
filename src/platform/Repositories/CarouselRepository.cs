using ComponentsLibrary.Interface;
using ComponentsLibrary.Model;
using ComponentsLibrary.SitecoreFieldHelpers;
using Newtonsoft.Json.Linq;
using Sitecore;
using Sitecore.Data.Items;
using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using Sitecore.XA.Foundation.RenderingVariants.Repositories;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Script.Serialization;

namespace ComponentsLibrary.Repositories
{
    public class CarouselRepository : VariantsRepository,
    ICarouselRepository,
    IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
        private CarouselNavigation? _navigation;
        private CarouselSettings _settings;

        protected CarouselSettings Settings => this._settings ?? (this._settings = this.GetSettings());

        protected virtual int Timeout => this.Rendering.Parameters.ParseInt(nameof(Timeout));

        protected virtual CarouselNavigation Navigation
        {
            get
            {
                if (!this._navigation.HasValue)
                {
                    CarouselNavigation result;
                    this._navigation = new CarouselNavigation?(Enum.TryParse<CarouselNavigation>(this.Rendering.Parameters.GetEnumValue(nameof(Navigation)), out result) ? result : CarouselNavigation.None);
                }
                return this._navigation.Value;
            }
        }

        protected virtual JObject GetJsonProperties()
        {
            return new JObject
            {
                ["timeout"] = this.Settings.Timeout,
                ["isPauseEnabled"] = this.Settings.PauseEnabled,
                ["transition"] = this.Settings.Transition
            };
        }

        protected virtual bool IsWithPreviousNext(CarouselNavigation navigation)
        {
            switch (navigation)
            {
                case CarouselNavigation.None:
                    return this.IsEdit;
                case CarouselNavigation.BulletsWithPreviousNext:
                case CarouselNavigation.NumbersWithPreviousNext:
                    return true;
                default:
                    return false;
            }
        }

        protected virtual bool IsNumbers(CarouselNavigation navigation)
        {
            switch (navigation)
            {
                case CarouselNavigation.None:
                    return this.IsEdit;
                case CarouselNavigation.Numbers:
                case CarouselNavigation.NumbersWithPreviousNext:
                    return true;
                default:
                    return false;
            }
        }

        protected virtual CarouselSettings GetSettings() => new CarouselSettings()
        {
            NavigationType = this.Navigation,
            Timeout = this.IsEdit || this.Timeout <= 0 ? int.MaxValue : this.Timeout,
            PauseEnabled = MainUtil.GetBool(this.Rendering.Parameters["PauseOnHover"], false),
            Transition = this.Rendering.Parameters.GetEnumValue("Transition")
        };
        private JArray GetCarouselSlides()
        {
            IEnumerable<Item> items = Rendering?.DataSourceItem?.Children;
            JArray jarray = new JArray();
            if (items != null && items.Any())
            {
                foreach (Item obj in items)
                {
                    JObject jobject = new JObject
                    {
                        ["slideImage"] = SitecoreLinkExtensions.GetImageUrl(obj.Fields["SlideImage"]),
                        ["slideText"] = obj.Fields["SlideText"].Value,
                        ["slideLink"] = SitecoreLinkExtensions.GetUrl(obj.Fields["SlideLink"])

                    };
                    jarray.Add((JToken)jobject);
                }
            }
            return jarray;
        }
        public override IRenderingModelBase GetModel()
        {
            CarouselRenderingModel m = new CarouselRenderingModel();
            this.FillBaseProperties((object)m);
            m.JsonDataProperties = this.GetJsonProperties();
            m.CarouselSlides = GetCarouselSlides();
            return (IRenderingModelBase)m;
        }
    }
}
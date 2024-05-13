using ComponentsLibrary.Interface;
using ComponentsLibrary.Model;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using Sitecore.Globalization;
using Sitecore.Links;
using Sitecore.Links.UrlBuilders;
using Sitecore.XA.Foundation.Abstractions;
using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;

namespace ComponentsLibrary.Repositories
{
    public class LanguageSelectorRepository :
    ModelRepository,
    ILanguageSelectorRepository,
    IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
        private readonly PropertyInfo _regionProperty;

        public LanguageSelectorRepository() => this._regionProperty = typeof(CultureInfo).GetProperty("Region", BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.GetProperty);

        public virtual IList<LanguageSelectorItem> GetLanguageSelectorItems(Item item) => (IList<LanguageSelectorItem>)this.GetLangItems(item).Select<Item, LanguageSelectorItem>(new Func<Item, LanguageSelectorItem>(this.BuildLanguageSelectorItem)).ToList<LanguageSelectorItem>();

        protected virtual LanguageSelectorItem BuildLanguageSelectorItem(Item langItem)
        {
            RegionInfo regionInfo = (RegionInfo)this._regionProperty.GetValue((object)langItem.Language.CultureInfo, (object[])null);
            return new LanguageSelectorItem(langItem)
            {
                Href = this.GetItemUrlWithLanguage(langItem),
                DataLanguageCode = langItem.Language.CultureInfo.TwoLetterISOLanguageName.ToLowerInvariant(),
                DataCountryCode = regionInfo.TwoLetterISORegionName.ToLowerInvariant()
            };
        }

        public virtual IList<LanguageSelectorItem> GetLanguageSelectorItems() => this.GetLanguageSelectorItems(this.Rendering.Item.DoesItemInheritFrom(Sitecore.XA.Foundation.Multisite.Templates.Page.ID) ? this.Rendering.Item : this.PageContext.Current);

        public virtual LanguageSelectorItem GetActiveLanguageItem(
          IEnumerable<LanguageSelectorItem> languageSelectorItems)
        {
            return languageSelectorItems.FirstOrDefault<LanguageSelectorItem>((Func<LanguageSelectorItem, bool>)(item => item.InnerItem.Language == ServiceLocator.ServiceProvider.GetService<IContext>().Language));
        }

        protected virtual IEnumerable<Item> GetLangItems(Item item1) => ((IEnumerable<Language>)item1.Languages).Select<Language, Item>((Func<Language, Item>)(lang => item1.Versions.GetLatestVersion(lang))).Where<Item>((Func<Item, bool>)(item2 => item2 != null && item2.Versions.Count > 0));

        protected virtual string GetItemUrlWithLanguage(Item item) => LinkManager.GetItemUrl(item, this.BuildUrlOptions(item));

        protected virtual ItemUrlBuilderOptions BuildUrlOptions(Item item)
        {
            ItemUrlBuilderOptions urlBuilderOptions = LinkManager.GetDefaultUrlBuilderOptions();
            urlBuilderOptions.Language = item.Language;
            urlBuilderOptions.LanguageEmbedding = new LanguageEmbedding?(LanguageEmbedding.Always);
            urlBuilderOptions.LanguageLocation = new LanguageLocation?(LinkManager.LanguageLocation);
            return urlBuilderOptions;
        }

        public override IRenderingModelBase GetModel()
        {
            LanguageSelectorRenderingModel m = new LanguageSelectorRenderingModel();
            IList<LanguageSelectorItem> languageSelectorItems = this.GetLanguageSelectorItems();
            LanguageSelectorItem languageSelectorItem = this.GetActiveLanguageItem((IEnumerable<LanguageSelectorItem>)languageSelectorItems) ?? languageSelectorItems.FirstOrDefault<LanguageSelectorItem>();
            languageSelectorItem.CssClasses = "is-active";
            this.FillBaseProperties((object)m);
            m.LanguageSelectorItems = languageSelectorItems;
            m.ActiveItem = languageSelectorItem;
            return (IRenderingModelBase)m;
        }
    }
}

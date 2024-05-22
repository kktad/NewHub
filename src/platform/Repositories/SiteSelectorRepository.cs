using ComponentsLibrary.Interface;
using Sitecore.DependencyInjection;
using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Multisite;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using System.Collections.Generic;
using System;
using System.Web.Mvc;
using System.Linq;
using Sitecore.Data;
using Sitecore.Data.Items;
using Microsoft.Extensions.DependencyInjection;
using ComponentsLibrary.Model;
using Sitecore.Links;

namespace ComponentsLibrary.Repositories
{
    public class SiteSelectorRepository : ModelRepository,
    ISiteSelectorRepository,
    IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
        protected IMultisiteContext MultisiteContext { get; set; }

        public SiteSelectorRepository() => this.MultisiteContext = ServiceLocator.ServiceProvider.GetService<IMultisiteContext>();

        protected virtual IEnumerable<SelectListItem> GetSelectItems()
        {
            if (this.MultisiteContext.TenantItem == null)
                return Enumerable.Empty<SelectListItem>();
            ID currentSiteId = this.GetCurrentSiteId();
            return (IEnumerable<SelectListItem>)this.GetSites().Select<Item, SelectListItem>((Func<Item, SelectListItem>)(m => this.BuildSelectListItem(m, currentSiteId))).ToList<SelectListItem>();
        }

        protected virtual SelectListItem BuildSelectListItem(Item m, ID currentSiteId) => new SelectListItem()
        {
            Text = m.DisplayName,
            Value = LinkManager.GetItemUrl(m),
            Selected = m.ID == currentSiteId
        };

        protected virtual ID GetCurrentSiteId() => this.MultisiteContext.SiteItem == null ? ID.Null : this.MultisiteContext.SiteItem.ID;

        protected virtual IEnumerable<Item> GetSites() => (IEnumerable<Item>)this.MultisiteContext.TenantItem.Children;

        public override IRenderingModelBase GetModel()
        {
            SiteSelectorRenderingModel m = new SiteSelectorRenderingModel();
            this.FillBaseProperties((object)m);
            m.SelectListItems = this.GetSelectItems();
            return (IRenderingModelBase)m;
        }
    }
}
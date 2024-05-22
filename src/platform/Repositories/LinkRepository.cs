using ComponentsLibrary.Interface;
using ComponentsLibrary.Model;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using Sitecore.XA.Foundation.Abstractions.Services;
using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Multisite;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using Sitecore.XA.Foundation.RenderingVariants.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ComponentsLibrary.Repositories
{
    public class LinkRepository :
    VariantsRepository,
    ILinkRepository,
    IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
        protected Model.LinkType? Type;
        protected Item AdjacentItem;

        public LinkRepository()
        {
            this.Type = new Model.LinkType?();
            this.AdjacentItem = (Item)null;
        }

        protected virtual Item GetAdjacentItem()
        {
            Model.LinkType linkType = this.GetLinkType();
            if (linkType == Model.LinkType.Specific)
                return (Item)null;
            if (this.AdjacentItem == null)
            {
                Item current = this.PageContext.Current;
                Item startItem = this.Context.Database.GetItem(ServiceLocator.ServiceProvider.GetService<ISiteInfoResolver>().GetStartPath(current));
                switch (linkType)
                {
                    case Model.LinkType.Parent:
                        if (((IEnumerable<Item>)current.Axes.GetAncestors()).Any<Item>((Func<Item, bool>)(a => a.ID == startItem.ID)))
                        {
                            this.AdjacentItem = current.Parent;
                            break;
                        }
                        break;
                    case Model.LinkType.Previous:
                        if (((IEnumerable<Item>)current.Axes.GetAncestors()).Any<Item>((Func<Item, bool>)(a => a.ID == startItem.ID)))
                        {
                            this.AdjacentItem = this.GetPreviousSiblingWithLayout(current);
                            break;
                        }
                        break;
                    case Model.LinkType.Next:
                        if (((IEnumerable<Item>)current.Axes.GetAncestors()).Any<Item>((Func<Item, bool>)(a => a.ID == startItem.ID)))
                        {
                            this.AdjacentItem = this.GetNextSiblingWithLayout(current);
                            break;
                        }
                        break;
                    case Model.LinkType.Back:
                        ITrackingService service = ServiceLocator.ServiceProvider.GetService<ITrackingService>();
                        this.AdjacentItem = service == null ? current : service.GetPreviousPageItem(current);
                        break;
                }
            }
            return this.AdjacentItem;
        }

        protected virtual Item GetNextSiblingWithLayout(Item item)
        {
            Item nextSibling = item.Axes.GetNextSibling();
            if (nextSibling == null)
                return (Item)null;
            return nextSibling.Visualization.Layout == null ? this.GetNextSiblingWithLayout(nextSibling) : nextSibling;
        }

        protected virtual Item GetPreviousSiblingWithLayout(Item item)
        {
            Item previousSibling = item.Axes.GetPreviousSibling();
            if (previousSibling == null)
                return (Item)null;
            return previousSibling.Visualization.Layout == null ? this.GetPreviousSiblingWithLayout(previousSibling) : previousSibling;
        }

        public virtual Model.LinkType GetLinkType()
        {
            if (!this.Type.HasValue)
            {
                this.Type = new Model.LinkType?(Model.LinkType.Specific);
                if (this.Rendering.DataSourceItem != null)
                {
                    string name = this.Rendering.DataSourceItem.Name;
                    Model.LinkType result;
                    if (Enum.TryParse<Model.LinkType>(name, out result) && ((IEnumerable<string>)Enum.GetNames(typeof(Model.LinkType))).Any<string>((Func<string, bool>)(s => s.Equals(name, StringComparison.OrdinalIgnoreCase))))
                        this.Type = new Model.LinkType?(result);
                }
            }
            return this.Type.Value;
        }

        public override IRenderingModelBase GetModel()
        {
            LinkRenderingModel m = new LinkRenderingModel();
            this.FillBaseProperties((object)m);
            m.HyperlinkLinkType = this.GetLinkType();
            if (m.HyperlinkLinkType != Model.LinkType.Specific)
                m.AdjacentItem = this.GetAdjacentItem();
            return (IRenderingModelBase)m;
        }

        protected override bool ShouldShowMessage()
        {
            if (this.Rendering.DataSourceItem == null && this.IsControlEditable)
                return true;
            return this.Rendering.DataSourceItem != null && this.IsControlEditable && this.GetLinkType() != Model.LinkType.Specific && this.GetAdjacentItem() == null;
        }
    }
}
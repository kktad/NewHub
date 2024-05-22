using Sitecore.XA.Foundation.Variants.Abstractions.Models;
using Sitecore.Data.Items;

namespace ComponentsLibrary.Model
{
    public class LinkRenderingModel : VariantsRenderingModel
    {
        public LinkType HyperlinkLinkType { get; set; }

        public Item AdjacentItem { get; set; }
    }
}
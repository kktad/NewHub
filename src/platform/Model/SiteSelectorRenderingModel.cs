using Sitecore.XA.Foundation.Mvc.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace ComponentsLibrary.Model
{
    public class SiteSelectorRenderingModel : RenderingModelBase
    {
        public IEnumerable<SelectListItem> SelectListItems { get; set; }
    }
}
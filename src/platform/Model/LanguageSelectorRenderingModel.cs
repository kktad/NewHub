using Sitecore.XA.Foundation.Mvc.Models;
using System.Collections.Generic;

namespace ComponentsLibrary.Model
{
    public class LanguageSelectorRenderingModel : RenderingModelBase
    {
        public IList<LanguageSelectorItem> LanguageSelectorItems { get; set; }

        public LanguageSelectorItem ActiveItem { get; set; }
    }
}
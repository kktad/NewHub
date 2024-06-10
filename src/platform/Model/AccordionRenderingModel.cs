using Newtonsoft.Json.Linq;
using Sitecore.XA.Foundation.Variants.Abstractions.Models;

namespace ComponentsLibrary.Model
{
    public class AccordionRenderingModel: VariantsRenderingModel
    {
        public JObject JsonDataProperties { get; set; }
        public JArray AccordionItems { get; set; }
    }
}
using Newtonsoft.Json.Linq;
using Sitecore.XA.Foundation.Variants.Abstractions.Models;

namespace ComponentsLibrary.Model
{
    public class TagListRenderingModel : VariantsRenderingModel
    {
        public JObject JsonDataProperties { get; set; }

        public JArray Tags { get; set; }
    }
}
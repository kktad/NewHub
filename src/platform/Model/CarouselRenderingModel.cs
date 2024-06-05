using Newtonsoft.Json.Linq;
using Sitecore.XA.Foundation.Variants.Abstractions.Models;
using Sitecore.Data.Items;

namespace ComponentsLibrary.Model
{
    public class CarouselRenderingModel: VariantsRenderingModel
    {
        public JObject JsonDataProperties { get; set; }

        public JArray CarouselSlides { get; set; }
        public CarouselRenderingModel()
        {
        }

        public CarouselRenderingModel(Item item) => this.Item = item;
    }
}
using Newtonsoft.Json.Linq;
using Sitecore.XA.Foundation.Variants.Abstractions.Models;

namespace ComponentsLibrary.Model
{
    public class EventCalendarRenderingModel : VariantsRenderingModel
    {
        public JObject JsonDataProperties { get; set; }
        public JArray CalendarTypeItem { get; set; }
    }
}
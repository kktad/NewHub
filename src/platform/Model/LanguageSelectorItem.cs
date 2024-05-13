using Sitecore.Data.Items;

namespace ComponentsLibrary.Model
{
    public class LanguageSelectorItem
    {
        public Item InnerItem { get; set; }

        public string Href { get; set; }

        public string DataLanguageCode { get; set; }

        public string DataCountryCode { get; set; }

        public string CssClasses { get; set; }

        public LanguageSelectorItem(Item item) => this.InnerItem = item;
    }
}
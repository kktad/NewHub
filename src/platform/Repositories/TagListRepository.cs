using ComponentsLibrary.Interface;
using ComponentsLibrary.Model;
using Newtonsoft.Json.Linq;
using Sitecore.Links;
using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using Sitecore.XA.Foundation.RenderingVariants.Repositories;
using System.Linq;

namespace ComponentsLibrary.Repositories
{
    public class TagListRepository : VariantsRepository,
    ITagListRepository,
    IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
        private TagListSettings _settings;

        protected TagListSettings Settings => _settings ?? (_settings = GetTagListSettings());

        protected JObject GetJsonDataProperties()
        {
            return new JObject
            {
                ["searchResultPage"] = new JObject
                {
                    ["id"] = Settings.SearchResultPage?.Id,
                    ["title"] = Settings.SearchResultPage?.Title,
                    ["url"] = Settings.SearchResultPage?.Url,
                },
            };
        }

        protected TagListSettings GetTagListSettings()
        {
            var pageId = Rendering.Parameters["SearchResultPage"] ?? string.Empty;
            var pageItem = !string.IsNullOrWhiteSpace(pageId) ? ContentRepository.GetItem(pageId) : null;
            var pageUrl = pageItem != null ? LinkManager.GetItemUrl(pageItem) : string.Empty;
            var pageTitle = pageItem != null
                ? !string.IsNullOrWhiteSpace( pageItem["Title"])
                    ? pageItem["Title"]
                    : pageItem.Name
                : string.Empty;

            var tagSettings = new TagListSettings
            {
                SearchResultPage = new TagListSearchResultPage()
                {
                    Id = pageId,
                    Title = pageTitle,
                    Url = pageUrl,
                }
            };

            return tagSettings;
        }

        private JArray GetTagListItems()
        {
            var jarray = new JArray();

            var tagIds = PageContext.Current?["SxaTags"].Split('|');
            var tagItems = tagIds?.Select(x => ContentRepository.GetItem(x)).ToArray();
            
            if (tagItems != null && tagItems.Length > 0)
            {
                foreach (var obj in tagItems)
                {
                    var jobject = new JObject
                    {
                        ["id"] = obj.ID.Guid.ToString("B").ToUpper(),
                        ["title"] = obj["Title"],
                    };

                    jarray.Add(jobject);
                }
            }

            return jarray;
        }

        public override IRenderingModelBase GetModel()
        {
            var m = new TagListRenderingModel();
            FillBaseProperties(m);

            m.JsonDataProperties = GetJsonDataProperties();
            m.Tags = GetTagListItems();

            return m;
        }
    }
}
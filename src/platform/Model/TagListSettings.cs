namespace ComponentsLibrary.Model
{
    public class TagListSearchResultPage
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }
    }

    public class TagListSettings
    {
        public TagListSearchResultPage SearchResultPage { get; set; }
    }
}
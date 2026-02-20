using ReadingRoom.Models.ViewModels.Interfaces;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace ReadingRoom.Models.ViewModels
{
    public class ArticleListPageViewModel(IPublishedContent content, IPublishedValueFallback publishedValueFallback) 
        : PublishedContentWrapped(content, publishedValueFallback), IArticleListPageViewModel
    {
        public IEnumerable<IArticlePageViewModel> Articles { get; set; }
    }
}

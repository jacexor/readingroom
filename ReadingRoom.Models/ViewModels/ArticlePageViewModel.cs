using Microsoft.Extensions.DependencyInjection;
using ReadingRoom.Models.ViewModels.Interfaces;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Strings;
using Umbraco.Extensions;

namespace ReadingRoom.Models.ViewModels
{
    public class ArticlePageViewModel : PublishedContentWrapped, IArticlePageViewModel
    {
        public ArticlePageViewModel(IPublishedContent publishedContent, IPublishedValueFallback publishedValueFallback)
            : base(publishedContent, publishedValueFallback)
        {
            var articlePage = new GeneratedModels.Article(publishedContent, publishedValueFallback);

            Title = articlePage.Title;
            Intro = articlePage.Intro;
            Body = articlePage.Body;
            PublishDate = articlePage.PublishDate;
            HeroImage = articlePage.HeroImage;
            ArticleUrl = articlePage.Url();
        }

        public string Title { get; set; }

        public string Intro { get; set; }

        public IHtmlEncodedString Body { get; set; }

        public DateTime PublishDate { get; set; }

        public MediaWithCrops HeroImage { get; set; }

        public string ArticleUrl { get; set; }

        public int ReadCount { get; set; }
    }
}

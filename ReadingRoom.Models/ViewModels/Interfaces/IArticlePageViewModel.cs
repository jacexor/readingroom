using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Strings;

namespace ReadingRoom.Models.ViewModels.Interfaces
{
    public interface IArticlePageViewModel
    {
        string Title { get; set; }

        string Intro { get; set; }

        IHtmlEncodedString Body { get; set; }

        DateTime PublishDate { get; set; }

        MediaWithCrops HeroImage { get; set; }

        string ArticleUrl { get; set; }

        int ReadCount { get; set; }
    }
}

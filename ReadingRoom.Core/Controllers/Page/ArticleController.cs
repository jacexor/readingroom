using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Logging;
using ReadingRoom.Models.GeneratedModels;
using ReadingRoom.Models.ViewModels;
using ReadingRoom.Service;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Extensions;

namespace ReadingRoom.Core.Controllers.Page
{
    public class ArticleController : RenderController
    {
        private readonly IPublishedValueFallback _publishedValueFallback;
        private readonly IReadingTimeService _readingTimeService;

        public ArticleController(ILogger<RenderController> logger,
            ICompositeViewEngine compositeViewEngine,
            IUmbracoContextAccessor umbracoContextAccessor,
            IPublishedValueFallback publishedValueFallback,
            IReadingTimeService readingTimeService)
            : base(logger, compositeViewEngine, umbracoContextAccessor)
        {
            _publishedValueFallback = publishedValueFallback;
            _readingTimeService = readingTimeService;
        }

        public override IActionResult Index()
        {
            var articleViewModel = new ArticlePageViewModel(CurrentPage!, _publishedValueFallback);

            articleViewModel.ReadCount = _readingTimeService.GetReadingTime(articleViewModel.Body.ToHtmlString());

            return CurrentTemplate(articleViewModel);
        }
    }
}

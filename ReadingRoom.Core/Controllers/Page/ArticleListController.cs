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
    public class ArticleListController : RenderController
    {
        private readonly IPublishedValueFallback _publishedValueFallback;

        public ArticleListController(ILogger<RenderController> logger,
            ICompositeViewEngine compositeViewEngine,
            IUmbracoContextAccessor umbracoContextAccessor,
            IPublishedValueFallback publishedValueFallback)
            : base(logger, compositeViewEngine, umbracoContextAccessor)
        {
            _publishedValueFallback = publishedValueFallback;
        }

        public override IActionResult Index()
        {
            var children = CurrentPage?.Children().Where(p => p is Article).ToList();

            var articleListPage = new ArticleListPageViewModel(CurrentPage!, _publishedValueFallback)
            {
                Articles = children?.Select(p => new ArticlePageViewModel(p, _publishedValueFallback)).ToList() ?? new List<ArticlePageViewModel>(),
            };

            return CurrentTemplate(articleListPage);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using ReadingRoom.Models.GeneratedModels;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common;
using Umbraco.Extensions;

namespace ReadingRoom.Core.Controllers.ManagementApi
{
    [VersionedApiBackOfficeRoute("articles")]
    [ApiExplorerSettings(GroupName = "Articles API")]
    public class ManagementApiController : ManagementApiControllerBase
    {
        private readonly UmbracoHelper _umbracoHelper;
        private readonly IPublishedValueFallback _publishedValueFallback;

        public ManagementApiController(UmbracoHelper umbracoHelper)
        {
            _umbracoHelper = umbracoHelper;
        }

        [HttpGet]
        public IActionResult GetLatestArticles(int skip = 0, int take = 10)
        {
            var articleListPage = _umbracoHelper.ContentAtRoot().FirstOrDefault(p => p is ArticleList);

            if (articleListPage == null)
            {
                return OperationStatusResult(
                                 OperationStatus.NotFound,
                                 builder => NotFound(
                                     builder
                                         .WithTitle("Article Page Not Found")
                                         .WithDetail("Lorem ipsum")
                                         .Build()
                                 ));
            }

            var result = articleListPage.Children().Select(p => new ArticleModel(new Article(p, _publishedValueFallback))).OrderByDescending(p => p.UpdateDate);

            return Ok(new PagedViewModel<ArticleModel>
            {
                Items = result,
                Total = result.Count()
            });
        }
    }

    public class ArticleModel(Article article)
    {
        public int Id { get; } = article.Id;

        public string Name { get; set; } = article.Name;

        public DateTime UpdateDate { get; set; } = article.UpdateDate;
    }

    public enum OperationStatus
    {
        NotFound
    }
}

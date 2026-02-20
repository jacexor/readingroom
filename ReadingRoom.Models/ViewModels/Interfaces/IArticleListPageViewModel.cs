namespace ReadingRoom.Models.ViewModels.Interfaces
{
    public interface IArticleListPageViewModel
    {
        IEnumerable<IArticlePageViewModel> Articles { get; set; }
    }
}

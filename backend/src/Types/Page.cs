namespace API.Types;

public class Page<T>(List<T> items, int totalItems, int currentPage, int limit) {

    public List<T> Items { get; set; } = items;
    public int TotalItems { get; set; } = totalItems;
    public int TotalPages { get; set; } = (int)Math.Ceiling((decimal)totalItems / limit);
    public int CurrentPage { get; set; } = currentPage;
    public int Limit { get; set; } = limit;

}
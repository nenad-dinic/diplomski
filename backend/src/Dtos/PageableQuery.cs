using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class PageableQuery {

    [Length(0, 1000)]
    public string Filter {get; set;} = string.Empty;

    [Range(1, int.MaxValue)]
    public int Page {get; set;} = 1;

    [Range(1, 100)]
    public int Limit {get; set;} = 25;

}
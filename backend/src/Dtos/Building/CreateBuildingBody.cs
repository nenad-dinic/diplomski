namespace API.Dtos.Building;

public class CreateBuildingBody {

    public int ManagerId {get; set;}
    public string Address {get; set;} = string.Empty;

}
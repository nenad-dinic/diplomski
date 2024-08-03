using API.Entities;
using API.Interfaces.Repositories;

namespace API.Repositories;

public class BuildingRepository(ApplicationDBContext context) : Repository<Building>(context), IBuildingRepository
{

}
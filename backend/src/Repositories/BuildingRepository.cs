using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class BuildingRepository(ApplicationDBContext context) : Repository<Building>(context), IBuildingRepository
{

}
using API.Entities;
using API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class BuildingRepository(ApplicationDBContext context) : Repository<Building>(context), IBuildingRepository
{

    public async Task<int> GetNumberOfBuildings() {
        return await context.Buildings.CountAsync();
    }
}
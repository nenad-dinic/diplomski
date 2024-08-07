using API.Entities;
using API.Interfaces.Repositories;
using API.Types;

namespace API.Services;

public class BuildingService(IBuildingRepository buildingRepository) {

    public async Task<Page<Building>> GetAll(string filter, int page, int limit) {

        Page<Building> buildings = await buildingRepository.GetAll(filter, page, limit);

        return buildings;

    }

    public async Task<Building?> GetBuildingById(int id) {

        Building? building = await buildingRepository.GetById(id);

        return building;

    }

    public async Task<Page<Building>> GetBuildingsByManager(int managerId, string filter, int page, int limit) {

        Page<Building> buildings = await buildingRepository.GetByManagerId(managerId, filter, page, limit);

        return buildings;

    }

    public async Task<Building?> CreateBuilding(int managerId, string address) {

        Building building = new() {
            ManagerId = managerId,
            Address = address
        };

        try {
            return await buildingRepository.Create(building);
        } catch {
            return null;
        }

    }

    public async Task<Building?> UpdateBuilding(int id, int? managerId, string? address) {

        Building? building = await buildingRepository.GetById(id);

        if(building == null) {
            return null;
        }

        building.ManagerId = managerId ?? building.ManagerId;
        building.Address = address ?? building.Address;
        building.Manager = null;

        try {
            return await buildingRepository.Update(building);
        } catch {
            return null;
        }

    }

    public async Task<Building?> DeleteBuilding(int id) {

        Building? building = await buildingRepository.GetById(id);

        if(building == null) {
            return null;
        }

        try {
            return await buildingRepository.Delete(building);
        } catch {
            return null;
        }

    }

}
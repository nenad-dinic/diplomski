using API.Interfaces.Repositories;
using API.Types;

namespace API.Services;

public class AnalyticsService(IBuildingRepository buildingRepository, IApartmentRepository apartmentRepository, IResidentRepository residentRepository, IRepairRepository repairRepository) {
    
    public async Task<Analytics> GetAnalytics() {

        int buildings = await buildingRepository.GetNumberOfBuildings();
        int apartments = await apartmentRepository.GetNumberOfApartments();
        int residents = await residentRepository.GetNumberOfResidents();
        int completedRepairs = await repairRepository.GetNumberOfCompletedRepairs();

        return new Analytics {
            Buildings = buildings,
            Apartments = apartments,
            Residents = residents,
            CompletedRepairs = completedRepairs
        };

    }

}
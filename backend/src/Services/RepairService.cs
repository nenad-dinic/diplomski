using API.Entities;
using API.Interfaces;
using API.Types;

namespace API.Services;

public class RepairService(IRepairRepository repairRepository) {

    public async Task<Page<Repair>> GetAll(string filter, int page, int limit) {

        Page<Repair> repairs = await repairRepository.GetAll(filter, page, limit);

        return repairs;

    }

    public async Task<Page<Repair>> GetRepairsByApartment(int apartmentId, string filter, int page, int limit) {

        Page<Repair> repairs = await repairRepository.GetByApartmentId(apartmentId, filter, page, limit);

        return repairs;

    }

    public async Task<Repair?> GetRepairById(int id) {

        Repair? repair = await repairRepository.GetById(id);

        return repair;

    }

    public async Task<Repair?> CreateRepair(int userId, int apartmentId, string description, bool isRepaired) {

        Repair repair = new() {
            UserId = userId,
            ApartmentId = apartmentId,
            Description = description,
            IsRepaired = isRepaired
        };

        try {
            return await repairRepository.Create(repair);
        } catch {
            return null;
        }

    }

    public async Task<Repair?> UpdateRepair(int id, int? userId, int? apartmentId, string? description, bool? isRepaired) {

        Repair? repair = await repairRepository.GetById(id);

        if(repair == null) {
            return null;
        }

        repair.UserId = userId ?? repair.UserId;
        repair.ApartmentId = apartmentId ?? repair.ApartmentId;
        repair.Description = description ?? repair.Description;
        repair.IsRepaired = isRepaired ?? repair.IsRepaired;

        try {
            return await repairRepository.Update(repair);
        } catch {
            return null;
        }

    }

    public async Task<Repair?> DeleteRepair(int id) {

        Repair? repair = await repairRepository.GetById(id);

        if(repair == null) {
            return null;
        }

        try {
            return await repairRepository.Delete(repair);
        } catch {
            return null;
        }

    }

}
using API.Entities;
using API.Interfaces;

namespace API.Services;

public class ResidentService(IResidentRepository residentRepository) {

    public async Task<List<Resident>> GetAll() {

        List<Resident> residents = await residentRepository.GetAll();

        return residents;

    }

    public async Task<Resident?> GetResidentById(int id){

        Resident? resident = await residentRepository.GetById(id);

        return resident;

    }

    public async Task<Resident?> CreateResident(int userId, int apartmentId, DateOnly expires, bool isOwner) {

        Resident resident = new() {
            UserId = userId,
            ApartmentId = apartmentId,
            Expires = expires,
            IsOwner = isOwner
        };

        try {
            return await residentRepository.Create(resident);
        } catch {
            return null;
        }

    }

    public async Task<Resident?> UpdateResident(int id, int? userId, int? apartmentId, DateOnly? expires, bool? isOwner) {

        Resident? resident = await residentRepository.GetById(id);

        if(resident == null) {
            return null;
        }

        resident.UserId = userId ?? resident.UserId;
        resident.ApartmentId = apartmentId ?? resident.ApartmentId;
        resident.Expires = expires ?? resident.Expires;
        resident.IsOwner = isOwner ?? resident.IsOwner;

        try {
            return await residentRepository.Update(resident);
        } catch {
            return null;
        }

    }

    public async Task<Resident?> DeleteResident(int id) {

        Resident? resident = await residentRepository.GetById(id);

        if(resident == null) {
            return null;
        }

        try {
            return await residentRepository.Delete(resident);
        } catch {
            return null;
        }

    }

}
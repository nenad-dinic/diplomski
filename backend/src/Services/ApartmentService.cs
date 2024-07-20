using API.Entities;
using API.Interfaces;

namespace API.Services;

public class ApartmentService(IApartmentRepository apartmentRepository) {

    public async Task<List<Apartment>> GetAll() {

        List<Apartment> apartments = await apartmentRepository.GetAll();

        return apartments;

    }

    public async Task<Apartment?> GetApartmentById(int id) {

        Apartment? apartment = await apartmentRepository.GetById(id);

        return apartment;

    }

    public async Task<Apartment?> CreateApartment(int buildingId, int number, int size, int numberOfResidents) {

        Apartment apartment = new() {
            BuildingId = buildingId,
            Number = number,
            Size = size,
            NumberOfResidents = numberOfResidents
        };

        try {
            return await apartmentRepository.Create(apartment);
        } catch {
            return null;
        }

    }

    public async Task<Apartment?> UpdateApartment(int id, int? buildingId, int? number, int? size, int? numberOfResidents) {

        Apartment? apartment = await apartmentRepository.GetById(id);

        if(apartment == null) {
            return null;
        }

        apartment.BuildingId = buildingId ?? apartment.BuildingId;
        apartment.Number = number ?? apartment.Number;
        apartment.Size = size ?? apartment.Size;
        apartment.NumberOfResidents = numberOfResidents ?? apartment.NumberOfResidents;

        try {
            return await apartmentRepository.Update(apartment);
        } catch {
            return null;
        }

    }

    public async Task<Apartment?> DeleteApartment(int id) {

        Apartment? apartment = await apartmentRepository.GetById(id);

        if(apartment == null) {
            return null;
        }

        try {
            return await apartmentRepository.Delete(apartment);
        } catch {
            return null;
        }

    }

}
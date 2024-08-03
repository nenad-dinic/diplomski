using API.Entities;
using API.Interfaces.Repositories;
using API.Types;

namespace API.Services;

public class BillTypeService(IBillTypeRepository billTypeRepository) {

    public async Task<Page<BillType>> GetAll(string filter, int page, int limit) {

        Page<BillType> billTypes = await billTypeRepository.GetAll(filter, page, limit);

        return billTypes;

    }

    public async Task<BillType?> GetBillTypeById(int id) {

        BillType? billType = await billTypeRepository.GetById(id);

        return billType;

    }

    public async Task<BillType?> CreateBillType(string name) {

        BillType billType = new() {
            Name = name
        };

        try {
            return await billTypeRepository.Create(billType);
        } catch {
            return null;
        }

    }

    public async Task<BillType?> UpdateBillType(int id, string? name) {

        BillType? billType = await billTypeRepository.GetById(id);

        if(billType == null) {
            return null;
        }

        billType.Name = name ?? billType.Name;

        try {
            return await billTypeRepository.Update(billType);
        } catch {
            return null;
        }

    }

    public async Task<BillType?> DeleteBillType(int id) {

        BillType? billType = await billTypeRepository.GetById(id);

        if(billType == null) {
            return null;
        }

        try {
            return await billTypeRepository.Delete(billType);
        } catch {
            return null;
        }

    }

}
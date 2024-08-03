using API.Entities;
using API.Interfaces.Repositories;
using API.Types;

namespace API.Services;

public class BillService(IBillRepository billRepository) {

    public async Task<Page<Bill>> GetAll(string filter, int page, int limit) {

        Page<Bill> bills = await billRepository.GetAll(filter, page, limit);

        return bills;

    }

    public async Task<Page<Bill>> GetBillsByApartment(int apartmentId, string filter, int page, int limit) {

        Page<Bill> bills = await billRepository.GetByApartmentId(apartmentId, filter, page, limit);

        return bills;

    }

    public async Task<Bill?> GetBillById(int id) {

        Bill? bill = await billRepository.GetById(id);

        return bill;

    }

    public async Task<Bill?> CreateBill(int billTypeId, int apartmentId, int month, string fileName, string filePath) {

        Bill bill = new() {
            BillTypeId = billTypeId,
            ApartmentId = apartmentId,
            Month = month,
            FileName = fileName,
            FilePath = filePath
        };

        try {
            return await billRepository.Create(bill);
        } catch {
            return null;
        }

    }

    public async Task<Bill?> UpdateBill(int id, int? billTypeId, int? apartmentId, int? month, string? fileName, string? filePath) {

        Bill? bill = await billRepository.GetById(id);

        if(bill == null) {
            return null;
        }

        bill.BillTypeId = billTypeId ?? bill.BillTypeId;
        bill.ApartmentId = apartmentId ?? bill.ApartmentId;
        bill.Month = month ?? bill.Month;
        bill.FileName = fileName ?? bill.FileName;
        bill.FilePath = filePath ?? bill.FilePath;

        try {
            return await billRepository.Update(bill);
        } catch {
            return null;
        }

    }

    public async Task<Bill?> DeleteBill(int id) {

        Bill? bill = await billRepository.GetById(id);

        if(bill == null) {
            return null;
        }

        try {
            return await billRepository.Delete(bill);
        } catch {
            return null;
        }

    }

}
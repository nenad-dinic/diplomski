using API.Entities;
using API.Interfaces;

namespace Api.Services;

public class BillService(IBillRepository billRepository) {

    public async Task<List<Bill>> GetAll() {

        List<Bill> bills = await billRepository.GetAll();

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
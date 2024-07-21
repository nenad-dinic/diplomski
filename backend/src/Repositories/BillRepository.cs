using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class BillRepository(ApplicationDBContext context) : Repository<Bill>(context), IBillRepository {

}
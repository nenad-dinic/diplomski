using API.Entities;
using API.Interfaces.Repositories;

namespace API.Repositories;

public class BillTypeRepository(ApplicationDBContext context) : Repository<BillType>(context), IBillTypeRepository
{

}
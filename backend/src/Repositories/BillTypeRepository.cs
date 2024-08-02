using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class BillTypeRepository(ApplicationDBContext context) : Repository<BillType>(context), IBillTypeRepository
{

}
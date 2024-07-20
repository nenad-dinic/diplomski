using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class PollRepository(ApplicationDBContext context) : Repository<Poll>(context), IPollRepository {
    
}
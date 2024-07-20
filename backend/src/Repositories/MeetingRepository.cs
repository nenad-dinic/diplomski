using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class MeetingRepository(ApplicationDBContext context) : Repository<Meeting>(context), IMeetingRepository {
    
}
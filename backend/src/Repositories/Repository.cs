using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class Repository<T>(ApplicationDBContext context) : IRepository<T> where T : class
{
    public virtual async Task<List<T>> GetAll()
    {
        return await context.Set<T>().ToListAsync();
    }

    public virtual async Task<T?> GetById(int id)
    {
        return await context.Set<T>().FindAsync(id);
    }

    public virtual async Task<T> Create(T entity)
    {
        await context.Set<T>().AddAsync(entity);
        await context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task<T> Update(T entity)
    {
        context.Set<T>().Update(entity);
        await context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task<T> Delete(T entity)
    {
        context.Set<T>().Remove(entity);
        await context.SaveChangesAsync();
        return entity;
    }
}
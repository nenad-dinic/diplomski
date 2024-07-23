using API.Interfaces;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public abstract class Repository<T>(ApplicationDBContext context) : IRepository<T> where T : class
{

    public virtual async Task<List<T>> GetAll()
    {
        return await context.Set<T>().ToListAsync();
    }

    public virtual async Task<Page<T>> GetAll(int page, int limit) {

        int offset = (page - 1) * limit;

        List<T> data = await context.Set<T>().Skip(offset).Take(limit).ToListAsync();
        int total = await context.Set<T>().CountAsync();

        return new Page<T>(data, total, page, limit);

    }

    public virtual async Task<Page<T>> GetAll(string filter, int page, int limit) {

        int offset = (page - 1) * limit;

        List<string> fields = GetSearchable();

        var predicate = fields.Count > 0 ? PredicateBuilder.False<T>() : PredicateBuilder.True<T>();

        foreach (string field in fields) {
            predicate = predicate.Or(t => EF.Property<string>(t, field).Contains(filter));
        }

        List<T> data = await context.Set<T>().Where(predicate).Skip(offset).Take(limit).ToListAsync();
        int total = await context.Set<T>().Where(predicate).CountAsync();

        return new Page<T>(data, total, page, limit);

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

    protected virtual List<string> GetSearchable() {
        return [];
    }
}
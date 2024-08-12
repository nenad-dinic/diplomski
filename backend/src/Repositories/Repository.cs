using System.Reflection;
using API.Attributes;
using API.Interfaces.Repositories;
using API.Types;
using API.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public abstract class Repository<T>(ApplicationDBContext context) : IRepository<T> where T : class
{

    protected readonly ApplicationDBContext context = context;

    private List<string> GetSearchableFields() {
        return context.Set<T>().EntityType.GetProperties().Where(p => p.PropertyInfo?.GetCustomAttribute(typeof(Searchable)) != null).Select(p => p.Name).ToList();
    }

    public List<string> GetAutoIncludeFields() {
        return context.Set<T>().EntityType.GetNavigations().Where(p => p.PropertyInfo?.GetCustomAttribute(typeof(AutoInclude)) != null).Select(p => p.Name).ToList();
    }

    public virtual async Task<List<T>> GetAll() {

        List<string> includeFields = GetAutoIncludeFields();

        IQueryable<T> query = context.Set<T>();
        foreach (string field in includeFields) {
            query = query.Include(field);
        }

        return await query.ToListAsync();
    }

    public virtual async Task<Page<T>> GetAll(int page, int limit) {

        int offset = (page - 1) * limit;

        List<string> includeFields = GetAutoIncludeFields();

        IQueryable<T> query = context.Set<T>();
        foreach (string field in includeFields) {
            query = query.Include(field);
        }

        List<T> data = await query.Skip(offset).Take(limit).ToListAsync();
        int total = await query.CountAsync();

        return new Page<T>(data, total, page, limit);

    }

    public virtual async Task<Page<T>> GetAll(string filter, int page, int limit) {

        int offset = (page - 1) * limit;

        List<string> searchFields = GetSearchableFields();
        List<string> includeFields = GetAutoIncludeFields();

        IQueryable<T> query = context.Set<T>();
        foreach (string field in includeFields) {
            query = query.Include(field);
        }

        var predicate = searchFields.Count > 0 ? PredicateBuilder.False<T>() : PredicateBuilder.True<T>();

        foreach (string field in searchFields) {
            predicate = predicate.Or(t => EF.Property<string>(t, field).Contains(filter));
        }

        List<T> data = await query.Where(predicate).Skip(offset).Take(limit).ToListAsync();
        int total = await query.Where(predicate).CountAsync();

        return new Page<T>(data, total, page, limit);

    }

    public virtual async Task<T?> GetById(int id) {

        List<string> includeFields = GetAutoIncludeFields();

        IQueryable<T> query = context.Set<T>();
        foreach (string field in includeFields) {
            query = query.Include(field);
        }

        string primaryKey = context.Model.FindEntityType(typeof(T))?.FindPrimaryKey()?.Properties[0].Name ?? "";

        query = query.Where(t => EF.Property<int>(t, primaryKey) == id);

        return await query.FirstOrDefaultAsync();
    }

    public virtual async Task<T> Create(T entity) {
        await context.Set<T>().AddAsync(entity);
        await context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task<T> Update(T entity) {
        context.ChangeTracker.Clear();
        context.Set<T>().Update(entity);
        await context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task<T> Delete(T entity) {
        context.ChangeTracker.Clear();
        context.Set<T>().Remove(entity);
        await context.SaveChangesAsync();
        return entity;
    }
}
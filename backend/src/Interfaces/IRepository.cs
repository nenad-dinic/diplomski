using API.Types;

namespace API.Interfaces;

public interface IRepository<T> {

    Task<List<T>> GetAll();
    Task<Page<T>> GetAll(int page, int limit);
    Task<Page<T>> GetAll(string filter, int page, int limit);
    Task<T?> GetById(int id);
    Task<T> Create(T entity);
    Task<T> Update(T entity);
    Task<T> Delete(T entity);

    List<string> GetSearchable();

}
namespace API.Interfaces;

public interface IRepository<T> {

    Task<List<T>> GetAll();
    Task<T?> GetById(int id);
    Task<T> Create(T entity);
    Task<T> Update(T entity);
    Task<T> Delete(T entity);

}
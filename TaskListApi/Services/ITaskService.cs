using TaskListApi.Models;

namespace TaskListApi.Services
{
    public interface ITaskService
    {
        Task<List<TaskItem>> GetAllAsync(string? titleFilter = null);
        Task<TaskItem?> GetByIdAsync(int id);
    }
}

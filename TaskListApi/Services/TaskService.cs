using System.Text.Json;
using TaskListApi.Models;

namespace TaskListApi.Services
{
    public class TaskService : ITaskService
    {
        private readonly HttpClient _httpClient;
        private const string baseUrl = "https://jsonplaceholder.typicode.com/todos";

        public TaskService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<TaskItem>> GetAllAsync(string? titleFilter = null)
        {
            var response = await _httpClient.GetAsync(baseUrl);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            var task = JsonSerializer.Deserialize<List<TaskItem>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (!string.IsNullOrEmpty(titleFilter))
            {
                task = task?.Where(e => e.Title.Contains(titleFilter, StringComparison.OrdinalIgnoreCase)).ToList();
            }

            return task ?? new List<TaskItem>();
        }

        public async Task<TaskItem?> GetByIdAsync(int id)
        {
            var response = await _httpClient.GetAsync($"{baseUrl}/{id}");
            if (!response.IsSuccessStatusCode) { return null; }

            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<TaskItem>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
    }
}

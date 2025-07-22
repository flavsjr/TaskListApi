using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskListApi.Controllers;
using TaskListApi.Models;
using TaskListApi.Services;

namespace TaskListApi.Tests.Controllers
{
    public class TaskListControllerTests
    {
        private readonly Mock<ITaskService> _taskServiceMock;
        private readonly TaskController _controller;

        public TaskListControllerTests()
        {
            _taskServiceMock = new Mock<ITaskService>();
            _controller = new TaskController(_taskServiceMock.Object);
        }

        [Fact]
        public async Task GetAllReturnList()
        {
            var tasks = new List<TaskItem>
            {
                new TaskItem { Id = 1, Title = "Tarefa 1", Completed = false, UserId = 1 },
                new TaskItem { Id = 2, Title = "Tarefa 2", Completed = true, UserId = 1 },
            };

            _taskServiceMock.Setup(e => e.GetAllAsync(null)).ReturnsAsync(tasks);

            var result = await _controller.GetTodos(null);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<TaskItem>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);
        }
        [Fact]
        public async Task GetByIdReturnsTaskItem()
        {
            var task = new TaskItem { Id = 1, Title = "Tarefa 1", Completed = false, UserId = 1 };
            _taskServiceMock.Setup(s => s.GetByIdAsync(1)).ReturnsAsync(task);

            var result = await _controller.GetTodoById(1);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<TaskItem>(okResult.Value);
            Assert.Equal(1, returnValue.Id);
        }

        [Fact]
        public async Task GetByIdInvalidIdReturnsNotFound()
        {
            _taskServiceMock.Setup(s => s.GetByIdAsync(999)).ReturnsAsync((TaskItem?)null);

            var result = await _controller.GetTodoById(999);

            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}

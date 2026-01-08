using TodoApi.DTOs;
using TodoApi.Models;

namespace TodoApi.Mappings;

public static class TodoMappings
{
    public static TodoResponse ToResponse(this Todo todo)
    {
        return new TodoResponse(
            todo.Id,
            todo.Text,
            todo.IsCompleted
        );
    }
}
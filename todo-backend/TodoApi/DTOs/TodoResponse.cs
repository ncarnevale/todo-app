namespace TodoApi.DTOs;

public record TodoResponse(
    int Id,
    string Text,
    bool IsCompleted
);

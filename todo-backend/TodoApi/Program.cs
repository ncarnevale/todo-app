using Microsoft.EntityFrameworkCore;
using TodoApi.DTOs;
using TodoApi.Mappings;
using TodoApi.Models;
using TodoApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<TodoDbContext>(options =>
{
    options.UseSqlite("Data Source=todos.db");
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

var todosGroup = app.MapGroup("api/todos").WithTags("Todos");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
    db.Database.EnsureCreated();
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "v1");
    });
}

app.UseHttpsRedirection();

todosGroup.MapGet("/", async (TodoDbContext db) =>
{
    var todos = await db.Todos
        .AsNoTracking()
        .Select(t => t.ToResponse())
        .ToListAsync();

    return Results.Ok(todos);
})
.WithName("GetTodos");

todosGroup.MapPost("/", async (
    CreateTodoRequest request,
    TodoDbContext db
) =>
{
    if (string.IsNullOrWhiteSpace(request.Text))
    {
        return Results.BadRequest(new ApiError("Text is required"));
    }

    var todo = new Todo
    {
        Text = request.Text,
        IsCompleted = false
    };

    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created(
        $"/api/todos/{todo.Id}",
        todo.ToResponse()
    );
})
.WithName("CreateTodo")
.Produces<TodoResponse>(StatusCodes.Status201Created)
.Produces<ApiError>(StatusCodes.Status400BadRequest);

todosGroup.MapPut("/{id:int}", async (
    int id,
    TodoDbContext db
) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null)
    {
        return Results.NotFound(new ApiError("Todo not found"));
    }

    todo.IsCompleted = !todo.IsCompleted;
    await db.SaveChangesAsync();

    return Results.Ok(todo.ToResponse());
})
.WithName("ToggleTodo")
.Produces<TodoResponse>(StatusCodes.Status200OK)
.Produces<ApiError>(StatusCodes.Status404NotFound);

todosGroup.MapDelete("/{id:int}", async (
    int id,
    TodoDbContext db
) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null)
    {
        return Results.NotFound(new ApiError("Todo not found"));
    }

    db.Todos.Remove(todo);
    await db.SaveChangesAsync();

    return Results.NoContent();
})
.WithName("DeleteTodo")
.Produces(StatusCodes.Status204NoContent)
.Produces<ApiError>(StatusCodes.Status404NotFound);

app.Run();
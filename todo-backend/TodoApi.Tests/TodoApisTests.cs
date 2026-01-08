using System.Net.Http.Json;
using System.Text.Json;
using Xunit;
using TodoApi.DTOs;

public class TodosApiTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public TodosApiTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task PostTodo_ThenGetTodos_ReturnsCreatedTodo()
    {

        var createRequest = new
        {
            text = "Eat a sandwich"
        };

        // POST todos
        var postResponse = await _client.PostAsJsonAsync(
            "/api/todos",
            createRequest
        );

        postResponse.EnsureSuccessStatusCode();

        // GET todos
        var getResponse = await _client.GetAsync("/api/todos");
        getResponse.EnsureSuccessStatusCode();

        var content = await getResponse.Content.ReadAsStringAsync();
        var todos = JsonSerializer.Deserialize<List<TodoResponse>>(
            content,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        // Assert newly created Todo is present
        Assert.NotNull(todos);
        Assert.Single(todos!);
        Assert.Equal("Eat a sandwich", todos![0].Text);
        Assert.False(todos[0].IsCompleted);
    }
}

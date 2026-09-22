namespace MatMatcha.API.Models;

public class Recipe
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int PrepTimeMinutes { get; set; }
    public List<Ingredient> Ingredients { get; set; } = new();
    public string MatchingStore { get; set; } = string.Empty;
}
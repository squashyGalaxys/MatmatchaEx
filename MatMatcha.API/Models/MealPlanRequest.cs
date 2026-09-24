namespace MatMatcha.API.Models;

public class MealPlanRequest
{
    public string Store { get; set; } = string.Empty;
    public int Days { get; set; }
    public int PeopleCount { get; set; }
}

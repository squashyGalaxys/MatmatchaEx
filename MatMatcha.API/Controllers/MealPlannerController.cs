using Microsoft.AspNetCore.Mvc;
using MatMatcha.API.Models;

namespace MatMatcha.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MealPlannerController : ControllerBase
{
    [HttpPost("generate")]
    public IActionResult GenerateMealPlan([FromBody] MealPlanRequest request)
    {
        if (request.Days <= 0 || request.PeopleCount <= 0)
        {
            return BadRequest("Antal dagar och personer måste vara större än 0.");
        }

        // Mockad receptdatabas
        var allRecipes = GetMockRecipes();

        // 1. Filtrera eller prioritera recept som passar den valda butikens erbjudanden
        var selectedRecipes = allRecipes
            .Where(r => string.Equals(r.MatchingStore, request.Store, StringComparison.OrdinalIgnoreCase) || string.IsNullOrEmpty(r.MatchingStore))
            .Take(request.Days)
            .ToList();

        // Om vi inte har tillräckligt med butiksspecifika recept, fyll på med övriga
        if (selectedRecipes.Count < request.Days)
        {
            var remainingCount = request.Days - selectedRecipes.Count;
            var extraRecipes = allRecipes.Except(selectedRecipes).Take(remainingCount);
            selectedRecipes.AddRange(extraRecipes);
        }

        // 2. Skapa sammanslagen och skalad inköpslista baserat på antal personer
        var shoppingList = GenerateShoppingList(selectedRecipes, request.PeopleCount);

        return Ok(new
        {
            Store = request.Store,
            Days = request.Days,
            PeopleCount = request.PeopleCount,
            Recipes = selectedRecipes,
            ShoppingList = shoppingList
        });
    }

    private List<Recipe> GetMockRecipes()
    {
        return new List<Recipe>
        {
            new Recipe
            {
                Id = 1,
                Title = "Klassisk Köttfärssås med Spaghetti",
                Description = "En god och snabb vardagsfavorit för hela familjen.",
                PrepTimeMinutes = 25,
                MatchingStore = "Willys",
                Ingredients = new List<Ingredient>
                {
                    new Ingredient { Name = "Nötfärs", AmountPerPerson = 125, Unit = "g", IsOnOffer = true, OfferPrice = 69.90m },
                    new Ingredient { Name = "Krossade Tomater", AmountPerPerson = 100, Unit = "g", IsOnOffer = true, OfferPrice = 12.90m },
                    new Ingredient { Name = "Pasta Penne/Spaghetti", AmountPerPerson = 100, Unit = "g", IsOnOffer = true, OfferPrice = 16.90m },
                    new Ingredient { Name = "Gul lök", AmountPerPerson = 0.5, Unit = "st", IsOnOffer = false }
                }
            },
            new Recipe
            {
                Id = 2,
                Title = "Krämig Pastagratäng",
                Description = "Enkel och mättande pastarätt som sköter sig själv i ugnen.",
                PrepTimeMinutes = 35,
                MatchingStore = "ICA",
                Ingredients = new List<Ingredient>
                {
                    new Ingredient { Name = "Pasta Penne/Spaghetti", AmountPerPerson = 125, Unit = "g", IsOnOffer = true, OfferPrice = 16.90m },
                    new Ingredient { Name = "Krossade Tomater", AmountPerPerson = 150, Unit = "g", IsOnOffer = true, OfferPrice = 12.90m },
                    new Ingredient { Name = "Matlagningsgrädde", AmountPerPerson = 0.75, Unit = "dl", IsOnOffer = true, OfferPrice = 16.90m },
                    new Ingredient { Name = "Riven ost", AmountPerPerson = 40, Unit = "g", IsOnOffer = false }
                }
            },
            new Recipe
            {
                Id = 3,
                Title = "Tacos med Nötfärs",
                Description = "Fredagsmyset som alltid går hem hos både stora och små.",
                PrepTimeMinutes = 20,
                MatchingStore = "Willys",
                Ingredients = new List<Ingredient>
                {
                    new Ingredient { Name = "Nötfärs", AmountPerPerson = 125, Unit = "g", IsOnOffer = true, OfferPrice = 69.90m },
                    new Ingredient { Name = "Tacokrydda", AmountPerPerson = 0.25, Unit = "påse", IsOnOffer = false },
                    new Ingredient { Name = "Tortillabröd", AmountPerPerson = 2, Unit = "st", IsOnOffer = false }
                }
            }
        };
    }

    private List<Ingredient> GenerateShoppingList(List<Recipe> recipes, int peopleCount)
    {
        // Slå samman ingredienser med samma namn och enhet samt ändra mängden efter antal personer
        return recipes
            .SelectMany(r => r.Ingredients)
            .GroupBy(i => new { i.Name, i.Unit, i.IsOnOffer, i.OfferPrice })
            .Select(g => new Ingredient
            {
                Name = g.Key.Name,
                Unit = g.Key.Unit,
                IsOnOffer = g.Key.IsOnOffer,
                OfferPrice = g.Key.OfferPrice,
                AmountPerPerson = Math.Round(g.Sum(i => i.AmountPerPerson * peopleCount), 1)
            })
            .ToList();
    }
}
using Microsoft.AspNetCore.Mvc;
using MatMatcha.API.Models;

namespace MatMatcha.API.Controllers;

[ApiController]
[Route("api/offers")]
public class OffersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetOffers()
    {
        var mockOffers = new List<Offer>

        {
            new Offer { Id = 1, Title = "Svensk nötfärs 500g", Store = "Willys", OriginalPrice = 99m, DiscountPrice = 69.90m, Category = "Kött", ValidUntil = "Söndag"},
            new Offer { Id = 2, Title = "Krossate Tomater 3-pack", Store = "Willys", OriginalPrice = 29.90m, DiscountPrice = 19.90m, Category = "Skafferi", ValidUntil = "Söndag"},
            new Offer { Id = 3, Title = "Pasta Penne 500g", Store = "Ica", OriginalPrice = 22.90m, DiscountPrice = 16.90m, Category = "Skafferi", ValidUntil = "Söndag"},
            new Offer { Id = 4, Title = "Matlagningsgrädde 5 dl", Store = "Ica", OriginalPrice = 22.90m, DiscountPrice = 16.90m, Category = "Mejeri", ValidUntil = "Söndag"},
            new Offer { Id = 5, Title = "Gul lök 1 kg", Store = "Willys", OriginalPrice = 19.90m, DiscountPrice = 9.90m, Category = "Skafferi", ValidUntil = "Söndag"},
            
            new Offer { Id = 6, Title = "Fläskfilé svensk 600g", Store = "Ica", OriginalPrice = 99.00m, DiscountPrice = 79.00m, Category = "Kött", ValidUntil = "Söndag"},
            new Offer { Id = 7, Title = "Pasta Penne Barilla 500g", Store = "Ica", OriginalPrice = 24.90m, DiscountPrice = 16.90m, Category = "Skafferi", ValidUntil = "Söndag"},
            new Offer { Id = 8, Title = "Arla Matlagningsgrädde 3dl", Store = "Ica", OriginalPrice = 22.90m, DiscountPrice = 16.90m, Category = "Mejeri", ValidUntil = "Söndag"},
            new Offer { Id = 9, Title = "ICA Krossade tomater 400g", Store = "Ica", OriginalPrice = 14.90m, DiscountPrice = 9.90m, Category = "Skafferi", ValidUntil = "Söndag"}
        };
        
        
        return Ok(mockOffers);
    }
}
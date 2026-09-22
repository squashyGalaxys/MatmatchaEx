namespace MatMatcha.API.Models;

public class Ingredient
{
    public string Name { get; set; } = string.Empty;
    public double AmountPerPerson { get; set; }
    public string Unit { get; set; } = string.Empty;
    public bool IsOnOffer { get; set; }
    public decimal? OfferPrice { get; set; }
}
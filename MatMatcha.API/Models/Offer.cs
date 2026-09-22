namespace MatMatcha.API.Models;

public class Offer
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Store { get; set; } = string.Empty;
    public decimal OriginalPrice { get; set; }
    public decimal DiscountPrice { get; set; }
    public string Category { get; set; } = string.Empty;
    public string ValidUntil { get; set; } = string.Empty;
    
}

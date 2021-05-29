// ignore: camel_case_types
class product
{
  final String name;
  final String model;
  final double price;

  final String retailer;

  final String description;

  final String url;
  final String photo;
  availability stockAvailability;

  product(this.name, this.model, this.price, this.retailer, this.description,
      this.url, this.photo,String sAvailability)
  {
    if(sAvailability==null)
      {
        this.stockAvailability=availability.notSpecified;
      }
    else if(sAvailability.toLowerCase().compareTo("available") ==0)
      {
        this.stockAvailability=availability.available;
      }
    else if(sAvailability.toLowerCase().compareTo("limitedstock") ==0)
      {
        this.stockAvailability=availability.limitedStock;
      }
    else if(sAvailability.toLowerCase().compareTo("outofstock") ==0)
    {
      this.stockAvailability=availability.outOfStock;
    }
    else if(sAvailability.toLowerCase().compareTo("notspecified") ==0)
    {
      this.stockAvailability=availability.notSpecified;
    }
    else
    {
      this.stockAvailability=availability.notSpecified;
    }
  }
}

enum availability
{
  available,
  limitedStock,
  outOfStock,
  notSpecified
}

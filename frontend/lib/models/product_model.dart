import 'package:flutter/material.dart';

class Product
{
  final String type;
  final String id;
  final String brand;
  final String model;
  final double price;
  final String retailer;
  final String description;

  final String url;
  final String image; //image
  bool _watch;
  availability stockAvailability;

  bool get watching => _watch;

  set watch(bool value) {
    _watch = value;
  }

  bool isTheSame(Product other)
  {
    return (
        other.id==this.id
    );
  }

  factory Product.fromJson(Map<String,dynamic>json)
  {
    return Product(
      json['brand'],
      json['model'],
      json['price'].toDouble(),
      json['retailer'],
      json['description'],
      json['url'],
      json['image'],
      json['availability'],
      json['id'],
      json['type'].toUpperCase(),
      json['watch'],
    );
  }

  Product(this.brand, this.model, this.price, this.retailer, this.description,
      this.url, this.image,String sAvailability,this.id,this.type,this._watch)
  {
    if(sAvailability==null)
      {
        this.stockAvailability=availability.outOfStock;
      }
    else if(sAvailability.toLowerCase().compareTo("in stock") ==0)
      {
        this.stockAvailability=availability.inStock;
      }
    // else if(sAvailability.toLowerCase().compareTo("limitedstock") ==0)
    //   {
    //     this.stockAvailability=availability.limitedStock;
    //   }
    else if(sAvailability.toLowerCase().compareTo("out of stock") ==0)
    {
      this.stockAvailability=availability.outOfStock;
    }
    // else if(sAvailability.toLowerCase().compareTo("notspecified") ==0)
    // {
    //   this.stockAvailability=availability.notSpecified;
    // }
    else
    {
      this.stockAvailability=availability.outOfStock;
    }
  }
  //todo remove
  String getAvailability()
  {

    if(this.stockAvailability==availability.inStock)
      {
        return "in stock";
      }
    // else if(this.stockAvailability==availability.limitedStock)
    // {
    //   return "limited stock";
    // }
    else if(this.stockAvailability==availability.outOfStock)
    {
      return "out of stock";
    }
    // else if(this.stockAvailability==availability.notSpecified)
    // {
    //   return "not specified";
    // }
    return "out of stock";
  }
  //todo remove
  Widget getAvailabilityText(double size,TextAlign align)
  {
    if(this.stockAvailability==availability.inStock)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.green),textAlign: align,);
    }
    // else if(this.stockAvailability==availability.notSpecified)
    // {
    //   return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.grey),textAlign: align);
    // }
    else if(this.stockAvailability==availability.outOfStock /*||this.stockAvailability==availability.limitedStock*/)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.red),textAlign: align);
    }
    return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,),textAlign: align);
  }
}

enum availability
{
  //todo
  inStock,
  outOfStock,
}

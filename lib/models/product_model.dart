// ignore: camel_case_types
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
  availability stockAvailability;

  Product(this.brand, this.model, this.price, this.retailer, this.description,
      this.url, this.image,String sAvailability,this.id,this.type)
  {
    if(sAvailability==null)
      {
        this.stockAvailability=availability.notSpecified;
      }
    else if(sAvailability.toLowerCase().compareTo("in stock") ==0)
      {
        this.stockAvailability=availability.available;
      }
    else if(sAvailability.toLowerCase().compareTo("limitedstock") ==0)
      {
        this.stockAvailability=availability.limitedStock;
      }
    else if(sAvailability.toLowerCase().compareTo("out of stock") ==0)
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

  String getAvailability()
  {
    if(this.stockAvailability==availability.available)
      {
        return "available";
      }
    else if(this.stockAvailability==availability.limitedStock)
    {
      return "limited stock";
    }
    else if(this.stockAvailability==availability.outOfStock)
    {
      return "out of stock";
    }
    else if(this.stockAvailability==availability.notSpecified)
    {
      return "not specified";
    }
    return "not specified";
  }

  Widget getAvailabilityText(double size,TextAlign align)
  {
    if(this.stockAvailability==availability.available)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.green),textAlign: align,);
    }
    else if(this.stockAvailability==availability.notSpecified)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.grey),textAlign: align);
    }
    else if(this.stockAvailability==availability.outOfStock||this.stockAvailability==availability.limitedStock)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.red),textAlign: align);
    }
    return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,),textAlign: align);
  }
}

enum availability
{
  available,
  limitedStock,//remove
  outOfStock,
  notSpecified//remove
}

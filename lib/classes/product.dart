// ignore: camel_case_types
import 'package:flutter/material.dart';

class Product
{
  final String brand;
  final String model;
  final double price;

  final String retailer;

  final String description;

  final String url;
  final String photo; //url
  availability stockAvailability;

  Product(this.brand, this.model, this.price, this.retailer, this.description,
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

  Widget getAvailabilityText()
  {
    if(this.stockAvailability==availability.available)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,color: Colors.green));
    }
    else if(this.stockAvailability==availability.notSpecified)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,color: Colors.grey));
    }
    else if(this.stockAvailability==availability.outOfStock||this.stockAvailability==availability.limitedStock)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,color: Colors.red));
    }
    return Text(this.getAvailability(),style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,));
  }
}

enum availability
{
  available,
  limitedStock,
  outOfStock,
  notSpecified
}

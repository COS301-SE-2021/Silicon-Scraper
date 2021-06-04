import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:mockito/mockito.dart';
import 'package:silicon_scraper/classes/product.dart';

class ProductMock extends Mock implements Product
{

  @override
  String getAvailability()
  {
    return  "available";
  }
  @override
  Widget getAvailabilityText(double size,TextAlign align)
  {
      return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.green),textAlign: align,);
  }
}
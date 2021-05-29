import 'package:flutter/material.dart';
import 'package:silicon_scraper/classes/product.dart';

class ProductWidget extends StatelessWidget {
  final product item;

  const ProductWidget({Key key, this.item}) : super(key: key);
  @override
  Widget build(BuildContext context)
  {
    return Container(
      margin: EdgeInsets.fromLTRB(20, 50, 20, 50),
      child:Column(
        children: [
          Container(
            height: MediaQuery.of(context).size.height/5,
            child: Image.network('${item.photo}',),
          ),
          Text("${item.name}",style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,),),
          Text("${item.model}"),
          Text("${item.price}"),
          Text("${item.stockAvailability.toString()}"),
          Text("${item.retailer}"),
          Text("${item.description}"),

        ],
      ),

    );
  }
}


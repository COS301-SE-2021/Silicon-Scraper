import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/classes/product.dart';

class ProductWidget extends StatelessWidget {
  final product item;

  const ProductWidget({Key key, this.item}) : super(key: key);
  @override
  Widget build(BuildContext context)
  {
    return Card(
      elevation: 60.0,
        shape: RoundedRectangleBorder(
        side: BorderSide(color: Colors.white70, width: 1),
        borderRadius: BorderRadius.circular(10),
      ),
      margin: EdgeInsets.fromLTRB(10, 10, 10, 0),
      child:Row(
        children: [
          Container(
            height: MediaQuery.of(context).size.height/5,
            child: Image.network('${item.photo}',),
          ),
          SizedBox(width: 30,),
          Column(
            children: [
              Container(
                width: MediaQuery.of(context).size.width/2 ,
                  child: Text("${item.name}",style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,),)
              ),
               Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                    
                  children: [
                    Container(
                      margin: EdgeInsets.only(left: 0,right:  55),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [

                          Text("${item.model}"),
                          Text("${item.retailer}",style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,),textAlign: TextAlign.left,),
                          Text(item.getAvailability(),style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,)),
                        ],
                      ),
                    ),
                    Container(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                        Text("R${item.price}",style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,)),
                                ],
                      ),
                    )
                  ],
                ),
              ],
          )
        ],
      ),

    );

//    Card(
//      elevation: 60.0,
//      shape: RoundedRectangleBorder(
//        side: BorderSide(color: Colors.white70, width: 1),
//        borderRadius: BorderRadius.circular(10),
//      ),
//      margin: EdgeInsets.fromLTRB(20.0,10,20,10),
//
//    ),
  }
}


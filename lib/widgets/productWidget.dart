import 'package:flutter/material.dart';
import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/widgets/productDetailWidget.dart';

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
        borderRadius: BorderRadius.only(topRight: Radius.circular(10),bottomRight: Radius.circular(10) ),
      ),
      margin: EdgeInsets.fromLTRB(10, 10, 10, 0),
      child:InkWell(
        onTap: (){
          Navigator.push(context, MaterialPageRoute(builder: (context)=> ProductDetailWidget(item)));
        },
        child: Row(
          children: [
            Container(
              height: MediaQuery.of(context).size.height/6,
              child: Image.network('${item.photo}',),
            ),
            SizedBox(width: 30,),
            Column(
              children: [
                Container(
                  width: MediaQuery.of(context).size.width/2 ,
                    child: Text("${item.brand}",style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,),)
                ),
                 Row(
                    mainAxisAlignment: MainAxisAlignment.start,

                    children: [
                      Container(
                        margin: EdgeInsets.only(left: 0,right:  55,top: 10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("${item.retailer}",style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,),textAlign: TextAlign.left,),
                            item.getAvailabilityText(),
                          ],
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                          Text("R${item.price}",style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,color: Colors.green)),
                                  ],
                        ),
                      )
                    ],
                  ),
                ],
            )
          ],
        ),
      ),

    );

  }


}


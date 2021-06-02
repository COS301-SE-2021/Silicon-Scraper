import 'package:flutter/material.dart';
import 'package:silicon_scraper/classes/product.dart';

class ProductDetailWidget extends StatefulWidget {
  Product item;
  ProductDetailWidget(this.item);

  get photo => item.photo;

  get retailer => item.retailer;

  get price => item.price;

  get Availabilitytext => item.getAvailabilityText();

  @override
  _ProductDetailWidgetState createState() => _ProductDetailWidgetState();
}

class _ProductDetailWidgetState extends State<ProductDetailWidget> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Center(child: Text("Product detail",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 25),)),
//        backgroundColor:Color(0xff0E3854) ,
        backgroundColor: Colors.red[800],
      ),
      body:Container(
        width:MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height/0.5,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
//              color: Colors.grey,
              padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
              height: MediaQuery.of(context).size.height/3,
              width: MediaQuery.of(context).size.width,
              child: Image.network('${widget.photo}',),
            ),
            Row(
              children: [
                Container(
                  width: MediaQuery.of(context).size.width/2,
                  child: Column(
                    children: [
                      Text("R${widget.price}",style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,color: Colors.green)),
                      Text("${widget.retailer}",style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,),textAlign: TextAlign.left,),
                    ],
                  ),
                ),
                Container(
                  width: MediaQuery.of(context).size.width/2,
                  child: Column(
                    children: [
                      Text("R${widget.price}",style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,color: Colors.green)),
                      Text("${widget.retailer}",style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold,),textAlign: TextAlign.left,),
                    ],
                  ),
                ),
              ],
            ),
            ElevatedButton(onPressed: (){},  child:Icon(Icons.bookmark_outline_rounded,))
          ],
        )
      ),
    );
  }
}

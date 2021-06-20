import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/services/watchListService.dart';
import 'package:url_launcher/url_launcher.dart';


class ProductDetailWidget extends StatefulWidget {

  final Product item;
  ProductDetailWidget(this.item);

  get photo => item.photo;

  get retailer => item.retailer;

  get price => item.price;

  get Availabilitytext => item.getAvailabilityText(20,TextAlign.left);

  get brand => item.brand;

  get model => item.model;

  get desctiption => item.description;

  get url => item.url;

  @override
  _ProductDetailWidgetState createState() => _ProductDetailWidgetState(item);
}

class _ProductDetailWidgetState extends State<ProductDetailWidget> {

  WatchListSingleton watch= WatchListSingleton.getState();
  Product item;
  _ProductDetailWidgetState(this.item);
  bool inWatch;

  @override
  void initState() {
    inWatch=watch.findItem(item);
    super.initState();
  }

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
        child: ListView(
//          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
              child: Text("${widget.brand}",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold,),textAlign: TextAlign.center,),
            ),
            Container(
//              color: Colors.grey,
              padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
              height: MediaQuery.of(context).size.height/3,
              width: MediaQuery.of(context).size.width,
              child: Image.network('${widget.photo}',),
            ),
            SizedBox(height: 20,),
            Container(
              child: Text("${widget.model}",style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,),textAlign: TextAlign.center,),
            ),
            SizedBox(height: 10,),
            Container(
              padding: EdgeInsets.fromLTRB(20, 0, 20, 0),
              child: Text("${widget.desctiption}",style: TextStyle(fontWeight: FontWeight.bold,),textAlign: TextAlign.center),
            ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
                  width: MediaQuery.of(context).size.width/2,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Text("Retailer: ${widget.retailer}",style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,),textAlign: TextAlign.left,),
                      widget.Availabilitytext,
                    ],
                  ),
                ),
                Container(
                  padding: EdgeInsets.fromLTRB(10, 20, 10, 0),
                  width: MediaQuery.of(context).size.width/2,
                  child: Column(
                    children: [
                      Text("R${widget.price}",style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold,color: Colors.green)),
                    ],
                  ),
                ),
              ],
            ),
          ],
        )
      ),
//      bottomSheet: ,
      persistentFooterButtons: [ElevatedButton(onPressed: (){
        setState(() {
          if(!inWatch)
            {
              watch.addItem(item);
              inWatch=true;
            }
          else if(inWatch)
          {
            watch.removeItem(item);
            inWatch=false;
          }
        });
      },  child:Icon(Icons.bookmark_outline_rounded,color: Colors.white,))
        ,ElevatedButton(child: Icon(Icons.web),
          onPressed: ()async{
            var url = widget.url;
            return await launch(url);

            },)
      ],
    );
  }
}

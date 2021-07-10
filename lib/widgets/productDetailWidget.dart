import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/models/product.dart';
import 'package:silicon_scraper/services/watchListService.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';


class ProductDetailWidget extends StatefulWidget {

  final Product item;
  ProductDetailWidget(this.item);

  get photo => item.image;

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
  double buttonHeight= 220;

  @override
  void initState() {
    inWatch=watch.findItem(item);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final panelClose=MediaQuery.of(context).size.height/2.8;
    final panelOpen=MediaQuery.of(context).size.height*0.7;
    return Scaffold(
      appBar: AppBar(
        title:
        Text("Product detail",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 25),),
        centerTitle: true,
      ),
      body: Container(
        child: Stack(
//          overflow: Overflow.visible,
          children: [
            Container(
//              color: Colors.grey,
              alignment: Alignment.topCenter,
//        margin: EdgeInsets.fromLTRB(0, 0, 0,MediaQuery.of(context).size.height/3 ),
              height: MediaQuery.of(context).size.height/2,
              width: MediaQuery.of(context).size.width,
              child: Image.network('${widget.photo}',),
            ),

        Stack(
          children: [
            SlidingUpPanel(
              onPanelSlide: (position)=>setState(()
              {
                final panelMaxScrollExtent=panelOpen-panelClose;
                buttonHeight=position*panelMaxScrollExtent+220;
              }),
          backdropEnabled: true,
          minHeight:panelClose,
          maxHeight: panelOpen,
//          padding: EdgeInsets.fromLTRB(5, 50, 5, 0),
          borderRadius: BorderRadius.vertical(top: Radius.circular(20.0)),
          header:Container(
            width:MediaQuery.of(context).size.width ,
            padding: EdgeInsets.only(top:10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("${widget.brand +widget.model}",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold,),textAlign: TextAlign.center,),
              ],
            ),
          ),
          panel: Column(
            children: [

              Container(
                padding: EdgeInsets.fromLTRB(5, 50, 5, 0),
                child: Text("${widget.desctiption}"),
              ),
            ],
          ),

            ),
            Positioned(
                right: 10,
                bottom: buttonHeight,
                child: FloatingActionButton(
                  child: Icon(Icons.bookmark), onPressed: (){},
                )
            ),
        ]
        ),
          ],
        ),
      ),
    );
  }

}

//old code
//      body:Container(
//        width:MediaQuery.of(context).size.width,
//        height: MediaQuery.of(context).size.height/0.5,
//        child: ListView(
////          mainAxisAlignment: MainAxisAlignment.start,
//          children: [
//            Container(
//              child: Text("${widget.brand}",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold,),textAlign: TextAlign.center,),
//            ),
//            Container(
////              color: Colors.grey,
//              padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
//              height: MediaQuery.of(context).size.height/3,
//              width: MediaQuery.of(context).size.width,
//              child: Image.network('${widget.photo}',),
//            ),
//            SizedBox(height: 20,),
//            Container(
//              child: Text("${widget.model}",style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,),textAlign: TextAlign.center,),
//            ),
//            SizedBox(height: 10,),
//            Container(
//              padding: EdgeInsets.fromLTRB(20, 0, 20, 0),
//              child: Text("${widget.desctiption}",style: TextStyle(fontWeight: FontWeight.bold,),textAlign: TextAlign.center),
//            ),
//            Row(
//              crossAxisAlignment: CrossAxisAlignment.start,
//              children: [
//                Container(
//                  padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
//                  width: MediaQuery.of(context).size.width/2,
//                  child: Column(
//                    mainAxisAlignment: MainAxisAlignment.start,
//                    children: [
//                      Text("Retailer: ${widget.retailer}",style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,),textAlign: TextAlign.left,),
//                      widget.Availabilitytext,
//                    ],
//                  ),
//                ),
//                Container(
//                  padding: EdgeInsets.fromLTRB(10, 20, 10, 0),
//                  width: MediaQuery.of(context).size.width/2,
//                  child: Column(
//                    children: [
//                      Text("R${widget.price}",style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold,color: Colors.green)),
//                    ],
//                  ),
//                ),
//              ],
//            ),
//          ],
//        )
//      ),
//      bottomSheet: ,

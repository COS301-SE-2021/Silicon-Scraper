import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/widgets/productWidget.dart';

class Explore extends StatefulWidget {

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  @override
  _ExploreState createState() => _ExploreState();
}

class _ExploreState extends State<Explore> {
  Product item=new Product("Gigabyte GeForce RTX 3090 ","GAMING OC 24GB GDDR6X Gaming Graphics Card",43999.0,"evetech","0496 Cuda Core / 3‎84-bit Memory Interface / Boost Clock : 1755MHz / WINDFORCE 3X Cooling System / Protection Metal Back Plate / NVIDIA Ampere Streaming Multiprocessors / SC-G3090-GO + FREE DELIVERY !","https://www.evetech.co.za/gigabyte-rtx-3090-gaming-oc-24gb-graphics-card/best-deal/10547.aspx","https://www.evetech.co.za/repository/ProductImages/gigabyte-rtx-3090-gaming-oc-24gb-graphics-card-330px-v1.jpg","available");

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Center(child: Text("Explore",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 25),)),
//        backgroundColor:Color(0xff0E3854) ,
      backgroundColor: Colors.red[800],
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: ListView(
        children: [
          ProductWidget(item: item,),
//        ProductDetailWidget(item)
        ],
          ),
      ),
       // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

import 'package:flutter/material.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/services/watchListService.dart';

class WatchList extends StatefulWidget {
  @override
  _WatchListState createState() => _WatchListState();
}

class _WatchListState extends State<WatchList> {
  WatchListSingleton watch= WatchListSingleton.getState();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Center(child: Text("Watch List",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 25),)),
//        backgroundColor:Color(0xff0E3854) ,
        backgroundColor: Colors.red[800],
      ),
      body: Container(
      child: FutureBuilder(
      future: watch.getProductlist(),
      builder: (BuildContext context,AsyncSnapshot snapshot){
        if(snapshot.connectionState==ConnectionState.none)
        {
        return Center(child: CircularProgressIndicator());
        }
        else if(snapshot.data!=null)
        {
        return ProductListView(context, snapshot.data);
        }
        else
        {
        return Center(child: CircularProgressIndicator());
        }
    },
      ),
      ),
    );
  }
}

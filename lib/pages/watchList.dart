import 'package:flutter/material.dart';

class WatchList extends StatefulWidget {
  @override
  _WatchListState createState() => _WatchListState();
}

class _WatchListState extends State<WatchList> {
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

      ),
    );
  }
}

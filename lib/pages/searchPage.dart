import 'package:flutter/material.dart';

class SearchPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Center(child: Text("Search page",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 25),)),
//        backgroundColor:Color(0xff0E3854) ,
        backgroundColor: Colors.red[800],
      ),
    );
  }
}

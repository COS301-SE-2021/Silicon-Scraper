import 'package:flutter/material.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';

class WatchList extends StatefulWidget
{
  @override
  _WatchListState createState() => _WatchListState();
}

class _WatchListState extends State<WatchList>
{
  WatchListViewModelSingleton watch= WatchListViewModelSingleton.getState();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Center(child: Text("Watch List",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 25),)),
//        backgroundColor:Color(0xff0E3854) ,
        actions: <Widget>[
     Padding(
      padding: EdgeInsets.only(right: 20.0),
        child: GestureDetector(
          onTap: () {setState(() {
          }); },
          child: Icon(
            Icons.loop_sharp,
            size: 26.0,
          ),
        )
    ),],
      ),
    bottomNavigationBar: BottomAppBar(

    ),
      body: Container(
      child: FutureBuilder(
      future: watch.setInitialProducts(true),
      builder: (BuildContext context,AsyncSnapshot snapshot){
        if(snapshot.connectionState==ConnectionState.none)
        {
        return Center(child: CircularProgressIndicator());
        }
        else if(watch.items.isNotEmpty)
        {
          return watch.horizontalProductListView(context, watch.items);
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

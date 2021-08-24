import 'package:flutter/material.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';
import 'package:provider/provider.dart';

class WatchList extends StatefulWidget
{
  @override
  _WatchListState createState() => _WatchListState();
}

class _WatchListState extends State<WatchList>
{
//  WatchListViewModelSingleton watch= WatchListViewModelSingleton.getState();


  @override
  Widget build(BuildContext context) {
    WatchListViewModel watch=Provider.of<WatchListViewModel>(context);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(35.0),
        child: AppBar(
          // Here we take the value from the MyHomePage object that was created by
          // the App.build method, and use it to set our appbar title.
          title: Container(
//              padding: EdgeInsets.only(bottom:15) ,
              child: Text("Watch List",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 25),)
          ),
          centerTitle: true,
        ),
      ),
    bottomNavigationBar: BottomAppBar(

    ),
//      body: Consumer<WatchListViewModel>(
//        builder: (BuildContext context,WatchListViewModel w, Widget child)
//        {
//          return w.floatingProductListView(context, w.items);
//        },
    body: watch.floatingProductListView(context, watch.items),
//        child: Container(
//        child: FutureBuilder(
//        future: watch.setInitialProducts(),
//        builder: (BuildContext context,AsyncSnapshot snapshot){
//          if(snapshot.connectionState==ConnectionState.none)
//          {
//          return Center(child: CircularProgressIndicator());
//          }
//          else if(watch.items.isNotEmpty)
//          {
//           return watch.floatingProductListView(context, watch.items);
//          }
//          else
//          {
//            return Center(child: CircularProgressIndicator());
//          }
//    },
//        ),
//        ),
//      ),
    );
  }
}

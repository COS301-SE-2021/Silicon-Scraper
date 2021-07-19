import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:silicon_scraper/services/explorePageService.dart';
import 'package:silicon_scraper/services/getProducts.dart';
//import 'package:silicon_scraper/pages/searchPage.dart'; //add search functionality

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
  ExplorePageSingleton explore = ExplorePageSingleton.getState();

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
          title: Text(
            "Explore",
            style: TextStyle(
                color: Colors.white, fontWeight: FontWeight.bold, fontSize: 25),
          ),
          centerTitle: true,
//        backgroundColor:Color(0xff0E3854) ,

          ///add search functionality
          //   actions: [
          //     IconButton(
          //       icon: Icon(Icons.search),
          //       color: Colors.black,
          //       onPressed: () async {
          //         showSearch(context: context, delegate: ProductSearch());
          //       },
          //     )
          //   ],
        ),
        body: SingleChildScrollView(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
              /// recommended for you (maybe 'watchlist' items ?)
                  ///
                Container(
                    width: MediaQuery.of(context).size.width,
                    //height: MediaQuery.of(context).size.height / 39,
                    margin: EdgeInsets.fromLTRB(20, 5, 0, 0),
                    child: Text("CPUs", textAlign: TextAlign.left,style: TextStyle(
                        fontSize: 26, color: Colors.black, fontWeight: FontWeight.bold),),
                  ),
              Container(
                margin: EdgeInsets.only(left: 20, top: 10),
                decoration: BoxDecoration(color: Colors.white),
                height: MediaQuery.of(context).size.height / 4,
                child: FutureBuilder(
                  future: explore.setItems(),
                  builder: (BuildContext context, AsyncSnapshot snapshot) {
                    if (snapshot.connectionState == ConnectionState.none) {
                      return Center(child: CircularProgressIndicator());
                    } else if (snapshot.data != null) {
                      return productHorizontalListView(context, snapshot.data);
                    } else {
                      return Center(child: CircularProgressIndicator());
                    }
                  },
                ),
              ),

              /// explore all products clickable picture
              Container(
                  margin: EdgeInsets.all(20),
                  child: InkWell(
                    onTap: tappedImage,
                    child: Image.asset(
                      'assets/images/explorePagePicture.jpg',
                      width: MediaQuery.of(context).size.width,
                      fit: BoxFit.cover,
                    ),
                  )),
                  Container(
                    width: MediaQuery.of(context).size.width,
                    //height: MediaQuery.of(context).size.height / 39,
                    margin: EdgeInsets.fromLTRB(20, 5, 0, 10),
                    child: Text("GPUs", textAlign: TextAlign.left,style: TextStyle(
                        fontSize: 26, color: Colors.black, fontWeight: FontWeight.bold),),
                  ),
              /// cpus
              Container(
                margin: EdgeInsets.only(left: 20),
                decoration: BoxDecoration(color: Colors.white),
                height: MediaQuery.of(context).size.height / 4,
                child: FutureBuilder(
                  future: explore.setItems(),
                  builder: (BuildContext context, AsyncSnapshot snapshot) {
                    if (snapshot.connectionState == ConnectionState.none) {
                      return Center(child: CircularProgressIndicator());
                    } else if (snapshot.data != null) {
                      return productHorizontalListView(context, snapshot.data);
                    } else {
                      return Center(child: CircularProgressIndicator());
                    }
                  },
                ),
              ),
            ]) // This trailing comma makes auto-formatting nicer for build methods.
            ));
  }
}

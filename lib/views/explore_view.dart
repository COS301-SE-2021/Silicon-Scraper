import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/explore_page_service.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/view_models/explore_detail_view_model.dart';
import 'file:///C:/Users/louis/AndroidStudioProjects/silicon_scraper/lib/views/widgets/explore_detail_widget.dart';
//import 'package:silicon_scraper/pages/searchPage.dart'; //add search functionality

class Explore extends StatefulWidget {

  @override
  _ExploreState createState() => _ExploreState();
}

class _ExploreState extends State<Explore> {
  ExplorePageSingleton explore = ExplorePageSingleton.getState();
  ExplorePageViewModelSingleton exploreDetail = ExplorePageViewModelSingleton.getState();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
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
              /// CPUs
              Container(
                  width: MediaQuery.of(context).size.width,
                  //height: MediaQuery.of(context).size.height / 39,
                  margin: EdgeInsets.fromLTRB(20, 5, 20, 0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "CPUs",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                            fontSize: 26,
                            color: Colors.black,
                            fontWeight: FontWeight.bold),
                      ),
                      RichText(
                        textAlign: TextAlign.right,
                        text: TextSpan(
                            text: 'show all',
                            recognizer: TapGestureRecognizer()
                              ..onTap = () {
                                Navigator.push(context, MaterialPageRoute(
                                    builder: (context) => ExploreDetailWidget("cpu")));
                              },
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.blue,
                            )),
                      ),
                    ],
                  )),
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
                      List<Product> products = exploreDetail.getExplorePageProducts(snapshot.data, "cpu");
                      if (products.isNotEmpty) {
                        return productHorizontalListView(context, products);
                      }
                      else {
                        return noProducts(context, "CPUs");
                      }
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
                    onTap: () {
                      Navigator.push(context, MaterialPageRoute(
                          builder: (context) => ExploreDetailWidget("all")));
                    },
                    child: Image.asset(
                      'assets/images/explorePagePicture.jpg',
                      width: MediaQuery.of(context).size.width,
                      fit: BoxFit.cover,
                    ),
                  )),

              /// GPUs
              Container(
                  width: MediaQuery.of(context).size.width,
                  //height: MediaQuery.of(context).size.height / 39,
                  margin: EdgeInsets.fromLTRB(20, 5, 20, 0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "GPUs",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                            fontSize: 26,
                            color: Colors.black,
                            fontWeight: FontWeight.bold),
                      ),
                      RichText(
                        textAlign: TextAlign.right,
                        text: TextSpan(
                            text: 'show all',
                            recognizer: TapGestureRecognizer()
                              ..onTap = () {
                                Navigator.push(context, MaterialPageRoute(
                                    builder: (context) => ExploreDetailWidget("gpu")));
                              },
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.blue,
                            )),
                      ),
                    ],
                  )),
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
                      List<Product> products = exploreDetail.getExplorePageProducts(snapshot.data, "gpu");
                      if (products.isNotEmpty) {
                        return productHorizontalListView(context, products);
                      }
                      else {
                        return noProducts(context, "GPUs");
                      }
                    } else {
                      return Center(child: CircularProgressIndicator());
                    }
                  },
                ),
              ),
            ])
            ));
  }
}

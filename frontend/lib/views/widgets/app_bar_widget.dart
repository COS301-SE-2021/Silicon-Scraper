import 'package:flutter/material.dart';
import '../search_view.dart';

Widget appbar(BuildContext context, String page, int depth) {
  String title = "";
  String subtitle = "";
  if(page.compareTo("cpu") == 0){
    title = "CPUs";
  }
  else if(page.compareTo("gpu") == 0){
    title = "GPUs";
  }
  else if(page.compareTo("productDetail") == 0){
    title = "Product Detail";
  }
  else if(page.compareTo("explore") == 0){
    title = "EXPLORE";
    subtitle = "ALL PRODUCTS";
  }
  else if (page.compareTo("watchlist") == 0){
    title = "WATCH LIST";
    subtitle = "";
  }
  else if(page.compareTo("discover") == 0){
    title = "DISCOVER";
    subtitle = "RECOMMENDED PRODUCTS";
  }

  // String heightPadding = Size.fromHeight(MediaQuery.of(context).size.height / 10).toString();
  // double topMarginForTitle = double.parse(heightPadding);
  // print(topMarginForTitle);
  if (depth == 2){
    return PreferredSize(
        preferredSize: Size.fromHeight(MediaQuery.of(context).size.height / 10),
        child: AppBar(
          iconTheme: IconThemeData(color: Colors.black),
            backgroundColor: Color(0xffffb359),
            elevation: 0,
            automaticallyImplyLeading: true,
            flexibleSpace: Container(
                margin: EdgeInsets.only(top: kToolbarHeight/2),
              height: MediaQuery.of(context).size.height / 10,
              width: MediaQuery.of(context).size.width,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment(0.0, 1.0),
                  colors: <Color>[ Color(0xe6ffb359),
                    Color(0xffffffff)],
                  tileMode: TileMode.clamp,
                ),
              ),

              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ///title
                  Container(
                    margin: EdgeInsets.only(left: 45, bottom: kToolbarHeight/2),
                    width: MediaQuery.of(context).size.width / 1.6,
                    alignment: Alignment.centerLeft,
                    child: Text(
                      title,
                      textAlign: TextAlign.left,
                      maxLines: 1,
                      overflow: TextOverflow.fade,
                      style: TextStyle(
                          fontSize: 28,
                          color: Colors.black,
                          fontWeight: FontWeight.bold, letterSpacing: 0),
                    ),
                  ),
                  ///search icon
                  IconButton(
                    padding: EdgeInsets.only(right: 20),
                    icon: Icon(Icons.search),
                    onPressed: () async {
                      showSearch(context: context, delegate: ProductSearch());
                    },
                  ),
                ],
              ),
            )));
  }


  return PreferredSize(
      preferredSize: Size.fromHeight(MediaQuery.of(context).size.height / 5),
      child: AppBar(
        elevation: 0,
          flexibleSpace: Container(
        margin: EdgeInsets.only(top: kToolbarHeight),
        height: MediaQuery.of(context).size.height / 5,
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment(0.0, 1.0),
            colors: <Color>[ Color(0xffffb359),
              Color(0xffffffff)],
            tileMode: TileMode.clamp,
          ),
        ),

            child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ///title
                Container(
                  margin: EdgeInsets.only(left: 10, top: 0),
                  width: MediaQuery.of(context).size.width / 1.6,
                  child: Text(
                    title,
                    textAlign: TextAlign.left,
                    maxLines: 1,
                    overflow: TextOverflow.fade,
                    style: TextStyle(
                        fontSize: 30,
                        color: Colors.black,
                        fontWeight: FontWeight.bold, letterSpacing: 2),
                  ),
                ),

                ///subtitle
                Container(
                  margin: EdgeInsets.only(left: 10),
                  width: MediaQuery.of(context).size.width / 1.6,
                  child: Text(
                    subtitle,
                    textAlign: TextAlign.left,
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black),
                  ),
                ),

                ///clickable search container
                Container(
                  width: MediaQuery.of(context).size.width / 1.8,
                  height: MediaQuery.of(context).size.height/ 18,
                  margin: EdgeInsets.only(left: 10, bottom: 10),
                  decoration: BoxDecoration(
                    color: Color.fromARGB(57, 255, 255, 255),
                  ),
                  child: InkWell(
                      onTap: () {
                        showSearch(context: context, delegate: ProductSearch());
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Text("  ",
                              textAlign: TextAlign.left,
                              style: TextStyle(
                                fontSize: 16,
                              )),
                          Icon(
                            Icons.search,
                            color: Color.fromARGB(100, 0, 0, 0),
                          ),
                          Text(" Search...",
                              textAlign: TextAlign.left,
                              style: TextStyle(
                                fontSize: 17,
                                color: Color.fromARGB(100, 0, 0, 0),
                              ))
                        ],
                      )),
                )
              ],
            ),

            ///image
            Container(
              child: Image.asset(
                'assets/images/transparent_logo.png',
                width: MediaQuery.of(context).size.width / 3.5,
                fit: BoxFit.cover,
              ),
            )
          ],
        ),
      )));
}

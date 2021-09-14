import 'package:flutter/material.dart';

import '../search_view.dart';

Widget appbar(BuildContext context, String page) {

  String title = "";
  String subtitle = "";
  if(page.compareTo("explore") == 0){
    title = "EXPLORE";
    subtitle = "ALL PRODUCTS";
  }
  else if (page.compareTo("watchlist") == 0){
    title = "WATCH LIST";
    subtitle = "";
  }
  else if(page.compareTo("discover") == 0){
    title = "RECOMMENDATIONS";
    subtitle = "";
  }

  return PreferredSize(
      preferredSize: Size.fromHeight(MediaQuery.of(context).size.height / 5),
      child: AppBar(
          flexibleSpace: Container(
        margin: EdgeInsets.only(top: 20),
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
                  margin: EdgeInsets.only(left: 10, top: 20),
                  width: MediaQuery.of(context).size.width / 2.2,
                  child: Text(
                    title,
                    textAlign: TextAlign.left,
                    style: TextStyle(
                        fontSize: 30,
                        color: Colors.black,
                        fontWeight: FontWeight.bold, letterSpacing: 3),
                  ),
                ),

                ///subtitle
                Container(
                  margin: EdgeInsets.only(left: 10),
                  width: MediaQuery.of(context).size.width / 2.2,
                  child: Text(
                    subtitle,
                    textAlign: TextAlign.left,
                    style: TextStyle(fontSize: 16, color: Colors.black),
                  ),
                ),

                ///clickable search container
                Container(
                  width: MediaQuery.of(context).size.width / 1.8,
                  height: MediaQuery.of(context).size.height/ 15,
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
                width: MediaQuery.of(context).size.width / 2.5,
                fit: BoxFit.cover,
              ),
            )
          ],
        ),
      )));
}

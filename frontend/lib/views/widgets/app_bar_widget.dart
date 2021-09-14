import 'package:flutter/material.dart';

import '../search_view.dart';

Widget appbar(BuildContext context, String title) {
  return PreferredSize(
      preferredSize: Size.fromHeight(MediaQuery.of(context).size.height / 5),
      child: AppBar(
          flexibleSpace: Container(
        margin: EdgeInsets.only(top: 20),
        height: MediaQuery.of(context).size.height / 5,
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
          color: Colors.white,
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
                  margin: EdgeInsets.only(top: 20),
                  width: MediaQuery.of(context).size.width / 2.2,
                  child: Text(
                    "Title",
                    textAlign: TextAlign.left,
                    style: TextStyle(
                        fontSize: 26,
                        color: Colors.black,
                        fontWeight: FontWeight.bold),
                  ),
                ),

                ///subtitle
                Container(
                  width: MediaQuery.of(context).size.width / 2.2,
                  child: Text(
                    "Subtitle",
                    textAlign: TextAlign.left,
                    style: TextStyle(fontSize: 16, color: Colors.black),
                  ),
                ),

                ///clickable search container
                Container(
                  width: MediaQuery.of(context).size.width / 2.2,
                  margin: EdgeInsets.fromLTRB(5, 5, 0, 0),
                  child: InkWell(
                      onTap: () {
                        showSearch(context: context, delegate: ProductSearch());
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Icon(
                            Icons.search,
                            color: Color.fromARGB(90, 0, 0, 0),
                          ),
                          Text("Search",
                              textAlign: TextAlign.left,
                              style: TextStyle(
                                fontSize: 14,
                                color: Color.fromARGB(90, 0, 0, 0),
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
                width: MediaQuery.of(context).size.width / 2,
                fit: BoxFit.cover,
              ),
            )
          ],
        ),
      )));
}

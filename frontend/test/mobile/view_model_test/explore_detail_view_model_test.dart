import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/view_models/explore_detail_view_model.dart';

void main(){
  ExplorePageViewModelSingleton explore = ExplorePageViewModelSingleton.getState();

  group("testing explore page view model", (){
    group("test explore detail get title", (){
      test("test for cpu product type", (){
        expect(explore.getTitle("cpu"), "CPUs");
      });
      test("test for gpu product type", (){
        expect(explore.getTitle("gpu"), "GPUs");
      });
      test("test for any other product type", () {
        expect(explore.getTitle("blah blah"), "Products");
      });
    });
    // group("testing function to get explore page products", () {
    //   testWidgets("should return a listview",
    //           (WidgetTester tester) async {
    //         await tester.pumpWidget(
    //             StatefulBuilder(
    //                 builder: (BuildContext context, StateSetter setState) {
    //                   return MaterialApp(
    //                       home: Material(
    //                       child: Scaffold(
    //                         body: SingleChildScrollView (
    //                           child: Column (
    //                             children: [
    //                               Container(
    //                                 child: explore.getExplorePageProducts("all", false),
    //                               )
    //                             ],
    //                           )
    //                         ))));
    //                 }));
    //         expect(find.byType(ListView), findsOneWidget);
    //       });
    //   });
    });
}

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/view_models/product_view_model.dart';
import 'package:silicon_scraper/views/widgets/product_detail_widget.dart';
import 'package:silicon_scraper/mocks/json/productsjson.dart';


void main() {
  var data = JSONData();
  Product item=new Product.fromJson(data[0]);
  group("test ProductDetail widget", () {
    testWidgets('should properly mock Image.network and not crash',
          (WidgetTester tester) async {
        await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(ProductViewModel(item)))));
      },
    );
    testWidgets("finds brand and model text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(ProductViewModel(item)))));
      final titleFinder = find.text(data[0]['brand']+" "+data[0]['model']);
      expect(titleFinder, findsOneWidget);
    });
//    testWidgets("find model text on widget", (WidgetTester tester) async {
//      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
//      final titleFinder = find.text(data[0]['model']);
//      expect(titleFinder, findsOneWidget);
//    });
    testWidgets("finds retailer text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget( ProductViewModel(item)))));
      await tester.pumpAndSettle();
//      state.item.retailer[0].toUpperCase()}${state.item.retailer.substring(1)
      final titleFinder = find.text(data[0]['retailer'][0].toUpperCase()+data[0]['retailer'].substring(1));
      expect(titleFinder, findsOneWidget);
    });
    testWidgets("finds availability text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(ProductViewModel(item)))));
      final titleFinder = find.text('Out of Stock');
      expect(titleFinder, findsOneWidget);
    });
    testWidgets("finds price text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(ProductViewModel(item)))));
      final titleFinder = find.text('R '+data[0]['price'].toStringAsFixed(2));
      expect(titleFinder, findsOneWidget);
    });
//    testWidgets("finds detail text on widget", (WidgetTester tester) async {
//      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
//      final titleFinder = find.text(data[0]['description']);
//      expect(titleFinder, findsOneWidget);
//    });
   ///*
    ///* can't test url launcher within flutter because it is handled by the operating system and not flutter
    ///**
  });
}
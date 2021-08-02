import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/views/widgets/product_detail_widget.dart';
import 'package:silicon_scraper/mocks/json/productsjson.dart';


void main() {
  var data = JSONData();
  Product item=new Product(data[0]['brand'], data[0]['model'], data[0]['price'], data[0]['retailer'], data[0]['description'], data[0]['url'], data[0]['image'], data[0]['availability'],data[0]['id'],data[0]['type'],data[0]['watch']);
  group("test ProductDetail widget", () {
    testWidgets('should properly mock Image.network and not crash',
          (WidgetTester tester) async {
        await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
      },
    );
    testWidgets("finds brand and model text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
      final titleFinder = find.text(data[0]['brand']+" "+data[0]['model']);
      expect(titleFinder, findsOneWidget);
    });
//    testWidgets("find model text on widget", (WidgetTester tester) async {
//      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
//      final titleFinder = find.text(data[0]['model']);
//      expect(titleFinder, findsOneWidget);
//    });
    testWidgets("finds retailer text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
      await tester.pumpAndSettle();
      final titleFinder = find.text("Retailer: "+data[0]['retailer']);
      expect(titleFinder, findsOneWidget);
    });
    testWidgets("finds availability text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
      final titleFinder = find.text(item.getAvailability());
      expect(titleFinder, findsOneWidget);
    });
    testWidgets("finds price text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
      final titleFinder = find.text('R '+data[0]['price'].toStringAsFixed(2));
      expect(titleFinder, findsOneWidget);
    });
//    testWidgets("finds detail text on widget", (WidgetTester tester) async {
//      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
//      final titleFinder = find.text(data[0]['description']);
//      expect(titleFinder, findsOneWidget);
//    });
    /**
     * can't test url launcher within flutter because it is handled by the operating system and not flutter
     ***/
  });
}
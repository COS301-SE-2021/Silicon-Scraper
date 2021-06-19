import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/widgets/productDetailWidget.dart';
import 'mocks/json/productsjson.dart';

void main() {
  var data = JSONData();
  Product item=new Product(data[0]['brand'], data[0]['model'], data[0]['price'], data[0]['retailer'], data[0]['description'], data[0]['url'], data[0]['image'], data[0]['availability']);
  group("test ProductDetail widget", () {
    testWidgets('should properly mock Image.network and not crash',
          (WidgetTester tester) async {
        await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
      },
    );
    testWidgets("finds brand text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
      final titleFinder = find.text(data[0]['brand']);
      expect(titleFinder, findsOneWidget);
    });
    testWidgets("find model text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
      final titleFinder = find.text(data[0]['model']);
      expect(titleFinder, findsOneWidget);
    });
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
      final titleFinder = find.text('R'+data[0]['price'].toString());
      expect(titleFinder, findsOneWidget);
    });
    testWidgets("finds detail text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductDetailWidget(item))));
      final titleFinder = find.text(data[0]['description']);
      expect(titleFinder, findsOneWidget);
    });
    /**
     * can't test url launcher within flutter because it is handled by the operating system and not flutter
     * **/
  });
}
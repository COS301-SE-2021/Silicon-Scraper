import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/widgets/productWidget.dart';
import 'mocks/json/productsjson.dart';


void main() {
  var data = JSONData();
  Product item=new Product(data[0]['brand'], data[0]['model'], data[0]['price'], data[0]['retailer'], data[0]['description'], data[0]['url'], data[0]['image'], data[0]['availability']);
  group("test Product widget", () {
    testWidgets(
      'should properly mock Image.network and not crash',
          (WidgetTester tester) async {
        mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductWidget(item:item))));
      },
    );

    testWidgets("finds brand text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductWidget(item:item))));
      final titleFinder = find.text(data[0]['brand']);
      expect(titleFinder, findsOneWidget);
    });
//  todo  model not added yet
//    testWidgets("find model text on widget", (WidgetTester tester) async {
//      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductWidget(item:item))));
//      final titleFinder = find.text(data[0]['model']);
//      expect(titleFinder, findsOneWidget);
//    });
  testWidgets("finds retailer text on widget", (WidgetTester tester) async {
   await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductWidget(item:item))));
    final titleFinder = find.text(data[0]['retailer']);
    expect(titleFinder, findsOneWidget);
  });
  testWidgets("finds availability text on widget", (WidgetTester tester) async {
    await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductWidget(item:item))));
    final titleFinder = find.text(item.getAvailability());
    expect(titleFinder, findsOneWidget);
  });
  testWidgets("finds price text on widget", (WidgetTester tester) async {
    await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductWidget(item:item))));
    final titleFinder = find.text('R'+data[0]['price'].toString());
    expect(titleFinder, findsOneWidget);
  });

  testWidgets("test on tap returns ProductDetail widget", (WidgetTester tester) async {
    await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductWidget(item:item))));
    await tester.tap(find.byType(InkWell));

    // Rebuild the widget after the state has changed.
    await tester.pumpAndSettle();
    final text=find.text('Product detail');
    expect(text, findsOneWidget);
  });
  });
}
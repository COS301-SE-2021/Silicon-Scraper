import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:network_image_mock/network_image_mock.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/view_models/product_view_model.dart';
import 'package:silicon_scraper/views/widgets/horizontal_product_widget.dart';
import 'package:silicon_scraper/mocks/json/productsjson.dart';



void main() {
  var data = JSONData();
  Product item=new Product.fromJson(data[0]);
  group("test Product widget", () {
    testWidgets(
      'should properly mock Image.network and not crash',
          (WidgetTester tester) async {
        mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:HorizontalProductWidget(state: ProductViewModel(item)))));
      },
    );

    testWidgets("finds brand text on widget", (WidgetTester tester) async {
      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:HorizontalProductWidget(state: ProductViewModel(item)))));
      final titleFinder = find.text(data[0]['brand']+" "+data[0]['model']);
      expect(titleFinder, findsOneWidget);
    });
//  todo  model not added yet
//    testWidgets("find model text on widget", (WidgetTester tester) async {
//      await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductWidget(item:item))));
//      final titleFinder = find.text(data[0]['model']);
//      expect(titleFinder, findsOneWidget);
//    });
//  testWidgets("finds retailer text on widget", (WidgetTester tester) async {
//   await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:HorizontalProductWidget(state: ProductViewModel(item)))));
//    final titleFinder = find.text(data[0]['retailer']);
//    expect(titleFinder, findsOneWidget);
//  });
//  testWidgets("finds availability text on widget", (WidgetTester tester) async {
//    await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:HorizontalProductWidget(state: ProductViewModel(item)))));
//    final titleFinder = find.text(item.getAvailability());
//    expect(titleFinder, findsOneWidget);
//  });
//  testWidgets("finds price text on widget", (WidgetTester tester) async {
//    await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:HorizontalProductWidget(state: ProductViewModel(item)))));
//    final titleFinder = find.text('R'+data[0]['price'].toString());
//    expect(titleFinder, findsOneWidget);
//  });
//
//  testWidgets("test on tap returns ProductDetail widget", (WidgetTester tester) async {
//    await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:HorizontalProductWidget(state: ProductViewModel(item)))));
//    await tester.tap(find.byType(InkWell));
//
//    // Rebuild the widget after the state has changed.
//    await tester.pumpAndSettle();
//    final text=find.text('Product detail');
//    expect(text, findsOneWidget);
//  });
  });
}
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:image_test_utils/image_test_utils.dart';
import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/widgets/productWidget.dart';

void main() {
  testWidgets('Counter increments smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    Product item=new Product("Gigabyte GeForce RTX 3090 GAMING OC 24GB GDDR6X Gaming Graphics Card","model xxfgrfghd",43999.0,"evetech","0496 Cuda Core / 3‎84-bit Memory Interface / Boost Clock : 1755MHz / WINDFORCE 3X Cooling System / Protection Metal Back Plate / NVIDIA Ampere Streaming Multiprocessors / SC-G3090-GO + FREE DELIVERY !","",'https://example.com/image.png',"available");
    provideMockedNetworkImages(() async {
      /// Now we can pump NetworkImages without crashing our tests. Yay!
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: Center(
              // Center is a layout widget. It takes a single child and positions it
              // in the middle of the parent.
              child: ProductWidget(item: item),
            ),
          ),
          // This trailing comma makes auto-formatting nicer for build methods.
        ),
      );
    });



    // Verify that our counter starts at 0.
    expect(find.text('Gigabyte GeForce RTX 3090 GAMING OC 24GB GDDR6X Gaming Graphics Card'), findsOneWidget);
    expect(find.text('model'), findsNothing);

    // Tap the '+' icon and trigger a frame.
//    await tester.tap(find.byIcon(Icons.add));
//    await tester.pump();

//    // Verify that our counter has incremented.
//    expect(find.text('0'), findsNothing);
//    expect(find.text('1'), findsOneWidget);
  });
}

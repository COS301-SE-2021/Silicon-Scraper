import 'package:flutter_test/flutter_test.dart';
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
    // group("test explore detail no product error message", () {
    //   testWidgets("test for no cpus", (WidgetTester tester) async {
    //     await mockNetworkImagesFor(() => tester.pumpWidget(MaterialApp( home:ProductWidget(item:item))));
    //   });
    // });
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

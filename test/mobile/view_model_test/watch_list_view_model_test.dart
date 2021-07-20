import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/injectors/dependency_types.dart';
import 'package:silicon_scraper/injectors/watch_list_service_injector.dart';
import 'package:silicon_scraper/mocks/json/productsjson.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';

void main()
{
  WatchListInjector.configure(DependencyType.MOCK);
  WatchListViewModel wlvm;

  group("watch list view model test", (){
    setUp((){
      wlvm=WatchListViewModel();
    });

      test('test if dependency is mocked should pass', ()async
      {
        // if dependency not mocked will throw exception
        await wlvm.setInitialProducts();
      });

      test('test if setInitialProducts call service', ()async{
        await wlvm.setInitialProducts();
        expect(wlvm.items.length, 7);
      });


    group("test findProduct with data",(){
      setUp(()async{
        await wlvm.setInitialProducts();
      });

      test('test findProduct at index 0 returns true', (){
        expect(wlvm.findProduct(wlvm.items.first), true);
      });

      test('test findProduct at index 6 returns true', (){
        expect(wlvm.findProduct(wlvm.items.last), true);
      });

      test('test findProduct at index 6 returns true', (){
        expect(wlvm.findProduct(wlvm.items.elementAt(3)), true);
      });
      test('test 1', (){
        Product p=Product.fromJson(JSONData()[6]);
        expect(wlvm.findProduct(p),true);
      });
      test('test 1', (){

      });
    });

    test('test 1', (){});
    test('test 1', (){});
    test('test 1', (){});
    test('test 1', (){});
    test('test 1', (){});


//use identical to test singletons







  });
}
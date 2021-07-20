import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/injectors/dependency_types.dart';
import 'package:silicon_scraper/injectors/watch_list_service_injector.dart';
import 'package:silicon_scraper/mocks/json/productsjson.dart';
import 'package:silicon_scraper/mocks/mock_watch_list_service.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';
@TestOn('vm')
void main()
{
  WatchListInjector.configure(DependencyType.MOCK);
  WatchListViewModel wlvm;

  group("watch list view model test when all services complete successfully", (){
    setUp((){
      wlvm=WatchListViewModel();
    });

      test('test if dependency is mocked should pass', ()async {
        // if dependency not mocked will throw exception
        expect(()async{await wlvm.setInitialProducts();}, returnsNormally);
      });

      test('test if setInitialProducts calls service', ()async{
        await wlvm.setInitialProducts();
        expect(wlvm.items.length, 7);
      });


    group("test findProduct with data",(){
      setUp(()async{
        await wlvm.setInitialProducts();
      });

      test('findProduct at index 0 (lower limit) returns true', (){
        expect(wlvm.findProduct(wlvm.items.first), true);
      });

      test('findProduct at index 6 (upper limit) returns true', (){
        expect(wlvm.findProduct(wlvm.items.last), true);
      });

      test('findProduct at index 3 (middle) returns true', (){
        expect(wlvm.findProduct(wlvm.items.elementAt(3)), true);
      });

      test('findProduct that is not the same object but with the same attributes returns false', (){
        Product p=Product.fromJson(JSONData()[0]);
        expect(wlvm.findProduct(p),false);
      });

    });

    group("test removeItem when service completes successfully", (){

      setUp(()async{
        await wlvm.setInitialProducts();
      });

      test('remove item of the same object returns true', ()async{
        expect(await wlvm.removeItem(wlvm.items.first), true);
      });

      test('remove item of the same object items size should be 6', ()async{
        await wlvm.removeItem(wlvm.items.first);
        expect(wlvm.items.length, 6);
      });

      test('remove item of the same attributes should throw exception', ()async{
        Product p=Product.fromJson(JSONData()[0]);

        expect(()async=>
        {
        await wlvm.removeItem(p)
        },
            throwsA(predicate((e) => e.message == "can't remove a product that is not in your watch list"))
        );

      });

      test('remove item of the same attributes items size should be 7', ()async{
        Product p=Product.fromJson(JSONData()[0]);
        try
        {
          await wlvm.removeItem(p);
        }
        catch(e)
        {

        }
        expect(wlvm.items.length, 7);
      });

    });

    group("test removeItem when service completes unsuccessfully",(){

      WatchListInjector.configure(DependencyType.MOCK,removeReq: false);

      setUp(()async{
        await wlvm.setInitialProducts();
      });

      test('remove item of the same object returns true', ()async{
        expect(await wlvm.removeItem(wlvm.items.first), true);
      });

      test('remove item of the same object items size should be 6', ()async{
        await wlvm.removeItem(wlvm.items.first);
        expect(wlvm.items.length, 6);
      });

      test('remove item of the same attributes should throw exception', ()async{
        Product p=Product.fromJson(JSONData()[0]);

        expect(()async=>
        {
          await wlvm.removeItem(p)
        },
            throwsA(predicate((e) => e.message == "can't remove a product that is not in your watch list"))
        );
      });

      test('remove item of the same attributes items size should be 7', ()async{
        Product p=Product.fromJson(JSONData()[0]);
        try
        {
          await wlvm.removeItem(p);
        }
        catch(e)
        {

        }
        expect(wlvm.items.length, 7);
      });
    });
    test('test 1', (){});
    test('test 1', (){});
    test('test 1', (){});
    test('test 1', (){});


//use identical to test singletons







  });
}
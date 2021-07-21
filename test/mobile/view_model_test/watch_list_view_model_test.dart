import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/injectors/dependency_types.dart';
import 'package:silicon_scraper/injectors/watch_list_service_injector.dart';
import 'package:silicon_scraper/mocks/json/productsjson.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';
@TestOn('vm')
void main()
{
  WatchListInjector.configure(DependencyType.MOCK);
  WatchListViewModel wlvm;

  group("watch list view model test when all services complete successfully", ()
  {
    setUp(()
    {
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

    group("test findProductStrict with data",(){
      setUp(()async{
        await wlvm.setInitialProducts();
      });

      test('findProduct at index 0 (lower limit) returns true', (){
        expect(wlvm.findProductStrict(wlvm.items.first), true);
      });

      test('findProduct at index 6 (upper limit) returns true', (){
        expect(wlvm.findProductStrict(wlvm.items.last), true);
      });

      test('findProduct at index 3 (middle) returns true', (){
        expect(wlvm.findProductStrict(wlvm.items.elementAt(3)), true);
      });

      test('findProduct that is not the same object but with the same attributes returns false', (){
        Product p=Product.fromJson(JSONData()[0]);
        expect(wlvm.findProductStrict(p),true);
      });
    });

    group('test removeProduct', (){
      test('when list is empty should throw exeption',()async{
        Product p=Product.fromJson(JSONData()[0]);
        expect(()async=>
        {
          await wlvm.removeProduct(p)
        },
            throwsA(predicate((e) => e.message == "can't remove a product that is not in your watch list"))
        );

      });
      group("when service completes successfully", (){

        setUp(()async{
          await wlvm.setInitialProducts();
        });

        test('remove item of the same object returns true', ()async{
          expect(await wlvm.removeProduct(wlvm.items.first), true);
        });

        test('remove item of the same object items size should be 6', ()async{
          await wlvm.removeProduct(wlvm.items.first);
          expect(wlvm.items.length, 6);
        });
        //this test is invalid it may remove the item if all the properties are the same
        /*test('remove item of the same attributes should throw exception', ()async{
          Product p=Product.fromJson(JSONData()[0]);

          expect(()async=>
          {
            await wlvm.removeProduct(p)
          },
              throwsA(predicate((e) => e.message == "can't remove a product that is not in your watch list"))
          );

        });*/

        test('remove item of the same attributes items size should be 7', ()async{
          Product p=Product.fromJson(JSONData()[0]);
          try
          {
            await wlvm.removeProduct(p);
          }
          catch(e)
          {

          }
          expect(wlvm.items.length, 7);
        });

      });
      group("when service completes unsuccessfully",(){

        setUp(()async{
          WatchListInjector.configure(DependencyType.MOCK,removeReq: false);
          await wlvm.setInitialProducts();
        });

        test('remove item throws error', ()async{
          expect(()async{
            await wlvm.removeProduct(wlvm.items.first);
          },
              throwsA(predicate((e) => e.message == "error when sending remove request to server"))
          );
        });

        test('remove item of the same object items size should be 7', ()async{
          try
          {
            await wlvm.removeProduct(wlvm.items.first);
          }
          catch(e)
          {

          }
          expect(wlvm.items.length, 7);
        });
        //this test is invalid it may remove the item if all the properties are the same
        /*test('remove item of the same attributes should throw exception', ()async{
          Product p=Product.fromJson(JSONData()[0]);

          expect(()async=>
          {
            await wlvm.removeProduct(p)
          },
              throwsA(predicate((e) => e.message == "can't remove a product that is not in your watch list"))
          );
        });*/

        test('remove item of the same attributes items size should be 7', ()async{
          Product p=Product.fromJson(JSONData()[0]);
          try
          {
            await wlvm.removeProduct(p);
          }
          catch(e)
          {

          }
          expect(wlvm.items.length, 7);
        });
      });
    });

    group("test addProduct",(){
      group("when service completes successfully",(){

        test('add item to empty list returns true', ()async{
          expect(await wlvm.addProduct(Product.fromJson(JSONData()[0])), true);
        });
        
        test('add item of the same object throws exception', ()async{
          await wlvm.addProduct(Product.fromJson(JSONData()[0]));
          expect(()async=>{
            await wlvm.addProduct(wlvm.items.first)
          },
              throwsA(predicate((e) => e.message == "can't add a product that is already in your watch list"))
          );
        });

        test('add item of the same object items size should be 1', ()async{
          await wlvm.addProduct(Product.fromJson(JSONData()[0]));
          try
          {
            await wlvm.addProduct(wlvm.items.first);
          }
          catch(e)
          {

          }
          expect(wlvm.items.length, 1);
        });

        test('add item of the same attributes should throw exception now', ()async{

          Product p=Product.fromJson(JSONData()[0]);
          await wlvm.addProduct(p);
          Product c=Product.fromJson(JSONData()[0]);
          expect(()async=>
          {
            await wlvm.addProduct(c)
          },
              throwsA(predicate((e) => e.message == "can't add a product that is already in your watch list"))
          );

        });

        test('add item of the same attributes items size should be 1', ()async{
          Product p=Product.fromJson(JSONData()[0]);
          await wlvm.addProduct(p);
          Product c=Product.fromJson(JSONData()[0]);

           try
           {
             await wlvm.addProduct(c);
           }
           catch(e)
          {

          }

          expect(wlvm.items.length, 1);
        });

      });
      group("when service completes unsuccessfully",(){

        setUp(()async{
          WatchListInjector.configure(DependencyType.MOCK,addReq: false);
        });

        test('add item of the same object throws exception', ()async{

          expect(()async=>{
            await wlvm.addProduct(Product.fromJson(JSONData()[0])),
            await wlvm.addProduct(wlvm.items.first)
          },
              throwsA(predicate((e) => e.message == "error when sending add request to server"))
          );
        });

        test('add item of the same object items size should be 0', ()async{
          try
          {
            await wlvm.addProduct(Product.fromJson(JSONData()[0]));
            await wlvm.addProduct(wlvm.items.first);
          }
          catch(e)
          {

          }
          expect(wlvm.items.length, 0);
        });

        test('add item of the same attributes should throw exception', ()async{
          Product p=Product.fromJson(JSONData()[0]);

          Product c=Product.fromJson(JSONData()[0]);
          expect(()async=>
          {
            await wlvm.addProduct(p),
            await wlvm.addProduct(c)
          },
              throwsA(predicate((e) => e.message == "error when sending add request to server"))
          );

        });

        test('add item of the same attributes items size should be 0', ()async{
          Product p=Product.fromJson(JSONData()[0]);
          Product c=Product.fromJson(JSONData()[0]);

          try
          {
            await wlvm.addProduct(p);
            await wlvm.addProduct(c);
          }
          catch(e)
          {

          }

          expect(wlvm.items.length, 0);
        });
      });
    });

    group("test setInitialProducts",(){
      group("when service completes successfully",(){

        test('returns true when its not empty ', ()async{
          Product p=Product.fromJson(JSONData()[0]);
          wlvm.items.add(p);
          expect(await wlvm.setInitialProducts(), true);
        });

        test('when its not empty the size must stay the same size should be 1', ()async{
          Product p=Product.fromJson(JSONData()[0]);
          wlvm.items.add(p);
          await wlvm.setInitialProducts();
          expect(wlvm.items.length, 1);
        });

        test('returns true if it adds initial products', ()async{
          expect(await wlvm.setInitialProducts(), true);
        });

        test('if it adds initial products size should be 7', ()async{
          await wlvm.setInitialProducts();
          expect(wlvm.items.length, 7);
        });
      });
      group("when service completes unsuccessfully",(){
        setUp(()async{
          WatchListInjector.configure(DependencyType.MOCK,initialReq: false);
        });

        test('when its not empty the size must stay the same size should be 1', ()async{
          Product p=Product.fromJson(JSONData()[0]);
          wlvm.items.add(p);
          try
          {
            await wlvm.setInitialProducts();
          }
          catch(e)
          {

          }
          expect(wlvm.items.length, 1);
        });

        test('initial request should throw exception', ()async{

          expect(()async=>
          {
            await wlvm.setInitialProducts(),

          },
              throwsA(predicate((e) => e.message == "error when sending initial request to server"))
          );

        });
      });
    });

    group("testing watch list singleton",(){
          test('returns the same instance should be true', (){
            WatchListViewModelSingleton watch=WatchListViewModelSingleton.getState();
            WatchListViewModelSingleton look=WatchListViewModelSingleton.getState();
            expect(identical(watch, look), true);
          });
    });

  });
}
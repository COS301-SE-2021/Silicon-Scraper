import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/classes/product.dart';


void main()
{
group("product class test",(){
  group("product constructor parameter test", () {
    test('availability is null attribute should be notspecified', (){
      product gpu=new product("", "", 0, "", "", "", "", null);
      expect( gpu.stockAvailability,availability.notSpecified);
    });
    test('availability is un identified attribute should be notspecified', (){
      product gpu=new product("", "", 0, "", "", "", "", "hfyudb");
      expect( gpu.stockAvailability,availability.notSpecified);
    });
    test('product availability is available attribute should be available', (){
      product gpu=new product("", "", 0, "", "", "", "", "avaIlable");
      expect(gpu.stockAvailability,availability.available);
    });
    test('product availability is outofstock attribute should be outOfStock', (){
      product gpu=new product("", "", 0, "", "", "", "", "ouTOfStock");
      expect(gpu.stockAvailability,availability.outOfStock);
    });
    test('product availability is limitedstock attribute should be limitedStock', (){
      product gpu=new product("", "", 0, "", "", "", "", "LiMitedstock");
      expect(gpu.stockAvailability,availability.limitedStock);
    });
  });

  group("test get availability", (){
    test("availability is available should return availbale",(){
      product gpu=new product("", "", 0, "", "", "", "", "avaIlable");
      expect(gpu.getAvailability(),"available");
    });
    test('availability is outOfStock should return out of stock', (){
      product gpu=new product("", "", 0, "", "", "", "", "ouTOfStock");
      expect(gpu.getAvailability(),"out of stock");
    });
    test('availability is limitedStock should return limited stock', (){
      product gpu=new product("", "", 0, "", "", "", "", "LiMitedstock");
      expect(gpu.getAvailability(),"limited stock");
    });
    test('availability is notSpecified should return not specified', (){
      product gpu=new product("", "", 0, "", "", "", "", null);
      expect(gpu.getAvailability(),"not specified");
    });
  });
});
}
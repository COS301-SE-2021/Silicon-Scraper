import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/classes/product.dart';


void main()
{
group("product class test",(){
  group("product constructor parameter test", () {
    test('availability is null attribute should be notspecified', (){
      Product gpu=new Product("", "", 0, "", "", "", "", null,"1","gpu");
      expect( gpu.stockAvailability,availability.notSpecified);
    });
    test('availability is un identified attribute should be notspecified', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "hfyudb","1","gpu");
      expect( gpu.stockAvailability,availability.notSpecified);
    });
    test('product availability is available attribute should be available', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "avaIlable","1","gpu");
      expect(gpu.stockAvailability,availability.available);
    });
    test('product availability is outofstock attribute should be outOfStock', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "ouTOfStock","1","gpu");
      expect(gpu.stockAvailability,availability.outOfStock);
    });
    test('product availability is limitedstock attribute should be limitedStock', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "LiMitedstock","1","gpu");
      expect(gpu.stockAvailability,availability.limitedStock);
    });
  });

  group("test get availability", (){
    test("availability is available should return availbale",(){
      Product gpu=new Product("", "", 0, "", "", "", "", "avaIlable","1","gpu");
      expect(gpu.getAvailability(),"available");
    });
    test('availability is outOfStock should return out of stock', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "ouTOfStock","1","gpu");
      expect(gpu.getAvailability(),"out of stock");
    });
    test('availability is limitedStock should return limited stock', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "LiMitedstock","1","gpu");
      expect(gpu.getAvailability(),"limited stock");
    });
    test('availability is notSpecified should return not specified', (){
      Product gpu=new Product("", "", 0, "", "", "", "", null,"1","gpu");
      expect(gpu.getAvailability(),"not specified");
    });
  });
});
}
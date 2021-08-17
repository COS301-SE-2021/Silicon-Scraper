import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/models/product_model.dart';


void main()
{
group("product class test",()
{
  group("product constructor parameter test", () {
    test('availability is null attribute should be notspecified', (){
      Product gpu=new Product("", "", 0, "", "", "", "", null,"1","gpu",true);
      expect( gpu.stockAvailability,availability.outOfStock);
    });
    test('availability is un identified attribute should be notspecified', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "hfyudb","1","gpu",true);
      expect( gpu.stockAvailability,availability.outOfStock);
    });
    test('product in stock is available attribute should be available', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "in stock","1","gpu",true);
      expect(gpu.stockAvailability,availability.inStock);
    });
    test('product availability is out of stock attribute should be outOfStock', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "out of stock","1","gpu",true);
      expect(gpu.stockAvailability,availability.outOfStock);
    });
    test('product availability is limitedstock attribute should be outOfStock', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "LiMitedstock","1","gpu",true);
      expect(gpu.stockAvailability,availability.outOfStock);
    });
  });

  group("test get availability", (){
    test("availability is in stock should return in stock",(){
      Product gpu=new Product("", "", 0, "", "", "", "", "in stock","1","gpu",true);
      expect(gpu.getAvailability(),"in stock");
    });
    test('availability is out of stock should return out of stock', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "out of stock","1","gpu",true);
      expect(gpu.getAvailability(),"out of stock");
    });
    test('availability is limitedStock should return limited stock', (){
      Product gpu=new Product("", "", 0, "", "", "", "", "LiMitedstock","1","gpu",true);
      expect(gpu.getAvailability(),"out of stock");
    });
    test('availability is notSpecified should return not specified', (){
      Product gpu=new Product("", "", 0, "", "", "", "", null,"1","gpu",true);
      expect(gpu.getAvailability(),"out of stock");
    });
  });

});
}
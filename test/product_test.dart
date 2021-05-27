import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/product.dart';


void main()
{
group("product constructor parameter test", () {
  test('availability is null attribute should be notspecified', (){
    product gpu=new product("", "", 0, "", "", "", "", null);
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
}
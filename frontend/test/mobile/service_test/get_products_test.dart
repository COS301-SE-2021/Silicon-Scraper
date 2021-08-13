import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/mocks/json/productsjson.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/models/product_model.dart';


void main()
{
  group("testing getproducts service",(){
    test("testing add service with mock data list size should be 7",(){
      var list=addProducts(JSONData());
      expect(list.length, 7);
    });
    test("testing add service with mock data list size should be 0",(){
      List data=[];
      var list=addProducts(data);
      expect(list.length, 0);
    });
    test("testing that the data is correct for the first element",(){
      var list=addProducts(JSONData());
      expect(list[0].brand,"MSI ");
      expect(list[0].model," GeForce RTX 3090");
      expect(list[0].price,45999.0);
      expect(list[0].retailer,"evetech");
      expect(list[0].description,"/ 10496 Cuda Cores / Boost Clock: 1860 MHz / Triple Fan / Sturdy Brushed-finish Metal Backplate / 3x DisplayPort / 1x HDMI 2.1 / 912-V388-010 + FREE DELIVERY !");
      expect(list[0].url,"https://www.evetech.co.za/msi-geforce-rtx-3090-suprim-x-24gb-gddr6x/best-deal/10956.aspx");
      expect(list[0].image,"https://www.evetech.co.za/repository/ProductImages/msi-geforce-rtx-3090-suprim-x-24gb-gddr6x-400px-v1.jpg");
      expect(list[0].stockAvailability,availability.outOfStock);
    });
    test("testing that the data is correct for the last element",(){
      var list=addProducts(JSONData());
      expect(list[6].brand,"ASUS ");
      expect(list[6].model,"TUF Gaming GeForce RTX 3060");
      expect(list[6].price,13499.0);
      expect(list[6].retailer,"evetech");
      expect(list[6].description,"/ 3584 Cuda Cores / Boost: **** MHz / Axial-tech Fan Design / All-Aluminum Shroud and Metal Backplate / Dual Ball Fan Bearings / Three Powerful Axial-tech Fans / 2.7-slot Design / 90YV0GC0-M0NA00 + FREE DELIVERY !\n");
      expect(list[6].url,"https://www.evetech.co.za/asus-tuf-rtx-3060-oc-12gb-gaming/best-deal/11364.aspx");
      expect(list[6].image,"https://www.evetech.co.za/repository/ProductImages/asus-geforce-rtx-3060-oc-tuf-12gb-gddr6-400px-v1.jpg");
      expect(list[6].stockAvailability,availability.outOfStock);
    });
  });
}
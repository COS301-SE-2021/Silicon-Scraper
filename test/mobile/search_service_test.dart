import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/services/searchService.dart';



//
// List<String> getSuggestions(List<Product> unProcessedProducts, String query) {
//   List<String> productBrandOrModel = [];
//   for (int i = 0; i < unProcessedProducts.length; i++) {
//     if (containsIgnoreCase(unProcessedProducts.elementAt(i).brand, query)) {
//       productBrandOrModel.add(unProcessedProducts.elementAt(i).brand);
//     } else if (containsIgnoreCase(
//         unProcessedProducts.elementAt(i).model, query)) {
//       productBrandOrModel.add(unProcessedProducts.elementAt(i).model);
//     }
//   }
//   return productBrandOrModel;
// }
//
// List<Product> applyFilters(
//     List<Product> product,
//     bool available,
//     bool limitedStock,
//     bool outOfStock,
//     bool notSpecified,
//     double maxPrice,
//     double minPrice,
//     bool retailer1,
//     bool retailer2,
//     bool retailer3) {
//   List<Product> filteredProducts = [];
//
//   bool add = false;
//   for (int i = 0; i < product.length; i++) {
//     // product can only be added if it applies to all the filters chosen
//
//     // check availability
//     // 1. check which filters are true
//     // 2. if its true check each product
//     if (available) {
//       if (product.elementAt(i).getAvailability().compareTo("available") == 0) {
//         add = true;
//       }
//     } else if (limitedStock) {
//       if (product.elementAt(i).getAvailability().compareTo("limited stock") ==
//           0) {
//         add = true;
//       }
//     } else if (outOfStock) {
//       if (product.elementAt(i).getAvailability().compareTo("out of stock") ==
//           0) {
//         add = true;
//       }
//     } else if (notSpecified) {
//       if (product.elementAt(i).getAvailability().compareTo("not specified") ==
//           0) {
//         add = true;
//       }
//     }
//
//       //check for products within price range
//       if (product.elementAt(i).price >= minPrice &&
//           product.elementAt(i).price <= maxPrice) {
//         add = true;
//       }
//
//     // check retailer
//     if (retailer1) {
//       if (product.elementAt(i).retailer.toLowerCase().contains("evetech")) {
//         add = true;
//       }
//     } else if (retailer2) {
//       if (product.elementAt(i).retailer.toLowerCase().contains("wootware")) {
//         add = true;
//       }
//     } else if (retailer3) {
//       if (product.elementAt(i).retailer.toLowerCase().contains("pc link")) {
//         add = true;
//       }
//     }
//
// //add product that applies to the filters
//     if (add) {
//       filteredProducts.add(product.elementAt(i));
//     }
//     add = false;
//   }
//   return filteredProducts;
// }

void main() {
    group("testing search service (currently in getProducts for now)",(){

      test("testing if the query is contained in model or brand of an x item... to return true",(){
        bool contained = containsIgnoreCase("modelOrBrand", "or");
        expect(contained, true);
      });
      test("testing if the query is contained in model or brand of an x item... to return false",(){
        bool contained = containsIgnoreCase("modelOrBrand", "tanaa");
        expect(contained, false);
      });
      // test("testing get results service ",(){
      //   List data=[];
      //   var list=addProducts(data);
      //   expect(list.length, 0);
      // });
      // test("testing that the data is correct for the first element",(){
      //   var list=addProducts(JSONData());
      //   expect(list[0].brand,"MSI GeForce RTX 3090");
      //   expect(list[0].model,"SUPRIM X 24GB GDDR6X Graphics Card");
      //   expect(list[0].price,45999.0);
      //   expect(list[0].retailer,"evetech");
      //   expect(list[0].description,"/ 10496 Cuda Cores / Boost Clock: 1860 MHz / Triple Fan / Sturdy Brushed-finish Metal Backplate / 3x DisplayPort / 1x HDMI 2.1 / 912-V388-010 + FREE DELIVERY !");
      //   expect(list[0].url,"https://www.evetech.co.za/msi-geforce-rtx-3090-suprim-x-24gb-gddr6x/best-deal/10956.aspx");
      //   expect(list[0].photo,"https://www.evetech.co.za/repository/ProductImages/msi-geforce-rtx-3090-suprim-x-24gb-gddr6x-400px-v1.jpg");
      //   expect(list[0].stockAvailability,availability.outOfStock);
      // });
      // test("testing that the data is correct for the last element",(){
      //   var list=addProducts(JSONData());
      //   expect(list[6].brand,"ASUS TUF Gaming GeForce RTX 3060");
      //   expect(list[6].model,"OC 12GB GDDR6 Graphics Card");
      //   expect(list[6].price,13499.0);
      //   expect(list[6].retailer,"evetech");
      //   expect(list[6].description,"/ 3584 Cuda Cores / Boost: **** MHz / Axial-tech Fan Design / All-Aluminum Shroud and Metal Backplate / Dual Ball Fan Bearings / Three Powerful Axial-tech Fans / 2.7-slot Design / 90YV0GC0-M0NA00 + FREE DELIVERY !\n");
      //   expect(list[6].url,"https://www.evetech.co.za/asus-tuf-rtx-3060-oc-12gb-gaming/best-deal/11364.aspx");
      //   expect(list[6].photo,"https://www.evetech.co.za/repository/ProductImages/asus-geforce-rtx-3060-oc-tuf-12gb-gddr6-400px-v1.jpg");
      //   expect(list[6].stockAvailability,availability.notSpecified);
      // });
    });
}
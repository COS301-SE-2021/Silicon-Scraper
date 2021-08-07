import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/injectors/dependency_types.dart';
import 'package:silicon_scraper/injectors/search_sort_filter_service_injector.dart';
import 'package:silicon_scraper/mocks/json/productsjson.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/view_models/search_sort_filter_view_model.dart';

void main() {

  SearchPageViewModelSingleton search = SearchPageViewModelSingleton.getState();
  var list = addProducts(JSONData());

  group("testing search, sort and filter view model", (){
    group("test search injector", () {
      // injector returns mock service for the tests
      test("should find true", (){
        expect(search.isMockSearchService(), true);
      });
      test("should find false", (){
        SearchSortFilterInjector.configure(DependencyType.PROD);
        expect(search.isMockSearchService(), false);
      });
    });
    group("get results service (only for mock data)", () {
      test("Should find 6 results", () {
        List<Product> res = search.getResults(list, "rtx");
        expect(res.length, 6);
      });
      test("should find 0 (testing lower bound)", () {
        List<Product> res = search.getResults(list, "blah blah blah");
        expect(res.length, 0);
      });
      test("should find 7 (testing upper bound)",(){
        List<Product> res = search.getResults(list, "");
        expect(res.length, 7);
      });
      test("should find 4 (testing case)",(){
        List<Product> res = search.getResults(list, "gefORcE RtX 3090");
        expect(res.length, 4);
      });
    });
    group("get suggestions service", (){
      test("should find 6 results", () {
        List<String> res = search.getSuggestions(list, "rtx");
        expect(res.length, 6);
      });
      test("should find 0 (testing lower bound)", () {
        List<String> res = search.getSuggestions(list, "blah blah blah");
        expect(res.length, 0);
      });
      test("should find 7 (testing upper bound)",(){
        List<String> res = search.getSuggestions(list, "");
        expect(res.length, 7);
      });
      test("should find 4 (testing case)",(){
        List<String> res = search.getSuggestions(list, "gefORcE RtX 3090");
        expect(res.length, 4);
      });
      test("test return value upper bound string",(){
        List<String> res = search.getSuggestions(list, "RX 6900");
        expect(res[0], "Radeon RX 6900");
      });
      test("test return value lower bound string",(){
        List<String> res = search.getSuggestions(list, "Radeon");
        expect(res[0], "Radeon RX 6900");
      });
    });
    group("test max/min price helper service", () {
      test("test max price of products should be '45999.0'", (){
        double max = search.priceMinMax(list, 1);
        expect(max, 45999.0);
      });
      test("test min price of products should be '13499.0'", (){
        double min = search.priceMinMax(list, 0);
        expect(min, 13499.0);
      });
      test("test max price of products when list is null", (){
        var nullList;
        double max = search.priceMinMax(nullList, 1);
        expect(max, 0.1);
      });
      test("test max price of products when list is null", (){
        var nullList;
        double min = search.priceMinMax(nullList, 0);
        expect(min, 0.0);
      });
    });
    group("test apply sort service", () {
      test("test when no sort is applied", (){
        List<Product> res = search.applySort(list, "SORT");
        expect(res[0].price, 45999.0);
      });
      test("test when sort 'price high to low' is applied", (){
        List<Product> res = search.applySort(list, "Price (high to low)");
        expect(res[0].price, 45999.0);
      });
      test("test when sort 'price low to high' is applied", (){
        List<Product> res = search.applySort(list, "Price (low to high)");
        expect(res[0].price, 13499.0);
      });
    });
    group("test apply filters service", () {
      double min = search.priceMinMax(list, 0);
      double max = search.priceMinMax(list, 1);
      test("test no filters applied expect 7", () {
        List<Product> res = search.applyFilters(list, false, false, min, max, false, false, false);
        expect(res.length, 7);
      });
      test("test retailer filters 'evetech - retailer 1' applied expect 7", () {
        List<Product> res = search.applyFilters(list, false, false, min, max, true, false, false);
        expect(res.length, 7);
      });
      test("test retailer filters 'other - retailer 2 & 3' applied expect 0", () {
        List<Product> res = search.applyFilters(list, false, false, min, max, false, true, true);
        expect(res.length, 0);
      });
      test("test all retailer filters applied expect 7", () {
        List<Product> res = search.applyFilters(list, false, false, min, max, true, true, true);
        expect(res.length, 7);
      });
      test("test applying price range filter lower bound", () {
        List<Product> res = search.applyFilters(list, false, false, min + 1.0, max, false, false, false);
        expect(res.length, 6);
      });
      test("test applying price range filter upper bound", () {
        List<Product> res = search.applyFilters(list, false, false, min, max - 1.0, false, false, false);
        expect(res.length, 5);
      });
      test("test applying price range filter in the range 0 - 10000 (should be 0)", () {
        List<Product> res = search.applyFilters(list, false, false, 0, 10000, false, false, false);
        expect(res.length, 0);
      });
      // test("test applying availability 'in stock' filter (should be 2)", () {
      //   List<Product> res = search.applyFilters(list, true, false, min, max, false, false, false);
      //   expect(res.length, 2);
      // });
      // test("test applying availability 'out of stock' filter (should be 5)", () {
      //   List<Product> res = search.applyFilters(list, false, true, min, max, false, false, false);
      //   expect(res.length, 5);
      // });
      // test("test applying all availability filters (should be 7)", () {
      //   List<Product> res = search.applyFilters(list, true, true, min, max, false, false, false);
      //   expect(res.length, 7);
      // });
      // test("test applying no availability filters (should be 7)", () {
      //   List<Product> res = search.applyFilters(list, false, false, min, max, false, false, false);
      //   expect(res.length, 7);
      // });
    });
    group("test 'containsIgnoreCase' helper function", () {
      test(
          "test if second string is contained in second string (should be true)",
          () {
        bool contained = search.containsIgnoreCase("modelOrBrand", "model");
        expect(contained, true);
      });
      test(
          "test if second string is contained in second string (should be false)",
          () {
        bool contained = search.containsIgnoreCase("modelOrBrand", "blah");
        expect(contained, false);
      });
      test(
          "test if (ignore case) second string is contained in second string (should be true)",
          () {
        bool contained = search.containsIgnoreCase("modelOrBrand", "MODELORBRAND");
        expect(contained, true);
      });

    });
  });

  //   });
}
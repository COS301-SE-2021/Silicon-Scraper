import 'package:silicon_scraper/injectors/dependency_types.dart';
import 'package:silicon_scraper/injectors/search_sort_filter_service_injector.dart';
import 'package:silicon_scraper/models/product_model.dart';

class SearchViewModel {
  SearchSortFilterInjector search = SearchSortFilterInjector();

  SearchViewModel();

  // check if this is a mock service for getting results
  // cause mock results need to use an extra function to get search results
  bool isMockSearchService() {
    return search.dependencyType == DependencyType.MOCK;
  }

  List<Product> getResults(List<Product> unProcessedProducts, String query) {
    List<Product> products = [];
    for (int i = 0; i < unProcessedProducts.length; i++) {
      if (containsIgnoreCase(unProcessedProducts.elementAt(i).brand, query) ||
          containsIgnoreCase(unProcessedProducts.elementAt(i).model, query)) {
        products.add(unProcessedProducts.elementAt(i));
      }
    }
    return products;
  }

  Future<List<Product>> getProductList(query) {
    return search.dependency.setProductList(query);
  }

  List<String> getSuggestions(List<Product> unProcessedProducts, String query) {
    List<String> productSuggestions = [];
    for (int i = 0; i < unProcessedProducts.length; i++) {
      if (containsIgnoreCase(unProcessedProducts.elementAt(i).brand, query) ||
          containsIgnoreCase(unProcessedProducts.elementAt(i).model, query)) {
        productSuggestions.add(unProcessedProducts.elementAt(i).model);
      }
    }
    return productSuggestions;
  }

  List<Product> applySort(List<Product> products, String sortValue) {
    List<Product> sortedProducts = products;
    if (sortValue.compareTo("SORT") == 0) {
      sortedProducts.sort((a, b) => a.id.compareTo(b.id));
      return sortedProducts;
    }
    if (products.isNotEmpty) {
      if (sortValue.compareTo("Price (high to low)") == 0) {
        sortedProducts.sort((a, b) => b.price.compareTo(a.price));
        return sortedProducts;
      } else if (sortValue.compareTo("Price (low to high)") == 0) {
        sortedProducts.sort((a, b) => a.price.compareTo(b.price));
        return sortedProducts;
      }
    }
    return sortedProducts;
  }

  List<Product> applyFilters(
      List<Product> products,
      bool inStock,
      bool outOfStock,
      bool cpu,
      bool gpu,
      double minPrice,
      double maxPrice,
      bool retailer1,
      bool retailer2,
      bool retailer3) {
    /// get the original array of search results
    /// retailer: 1 - evetech, 2 - dreamware, 3 - amptek

    List<Product> filteredProducts = [];
    List<bool> filters = [
      inStock,
      outOfStock,
      cpu,
      gpu,
      retailer1,
      retailer2,
      retailer3
    ];
    List<String> filterString = [
      "in stock",
      "out of stock",
      "cpu",
      "gpu",
      "evetech",
      "dreamware",
      "amptek"
    ];

    // for each product
    // check if any of the checkbox filters have been selected
    // go through all the filters (nested for loop) and for the 'true' filters:
    // check if the product matches
    // if it does: add , if not add => false
    // if the product matches all the 'true' filters ,
    // check if its in the price range then add it to the filtered array
    bool add = true;
    for (int p = 0; p < products.length; p++) {
      if (inStock ||
          outOfStock ||
          cpu ||
          gpu ||
          retailer1 ||
          retailer2 ||
          retailer3) {
        add = false;
        for (int i = 0; i < filters.length; i++) {
          if (i < 2) {
            if (filters[i]) {
              if (products
                      .elementAt(p)
                      .getAvailability()
                      .toLowerCase()
                      .compareTo(filterString[i]) ==
                  0) {
                add = true;
              }
            }
          } else if (i < 4) {
            if (filters[i]) {
              if (containsIgnoreCase(
                  products.elementAt(p).type, filterString[i])) {
                add = true;
              }
            }
          } else {
            if (filters[i]) {
              if (products
                      .elementAt(p)
                      .retailer
                      .toLowerCase()
                      .compareTo(filterString[i]) ==
                  0) {
                add = true;
              }
            }
          }
        }
      }
      if (add) {
        // lastly check the price range
        if (products.elementAt(p).price >= minPrice &&
            products.elementAt(p).price <= maxPrice) {
          filteredProducts.add(products.elementAt(p));
        }
      }
    }
    return filteredProducts;
  }

  /// helper functions
  double priceMinMax(List<Product> products, int min0max1) {
    List<Product> tempProducts = products;
    if (tempProducts != null) {
      tempProducts.sort((a, b) => a.price.compareTo(b.price));
      if (min0max1 == 0) {
        return tempProducts.first.price;
      } else {
        return tempProducts.last.price;
      }
    }
    if (min0max1 == 0) {
      return 0.0;
    } else {
      return 0.1;
    }
  }

  String numberOfItems(int num) {
    return num.toString();
  }

  bool containsIgnoreCase(String modelOrBrand, String query) {
    return modelOrBrand.toLowerCase().contains(query.toLowerCase());
  }

// List<Product> getSortedFilteredProducts(List<Product> products) {
//   return products;
// }
}

class SearchPageViewModelSingleton extends SearchViewModel {
  static SearchPageViewModelSingleton _instance;

  SearchPageViewModelSingleton._internal() {
//
  }

  static SearchPageViewModelSingleton getState() {
    if (_instance == null) {
      _instance = SearchPageViewModelSingleton._internal();
    }
    return _instance;
  }
}

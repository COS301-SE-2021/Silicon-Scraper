import 'package:flutter/material.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/widgets/vertical_product_widget.dart';

class SearchViewModel {
  SearchViewModel();
  bool containsIgnoreCase(String modelOrBrand, String query) {
    return modelOrBrand.toLowerCase().contains(query.toLowerCase());
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

  String numberOfItems(int num) {
    return num.toString();
  }

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
      return 60000;
    }
  }

  List<Product> applySort(List<Product> products, String sortValue) {
    List<Product> sortedProducts = products;

    if (sortValue.compareTo("SORT") == 0) {
      return products;
    }
    if (products.isNotEmpty) {
      if (sortValue.compareTo("Price (low to high)") == 0) {
        sortedProducts.sort((a, b) => a.price.compareTo(b.price));
        return sortedProducts;
      } else if (sortValue.compareTo("Price (high to low)") == 0) {
        sortedProducts.sort((a, b) => b.price.compareTo(a.price));
        return sortedProducts;
      }
    }
    return products;
  }

  List<Product> applyFilters(
      List<Product> products,
      bool inStock,
      bool outOfStock,
      double minPrice,
      double maxPrice,
      bool retailer1,
      bool retailer2,
      bool retailer3) {
    /// get the original array of search results
    /// retailer: 1 - evetech, 2 - dreamware, 3 - amptek

    List<Product> filteredProducts = [];
    List<bool> filters = [inStock, outOfStock, retailer1, retailer2, retailer3];
    List<String> filterString = [
      "in stock",
      "out of stock",
      "evetech",
      "dreamware",
      "amptek"
    ];

    // for each product go through all the filters (nested array) and for the 'true' filters:
    // check if the product matches
    // if it does: add , if not add => false
    // if the product matches all the 'true' filters ,
    // check if its in the price range then add it to the filtered array

    for (int p = 0; p < products.length; p++) {
      bool add = false;
      for (int i = 0; i < filters.length; i++) {
        if (i < 2) {
          if (filters[i]) {
            print(filters[i]);
            if (products
                .elementAt(p)
                .getAvailability()
                .toLowerCase()
                .compareTo(filterString[i]) ==
                0) {
              // print(products
              //     .elementAt(p)
              //     .getAvailability()); // returns a boolean i think?
              add = true;
            } else {
              add = false;
            }
          }
        }
        else {
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

      if (add) {
        // lastly check the price range
        if (products.elementAt(p).price >= minPrice && products.elementAt(p).price <= maxPrice) {
          filteredProducts.add(products.elementAt(p));
        }
      }
    }
    return filteredProducts;
  }

  List<Product> getSortedFilteredProducts(List<Product> products) {
    return products;
  }

}

class SearchPageViewModelSingleton extends SearchViewModel
{
  static SearchPageViewModelSingleton _instance;
  SearchPageViewModelSingleton._internal(){
//
  }
  static SearchPageViewModelSingleton getState()
  {
    if(_instance==null)
    {
      _instance=SearchPageViewModelSingleton._internal();
    }
    return _instance;
  }
}
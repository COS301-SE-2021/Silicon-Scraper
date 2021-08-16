import 'package:flutter/material.dart';
import 'package:silicon_scraper/injectors/explore_service_injector.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';

class ExploreViewModel {
  ExplorePageInjector explore = ExplorePageInjector();
  List<Product> items = [];
  ExploreViewModel();

  FutureBuilder getExplorePageProducts(String productType, bool showAll) {
    List<Product> products = [];
    return FutureBuilder(
      future: explore.dependency.setItems(productType),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if (snapshot.connectionState == ConnectionState.none) {
          return noConnection(context);
        } else if (snapshot.data != null) {
          products = snapshot.data;

          // check if the product array is not empty (ie no products)
          if (products.isNotEmpty) {
            if (showAll) {
              return productListView(context, products);
            }
            return productHorizontalListView(context, products);
          } else {
            return getNoProductErrorMessage(context, productType);
          }
        } else {
          return Center(child: CircularProgressIndicator());
        }
      },
    );
  }

  Center getNoProductErrorMessage(BuildContext context, String productType) {
    if (productType.compareTo("cpu") == 0) {
      return noProducts(context, "CPUs");
    } else if (productType.compareTo("gpu") == 0) {
      return noProducts(context, "GPUs");
    } else {
      return noProducts(context, "PRODUCTS");
    }
  }

  String getTitle(String productType) {
    String title = "Products";
    if (productType.compareTo("cpu") == 0) {
      title = "CPUs";
    } else if (productType.compareTo("gpu") == 0) {
      title = "GPUs";
    }
    return title;
  }
}

class ExplorePageViewModelSingleton extends ExploreViewModel {
  static ExplorePageViewModelSingleton _instance;

  ExplorePageViewModelSingleton._internal() {
//
  }

  static ExplorePageViewModelSingleton getState() {
    if (_instance == null) {
      _instance = ExplorePageViewModelSingleton._internal();
    }
    return _instance;
  }
}

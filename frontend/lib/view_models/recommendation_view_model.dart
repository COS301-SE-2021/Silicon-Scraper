import 'package:flutter/material.dart';
import 'package:silicon_scraper/injectors/recommendation_service_injector.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';

class RecommendationViewModel {
  RecommendationPageInjector recommendation = RecommendationPageInjector();
  List<Product> items = [];
  RecommendationViewModel();

  FutureBuilder getRecommendationPageProducts() {
    List<Product> products = [];
    return FutureBuilder(
      future: recommendation.dependency.setItems(),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if (snapshot.connectionState == ConnectionState.none) {
          return noConnection(context);
        } else if (snapshot.data != null) {
          products = snapshot.data;
          // check if the product array is not empty (ie no products)
          if (products.isNotEmpty) {
              return productListView(context, products);
          } else {
            return noProducts(context, "RECOMMENDATIONS");
          }
        } else if (snapshot.hasError){
          print("Snapshot error:");
          print(snapshot.error);
          return noProducts(context, "RECOMMENDATIONS");
        }
        else {
          return Center(child: CircularProgressIndicator());
        }
      },
    );
  }
}

class RecommendationPageViewModelSingleton extends RecommendationViewModel {
  static RecommendationPageViewModelSingleton _instance;

  RecommendationPageViewModelSingleton._internal() {
//
  }

  static RecommendationPageViewModelSingleton getState() {
    if (_instance == null) {
      _instance = RecommendationPageViewModelSingleton._internal();
    }
    return _instance;
  }
}

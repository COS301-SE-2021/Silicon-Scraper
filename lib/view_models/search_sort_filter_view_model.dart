import 'package:flutter/material.dart';
import 'package:silicon_scraper/injectors/dependency_types.dart';
import 'package:silicon_scraper/injectors/search_sort_filter_service_injector.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';

class SearchViewModel {

  SearchSortFilterInjector search = SearchSortFilterInjector();
  List<Product> products = [];
  List<Product> originalProducts = []; //so we can always be working with original search results

  String sortValue = 'SORT';
  bool inStock = false;
  bool outOfStock = false;
  bool retailer1 = false;
  bool retailer2 = false;
  bool retailer3 = false;

  SearchViewModel();

  FutureBuilder getSearchResults(String query){
    return FutureBuilder<List<Product>>(
      future: search.dependency.setProductList(query),
      builder: (context, snapshot) {
        switch (snapshot.connectionState) {
          case ConnectionState.waiting:
            return Center(child: CircularProgressIndicator());
          default:
            if (snapshot.hasError) {
              print("Snapshot error:");
              print(snapshot.error);
              return Container(
                color: Colors.white,
                alignment: Alignment.center,
                child: Text(
                  'Something went wrong!',
                  style: TextStyle(fontSize: 28, color: Colors.black),
                ),
              );
            } else {
              if (snapshot.data == null) {
                return buildNoResults(query);
              }

              if (search.dependencyType == DependencyType.MOCK){
                this.products = getResults(snapshot.data, query);
                this.originalProducts = getResults(snapshot.data, query);
              } else {
                this.products = snapshot.data;
                this.originalProducts = snapshot.data;
              }
              return buildResultSuccess(context);
            }
        }
      },
    );
  }

  Widget buildNoResults(String query) {
    return Center(
      child: Padding(
        padding: EdgeInsets.all(25),
        child: RichText(
          textAlign: TextAlign.center,
          text: TextSpan(
            style: TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.bold,
              fontSize: 30,
            ),
            children: [
              TextSpan(text: 'Couldn\'t find "' + query + '". \n\n'),
              TextSpan(
                  text:
                  'Check your spelling or try searching with a different keyword.',
                  style: TextStyle(
                      color: Colors.grey[700],
                      fontWeight: FontWeight.bold,
                      fontSize: 20)),
            ],
          ),
        ),
      ),
    );
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

  FutureBuilder getSearchSuggestions(String query){
    return FutureBuilder<List<Product>>(
      future: search.dependency.setProductList(query),
      builder: (context, snapshot) {
        if (query.isEmpty) return noProducts(context, "SUGGESTIONS");

        switch (snapshot.connectionState) {
          case ConnectionState.waiting:
            return Center(child: CircularProgressIndicator());
          default:
            if (snapshot.hasError || snapshot.data.isEmpty) {
              return noProducts(context, "SUGGESTIONS");
            } else {
              List<String> productSuggestions =
              getSuggestions(snapshot.data, query);
              if (productSuggestions.isEmpty) {
                return noProducts(context, "SUGGESTIONS");
              }
              return buildSuggestionsSuccess(productSuggestions, query);
            }
        }
      },
    );
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

  Widget buildSuggestionsSuccess(List<String> suggestions, String query) {
    return ListView.builder(
      itemCount: suggestions.length,
      itemBuilder: (context, index) {
        final suggestion = suggestions[index];
        final queryText = suggestion.substring(0, query.length);
        final remainingText = suggestion.substring(query.length);

        return ListTile(
          tileColor: Colors.white,
          contentPadding: EdgeInsets.only(left: 40),
          onTap: () {
            query = suggestion;
            // user clicks on suggestion this calls build results
            getSearchResults(query);
          },
          title: RichText(
            text: TextSpan(
              text: queryText,
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
              children: [
                TextSpan(
                  text: remainingText,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget buildResultSuccess(BuildContext context) {
    double minPrice = priceMinMax(this.products, 0);
    double maxPrice = priceMinMax(this.products, 1);
    RangeValues _priceRangeValues = RangeValues(minPrice, maxPrice);

    return StatefulBuilder(builder: (context, _setState) {
      ListView productsWidget() {
        List<Product> sortedProducts = applySort(this.products, sortValue);
        if (sortedProducts != null) {
          return productListView(context, sortedProducts);
        }
        return ListView(children: [
          noProducts(context, "Products"),
        ]);
      }

      return Container(
        //width: MediaQuery.of(context).size.width,
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(color: Colors.grey, width: 0.3),
          ),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                /// sort and filter row
                Container(
                    child: Row(children: [
                      /// sort
                      Container(
                          width: MediaQuery.of(context).size.width / 2 - 0.3,
                          decoration: BoxDecoration(
                            border: Border(
                              right: BorderSide(width: 0.3, color: Colors.grey),
                            ),
                          ),
                          child: Center(
                              child: DropdownButton<String>(
                                value: sortValue,
                                icon: const Icon(Icons.arrow_drop_down_sharp),
                                iconSize: 30,
                                style: const TextStyle(
                                  fontSize: 14,
                                  color: Colors.black,
                                ),
                                underline: Container(
                                  height: 0,
                                  color: Colors.white,
                                ),
                                onChanged: (String newValue) {
                                  _setState(() {
                                    sortValue = newValue;
                                  });
                                },
                                items: <String>[
                                  'SORT',
                                  'Price (low to high)',
                                  'Price (high to low)'
                                ].map<DropdownMenuItem<String>>((String value) {
                                  return DropdownMenuItem<String>(
                                    value: value,
                                    child: Text(
                                      value,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  );
                                }).toList(),
                              ))),

                      /// filter button
                      Container(
                          width: MediaQuery.of(context).size.width / 2 - 0.3,
                          child: TextButton(
                            child: Text(
                              'FILTER',
                              style: TextStyle(fontSize: 14.0, color: Colors.black),
                            ),
                            style: TextButton.styleFrom(
                              padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                              backgroundColor: Colors.white,
                            ),
                            onPressed: () {
                              showModalBottomSheet(
                                  context: context,
                                  //barrierColor: Colors.deepOrangeAccent,
                                  isDismissible: false,
                                  enableDrag: false,
                                  backgroundColor: Colors.white,
                                  elevation: 10,
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.vertical(
                                        top: Radius.circular(10.0),
                                      )),
                                  builder: (BuildContext context) {
                                    return StatefulBuilder(builder:
                                        (BuildContext context,
                                        StateSetter filterState) {
                                      return Container(
                                        height: MediaQuery.of(context).size.height,
                                        child: Center(
                                            child: ListView(children: <Widget>[
                                              Padding(
                                                padding:
                                                EdgeInsets.fromLTRB(20, 5, 0, 5),
                                                child: RichText(
                                                  textAlign: TextAlign.left,
                                                  text: TextSpan(
                                                      text: "Filter",
                                                      style: TextStyle(
                                                        fontSize: 24,
                                                        fontWeight: FontWeight.w500,
                                                        color: Colors.black,
                                                      )),
                                                ),
                                              ),
                                              /// availability checkboxes
                                              ExpansionTile(
                                                  title: Text(
                                                    'Availability',
                                                    style: TextStyle(fontSize: 18),
                                                  ),
                                                  childrenPadding:
                                                  EdgeInsets.fromLTRB(20, 0, 30, 0),
                                                  children: <Widget>[
                                                    CheckboxListTile(
                                                      title: const Text('In Stock'),
                                                      value: this.inStock,
                                                      onChanged: (bool value) {
                                                        filterState(() {
                                                          this.inStock = value;
                                                        });
                                                      },
                                                    ),
                                                    CheckboxListTile(
                                                      title: const Text('Out of Stock'),
                                                      value: this.outOfStock,
                                                      onChanged: (bool value) {
                                                        filterState(() {
                                                          this.outOfStock = value;
                                                        });
                                                      },
                                                    ),
                                                  ]),
                                              /// price range slide
                                              ExpansionTile(
                                                  title: Text(
                                                    'Price',
                                                    style: TextStyle(fontSize: 18),
                                                  ),
                                                  childrenPadding:
                                                  EdgeInsets.fromLTRB(20, 0, 30, 0),
                                                  children: <Widget>[
                                                    RangeSlider(
                                                      values: _priceRangeValues,
                                                      min: minPrice,
                                                      max: maxPrice,
                                                      divisions: 20,
                                                      labels: RangeLabels(
                                                        _priceRangeValues.start
                                                            .round()
                                                            .toString(),
                                                        _priceRangeValues.end
                                                            .round()
                                                            .toString(),
                                                      ),
                                                      onChanged: (RangeValues values) {
                                                        filterState(() {
                                                          _priceRangeValues = values;
                                                        });
                                                      },
                                                    )
                                                  ]),
                                              /// retailer checkboxes
                                              ExpansionTile(
                                                  title: Text(
                                                    'Retailer',
                                                    style: TextStyle(fontSize: 18),
                                                  ),
                                                  childrenPadding:
                                                  EdgeInsets.fromLTRB(20, 0, 30, 0),
                                                  children: <Widget>[
                                                    CheckboxListTile(
                                                      title: const Text('EveTech'),
                                                      value: this.retailer1,
                                                      onChanged: (bool value) {
                                                        filterState(() {
                                                          this.retailer1 = value;
                                                        });
                                                      },
                                                    ),
                                                    CheckboxListTile(
                                                      title: const Text('Dreamware'),
                                                      value: this.retailer2,
                                                      onChanged: (bool value) {
                                                        filterState(() {
                                                          this.retailer2 = value;
                                                        });
                                                      },
                                                    ),
                                                    CheckboxListTile(
                                                      title: const Text('Amptek'),
                                                      value: this.retailer3,
                                                      onChanged: (bool value) {
                                                        filterState(() {
                                                          this.retailer3 = value;
                                                        });
                                                      },
                                                    ),
                                                  ]),
                                              Padding(
                                                  padding: EdgeInsets.all(20),
                                                  child: new ButtonBar(
                                                    mainAxisSize: MainAxisSize.min,
                                                    children: [
                                                      OutlinedButton(
                                                        child: Text(
                                                          "Cancel",
                                                          style: TextStyle(
                                                              fontSize: 20.0,
                                                              color: Colors.grey),
                                                        ),
                                                        onPressed: () {
                                                          Navigator.pop(context, this.products);
                                                        },
                                                      ),
                                                      TextButton(
                                                        child: Text(
                                                          'Apply',
                                                          style: TextStyle(
                                                              fontSize: 20.0,
                                                              color: Colors.white),
                                                        ),
                                                        style: TextButton.styleFrom(
                                                          padding:
                                                          const EdgeInsets.fromLTRB(
                                                              20, 0, 20, 0),
                                                          backgroundColor:
                                                          Colors.deepOrangeAccent,
                                                        ),
                                                        onPressed: () {
                                                          List<Product>
                                                          filteredProducts =
                                                          applyFilters(
                                                              this.originalProducts,
                                                              inStock,
                                                              outOfStock,
                                                              _priceRangeValues.start,
                                                              _priceRangeValues.end,
                                                              retailer1,
                                                              retailer2,
                                                              retailer3);
                                                          Navigator.pop(context,
                                                              filteredProducts);
                                                        },
                                                      ),
                                                    ],
                                                  )),
                                            ])),
                                      );
                                    });
                                  })
                                ..then(
                                      (value) {
                                    _setState(() {
                                      this.products = value;
                                    });
                                  },
                                );
                            },
                          ))
                    ])),

                /// number of items
                Container(
                  width: MediaQuery.of(context).size.width,
                  padding: EdgeInsets.fromLTRB(0, 12, 0, 12),
                  decoration: BoxDecoration(
                    border: Border(
                      top: BorderSide(color: Colors.grey, width: 0.4),
                      bottom: BorderSide(color: Colors.grey, width: 0.1),
                    ),
                  ),
                  child: RichText(
                    textAlign: TextAlign.center,
                    text: TextSpan(
                        text: numberOfItems(this.products == null ? 0 : this.products.length) + " items",
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: Colors.black54,
                        )),
                  ),
                ),

                /// actual product display (wrapped in a expanded cause render-flex and infinite scrolling crash)
                Expanded(child: productsWidget())
              ]));
    });
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

    // for each product
    // check if any of the checkbox filters have been selected
    // go through all the filters (nested for loop) and for the 'true' filters:
    // check if the product matches
    // if it does: add , if not add => false
    // if the product matches all the 'true' filters ,
    // check if its in the price range then add it to the filtered array
    bool add = true;
    for (int p = 0; p < products.length; p++) {
      if (inStock || outOfStock || retailer1 || retailer2 || retailer3) {
        add = false;
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
      return 60000;
    }
  }

  String numberOfItems(int num) {
    return num.toString();
  }

  bool containsIgnoreCase(String modelOrBrand, String query) {
    return modelOrBrand.toLowerCase().contains(query.toLowerCase());
  }

  List<Product> getSortedFilteredProducts(List<Product> products) {
    return products;
  }
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

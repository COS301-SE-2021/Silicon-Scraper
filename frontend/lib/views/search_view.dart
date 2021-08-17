import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/view_models/search_sort_filter_view_model.dart';
import 'package:silicon_scraper/views/watch_list_view.dart';

class SearchPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Search",
          style: TextStyle(
              color: Colors.white, fontWeight: FontWeight.bold, fontSize: 25),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: Icon(Icons.search),
            color: Colors.black,
            onPressed: () async {
              showSearch(context: context, delegate: ProductSearch());
            },
          )
        ],
      ),
      body: Container(
        color: Colors.white,
        margin: const EdgeInsets.all(15.0),
        child: Center(
            child: RichText(
          text: TextSpan(
            style: TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.bold,
              fontSize: 30,
            ),
            children: [
              TextSpan(text: 'Click '),
              WidgetSpan(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 10.0, vertical: 5.0),
                  child: Icon(Icons.search),
                ),
              ),
              TextSpan(text: 'to search for product name or brand...'),
            ],
          ),
        )),
      ),
    );
  }
}

class ProductSearch extends SearchDelegate<String> {
  SearchPageViewModelSingleton search = SearchPageViewModelSingleton.getState();
  List<Product> products = [];
  List<Product> originalProducts =
      []; //so we can always be working with original search results

  String sortValue = 'SORT';
  bool inStock = false;
  bool outOfStock = false;
  bool cpuFilter = false;
  bool gpuFilter = false;
  bool retailer1 = false;
  bool retailer2 = false;
  bool retailer3 = false;

  Color filtered = Colors.black;
  String filterText = "FILTER";

  @override
  ThemeData appBarTheme(BuildContext context) {
    assert(context != null);
    final ThemeData theme = Theme.of(context);
    assert(theme != null);
    return super.appBarTheme(context).copyWith(
          appBarTheme: AppBarTheme(
            color: Colors.white, //new AppBar color
            elevation: 0,
          ),
        );
  }

  @override
  List<Widget> buildActions(BuildContext context) {
    return <Widget>[
      IconButton(
        icon: Icon(Icons.clear),
        color: Colors.grey,
        onPressed: () {
          if (query.isEmpty) {
            close(context, null);
          } else {
            query = '';
            showSuggestions(context);
          }
        },
      ),
      IconButton(
        icon: Icon(Icons.bookmarks_rounded),
        color: Colors.black,
        onPressed: () async {
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => WatchList()));
        },
      ),
      IconButton(
        icon: Icon(Icons.person),
        color: Colors.black,
        onPressed: () async {},
      ),
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.arrow_back),
      color: Colors.black,
      onPressed: () => close(context, null),
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return FutureBuilder<List<Product>>(
      future: search.getProductList(query),
      builder: (context, snapshot) {
        switch (snapshot.connectionState) {
          case ConnectionState.waiting:
            return Center(child: CircularProgressIndicator());
          case ConnectionState.none:
            return noConnection(context);
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
                return buildNoResults();
              }
              if (search.isMockSearchService()) {
                this.products = search.getResults(snapshot.data, query);
                this.originalProducts = search.getResults(snapshot.data, query);
              } else {
                this.products = snapshot.data;
                this.originalProducts = snapshot.data;
              }

              if (snapshot.data.isEmpty) {
                return noProducts(context, "PRODUCTS");
              }
              return buildResultSuccess(context);
            }
        }
      },
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    return Container(
      color: Colors.white,
      child: FutureBuilder<List<Product>>(
        future: search.getProductList(query),
        builder: (context, snapshot) {
          if (query.isEmpty) return buildNoSuggestions(context);

          switch (snapshot.connectionState) {
            case ConnectionState.waiting:
              return Center(child: CircularProgressIndicator());
            case ConnectionState.none:
              return noConnection(context);
            default:
              if (snapshot.hasError || snapshot.data.isEmpty) {
                return buildNoSuggestions(context);
              } else {
                List<String> productSuggestions =
                    search.getSuggestions(snapshot.data, query);
                if (productSuggestions.isEmpty) {
                  return buildNoSuggestions(context);
                }
                return buildSuggestionsSuccess(productSuggestions);
              }
          }
        },
      ),
    );
  }

  Widget buildNoSuggestions(BuildContext context) {
    return noProducts(context, "SUGGESTIONS");
  }

  Widget buildSuggestionsSuccess(List<String> suggestions) {
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
            showResults(context);
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

  Widget buildNoResults() {
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

  Widget buildResultSuccess(BuildContext context) {
    double minPrice = search.priceMinMax(this.products, 0);
    double maxPrice = search.priceMinMax(this.products, 1);
    RangeValues _priceRangeValues = RangeValues(minPrice, maxPrice);

    return StatefulBuilder(builder: (context, _setState) {
      ListView productsWidget() {
        List<Product> sortedProducts =
            search.applySort(this.products, sortValue);
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
                          filterText,
                          style: TextStyle(fontSize: 14.0, color: filtered),
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
                                              EdgeInsets.fromLTRB(20, 5, 5, 10),
                                          child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              RichText(
                                                textAlign: TextAlign.left,
                                                text: TextSpan(
                                                    text: "Filter",
                                                    style: TextStyle(
                                                      fontSize: 24,
                                                      fontWeight:
                                                          FontWeight.w500,
                                                      color: Colors.black,
                                                    )),
                                              ),
                                              IconButton(
                                                onPressed: () {
                                                  Navigator.pop(
                                                      context, this.products);
                                                },
                                                icon:
                                                    Icon(Icons.cancel_outlined),
                                                color: Colors.grey,
                                              )
                                            ],
                                          )),

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

                                          /// product type checkboxes
                                          ExpansionTile(
                                              title: Text(
                                                'Type',
                                                style: TextStyle(fontSize: 18),
                                              ),
                                              childrenPadding:
                                              EdgeInsets.fromLTRB(20, 0, 30, 0),
                                              children: <Widget>[
                                                CheckboxListTile(
                                                  title: const Text('CPU'),
                                                  value: this.cpuFilter,
                                                  onChanged: (bool value) {
                                                    filterState(() {
                                                      this.cpuFilter = value;
                                                    });
                                                  },
                                                ),
                                                CheckboxListTile(
                                                  title: const Text('GPU'),
                                                  value: this.gpuFilter,
                                                  onChanged: (bool value) {
                                                    filterState(() {
                                                      this.gpuFilter = value;
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
                                                  //this.filtered = Colors.black;
                                                  //this.filterText = "FILTER";
                                                  Navigator.pop(
                                                      context, this.products);
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
                                                  List<
                                                          Product>
                                                      filteredProducts =
                                                      search.applyFilters(
                                                          this.originalProducts,
                                                          inStock,
                                                          outOfStock, cpuFilter, gpuFilter,
                                                          _priceRangeValues
                                                              .start,
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
                                  this.filtered = Colors.deepOrangeAccent;
                                  this.filterText = "FILTERED";
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
                        text: search.numberOfItems(this.products == null
                                ? 0
                                : this.products.length) +
                            " items",
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
}

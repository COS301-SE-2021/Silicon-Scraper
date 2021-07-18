import 'package:flutter/material.dart';

import 'package:flutter/cupertino.dart';
import 'package:silicon_scraper/models/product_model.dart';

import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/services/searchService.dart';

class SearchPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold(
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

class ProductSearch extends SearchDelegate<String> {
  SearchSingleton search = SearchSingleton.getState();

  bool available = false;
  bool limitedStock = false;
  bool outOfStock = false;
  bool notSpecified = false;

  bool retailer1 = false;
  bool retailer2 = false;
  bool retailer3 = false;

  RangeValues _priceRangeValues = const RangeValues(0, 4000);

  @override
  List<Widget> buildActions(BuildContext context) => [
        IconButton(
          icon: Icon(Icons.clear),
          onPressed: () {
            if (query.isEmpty) {
              close(context, null);
            } else {
              query = '';
              showSuggestions(context);
            }
          },
        )
      ];

  @override
  Widget buildLeading(BuildContext context) => IconButton(
        icon: Icon(Icons.arrow_back),
        onPressed: () => close(context, null),
      );

  @override
  Widget buildResults(BuildContext context) => FutureBuilder<List<Product>>(
        future: search.setProductList(query),
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
                  return buildNoResults();
                }
                return buildResultSuccess(context, snapshot.data);
              }
          }
        },
      );

  @override
  Widget buildSuggestions(BuildContext context) => Container(
        color: Colors.white,
        child: FutureBuilder<List<Product>>(
          future: search.setProductList(query),
          builder: (context, snapshot) {
            if (query.isEmpty) return buildNoSuggestions();

            switch (snapshot.connectionState) {
              case ConnectionState.waiting:
                return Center(child: CircularProgressIndicator());
              default:
                if (snapshot.hasError || snapshot.data.isEmpty) {
                  return buildNoSuggestions();
                } else {
                  List<String> productSuggestions =
                      getSuggestions(snapshot.data, query);
                  if (productSuggestions.isEmpty) {
                    return buildNoSuggestions();
                  }
                  return buildSuggestionsSuccess(productSuggestions);
                }
            }
          },
        ),
      );

  Widget buildNoSuggestions() => Center(
        child: Text(
          'No suggestions',
          style: TextStyle(fontSize: 28, color: Colors.black),
        ),
      );

  Widget buildSuggestionsSuccess(List<String> suggestions) => ListView.builder(
        itemCount: suggestions.length,
        itemBuilder: (context, index) {
          final suggestion = suggestions[index];
          final queryText = suggestion.substring(0, query.length);
          final remainingText = suggestion.substring(query.length);

          return ListTile(
            tileColor: Colors.white,
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

  Widget buildNoResults() => Center(
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

  Widget buildResultSuccess(BuildContext context, List<Product> products) =>
      Scaffold(
          appBar: AppBar(
            title: Text('Filter'),
            backgroundColor: Colors.white,
          ),
          drawer: Drawer(
              child: StatefulBuilder(
            builder: (context, _setState) => ListView(
              children: <Widget>[
                ExpansionTile(title: Text('Availability'), children: <Widget>[
                  CheckboxListTile(
                    title: const Text('Available'),
                    value: this.available,
                    onChanged: (bool value) {
                      _setState(() {
                        this.available = value;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Limited Stock'),
                    value: this.limitedStock,
                    onChanged: (bool value) {
                      _setState(() {
                        this.limitedStock = value;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Out of Stock'),
                    value: this.outOfStock,
                    onChanged: (bool value) {
                      _setState(() {
                        this.outOfStock = value;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Not Specified'),
                    value: this.notSpecified,
                    onChanged: (bool value) {
                      _setState(() {
                        this.notSpecified = value;
                      });
                    },
                  ),
                ]),
                ExpansionTile(title: Text('Price'), children: <Widget>[
                  RangeSlider(
                    values: _priceRangeValues,
                    min: 0,
                    max: 50000.0,
                    divisions: 20,
                    labels: RangeLabels(
                      _priceRangeValues.start.round().toString(),
                      _priceRangeValues.end.round().toString(),
                    ),
                    onChanged: (RangeValues values) {
                      _setState(() {
                        _priceRangeValues = values;
                      });
                    },
                  )
                ]),
                ExpansionTile(title: Text('Retailer'), children: <Widget>[
                  CheckboxListTile(
                    title: const Text('EveTech'),
                    value: this.retailer1,
                    onChanged: (bool value) {
                      _setState(() {
                        this.retailer1 = value;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Dreamware'),
                    value: this.retailer2,
                    onChanged: (bool value) {
                      _setState(() {
                        this.retailer2 = value;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text('Amptek'),
                    value: this.retailer3,
                    onChanged: (bool value) {
                      _setState(() {
                        this.retailer3 = value;
                      });
                    },
                  ),
                ]),
                ElevatedButton(
                  onPressed: () {
                    List<Product> filteredProducts = applyFilters(
                        products,
                        available,
                        limitedStock,
                        outOfStock,
                        notSpecified,
                        _priceRangeValues.start,
                        _priceRangeValues.end,
                        retailer1,
                        retailer2,
                        retailer3);
                    Navigator.push(context,
                        MaterialPageRoute(builder: (BuildContext context) {
                      return buildResultSuccess(context, filteredProducts);
                    }));
                  },
                  child: const Text('Apply'),
                ),
              ],
            ),
          )),
          body: Container(
              decoration: BoxDecoration(
                color: Colors.white,
              ),
              child: ProductListView(context, products)));
}

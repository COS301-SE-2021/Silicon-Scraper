import 'package:flutter/material.dart';

import 'package:flutter/cupertino.dart';
import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/services/getProducts.dart';

class SearchPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) =>
      Scaffold(
        appBar: AppBar(
          title: Center(
              child: Text(
                "Search",
                style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 25),
              )),
          actions: [
            IconButton(
              icon: Icon(Icons.search),
              color: Colors.black,
              onPressed: () async {
                showSearch(context: context, delegate: ProductSearch());
              },
            )
          ],
          backgroundColor: Colors.red[800],
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
  String availabilityFilter = "";
  String retailerFilter = "";
  double priceFilter = 0.0;

  @override
  List<Widget> buildActions(BuildContext context) =>
      [
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
  Widget buildLeading(BuildContext context) =>
      IconButton(
        icon: Icon(Icons.arrow_back),
        onPressed: () => close(context, null),
      );

  @override
  Widget buildResults(BuildContext context) =>
      FutureBuilder<List<Product>>(
        future: getProducts(),
        builder: (context, snapshot) {
          switch (snapshot.connectionState) {
            case ConnectionState.waiting:
              return Center(child: CircularProgressIndicator());
            default:
              if (snapshot.hasError) {
                return Container(
                  color: Colors.white,
                  alignment: Alignment.center,
                  child: Text(
                    'Something went wrong!',
                    style: TextStyle(fontSize: 28, color: Colors.black),
                  ),
                );
              } else {
                // get results from the query (after user presses enter/ clicks on a suggestion)
                List<Product> products = getResults(snapshot.data, query);
                if (products.isEmpty) {
                  return buildNoResults();
                }
                return buildResultSuccess(context, products);
              }
          }
        },
      );

  @override
  Widget buildSuggestions(BuildContext context) =>
      Container(
        color: Colors.white,
        child: FutureBuilder<List<Product>>(
          future: getProducts(),
          builder: (context, snapshot) {
            if (query.isEmpty) return buildNoSuggestions();

            switch (snapshot.connectionState) {
              case ConnectionState.waiting:
                return Center(child: CircularProgressIndicator());
              default:
                if (snapshot.hasError || snapshot.data.isEmpty) {
                  return buildNoSuggestions();
                } else {
                  List<String> productBrandOrModel = getSuggestions(
                      snapshot.data, query);
                  if (productBrandOrModel.isEmpty) {
                    return buildNoSuggestions();
                  }
                  return buildSuggestionsSuccess(productBrandOrModel);
                }
            }
          },
        ),
      );

  Widget buildNoSuggestions() =>
      Center(
        child: Text(
          'No suggestions',
          style: TextStyle(fontSize: 28, color: Colors.black),
        ),
      );

  Widget buildSuggestionsSuccess(List<String> suggestions) =>
      ListView.builder(
        itemCount: suggestions.length,
        itemBuilder: (context, index) {
          final suggestion = suggestions[index];
          final queryText = suggestion.substring(0, query.length);
          final remainingText = suggestion.substring(query.length);

          return ListTile(
            tileColor: Colors.white,
            onTap: () {
              query = suggestion;
              // user clicks on suggestion this calls buildresults
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

  Widget buildNoResults() =>
      Center(
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
            child: ListView(
              // Important: Remove any padding from the ListView.
              padding: EdgeInsets.zero,
              children: <Widget>[
                ListTile(
                  title: Text('Availability'),
                  trailing: IconButton(
                    icon: Icon(Icons.arrow_downward),
                    color: Colors.black,
                    onPressed: () async {
                      openAvailabilityFilter();
                    },
                  )
                ),
                ListTile(
                  title: Text('Retailer'),
                    trailing: IconButton(
                      icon: Icon(Icons.arrow_downward),
                      color: Colors.black,
                      onPressed: () async {
                        openRetailerFilter();
                      },
                    )
                ),
                ListTile(
                  title: Text('Price'),
                    trailing: IconButton(
                      icon: Icon(Icons.arrow_downward),
                      color: Colors.black,
                      onPressed: () async {
                        openPriceFilter();
                      },
                    )
                ),
                ElevatedButton(
                  onPressed: () {
                    // function to apply all the filters to the search query and return the products
                  },
                  child: const Text('Apply'),
                ),
              ],
            ),
            // child: Center(
            //   child: Column(
            //     mainAxisAlignment: MainAxisAlignment.center,
            //     children: <Widget>[
            //       Text('This is the Drawer'),
            //       ElevatedButton(
            //         onPressed: (){
            //           // function to apply all the filters to the search query
            //           showResults(context);
            //         },
            //         child: const Text('Apply'),
            //       ),
            //     ],
            //   ),
            // ),
          ),
          body: Container(
              decoration: BoxDecoration(
                color: Colors.white,
              ),
              child: ProductListView(context, products)

          ));
}

import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
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
    return search.getSearchResults(query);
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    return search.getSearchSuggestions(query);
  }

}

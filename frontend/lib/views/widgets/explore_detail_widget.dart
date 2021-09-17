import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/view_models/explore_detail_view_model.dart';
import 'package:silicon_scraper/views/search_view.dart';
import 'package:silicon_scraper/views/watch_list_view.dart';
import 'package:silicon_scraper/views/widgets/app_bar_widget.dart';

/// to view a more detailed view of the products previewed on the explore page
/// navigate to here from "show all" or from the "explore all" clickable image
/// show a list of products based of what was clicked

class ExploreDetailWidget extends StatefulWidget {
  final String productType;

  ExploreDetailWidget(this.productType);

  @override
  _ExploreDetailWidgetState createState() =>
      _ExploreDetailWidgetState(productType);
}

class _ExploreDetailWidgetState extends State<ExploreDetailWidget> {
  ExplorePageViewModelSingleton explore =
      ExplorePageViewModelSingleton.getState();

  String productType;

  _ExploreDetailWidgetState(this.productType);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        // appBar: AppBar(
        //   iconTheme: IconThemeData(
        //     color: Colors.black,
        //   ),
        //   backgroundColor: Colors.white,
        //   elevation: 1.0,
        //   title: Text(
        //     explore.getTitle(productType),
        //     maxLines: 1,
        //     overflow: TextOverflow.ellipsis,
        //     style: TextStyle(
        //         color: Colors.black, fontWeight: FontWeight.bold, fontSize: 25),
        //   ),
        //   actions: [
        //     IconButton(
        //       icon: Icon(Icons.search),
        //       onPressed: () async {
        //         showSearch(context: context, delegate: ProductSearch());
        //       },
        //     ),
        //     // IconButton(
        //     //   icon: Icon(Icons.bookmarks_rounded),
        //     //   onPressed: () async {
        //     //     Navigator.push(context, MaterialPageRoute(
        //     //         builder: (context) => WatchList()));
        //     //   },
        //     // ),
        //     // IconButton(
        //     //   icon: Icon(Icons.person),
        //     //   onPressed: () async {},
        //     // ),
        //   ],
        // ),
        //backgroundColor: Colors.white,
      appBar: appbar(context, productType, 2),
        body: Container(
          child: explore.getExplorePageProducts(productType, true)
        ));
  }
}

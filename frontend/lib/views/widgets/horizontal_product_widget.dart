import 'package:flutter/material.dart';
import 'package:silicon_scraper/view_models/product_view_model.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';
import 'package:silicon_scraper/views/widgets/product_detail_widget.dart';
import 'package:provider/provider.dart';

class HorizontalProductWidget extends StatelessWidget {
  const HorizontalProductWidget({Key key, this.state}) : super(key: key);
  final ProductViewModel state;

  @override
  Widget build(BuildContext context) {
    return Consumer<WatchListViewModel>(
        builder: (BuildContext context, WatchListViewModel w, Widget child) {
      return Container(
        child: Card(
          shape: RoundedRectangleBorder(
            side: BorderSide(color: Colors.black12, width: 1),
          ),
          //margin: EdgeInsets.fromLTRB(10, 10, 10, 0),
          child: InkWell(
            onTap: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => ProductDetailWidget(state)));
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                /// image
                Container(
                  height: MediaQuery.of(context).size.height / 5,
                  width: MediaQuery.of(context).size.width * 0.33,
                  child: Image.network(
                    '${state.item.image}',
                  ),
                ),

                /// rest of the product information
                Container(
                  height: MediaQuery.of(context).size.height / 5,
                  width: MediaQuery.of(context).size.width/ 1.7,
                  margin: EdgeInsets.fromLTRB(10, 15, 10, 5),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      /// product name (brand + model)
                      Container(
                        child: Text(
                          "${state.item.brand + " " + state.item.model}",
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.left,
                          style: TextStyle(
                            fontSize: 18,
                            color: Color.fromARGB(220, 0, 0, 0),
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),

                      ///retailer
                      Container(
                        margin: EdgeInsets.only(top: 5),
                        child: Text(
                          "${state.item.retailer[0].toUpperCase()}${state.item.retailer.substring(1)}",
                          textAlign: TextAlign.right,
                          style: TextStyle(
                            fontSize: 15,
                            color: Color.fromARGB(128, 0, 0, 0),
                          ),
                        ),
                      ),

                      /// bookmark button, availability and price
                      Container(
                        margin: EdgeInsets.only(right: 15),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [

                            /// bookmark button
                            Container(
                              margin: EdgeInsets.only(left: 0, top: 10),
                              height: MediaQuery.of(context).size.height / 20,
                              width: MediaQuery.of(context).size.width / 12.7,
                              child: FloatingActionButton(
                               // elevation: 0,
                                heroTag: state.item.id,
                                backgroundColor: Colors.white,
                                child: state.save,
                                onPressed: () {
                                  print('widget: ${state.item.id}');
                                  state.changeState(context);
                                },
                              ),
                            ),

                            /// availability and price
                            Column(
                              mainAxisAlignment: MainAxisAlignment.end,
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                ///availability
                                Container(
                                  margin: EdgeInsets.only(top: 5),
                                  child: state.item.getAvailabilityTextFormat("horizontal"),
                                ),
                                ///price
                                Container(
                                  margin: EdgeInsets.only(top: 5),
                                  child: Text(
                                      'R ${state.item.price.toStringAsFixed(2)}',
                                      overflow: TextOverflow.ellipsis,
                                      textAlign: TextAlign.right,
                                      style: TextStyle(
                                          fontSize: 18,
                                          color: Colors.black)),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      );
    });
  }
}

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
                  width: MediaQuery.of(context).size.width/ 1.7,
                  height: MediaQuery.of(context).size.height / 5,
                  margin: EdgeInsets.fromLTRB(10, 5, 10, 5),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      /// product name (brand + model)
                      Container(
                        // width: MediaQuery.of(context).size.width * 0.66,
                        // margin: EdgeInsets.only(top: 5),
                        child: Text(
                          "${state.item.brand + " " + state.item.model}",
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.left,
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),

                      ///retailer
                      Container(
                        // width: MediaQuery.of(context).size.width * 0.66,
                        // margin: EdgeInsets.only(top: 5),
                        child: Text(
                          "${state.item.retailer[0].toUpperCase()}${state.item.retailer.substring(1)}",
                          textAlign: TextAlign.left,
                          style: TextStyle(
                            fontSize: 12,
                            color: Color.fromARGB(128, 0, 0, 0),
                            //fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),

                      /// bookmark button, availability and price
                      Container(
                        width: MediaQuery.of(context).size.width/ 1.7,
                        // margin: EdgeInsets.fromLTRB(5, 0, 0, 0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            /// bookmark button
                            Container(
                              margin: EdgeInsets.only(left: 15, top: 5),
                              //alignment: Alignment.centerRight,
                              height: MediaQuery.of(context).size.height / 20,
                              width: MediaQuery.of(context).size.width / 12.7,
                              child: FloatingActionButton(
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
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                ///availability
                                Container(
                                  child: state.item.getAvailabilityTextFormat(),
                                ),

                                ///price
                                Container(
                                  //margin: EdgeInsets.only(top: 5),
                                  child: Text(
                                      'R ${state.item.price.toStringAsFixed(2)}',
                                      overflow: TextOverflow.ellipsis,
                                      textAlign: TextAlign.left,
                                      style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                          color: Colors.black)),
                                ),
                              ],
                            )
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

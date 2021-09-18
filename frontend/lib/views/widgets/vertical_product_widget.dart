import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/view_models/product_view_model.dart';
import 'package:silicon_scraper/views/widgets/product_detail_widget.dart';
import 'package:provider/provider.dart';

class VerticalProductWidget extends StatefulWidget {
//  final Product item;
  final ProductViewModel state;
  const VerticalProductWidget({Key key, this.state}) : super(key: key);

  @override
  _VerticalProductWidgetState createState() => _VerticalProductWidgetState();
}

class _VerticalProductWidgetState extends State<VerticalProductWidget> {

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<ProductViewModel>(
      create: (_) => widget.state,
      child: Consumer<ProductViewModel>(
        builder:(context,ProductViewModel w,_) =>  Container(
          width: MediaQuery.of(context).size.width / 2.5,
          height: MediaQuery.of(context).size.height/ 3,
          child: Card(
            //elevation: 1.0,
            shape: RoundedRectangleBorder(
              side: BorderSide(color: Colors.black12, width: 1),
            ),
            margin: EdgeInsets.only(right: 15),
            child: InkWell(
              onTap: () {
                Navigator.push(context, MaterialPageRoute(
                    builder: (context) => ProductDetailWidget(widget.state)));
              },
                child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    /// image
                    Container(
                      width: MediaQuery.of(context).size.width / 2.75,
                      height: MediaQuery.of(context).size.height /6.3,
                      child: Image.network('${widget.state.item.image}',),
                    ),
                    /// product name (brand+model)
                    Container(
                      width: MediaQuery.of(context).size.width / 2.75,
                      //height: MediaQuery.of(context).size.height / 39,
                      margin: EdgeInsets.fromLTRB(5, 5, 0, 0),
                      child: Text("${widget.state.item.brand+" "+widget.state.item.model}", maxLines: 2, overflow: TextOverflow.ellipsis,textAlign: TextAlign.left,style: TextStyle(
                          fontSize: 15, color: Color.fromARGB(235, 78, 78, 78), fontWeight: FontWeight.w500),),
                    ),
                    /// availability, price and bookmark button
                    Container(
                      width: MediaQuery.of(context).size.width /2.75,
                      //height: MediaQuery.of(context).size.height / 29.24,
                      margin: EdgeInsets.fromLTRB(5, 0, 0, 0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          /// availability and price
                          Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              ///availability
                              Container(
                                child: widget.state.item.getAvailabilityTextFormat("vertical"),
                              ),
                              ///price
                              Container(
                                margin: EdgeInsets.only(top: 3, bottom: 3),
                                child:
                                Text('R ${widget.state.item.price.toStringAsFixed(2)}', overflow: TextOverflow.ellipsis, textAlign: TextAlign.left, style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.black)),
                              ),
                            ],
                          ),
                          /// bookmark button
                          Container(
                              margin: EdgeInsets.only(left: 8, bottom: 5),
                              //alignment: Alignment.centerRight,
                              height: MediaQuery.of(context).size.height / 20,
                              width: MediaQuery.of(context).size.width / 12.7,
                              child: FloatingActionButton(backgroundColor: Colors.white,
                                child: widget.state.save, onPressed:
                                    (){
                                  setState(() {
                                    widget.state.changeState(context);
                                  });
                                },)
                          )
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

          ),
        ),
      ),
    );
  }
}


import 'package:flutter/material.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/views/widgets/product_detail_widget.dart';

class HorizontalProductWidget extends StatefulWidget {
  final Product item;
  const HorizontalProductWidget({Key key, this.item}) : super(key: key);

  @override
  _HorizontalProductWidgetState createState() => _HorizontalProductWidgetState();
}

class _HorizontalProductWidgetState extends State<HorizontalProductWidget> {
  @override
  Widget build(BuildContext context)
  {
      return Container(
        child: Card(
          elevation: 60.0,
          shape: RoundedRectangleBorder(
            side: BorderSide(color: Colors.white70, width: 1),
            borderRadius: BorderRadius.only(
                topRight: Radius.circular(10), bottomRight: Radius.circular(10)),
          ),
          margin: EdgeInsets.fromLTRB(10, 10, 10, 0),
          child: InkWell(
            onTap: ()
            {
              Navigator.push(context, MaterialPageRoute(
                  builder: (context) => ProductDetailWidget(widget.item)));
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  height: MediaQuery.of(context).size.height / 6,
                  child: Image.network('${widget.item.image}',),
                ),
                Container(
                  width: MediaQuery.of(context).size.width /1.5,
                  margin: EdgeInsets.fromLTRB(20, 0, 0, 0),
                  height: MediaQuery.of(context).size.height / 6,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Text("${widget.item.brand+" "+widget.item.model}", textAlign: TextAlign.center,style: TextStyle(
                        fontSize: 15, fontWeight: FontWeight.bold,),),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            margin: EdgeInsets.only(left: 0, right: 20, top: 10),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("${widget.item.retailer}", style: TextStyle(
                                  fontSize: 15, fontWeight: FontWeight.bold,),
                                  textAlign: TextAlign.left,),
                                widget.item.getAvailabilityText(15, TextAlign.center),
                              ],
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(top: 10),
                            child: Column(
                              children: [
                                Text("R${widget.item.price}", style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.green)),
                              ],
                            ),
                          )
                        ],
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),

        ),
      );
  }
}


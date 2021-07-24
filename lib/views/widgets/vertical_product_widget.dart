import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/views/widgets/product_detail_widget.dart';

class VerticalProductWidget extends StatefulWidget {
  final Product item;
  const VerticalProductWidget({Key key, this.item}) : super(key: key);

  @override
  _VerticalProductWidgetState createState() => _VerticalProductWidgetState();
}

class _VerticalProductWidgetState extends State<VerticalProductWidget> {
  @override
  Widget build(BuildContext context)
  {
    return Container(
      width: MediaQuery.of(context).size.width / 2.75,
      height: MediaQuery.of(context).size.height/ 4,
      child: Card(
        //elevation: 1.0,
        shape: RoundedRectangleBorder(
          side: BorderSide(color: Colors.black12, width: 1),
          ),
        margin: EdgeInsets.only(right: 15),
        child: InkWell(
          onTap: () {
            Navigator.push(context, MaterialPageRoute(
                builder: (context) => ProductDetailWidget(widget.item)));
          },
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /// image
              Container(
                width: MediaQuery.of(context).size.width / 3,
                height: MediaQuery.of(context).size.height / 7.3,
                child: Image.network('${widget.item.image}',),
              ),
              /// product name (brand+model)
              Container(
                width: MediaQuery.of(context).size.width / 3,
                //height: MediaQuery.of(context).size.height / 39,
                margin: EdgeInsets.fromLTRB(5, 5, 0, 0),
                child: Text("${widget.item.brand+" "+widget.item.model}", textAlign: TextAlign.left,style: TextStyle(
                  fontSize: 14, color: Colors.black54, fontWeight: FontWeight.bold),),
              ),
              /// price and bookmark button
              Container(
                width: MediaQuery.of(context).size.width /3,
                //height: MediaQuery.of(context).size.height / 29.24,
                margin: EdgeInsets.fromLTRB(5, 0, 0, 0),
                child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        /// price
                        Container(
                          margin: EdgeInsets.only(top: 5),
                          child:
                              Text('R ${widget.item.price.toStringAsFixed(2)}', textAlign: TextAlign.left, style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black)),
                          ),
                        /// bookmark button
                        Container(
                          margin: EdgeInsets.only(left: 5),
                          height: MediaQuery.of(context).size.height / 25,
                            width: MediaQuery.of(context).size.width / 16.7,
                          child: FloatingActionButton(backgroundColor: Colors.white,
                            child: Icon(Icons.bookmark_border, color: Colors.black, size: 20,), onPressed: (){},)
                        )
                      ],
                    ),
                ),
            ],
          ),
        ),

      ),
    );
  }
}


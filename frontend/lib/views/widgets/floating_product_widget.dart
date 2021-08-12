import 'package:flutter/material.dart';
import 'package:silicon_scraper/view_models/product_view_model.dart';
import 'package:silicon_scraper/views/widgets/product_detail_widget.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';
import 'package:provider/provider.dart';

class FloatingProductWidget extends StatelessWidget {

  const FloatingProductWidget({Key key,this.state}) : super(key: key);
  final ProductViewModel state;

  @override
  Widget build(BuildContext context)
  {
    return Consumer<WatchListViewModel>(
      builder: (BuildContext context,WatchListViewModel w, Widget child)
      {
        return Container(
            margin: EdgeInsets.fromLTRB(5, 0, 0, 0),
            height: MediaQuery.of(context).size.height / 4 ,

            child: InkWell(
              onTap: ()
              {
                Navigator.push(context, MaterialPageRoute(builder: (context) => ProductDetailWidget(state)));
              },
              child: Stack(
                children: [
                  Positioned(
                    bottom: 30,
                    right:5,
                    child: Stack(
                        children: [
                          Container(
                            height:120,
                            width: MediaQuery.of(context).size.width*0.85,
                            child: Card(
                              elevation: 0,
                              color: Colors.white,
                              child: Container(
                                padding: EdgeInsets.fromLTRB(MediaQuery.of(context).size.width*0.20, 0, 0, 0),
                                ///Brand + Model
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
//                          Divider(
//                            height:0,
//                            thickness: 5,
//                            color: Colors.black,
//                          ),
                                    Text("${state.item.brand+" "+state.item.model}", textAlign: TextAlign.center,style: TextStyle(
                                      fontSize: 15, fontWeight: FontWeight.bold,),),
                                    Container(
                                      padding: EdgeInsets.only(left: 0, right: 0, top: 10),
                                      child: Row(
                                        mainAxisAlignment: MainAxisAlignment.start,
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          ///Retailer
                                          Container(
                                            width:(MediaQuery.of(context).size.width*0.85)*0.3,
                                            child: Column(
                                              crossAxisAlignment: CrossAxisAlignment.start,
                                              children: [
                                                Text("${state.item.retailer}", style: TextStyle(
                                                  fontSize: 15, fontWeight: FontWeight.bold,),
                                                  textAlign: TextAlign.left,),
                                                ///Availability
                                                SizedBox(
                                                    height:(MediaQuery.of(context).size.height/4)*0.05
                                                ),
                                                state.item.getAvailabilityText(15, TextAlign.center),
                                              ],
                                            ),
                                          ),
                                          ///price
                                          SizedBox(
                                              width:(MediaQuery.of(context).size.width*0.85)*0.05
                                          ),
                                          Container(
                                            margin: EdgeInsets.only(top: 10),
                                            child: Column(
                                              children: [
                                                Text("R${state.item.price}", style: TextStyle(
                                                    fontSize: 18,
                                                    fontWeight: FontWeight.bold,
                                                    color: Colors.green)),
                                              ],
                                            ),
                                          ),

                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          ///Bookmark button
                          Positioned(
                            bottom: 10,
                            right:0,
                            child: Container(
                              height: 40,
                              child: FloatingActionButton(
                                backgroundColor: Colors.white,
                                child: state.save, onPressed: (){
                                print('widget: ${state.item.id}');
                                state.changeState(context);

                              },),
                            ),
                          ),
                          /// divider line
                          Positioned(
                            bottom: 0,
                            right: 5,
                            child: Container(
                              width: 280,
                              child: Divider(
                                height:0,
                                thickness: 1,
                                color: Colors.grey,
                              ),
                            ),
                          )
                        ]
                    ),
                  ),
                  ///image
                  Container(
                    height: MediaQuery.of(context).size.height / 5,
                    child: Image.network('${state.item.image}',),
                  ),

                ],
              ),
            )
        );
      }
    );
  }
}

/*
Card(
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
* */
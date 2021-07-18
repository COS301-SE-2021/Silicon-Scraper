import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/watch_list_service.dart';
import 'package:silicon_scraper/theme/colors.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';


class ProductDetailWidget extends StatefulWidget
{

  final Product item;
  ProductDetailWidget(this.item);
  get photo => item.image;
  get retailer => item.retailer;
  get price => item.price;
  get Availabilitytext => item.getAvailabilityText(15,TextAlign.left);
  get brand => item.brand;
  get model => item.model;
  get desctiption => item.description;
  get url => item.url;

  @override
  _ProductDetailWidgetState createState() => _ProductDetailWidgetState(item);
}

class _ProductDetailWidgetState extends State<ProductDetailWidget> {

  WatchListSingleton watch= WatchListSingleton.getState();
  Product item;
  _ProductDetailWidgetState(this.item);
  bool inWatch;
  double buttonHeight= 200;

  @override
  void initState()
  {
    inWatch=watch.findItem(item);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final panelClose=MediaQuery.of(context).size.height/3;
    final panelOpen=MediaQuery.of(context).size.height*0.8;
    return Scaffold(
      appBar: AppBar(

        title:
        Text("Product detail",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 25),),
        centerTitle: true,
      ),
      body: Container(
        color: Colors.grey[300],
        child: Stack(
//          overflow: Overflow.visible,
          children: [
            Container(
//              color: Colors.grey,
              alignment: Alignment.topCenter,
//        margin: EdgeInsets.fromLTRB(0, 0, 0,MediaQuery.of(context).size.height/3 ),
              height: MediaQuery.of(context).size.height/2,
              width: MediaQuery.of(context).size.width,
              child: Image.network('${widget.photo}',),
            ),

        Stack(
          children: [
            SlidingUpPanel(
              padding:EdgeInsets.fromLTRB(0, 0, 0, 50) ,

              onPanelSlide: (position)=>setState(()
              {
                final panelMaxScrollExtent=panelOpen-panelClose;
                buttonHeight=position*panelMaxScrollExtent+200;
              }),
              backdropEnabled: true,
              minHeight:panelClose,
              maxHeight: panelOpen,
              margin: EdgeInsets.fromLTRB(10, 0, 10, 0),
              borderRadius: BorderRadius.vertical(top: Radius.circular(20.0)),
              header:Container(
                width:MediaQuery.of(context).size.width-20 ,
                padding: EdgeInsets.only(top:10,left:50,right:50),
                child: Wrap(
                  alignment: WrapAlignment.center,
                  children: [
                    Text("${widget.brand +" "+ widget.model}",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold,),textAlign: TextAlign.center,),
                    Container(
                      margin: EdgeInsets.fromLTRB(10, 0, 10, 0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Text("Retailer: ${widget.retailer}",style: TextStyle(fontSize: 20,color: Colors.grey),),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
//              footer:Container(
//                height: 40,
//                width: MediaQuery.of(context).size.width,
////                padding: EdgeInsets.fromLTRB(5, 0, 5, 80),
//                child:Row(
//                  children: [
//                    Container(
//                      width: MediaQuery.of(context).size.width/2,
//                      child: Text('R${widget.price}'),
//                    ),
//                    Container(
//                        child: ElevatedButton(
//                          onPressed: () { },
//                          child: Icon(Icons.web),
//                        )
//                    ),
//                  ],
//                ) ,
//              ),
              panel: Padding(
                  padding: EdgeInsets.fromLTRB(20, 90, 20, 0),
                  child: Text("${widget.desctiption}")
              ),

            ),
            Positioned(
                right: 10,
                bottom: buttonHeight,
                child: FloatingActionButton(
                  backgroundColor: Colors.white,
                  child: Icon(Icons.bookmark_outline,color: Colors.black,), onPressed: (){},
                )
            ),
          Positioned(
            bottom: 0,
            right:10,
            left:10,
            child: Container(
//              decoration: BoxDecoration(
//                border: Border(
//                  top: BorderSide( //                    <--- top side
//                    color: Colors.grey,
//                    width: 1.0,
//                  ),
//                ),
//              ),
////              color: Colors.grey,
              height: 50,
              width: MediaQuery.of(context).size.width,
//                padding: EdgeInsets.fromLTRB(5, 0, 5, 80),
              child:Container(
                margin: EdgeInsets.fromLTRB(10, 0, 10, 0),
                width: (MediaQuery.of(context).size.width/2)-20,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      child: Column(
                        children: [
                          widget.Availabilitytext,
                          Text('R ${widget.price.toStringAsFixed(2)}',style: TextStyle(fontSize: 25,fontWeight: FontWeight.w400),),
                        ],
                      ),
                    ),
                    Container(
                        margin: EdgeInsets.fromLTRB(40, 0, 0, 0),
                        child: FlatButton(
                          onPressed: () { },
//                       style: ButtonStyle(
//                          backgroundColor: MaterialStateProperty.all(myOrange),
//                        ),
                        color: myOrange,
                          child: Row(
                            children:[
                              Icon(Icons.web,color: Colors.white),
                              Text("VISIT SITE",style: TextStyle(fontSize: 18,color: Colors.white),)
                            ]
                          ),
                        )
                    ),
                  ],
                ),
              ) ,
            ),
          )
        ]
        ),
          ],
        ),
      ),
//      persistentFooterButtons: [
//////        ElevatedButton(onPressed: (){
//////        setState(()async {
//////          if(!inWatch)
//////          {
//////            inWatch=await watch.addRequest(item);
//////          }
//////          else if(inWatch)
//////          {
//////            inWatch=await watch.removeRequest(item);
//////          }
//////        });
//////      },  child:Icon(Icons.bookmark_outline_rounded,color: Colors.white,))
////        Container(
////        child: Text('R${widget.price}'),
////        ),
////        ElevatedButton(child: Icon(Icons.web,color:Colors.orange),
////          onPressed: ()async{
////            var url = widget.url;
////            return await launch(url);
////
////          },
////            )
////      ],
    );
  }

}


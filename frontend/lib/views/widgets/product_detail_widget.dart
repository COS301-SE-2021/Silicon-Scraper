import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/models/prediction_model.dart';
import 'package:silicon_scraper/theme/colors.dart';
import 'package:silicon_scraper/view_models/prediction_view_model.dart';
import 'package:silicon_scraper/view_models/product_view_model.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:url_launcher/url_launcher.dart';
//import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../analytics_view.dart';


class ProductDetailWidget extends StatefulWidget
{
  final ProductViewModel state;
  ProductDetailWidget(this.state);

  @override
  _ProductDetailWidgetState createState() => _ProductDetailWidgetState(state);
}

class _ProductDetailWidgetState extends State<ProductDetailWidget> {
  _ProductDetailWidgetState(this.state);
  final ProductViewModel state;
  double buttonHeight= 200;
  final DateFormat f=DateFormat("yyy-MM-dd");

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
          children: [
            ///image
//            Container(
//              decoration: BoxDecoration(
//                gradient: LinearGradient(
//                  colors: [
//                    Colors.black,
//                    Colors.blue
//                  ],
//                  begin: Alignment.topLeft,
//                  end: Alignment.bottomRight,
//                  stops: [0, 1],
//                ),
//              ),
//            ),
            Container(
              alignment: Alignment.topCenter,
              height: MediaQuery.of(context).size.height/2,
              width: MediaQuery.of(context).size.width,
              child: Image.network('${widget.state.item.image}',),
            ),
          ///panel
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
                  ///header
                  /*header:Container(
                    height: (MediaQuery.of(context).size.height)*0.1,
                    width:MediaQuery.of(context).size.width-20 ,
                    padding: EdgeInsets.only(top:10,*//*left:50,*//*right:50),
                    child: Wrap(
                      alignment: WrapAlignment.center,
                      children: [
                        Text("${widget.state.item.brand +" "+ widget.state.item.model}",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold,),textAlign: TextAlign.center,),
                        Container(
                          margin: EdgeInsets.fromLTRB(20, 0, 10, 0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              Text("Retailer: ${widget.state.item.retailer}",style: TextStyle(fontSize: 20,color: Colors.grey),),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),*/
                  ///description panel
                  panel: Container(
                      padding: EdgeInsets.fromLTRB(20,0, 20, 0),
                      child: Column(
                        children: [
                          Container(
//                            height: (MediaQuery.of(context).size.height)*0.1,
                            width:MediaQuery.of(context).size.width-20 ,
                            padding: EdgeInsets.only(top:10,/*left:50,*/right:50),
                            child: Wrap(
                              alignment: WrapAlignment.center,
                              children: [
                                Text("${widget.state.item.brand +" "+ widget.state.item.model}",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold,),textAlign: TextAlign.center,),
                                Container(
                                  margin: EdgeInsets.fromLTRB(15, 0, 10, 0),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      Text("Retailer: ${widget.state.item.retailer}",style: TextStyle(fontSize: 20,color: Colors.grey),),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                              Row(
                                children: [
                                  TextButton(onPressed: ()async
                                       {
                                         DateTime date= await showDatePicker(context: context, initialDate: DateTime.now(), firstDate: DateTime.now(), lastDate: DateTime.now().add(Duration(days: 365)));
                                         if(date!=null)
                                         {
                                         widget.state.predict.date=date;
                                         setState((){});
                                         await widget.state.predict.prediction(context);
                                         }
                                       }
                                       ,
                                       child: Text('Predict',style: TextStyle(fontSize: 18,color: Colors.black,fontWeight:FontWeight.w300),),style: ButtonStyle(
                                       backgroundColor: MaterialStateProperty.resolveWith<Color>(
                                             (Set<MaterialState> states) {
                                           if (states.contains(MaterialState.pressed))
                                             return white;
                                           return white; // Use the component's default.
                                         },
                                       ),
                                     ),),
                                    TextButton(
                                      child:Text("Analytics"),
                                      onPressed:()
                                      {
                                        Navigator.push(context, MaterialPageRoute(builder: (context) => AnalyticsView(widget.state.item)));
                                      },

                                  )
                                ],
                              ),
//                          Text("${widget.state.item.description}"),
                          bulletListWidget(widget.state.item.description),
                          ///date time picker

                    ChangeNotifierProvider.value(
//                      create: (_)=> widget.state.predict,
                      value:widget.state.predict ,
                      child: Consumer<PredictionViewModel >(
                          builder: (context,PredictionViewModel p,Widget child)
                          {
                            return Container(
                              decoration: BoxDecoration(
//                                borderRadius: BorderRadiusGeometry.only()
                              ),
//                              color: Colors.blueGrey,
                              child: p.predict !=null ? Column(
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text("${f.format(p.date)}",style: TextStyle(fontSize: 17,fontWeight: FontWeight.bold,))
                                    ],
                                  ),
                                  Column(
                                    children: [
                                      Text('Prediction',style:TextStyle(fontSize: 17,fontWeight: FontWeight.bold,color: Colors.grey),)
                                    ],
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                    children: [
                                      Container(
                                        child: p.arrow,
                                      ),
                                      Container(
                                        child: Text('R ${p.predict.price.toStringAsFixed(2)}',style:TextStyle(fontWeight: FontWeight.normal,fontSize: 17)),
                                      ),
                                      Container(
                                        child: p.predict.availability?Text('Available',style: TextStyle(fontWeight: FontWeight.bold,color: Colors.green)):Text('Out of Stock',style: TextStyle(fontWeight: FontWeight.bold,color: Colors.red)),
                                      ),
                                    ],
                                  ),
                                ],
                              ) :
                              Container(
//                      child: CircularProgressIndicator(),
                              ),
                            );
                          }
                      ),
                    ),
                        ],
                      )
                  ),
              ),
            ///bookmark button
            Positioned(
                right: 10,
                bottom: buttonHeight,
                child: FloatingActionButton(
                  backgroundColor: Colors.white,
                  child: state.save, onPressed: ()async{
                  await state.changeState(context);// first complete future
                    setState((){});// then set state
                },
                )
            ),
            /// bottom bar
            Positioned(
              bottom: 0,
              right:10,
              left:10,
              child: Container(
                height: 50,
                width: MediaQuery.of(context).size.width,
                child:Container(
                  margin: EdgeInsets.fromLTRB(10, 0, 10, 0),
                  width: (MediaQuery.of(context).size.width/2)-20,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        child: Column(
                          children: [
                            widget.state.getAvailabilityText(15,TextAlign.left),
                            Text('R ${widget.state.item.price.toStringAsFixed(2)}',style: TextStyle(fontSize: 25,fontWeight: FontWeight.w400),),
                          ],
                        ),
                      ),
                      Container(
                          margin: EdgeInsets.fromLTRB(40, 0, 0, 0),
                          child: FlatButton(
                            onPressed: ()async
                            {
                              var url = widget.state.item.url;
                                return await launch(url);
                            },
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
        ),],
        ),
      ),
    );
  }

}

Widget predictionWidget(PredictionViewModel p,BuildContext context)
{
  final DateFormat f=DateFormat("yyy-MM-dd");
  return ChangeNotifierProvider<PredictionViewModel>(
    create: (_)=> p,
    child: Consumer<PredictionViewModel >(
      builder: (context,p,Widget child)
          {
                return Container(
                  child: p.predict !=null ? Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                             Text("${f.format(p.date)}",style: TextStyle(fontSize: 17,fontWeight: FontWeight.bold,))
                        ],
                    ),
                    Column(
                      children: [
                        Text('Prediction',style:TextStyle(fontSize: 17,fontWeight: FontWeight.bold,color: Colors.grey),)
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Container(
                          child: p.arrow,
                        ),
                        Container(
                          child: Text('R ${p.predict.price.toStringAsFixed(2)}',style:TextStyle(fontWeight: FontWeight.normal,fontSize: 17)),
                        ),
                        Container(
                          child: p.predict.availability?Text('Available',style: TextStyle(fontWeight: FontWeight.bold,color: Colors.green)):Text('Out of Stock',style: TextStyle(fontWeight: FontWeight.bold,color: Colors.red)),
                        ),
                      ],
                      ),
                  ],
                  ) :
                  Container(
//                      child: CircularProgressIndicator(),
                    ),
            );
          }
    ),
  );
}

Widget bulletListWidget(String l)
{
  List listItems=l.split('/');
  listItems.removeAt(0);

  return ListView.builder(
    physics: NeverScrollableScrollPhysics(), // <-- this will disable scroll
    shrinkWrap: true,
      itemCount: listItems.length,
    itemBuilder: (_,index){
      return bulletListItem(listItems[index]);
    },
  );

}

Widget bulletListItem(String l)
{
  return Wrap(
    crossAxisAlignment: WrapCrossAlignment.center,
  children: [
    MyBullet(),
    Text(l,style: TextStyle(fontSize: 17),)
  ],
    );
}

class MyBullet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container(
      height: 5.0,
      width: 5.0,
      decoration: new BoxDecoration(
        color: Colors.black,
        shape: BoxShape.circle,
      ),
    );
  }
}
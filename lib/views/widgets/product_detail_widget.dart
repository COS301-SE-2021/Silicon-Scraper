import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/theme/colors.dart';
import 'package:silicon_scraper/view_models/product_view_model.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';


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
                  header:Container(
                    height: (MediaQuery.of(context).size.height)*0.1,
                    width:MediaQuery.of(context).size.width-20 ,
                    padding: EdgeInsets.only(top:10,/*left:50,*/right:50),
                    child: Wrap(
                      alignment: WrapAlignment.center,
                      children: [
                        Text("${widget.state.item.brand +" "+ widget.state.item.model}",style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold,),textAlign: TextAlign.center,),
                        Container(
                          margin: EdgeInsets.fromLTRB(10, 0, 10, 0),
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
                  ///description panel
                  panel: Container(
                      padding: EdgeInsets.fromLTRB(20, 90, 20, 0),
                      child: Column(
                        children: [
                          Text("${widget.state.item.description}"),
                          ///date time picker
                          TextButton(onPressed: (){
                            DatePicker.showDatePicker(context,
                            showTitleActions: true,
                            minTime: DateTime.now(),
                            maxTime: DateTime.now().add(Duration(days: 365)), onChanged: (date) {
                            print('change $date');
                            }, onConfirm: (date) {
                            print('confirm $date');
                            }, currentTime: DateTime.now(),);}
                          ,
                            child: Text('Predict the Future',style: TextStyle(fontSize: 20,color: Colors.white),),style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.resolveWith<Color>(
                                  (Set<MaterialState> states) {
                                if (states.contains(MaterialState.pressed))
                                  return candy;
                                return candy; // Use the component's default.
                              },
                            ),
                          ),)
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

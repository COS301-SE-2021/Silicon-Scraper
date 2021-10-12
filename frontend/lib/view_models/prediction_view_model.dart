import 'package:flutter/material.dart';
import 'package:silicon_scraper/injectors/prediction_service_injector.dart';
import 'package:silicon_scraper/models/prediction_model.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:intl/intl.dart';

class PredictionViewModel extends ChangeNotifier
{
  PredictionInjector _predictor=PredictionInjector();
  Product _item;
  DateTime _date;

  Prediction _predict;
  Icon _arrow;

  DateTime get date => _date;

  Icon get arrow => _arrow;
  Prediction get predict => _predict;

  set date(DateTime value) {
    _date = value;
  }

  PredictionViewModel(this._item);

  Future prediction(context)async
  {
    final DateFormat f=DateFormat("yyy-MM-dd");
    // todo receive response change UI
    try
    {
      showDialog(context: context, builder: (_)=> AlertDialog(
        title: Center(
            child:CircularProgressIndicator()
        ),
      ));
      _predict=await _predictor.dependency.predictionRequest(_item, _date);
      print("it worked");
      if(_predict.price==_item.price)
        {
          _arrow=null;
        }
      else if(_predict.price>_item.price)
        {
          _arrow=Icon(Icons.arrow_upward,color: Colors.red,size: 25,);
        }
      else
        {
          _arrow=Icon(Icons.arrow_downward,color: Colors.green,size: 25);
        }
      notifyListeners();
      Navigator.pop(context); /// remove the loading dialog before error is shown
      return showDialog(context: context, builder: (_)=> AlertDialog(
         content: Container(
           height:MediaQuery.of(context).size.height/4,
           child:Column(
             children: [
               Row(
                 mainAxisAlignment: MainAxisAlignment.center,
                 children: [
                   Text("${f.format(_date)}",style: TextStyle(fontSize: 17,fontWeight: FontWeight.bold,))
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
                     child: _arrow,
                   ),
                   Container(
                     child: Text('R ${_predict.price.toStringAsFixed(2)}',style:TextStyle(fontWeight: FontWeight.normal,fontSize: 17)),
                   ),
                   Container(
                     child: _predict.availability?Text('Available',style: TextStyle(fontWeight: FontWeight.bold,color: Colors.green)):Text('Out of Stock',style: TextStyle(fontWeight: FontWeight.bold,color: Colors.red)),
                   ),
                 ],
               ),
             ],
           )
         ),
      ),);

    }
    catch(e)
    {
      Navigator.pop(context); /// remove the loading dialog before error is shown
      if(e.message.contains("Failed"))
      {
        return showDialog(context: context, builder: (_)=> AlertDialog(
            title: Text("Please check your internet connection")),);
      }
      return showDialog(context: context, builder: (_)=> AlertDialog(
          title: Text("unknown error occurred on our server we're on it right away")),);

    }
  }
}
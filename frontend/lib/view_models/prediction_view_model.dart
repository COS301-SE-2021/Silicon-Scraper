import 'package:flutter/material.dart';
import 'package:silicon_scraper/injectors/prediction_service_injector.dart';
import 'package:silicon_scraper/models/prediction_model.dart';
import 'package:silicon_scraper/models/product_model.dart';

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
      return;
    }
    catch(e)
    {
      Navigator.pop(context); /// remove the loading dialog before error is shown
      return showDialog(context: context, builder: (_)=> AlertDialog(
          title: Text("${e.message}")),);
    }
  }
}
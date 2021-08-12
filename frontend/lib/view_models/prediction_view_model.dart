import 'package:flutter/material.dart';
import 'package:silicon_scraper/injectors/prediction_service_injector.dart';
import 'package:silicon_scraper/models/prediction_model.dart';
import 'package:silicon_scraper/models/product_model.dart';

class PredictionViewModel extends ChangeNotifier
{
  PredictionInjector predictor=PredictionInjector();
  Product _item;
  DateTime _date;

  Prediction _predict;
  Icon _arrow;

  Icon get arrow => _arrow;
  Prediction get predict => _predict;

  set date(DateTime value) {
    _date = value;
  }

  PredictionViewModel.initial(this._item);
  PredictionViewModel(this._item, this._date);

  Future prediction(context)async
  {
    // todo receive response change UI
    try
    {
      _predict=await predictor.dependency.predictionRequest(_item, _date);
      if(_predict.price==_item.price)
        {
          _arrow=null;
        }
      else if(_predict.price>_item.price)
        {
          _arrow=Icon(Icons.arrow_upward,color: Colors.red,);
        }
      else
        {
          _arrow=Icon(Icons.arrow_downward,color: Colors.green,);
        }
      notifyListeners();
    }
    catch(e)
    {
      //todo display error message
    }
  }
}
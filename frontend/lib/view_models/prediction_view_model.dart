import 'package:flutter/material.dart';
import 'package:silicon_scraper/injectors/prediction_service_injector.dart';
import 'package:silicon_scraper/models/product_model.dart';

class PredictionViewModel extends ChangeNotifier
{
  PredictionInjector predictor=PredictionInjector();
  Product _item;
  DateTime _date;

  double _price;
  String _availability;

  set item(Product value) {
    _item = value;
  }
  set date(DateTime value) {
    _date = value;
  }

  PredictionViewModel(this._item, this._date);

  Future predict(context)
  {
    // todo receive response change UI
    try
    {
      var json=predictor.dependency.predictionRequest(_item, _date);
      notifyListeners();
    }
    catch(e)
    {
      // todo push error screen
    }
  }

}
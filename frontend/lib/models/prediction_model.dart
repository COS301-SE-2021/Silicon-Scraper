
class Prediction
{
  bool _availability;
  double _price;

  Prediction(this._availability, this._price);

  double get price => _price;

  bool get availability => _availability;

  factory Prediction.fromJson(Map<String,dynamic>json)
  {
    return Prediction(json['predictions']['availability'], json['predictions']['availability']);
  }
}

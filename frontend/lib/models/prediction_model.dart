
class Prediction
{
  bool _availability;
  double _price;

  Prediction(this._availability, this._price);

  double get price => _price;

  bool get availability => _availability;

  factory Prediction.fromJson(Map<String,dynamic>json)
  {
    bool check;
    if(json['predictions']['price']==0)
      {
        check=false;
      }
    else
      {
        check=true;
      }
    return Prediction(check, json['predictions']['price']);
  }
}

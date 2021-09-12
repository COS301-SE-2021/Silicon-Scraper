
class PredictionData
{
  double price;
  DateTime time;

  PredictionData(this.price, this.time);

  factory PredictionData.fromJSON(Map<double,dynamic>json)
  {
    return PredictionData(json['predictions']['price'],json['predictions']['time']);
  }
}
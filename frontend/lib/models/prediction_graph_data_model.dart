
class PredictionData
{
  double price;
  DateTime time;

  PredictionData(this.price, this.time);

  factory PredictionData.fromJSON(Map<String,dynamic>json)
  {
    return PredictionData(json['price'].toDouble(),DateTime.parse(json['date']));
  }
}
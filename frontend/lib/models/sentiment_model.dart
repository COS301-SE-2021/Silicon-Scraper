
class Sentiment
{
  String type;
  bool polarity;
  double value;

  Sentiment(this.type, this.polarity, this.value);

  factory Sentiment.fromJSON(Map<String,dynamic>json)
  {
    return Sentiment(json["type"],json["polarity"],json["value"].toDouble()/100);
  }
}
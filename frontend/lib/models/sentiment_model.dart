
class Sentiment
{
  String type;
  bool polarity;
  double value;

  Sentiment(this.type, this.polarity, this.value);

  factory Sentiment.fromJSON(Map<String,dynamic>json)
  {
    bool polarity;
    if(json["polarity"]=="positive")
      {
        polarity=true;
      }
    else
      {
        polarity=false;
      }
    return Sentiment(json["type"],polarity,json["value"].toDouble()/100);
  }
}
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:silicon_scraper/services/firebase_notification_services.dart';

class NotificationViewModel
{
  NotificationService registerDevice=new NotificationService();
  register()async
  {
    await Firebase.initializeApp();
    SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
    String id=sharedPreferences.getString("userId");
    String firebaseToken=await FirebaseMessaging.instance.getToken();
    await registerDevice.register(id, firebaseToken);
  }
}
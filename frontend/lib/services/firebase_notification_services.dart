//import 'package:firebase_messaging/firebase_messaging.dart';
//
//final FirebaseMessaging _firebaseMessaging = FirebaseMessaging();
//_firebaseMessaging.configure(
//onLaunch: (Map<String, dynamic> message) {
//print('onLaunch called');
//},
//onResume: (Map<String, dynamic> message) {
//print('onResume called');
//},
//onMessage: (Map<String, dynamic> message) {
//print('onMessage called');
//},
//);
//_firebaseMessaging.subscribeToTopic('all');
//_firebaseMessaging.requestNotificationPermissions(IosNotificationSettings(
//sound: true,
//badge: true,
//alert: true,
//));
//_firebaseMessaging.onIosSettingsRegistered
//    .listen((IosNotificationSettings settings) {
//print('Hello');
//});
//_firebaseMessaging.getToken().then((token) {
//print(token); // Print the Token in Console
//});
//}
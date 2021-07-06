import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:silicon_scraper/pages/mainNavigator.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/theme/colors.dart';

void main() {
  SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
      )
  );
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
//        primarySwatch: Colors.green,
      primaryColorLight: deepBlue,
        appBarTheme: AppBarTheme(
          brightness: Brightness.dark,
              color: deepBlue
        )
      ),
      home: MainNavigator(),
    );
  }
}


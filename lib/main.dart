import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:silicon_scraper/injectors/prediction_service_injector.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';
import 'package:silicon_scraper/views/mainNavigator.dart';
import 'package:silicon_scraper/theme/colors.dart';
import 'injectors/dependency_types.dart';
import 'injectors/watch_list_service_injector.dart';
import 'package:provider/provider.dart';

void main() {
  WatchListInjector.configure(DependencyType.PROD);
  PredictionInjector.configure(DependencyType.MOCK,fail: false);

  /// this sets the initial products for the watch list do not remove
  WatchListViewModelSingleton.getState().setInitialProducts();

  SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
      )
  );
  runApp(
      MultiProvider(
          providers: [
            // TODO: register other dependencies
            ChangeNotifierProvider<WatchListViewModel>(
              create: (_) => WatchListViewModelSingleton.getState(),
            ),
          ],
          child: MyApp()
      )
  );
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
        backgroundColor: Colors.grey[600],
        appBarTheme: AppBarTheme(
          brightness: Brightness.dark,
              color: myLightBlue,
        )
      ),
      home: MainNavigator(),
    );
  }
}


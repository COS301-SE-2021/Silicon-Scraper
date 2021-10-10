import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/theme/colors.dart';
import 'package:silicon_scraper/views/widgets/app_bar_widget.dart';
import 'package:silicon_scraper/view_models/login_view_model.dart';
import 'package:silicon_scraper/views/recommendation_view.dart';
import 'package:silicon_scraper/views/watch_list_view.dart';
import 'package:silicon_scraper/views/explore_view.dart';

class MainNavigator extends StatefulWidget {
  MainNavigator({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MainNavigatorState createState() => _MainNavigatorState();
}

class _MainNavigatorState extends State<MainNavigator> {
  int pageIndex = 0;
  PageController pageController;
  @override
  void initState() {
    super.initState();
    pageController = PageController();
  }

  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }

  List<String> pageListString = ["explore", "watchlist", "discover"];
  List<Widget> pageList = <Widget>[Explore(), WatchList(), Recommendation()];

  @override
  Widget build(BuildContext context) {
    LoginViewModelSingleton login = LoginViewModelSingleton.getState();
    return Scaffold(
      appBar: appbar(context, pageListString[pageIndex], 1),
      // body: pageList[pageIndex],
      body: SizedBox.expand(
        child: PageView(
          controller: pageController,
          onPageChanged: (index) {
            setState(() => pageIndex = index);
          },
          children: <Widget>[Explore(), WatchList(), Recommendation()],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        /// when selected
        showSelectedLabels: true,
        selectedItemColor: Colors.black,
        selectedLabelStyle: TextStyle(color: Colors.black, fontWeight: FontWeight.w500),
        selectedIconTheme: IconThemeData(color: Colors.black, opacity: 1.0),

        /// when unselected grey out
        showUnselectedLabels: true,
        unselectedIconTheme: IconThemeData(color: Colors.black, opacity: 0.5),
        unselectedLabelStyle: TextStyle(color: Color.fromARGB(128, 0, 0, 0), fontWeight: FontWeight.w500),

        currentIndex: pageIndex,
        onTap: (value) {
          if (value == 3) {
            value = 0;
            login.logout(context);
          }
          setState(() {
            pageIndex = value;
            pageController.animateToPage(pageIndex, duration: Duration(milliseconds: 500), curve: Curves.easeOut);
          });
        },
        backgroundColor: Colors.white,
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.explore), label: "Home"),
          BottomNavigationBarItem(
              icon: Icon(Icons.bookmarks), label: "Watchlist"),
          BottomNavigationBarItem(
            icon: ImageIcon(
              AssetImage("assets/images/stars.png"),
            ),
            label: "Discover",
          ),
          BottomNavigationBarItem(icon: Icon(Icons.logout), label: "Logout"),
        ],
      ),
    );
  }
}

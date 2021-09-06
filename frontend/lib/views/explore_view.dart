import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:silicon_scraper/view_models/explore_detail_view_model.dart';
import 'package:silicon_scraper/view_models/login_view_model.dart';
import 'package:silicon_scraper/views/widgets/explore_detail_widget.dart';

class Explore extends StatefulWidget {

  @override
  _ExploreState createState() => _ExploreState();
}

class _ExploreState extends State<Explore> {
  ExplorePageViewModelSingleton explore = ExplorePageViewModelSingleton.getState();
  LoginViewModelSingleton login=LoginViewModelSingleton.getState();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(35.0),
          child: AppBar(
            title: Text(
              "Explore",
              style: TextStyle(
                  color: Colors.white, fontWeight: FontWeight.bold, fontSize: 25),
            ),
            centerTitle: true,
            actions: [
//          ElevatedButton(onPressed: (){
//            sharedPreferences.clear();
////            sharedPreferences.commit();
//          }, child: Icon(Icons.logout,color: Colors.white,),style: ButtonStyle(backgroundColor: MaterialStateProperty.all<Color>(myBlue) ),)
              IconButton(icon: Icon(Icons.logout,color: Colors.white,), onPressed: ()
              {
                login.logout(context);
              })
            ],
            //toolbarHeight: 35,
          ),
        ),
        body: SingleChildScrollView(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
              /// CPUs
              Container(
                  width: MediaQuery.of(context).size.width,
                  //height: MediaQuery.of(context).size.height / 39,
                  margin: EdgeInsets.fromLTRB(20, 5, 20, 0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "CPUs",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                            fontSize: 26,
                            color: Colors.black,
                            fontWeight: FontWeight.bold),
                      ),
                      RichText(
                        textAlign: TextAlign.right,
                        text: TextSpan(
                            text: 'show all',
                            recognizer: TapGestureRecognizer()
                              ..onTap = () {
                                Navigator.push(context, MaterialPageRoute(
                                    builder: (context) => ExploreDetailWidget("cpu")));
                              },
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.blue,
                            )),
                      ),
                    ],
                  )),
              Container(
                margin: EdgeInsets.only(left: 20, top: 10),
                decoration: BoxDecoration(color: Colors.white),
                height: MediaQuery.of(context).size.height / 4,
                child: explore.getExplorePageProducts("cpu", false),
              ),

              /// explore all products clickable picture
              Container(
                  margin: EdgeInsets.fromLTRB(20, 20, 20, 0),
                  child: InkWell(
                    onTap: () {
                      Navigator.push(context, MaterialPageRoute(
                          builder: (context) => ExploreDetailWidget("all")));
                    },
                    child: Image.asset(
                      'assets/images/explore_page_picture.jpg',
                      width: MediaQuery.of(context).size.width,
                      fit: BoxFit.cover,
                    ),
                  )),

              /// GPUs
              Container(
                  width: MediaQuery.of(context).size.width,
                  //height: MediaQuery.of(context).size.height / 39,
                  margin: EdgeInsets.fromLTRB(20, 10, 20, 0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "GPUs",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                            fontSize: 26,
                            color: Colors.black,
                            fontWeight: FontWeight.bold),
                      ),
                      RichText(
                        textAlign: TextAlign.right,
                        text: TextSpan(
                            text: 'show all',
                            recognizer: TapGestureRecognizer()
                              ..onTap = () {
                                Navigator.push(context, MaterialPageRoute(
                                    builder: (context) => ExploreDetailWidget("gpu")));
                              },
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.blue,
                            )),
                      ),
                    ],
                  )),
              Container(
                margin: EdgeInsets.only(left: 20, top: 10),
                decoration: BoxDecoration(color: Colors.white),
                height: MediaQuery.of(context).size.height / 4,
                child: explore.getExplorePageProducts("gpu", false),
              ),
            ])
            ));
  }
}

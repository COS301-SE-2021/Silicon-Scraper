import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/services/login_service.dart';
import 'package:silicon_scraper/view_models/login_view_model.dart';

class LoginView extends StatefulWidget {
  @override
  _LoginViewState createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  LoginViewModelSingleton login = LoginViewModelSingleton.getState();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
          backgroundColor: Colors.white,
          body: Center(
              child: Padding(
            padding: EdgeInsets.all(10),
            child: ListView(
              children: <Widget>[
                Container(
                  margin: EdgeInsets.only(bottom: 10),
                    alignment: Alignment.center,
                    height: MediaQuery.of(context).size.height / 3.5,
                    child: Image.asset('assets/images/transparent_logo.png')),
                // Container(
                //     alignment: Alignment.center,
                //     padding: EdgeInsets.all(10),
                //     child: Text(
                //       'Welcome ',
                //       style: TextStyle(fontSize: 20),
                //     )),
                Container(
                  padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
                  child: TextField(
                      controller: nameController,
                      decoration: InputDecoration(
                        //border: OutlineInputBorder(),
                        labelText: 'Username',
                      ),
                      style: TextStyle(
                          fontSize: 20, height: 1, letterSpacing: 1, color: Colors.black)),
                ),
                Container(
                  padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
                  child: TextField(
                      obscureText: true,
                      controller: passwordController,
                      decoration: InputDecoration(
                        //border: OutlineInputBorder(),
                        labelText: 'Password',
                      ),
                      style: TextStyle(
                          fontSize: 20, height: 1, letterSpacing: 1, color: Colors.black)),
                ),
                Container(
                    height: 60,
                    padding: EdgeInsets.fromLTRB(10, 15, 10, 0),
                    child: ElevatedButton(
                      style: ButtonStyle(),
                      child: Text('LOGIN', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),),
                      onPressed: () async {
                        print(nameController.text);
                        print(passwordController.text);
                        await login.login(nameController.text,
                            passwordController.text, context);
                      },
                    )),
                Container(
                    child: Row(
                  children: <Widget>[
                    Text('Don\'t have an account yet?'),
                    FlatButton(
                      textColor: Colors.blue,
                      child: Text(
                        'Sign Up',
                        style: TextStyle(fontSize: 20),
                      ),
                      onPressed: () {
                        login.goToSignUp(context);
                      },
                    )
                  ],
                  mainAxisAlignment: MainAxisAlignment.center,
                ))
              ],
            ),
          )),
        );
//       return Scaffold(
//          appBar: PreferredSize(
//            preferredSize: Size.fromHeight(10),
//            child: AppBar(
//               brightness: Brightness.light,
//              backgroundColor: Colors.white,
//              elevation:0
//            ),
//          ),
//          backgroundColor: Colors.white,
//           body:
//
//           Padding(
//               padding: EdgeInsets.all(10),
//               child: ListView(
//                 children: <Widget>[
//                   Container(
//                       alignment: Alignment.center,
//                       height: MediaQuery.of(context).size.height / 4,
//                       child:Image.asset(
//                         'assets/images/silicon_scraper_logo.png'
//                       ) ),
//                   Container(
//                       alignment: Alignment.center,
//                       padding: EdgeInsets.all(10),
//                       child: Text(
//                         'Welcome ',
//                         style: TextStyle(fontSize: 20),
//                       )),
//                   Container(
//                     padding: EdgeInsets.all(10),
//                     child: TextField(
//                       controller: nameController,
//                       decoration: InputDecoration(
//                         border: OutlineInputBorder(),
//                         labelText: 'Username',
//                       ),
//                     ),
//                   ),
//                   Container(
//                     padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
//                     child: TextField(
//                       obscureText: true,
//                       controller: passwordController,
//                       decoration: InputDecoration(
//                         border: OutlineInputBorder(),
//                         labelText: 'Password',
//                       ),
//                     ),
//                   ),
// //                  FlatButton(
// //                    onPressed: (){
// //                      //forgot password screen
// //                    },
// //                    textColor: Colors.blue,
// //                    child: Text('Forgot Password'),
// //                  ),
//                   Container(
//                       height: 50,
//                       padding: EdgeInsets.fromLTRB(10, 15, 10, 0),
//                       child: RaisedButton(
//                         textColor: Colors.white,
//                         color: Colors.blue,
//                         child: Text('Login'),
//                         onPressed: () async{
//                           print(nameController.text);
//                           print(passwordController.text);
//                           await login.login(nameController.text, passwordController.text, context);
//                         },
//                       )),
//                   Container(
//                       child: Row(
//                         children: <Widget>[
//                           Text('Don\'t have an account yet?'),
//                           FlatButton(
//                             textColor: Colors.blue,
//                             child: Text(
//                               'Sign Up',
//                               style: TextStyle(fontSize: 20),
//                             ),
//                             onPressed: () {
//                               login.goToSignUp(context);
//                             },
//                           )
//                         ],
//                         mainAxisAlignment: MainAxisAlignment.center,
//                       ))
//                 ],
//               )));
  }
}

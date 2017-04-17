# MSAW Web Engine Module

Client app installation:
1. install node.js and npm by following instructions on http://blog.teamtreehouse.com/install-node-js-npm-windows
2. check if npm command is working on command prompt
3. navigate to folder MSAWclient on cmd
4. cmd> npm install
5. cmd> http-server
  it should display: 
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://10.166.131.201:8080
6. open http://localhost:8080/templates in the browser


[eclipse]
7. run server side application on a different localhost port (configure port number for http calls in tomcat configuration( 
  eg 9019 ) do not keep 8080)
8. check if the server side is working by typing localhost:9019/aakarshika/simulation
9. if the output is the json process model, then good.


[clien part]
10. navigate to MSAWclient/static/js folder
11. open file constants.js and change the value of BACKEND_URL as "http://localhost:9019/aakarshika/".

12. run reasoning from http://localhost:8080/templates

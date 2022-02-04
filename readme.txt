<---------SETUP--------->
FRONTEND:
1-Open front-end folder.
2- Open cmd in current directory
3- write npm i (Node must be installed on Your Computer)
4-write npm start to start front-end on PORT 3000.

BACKEND:
1-Open back-end folder.
2- Open cmd in current directory
3- write npm i (Node must be installed on Your Computer)
4-write node app.js to start back-end on PORT 4000.

<-------USAGE-------->
FRONTEND:
1-Open project on http://localhost:3000
2- HomeScreen Would Load Data From Resource and show it in cards
3- After that we Have Stats Section to Show Graph of Last Week of Country. No API found so used static JS file as data source.
4- Most Affected Countries are also form similar JS file and picking up Random Countries.
5- HeatMap Screen is Connected through Socket with Backend and exchangeing data realtime. 
6- API Key is Added to Project because its difficult for evaluator to go to API site and Register to get API key and make this App Work (TIME CONSUMING)
   ----ISSUE-----
   Leaflet maps doesnot allow me to re render map when data changes so i have to reload page everytime form is Submitted
   
 BACKEND:
 1- REST API is created to get heatLayer data from server,
 2- Socket is send, receiving and storing data in Array in relatime.

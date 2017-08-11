Exercises: Asynchronous Programming and Promises
Problems for exercises and homework for the “JavaScript Applications” course @ SoftUni. Submit your solutions in the SoftUni judge system at https://judge.softuni.bg/Contests/361/.
1.	Forecaster
Write a JS program that requests a weather report from a server and displays it o the user. Use the following HTML to test your code:
schedule.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Forecatser</title>
  <style>
    #content { width: 400px; }
    #request { text-align: center; }
    .bl { width: 300px; }
    #current { text-align: center; font-size: 2em; }
    #upcoming { text-align: center; }
    .condition { text-align: left; display: inline-block; }
    .symbol { font-size: 4em; display: inline-block; }
    .forecast-data { display: block; }
    .upcoming { display: inline-block; margin: 1.5em; }
    .label { margin-top: 1em; font-size: 1.5em; background-color: aquamarine; font-weight: 400; }
  </style>
  <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
</head>
<body>
<div id="content">
  <div id="request">
    <input id="location" class='bl' type="text">
    <input id="submit" class="bl" type="button" value="Get Weather">
  </div>
  <div id="forecast" style="display:none">
    <div id="current">
      <div class="label">Current conditions</div>
    </div>
    <div id="upcoming">
      <div class="label">Three-day forecast</div>
    </div>
  </div>
</div>
<script src="forecaster.js"></script>
<script>
  attachEvents();
</script>
</body>
</html>
Submit only the attachEvents() function that attaches events to the button with ID "submit" and holds all program logic.
When the user writes the name of a location and clicks “Get Weather”, make a GET request to the server at address https://judgetests.firebaseio.com/locations.json. The response will be an array of objects, with structure:
{ name: locationName,
  code: locationCode }
Find the object, corresponding to the name the user submitted in the input field with ID "location" and use its code value to make two more requests:
•	For current conditions, make a GET request to https://judgetests.firebaseio.com/forecast/today/{code}.json (replace the highlighted part with the relevant value). The response from the server will be an object as follows:
{ name: locationName,
  forecast: { low: temp,
              high: temp,
              condition: condition } }
•	For a 3-day forecast, make a GET request to https://judgetests.firebaseio.com/forecast/upcoming/{code}.json (replace the highlighted part with the relevant value). The response from the server will be an object as follows:
{ name: locationName,
  forecast: [{ low: temp,
               high: temp,
               condition: condition }, … ] }
Use the information from these two objects to compose a forecast in HTML and insert it inside the page. Note that the <div> with ID "forecast" must be set to visible. See the examples for details.
If an error occurs (the server doesn’t respond or the location name cannot be found) or the data is not in the correct format, display "Error" in the forecast section.
Use the following codes for the weather sumbols:
•	Sunny			&#x2600; // ☀
•	Partly sunny	&#x26C5; // ⛅
•	Overcast		&#x2601; // ☁
•	Rain			&#x2614; // ☂
•	Degrees		&#176;   // °

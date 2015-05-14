//var lat1="47.6171571";
//var lon1="-122.3267601";
//var origin1 = ["47.6171571,-122.3267601"];


var lat1="";
var lon1="";
var origin1 ="";
var d1="Park-N-Ride, Mountlake Terrace, WA 98043, USA"
var d2="Portland, OR"
var d3="San Francisco, CA"
var d4="Pike Place Market, Seattle, WA"

var myDestinations = [d1,d2,d3,d4 ];
var locationNow = document.getElementById("yourLocation");
var showResults = document.getElementById("resultsBox");

var myDump = document.getElementById("resultsDump");

function myClear(){

$(".infoBar").remove();

}


$( "#newLocation" ).click(myClear);
$( "#newLocation" ).click(getLocation);


//************ LOCATION API **************

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        locationNow.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
//    locationNow.innerHTML = "<br>Latitude: " + position.coords.latitude.toFixed(5) + 
//    " Longitude: " + position.coords.longitude.toFixed(5); 
    
    lat1=position.coords.latitude;
    lon1=position.coords.longitude;
    origin1 = [lat1+","+lon1];
    
    
             //************ GOOGLE API **************


            function calculateDistances(){
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
            {
              origins: origin1,
              destinations: myDestinations,
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.IMPERIAL,
        //    durationInTraffic: true,
              avoidHighways: false,
              avoidTolls: false,

            }, callback);
        }



        function callback(response, status) {

            if(status != google.maps.DistanceMatrixStatus.OK){
                alert('Error was: ' + status);
            }else{
                var myData = response
                
                var results = response.rows[0].elements[0]; 
                
                
                
//                resultsTest Array with two objects
                var resultsTest = response.rows[0];
                
                
                
                
//                temp test for 2nd result
                var results2 = response.rows[0].elements[1];
                var destBox1 = document.getElementById("dest1");
                var timeBox1 = document.getElementById("dur1");
                

                console.log(myData);
            console.log(resultsTest);
                
                locationNow.innerHTML = "<br>" + response.originAddresses; 
                
//    ************looping through the drive times returned*********
                
            
                
                for (var i = 0; i<resultsTest.elements.length ; i++){
//                alert(resultsTest.elements[i].duration.text);
                    
//                    myDump.innerHTML = "<p>" + resultsTest.elements[i].duration.text + "</p>";
                    
//                    $("#resultsDump").append("<p>" response.destinationAddresses[i] + " : " + resultsTest.elements[i].duration.text + "</p>");
                    
                    $("#resultsDump").append(
                        
                        
                        '<section class="infoBar"><div class="locationName2">' + response.destinationAddresses[i] + '</div> <div class="locationData2"> ' + resultsTest.elements[i].duration.text + '</div> <span class="locationDistance"> ' + resultsTest.elements[i].distance.text +'</span> </section>');
                    
                    
                    
                    
                    
                }
                     
                
                
                
                
                     
//                timeBox1.innerHTML = results.duration.text;
//                destBox1.innerHTML = response.destinationAddresses[0];
                
//                temp test for 2nd result
//                showResults.innerHTML = response.destinationAddresses[1];
//                showResults.innerHTML += "&nbsp &nbsp &nbsp" + results2.duration.text;
            }
        }
            calculateDistances();



    
    
}

getLocation();




    

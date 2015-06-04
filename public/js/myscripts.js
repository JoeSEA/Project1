var lat1 = "";
var lon1 = "";
var origin1 = "";

//*****SAMPLE DESTINATIONS*****

var d1 = "Park-N-Ride, Mountlake Terrace, WA 98043, USA"
var d2 = "Portland, OR"
var d3 = "San Francisco, CA"
var d4 = "Pike Place Market, Seattle, WA"
var sampleArray = [d1, d2, d3, d4];


//var myDestinations = [d1,d2,d3,d4 ];
var myDestinations = "";
var liveDest = "";

var locationNow = document.getElementById("yourLocation");
var showResults = $("#resultsBox");
var myDump = $("#resultsDump");
var storedDest = JSON.parse(localStorage.getItem("userDest"));



//*****Clears Out Existing Results For New Load*****

function myClear() {
    $(".infoBar").remove();
}


//*****Reset BUTTON*****

//$("#newLocation").click(myClear);
//$("#newLocation").click(getLocation);
//$("#newLocation").click(buildArray);



//***FORM*** SETTING UP DESTINATIONS
//     building an arrray from a list and putting into localStorage

var destArray = [];
var enteredDest = "";

//function updateLS (){
//localStorage.setItem('userDest', JSON.stringify(destArray));
//}


function spinWheel() {
    $("#yourLocation").html('<img class="spin" src="img/spinning-wheel.gif">');
}

function clearField() {
    $('#destField').val('');

}

function buildArray() {
    //function to add spinning wheel to location
    spinWheel();

    enteredDest = $('#destField').val();
    if (enteredDest == "") {
        alert("Enter an address");
    } else {
        destArray.push(enteredDest);
        //        alert(destArray.length);
        //        localStorage.setItem('userDest', JSON.stringify(destArray));
        //        updateLS();
        localStorage.setItem('userDest', JSON.stringify(destArray));

        //        myAlert();
        setGoogleArray();
        getLocation();
    }
}




function myAlert() {
    alert("localStorage type: " + localStorage.getItem('userDest'));

}


//*****UPDATES GOOGLE DEST ARRAY WITH LOCALSTORAGE*****

function setGoogleArray() {
    myDestinations = localStorage.getItem('userDest');
//    alert(myDestinations);

}


//******CLEAR DESTINATION LIST*****

function clearDestinations() {
    
if (myDestinations === sampleArray) {

    alert("You're stored destinations do not exist");

}else{
    
    
    localStorage.clear(); //clears localStorage
    destArray = []; //clears destination array
    myClear(); //clears info buckets
    calculateDistances();
}

}

//*****FORM BUTTONS *****
$("#enterAddress").click(function () {


    buildArray();
    clearField();
}); //Go button


$("#clearStorage").click(clearDestinations); //Clear button


$("#formButton").click(function () {
    $("#addressForm").slideToggle("slow");

});







//************ LOCATION API **************

function getLocation() {
    //    alert("This site requires use of your location.");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        //        locationNow.innerHTML = "Geolocation is not supported by this browser.";
        alert("Geolocation is not supported by this browser.");
    }
}


function showPosition(position) {

        lat1 = position.coords.latitude;
        lon1 = position.coords.longitude;
        origin1 = [lat1 + "," + lon1];
        initialize(lat1, lon1);






        //************ GOOGLE Distance API **************


        function calculateDistances() {
            mySetDest();


            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
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

            if (status != google.maps.DistanceMatrixStatus.OK) {
                alert('Error was: ' + status);
            } else {
                var myData = response

                var results = response.rows[0].elements[0];


                // resultsGoogle Array with two objects
                var resultsGoogle = response.rows[0];


                // temp test for 2nd result
//                var results2 = response.rows[0].elements[1];
//                var destBox1 = document.getElementById("dest1");
//                var timeBox1 = document.getElementById("dur1");


//              console.log(myData);
                console.log(resultsGoogle);

                locationNow.innerHTML = "<br>" + response.originAddresses;

                
                //************
                //looping through the drive times returned
                //creating page elements with information
                //*********

               for (var i = 0; i < resultsGoogle.elements.length; i++) {

                    if (resultsGoogle.elements[i].status != "OK"){
                    
                        alert ("Sorry, that address can't be found.");
                        
                        //remove bad address from very first array
                        destArray.splice(i,1);
//                        alert(destArray);
                        
                        //updated localStorage array of destinations
                        localStorage.setItem('userDest', JSON.stringify(destArray));
                    } 
                    
//                    alert (resultsGoogle.elements[i].status);
                    
                    $("#resultsDump").append('<section class="infoBar"><div class="locationName2">' + response.destinationAddresses[i] + '</div> <div class="locationData2"> ' + resultsGoogle.elements[i].duration.text + '<br><span class="locationDistance"> ' + resultsGoogle.elements[i].distance.text + '</span> </div> <div class="deletBucket"><img class="deleteButton" src="img/deleteButton.png" alt="delete" name="' + i + '"></div></section>');
                    
//                    alert (resultsGoogle.elements[i].status);

                } //end loop


            }
        }
        calculateDistances();





    } //end of showPosition




//*****UPDATE LIVEDEST VAR WITH LOCALSTORAGE*****

function updateLiveDest() {
    //    alert("Inside UpdateLiveDest");

    liveDest = JSON.parse(localStorage.getItem('userDest'));

    //    alert("liveDest var is a :" + typeof liveDest);
}

function update1stDestArray() {
        destArray = JSON.parse(localStorage.getItem('userDest'));

    }
    //*****CHECK FOR LOCALSTORAGE AND SET LIVEDEST YES/NO*****

function mySetDest() {
//    alert(storedDest.length);
    
//    if (storedDest === null) {
//        alert("No stored locations found. Using Sample Destinations");
//        myDestinations = sampleArray;
//        
//        
//        
//    } else {
//        
//        
//        alert("Loading your saved destinations.");
//        //        updateLS();
//        myClear();
//        update1stDestArray();
//        updateLiveDest();
//        myDestinations = liveDest;
//        
//    }
    
    
    
    
    

    if (localStorage.getItem("userDest") === null) {
        alert("No stored locations found. Using Sample Destinations");
        myDestinations = sampleArray;
    } else {
        alert("Loading your saved destinations.");
        //        updateLS();
        myClear();
        update1stDestArray();
        updateLiveDest();
        myDestinations = liveDest;

    }
}


//************ GOOGLE MAP API **************

function initialize(myLat, myLon) {
    var myLatling = new google.maps.LatLng(myLat, myLon);
    var mapOptions = {
        zoom: 15,
        //    center: new google.maps.LatLng(-34.397, 150.644)
        scaleControl: false,
        draggable: false,
        center: myLatling
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var marker = new google.maps.Marker({
        position: myLatling,
        map: map,
        title: 'Your Location'
    });


}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
        '&signed_in=true&callback=initialize';
    document.body.appendChild(script);
}



//delete buttons action

function deleteThis() {
        var deleteNum = $(this).attr("name");
//        alert(deleteNum);
    $(this).closest('.infobar').fadeOut("slow");
//    $(this).closest('.infobar').remove();
    //****updating the destination Arrays****
   
    destArray.splice(deleteNum,1);
    localStorage.setItem('userDest', JSON.stringify(destArray));
//    destArray = $.grep(destArray, function(value) {
//  return value != deleteNum;
    
    //updateLiveDest(); //pulls from localStorage
 
    
    } //end deleteThis


//delete button click
$("body").on('click', '.deleteButton', deleteThis);




//window.onload = loadScript();
$(document).ready(
    function(){
    
    loadScript();
    getLocation();
    
    });
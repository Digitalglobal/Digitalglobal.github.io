window.marker=null;
function initialize(){
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {

        mapTypeId:google.maps.MapTypeId.ROADMAP,
        backgroundColor:"#000",
        zoom:15,
        panControl:!1,
        zoomControl:!0,
        mapTypeControl:!1,
        scaleControl:!1,
        streetViewControl:!1,
        overviewMapControl:!1,
        zoomControlOptions:{style:google.maps.ZoomControlStyle.LARGE}
    }

    var style=[
                {"featureType":"all",
                "elementType":"labels.text.fill",
                "stylers":[{"saturation":36},
                {"color":"#000000"},
                {"lightness":40}]},

                {"featureType":"all",
                "elementType":"labels.text.stroke",
                    "stylers":[{"visibility":"on"},
                    {"color":"#000000"},
                    {"lightness":16}]},

                    {"featureType":"all",
                    "elementType":"labels.icon",
                    "stylers":[{"visibility":"off"}]},

                    {"featureType":"administrative",
                    "elementType":"geometry.fill",
                    "stylers":[{"color":"#000000"},
                    {"lightness":20}]},

                    {"featureType":"administrative",
                    "elementType":"geometry.stroke",
                    "stylers":[{"color":"#000000"},
                    {"lightness":17},
                    {"weight":1.2}]},

                    {"featureType":"landscape",
                    "elementType":"geometry",
                    "stylers":[{"color":"#000000"},
                    {"lightness":20}]},

                    {"featureType":"poi",
                    "elementType":"geometry",
                    "stylers":[{"color":"#000000"},
                    {"lightness":21}]},

                    {"featureType":"road.highway",
                    "elementType":"geometry.fill",
                    "stylers":[{"color":"#000000"},
                    {"lightness":17}]},

                    {"featureType":"road.highway",
                    "elementType":"geometry.stroke",
                    "stylers":[{"color":"#000000"},
                    {"lightness":29},
                    {"weight":0.2}]},

                    {"featureType":"road.arterial",
                    "elementType":"geometry",
                    "stylers":[{"color":"#000000"},
                    {"lightness":18}]},

                    {"featureType":"road.local",
                    "elementType":"geometry",
                    "stylers":[{"color":"#000000"},
                    {"lightness":16}]},

                    {"featureType":"transit",
                    "elementType":"geometry",
                    "stylers":[{"color":"#000000"},
                    {"lightness":19}]},
                    
                    {"featureType":"water",
                    "elementType":"geometry",
                    "stylers":[{"color":"#000000"},
                    {"lightness":17}]}
                ];
    
     
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
   
    var mapType=new google.maps.StyledMapType(style,{name:"Grayscale"}); 

    map.mapTypes.set('grey',mapType); 
    
    map.setMapTypeId('grey');
   

    // Multiple Markers
    var markers = [
        ['Abanico, Maitencillo', -32.640990,-71.432698],
        ['Portofino, Atacama', -26.520997,-70.704058]
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h5>Maitencillo</h5>' +
        '<p>Beachbreak</p>' +   '<p><a href="/blog/simple-blog-post-8/" ><span style="background-color: #FFFF00;color:red">Livecam</span></a></p>'      +'</div>'],
        ['<div class="info_content">' +
        '<h5>Portofino</h5>' +
        '<p>Fondo de Rocas</p>' + '<p><a href="/blog/simple-blog-post-1/" ><span style="background-color: #FFFF00;color:red">Livecam</span></a></p>' +
        '</div>']
    ];

    //icon
    var pinIcon=new google.maps.MarkerImage("\img/marker.png",null,null,null,new google.maps.Size(40,40));

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            icon:pinIcon,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
map.setTilt(45);
}
if(map!=null){google.maps.event.addDomListener(window,'load',initialize)}
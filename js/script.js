const ip_geo_api = "https://geo.ipify.org/api/v1?apiKey=at_95b7zmGOSnRRWLFA7rh4CXx8jZa4u&ipAddress=8.8.8.8";

// elements to update 
const display_ip = document.querySelector("#given_ip");
const display_location = document.querySelector("#given_location");
const display_time = document.querySelector("#given_time");
const display_isp = document.querySelector("#given_isp");

// form elements
const search_ip = document.querySelector("#ip_address");
const submit_btn = document.querySelector("#submit_btn");

// given map
const map = L.map("display_map", {
  center: [0, 0],
  zoom: 0,
  layers: [
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }),
  ],
});
updateMarker = (update_marker = [-33.665, 18.993]) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
};
document.addEventListener("DOMContentloaded", updateMarker());
submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (search_ip.value != "" && search_ip.value != null) {
    getIpDetails(search_ip.value);
    return true;
  }
  alert("Please enter a valid IP Address");
});

// get the data using fetching API
const getIpDetails = async (default_ip) => {
    if(default_ip == undefined){
    // kaya var ang ginamit ko para ma overide at ma redeclare ulit yung given variable para sa pag fetch ng data.
      var ip_add = `${ip_geo_api}?apiKey`;
    }else{
      var ip_add = `${ip_geo_api}?apiKey=&ipAddress=${default_ip}`;
  }
  fetch(ip_add) 
    const apiResponse = await fetch(ip_add);
    // instead na ang i fetch kong variable na may  api URL ang finetch ko dito ay yung variable na nasa loob yung value or variable ng api URL ko and gumamit ako ng condition na may apikey at  para malaman kung may error ba sa pag fetch ng data. dahil kung walang apikey mag rarun ang data pero isang IP Address lang ang ibabato nito.
    const data = await apiResponse.json()
      display_ip.innerHTML = data.ip;
      display_location.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
      display_time.innerHTML = data.location.timezone;
      display_isp.innerHTML = data.isp;

      // Displaying Map
      updateMarker([data.location.lat, data.location.lng]);

    /*.catch((error) => {
      alert("Unable to get IP details");
      console.log(error);
    }); */
};

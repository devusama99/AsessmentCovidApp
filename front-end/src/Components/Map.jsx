import L from "leaflet";
import "leaflet.heat";
import { useEffect, useState } from "react";

export default function Map({ data }) {
  let map;
  useEffect(() => {
    console.log(data);
    if (typeof map != "object") map = undefined;
    map = L.map("map").setView([30.3753, 69.3451], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add recovered areas to Map
    L.heatLayer(data[0], {
      radius: 10,
      max: 1,
      blur: 5,
      gradient: {
        0: "green",
      },
      minOpacity: 0.7,
    }).addTo(map);

    // Add Affected Areas to map
    L.heatLayer(
      data[1],
      {
        radius: 10,
        max: 1,
        blur: 5,
        gradient: {
          0: "yellow",
        },
        minOpacity: 0.7,
      },
      []
    ).addTo(map);

    // Add death Areas to Map
    L.heatLayer(data[2], {
      radius: 10,
      max: 1,
      blur: 5,
      gradient: {
        0: "red",
      },
      minOpacity: 0.7,
    }).addTo(map);
  }, []);
  return (
    <>
      <div id="map" style={{ height: "100vh" }}></div>
    </>
  );
}

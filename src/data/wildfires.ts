interface Wildfires {
  country: string;
  states: State[];
}

interface State {
  name: string;
  wildfires: Wildfire[];
}

interface Wildfire {
  id: string;
  name: string;
  actualData: ActualData;
  weatherConditions: WeatherConditions;
  coordinates: [number, number];
}

interface ActualData {
  startTime: string;
  sheltering: string;
  liveMoist: string;
  elevDifference: string;
  aspect: string;
  size: string;
  fuel: string;
  slope: string;
  frp: string;
}

interface WeatherConditions {
  windDirection: string;
  windEyeLevel: string;
  airTemp: string;
  relHumidity: string;
  precipitation: string;
  shading: string;
  clouds: string;
  solarRadiation: string;
  heatIndex: string;
  brightness: string;
}

export const wildfiresDetails: Wildfires[] = [
  {
    country: "United States",
    states: [
      {
        name: "California",
        wildfires: [
          {
            id: "us_ca_1",
            name: "Paynes Creek Wildfire",
            coordinates: [-121.91876, 40.33392],
            actualData: {
              startTime: "06/10/23 09:00",
              sheltering: "Fully Sheltered",
              liveMoist: "Fully Cured",
              elevDifference: "Below 1000 ft",
              aspect: "North",
              size: "231.4 ac",
              fuel: "9 (TL)",
              slope: "62° (188%)",
              frp: "21.4",
            },
            weatherConditions: {
              windDirection: "200°",
              windEyeLevel: "10 mi/h",
              airTemp: "32°F",
              relHumidity: "10%",
              precipitation: "0",
              shading: "0-20%",
              clouds: "0",
              solarRadiation: "343.6",
              heatIndex: "15.6",
              brightness: "313.8",
            },
          },
          // Other wildfires...
        ],
      },
      // {
      //   name: "New York",
      //   wildfires: [
      //     {
      //       id: "us_ca_1",
      //       name: "Fire1",
      //       actualData: {
      //         startTime: "06/10/23 09:00",
      //         sheltering: "Fully Sheltered",
      //         liveMoist: "Fully Cured",
      //         elevDifference: "Below 1000 ft",
      //         aspect: "North",
      //         size: "231.4 ac",
      //         fuel: "9 (TL)",
      //         slope: "62° (188%)",
      //         frp: "21.4",
      //       },
      //       weatherConditions: {
      //         windDirection: "200°",
      //         windEyeLevel: "10 mi/h",
      //         airTemp: "32°F",
      //         relHumidity: "10%",
      //         precipitation: "0",
      //         shading: "0-20%",
      //         clouds: "0",
      //         solarRadiation: "343.6",
      //         heatIndex: "15.6",
      //         brightness: "313.8",
      //       },
      //     },
      //     // Other wildfires...
      //   ],
      // },
    ],
  },

  {
    country: "Mexico",
    states: [
      // {
      //   name: "Baja California",
      //   wildfires: [
      //     {
      //       id: "us_ca_1",
      //       name: "Fire1",
      //       actualData: {
      //         startTime: "06/10/23 09:00",
      //         sheltering: "Fully Sheltered",
      //         liveMoist: "Fully Cured",
      //         elevDifference: "Below 1000 ft",
      //         aspect: "North",
      //         size: "231.4 ac",
      //         fuel: "9 (TL)",
      //         slope: "62° (188%)",
      //         frp: "21.4",
      //       },
      //       weatherConditions: {
      //         windDirection: "200°",
      //         windEyeLevel: "10 mi/h",
      //         airTemp: "32°F",
      //         relHumidity: "10%",
      //         precipitation: "0",
      //         shading: "0-20%",
      //         clouds: "0",
      //         solarRadiation: "343.6",
      //         heatIndex: "15.6",
      //         brightness: "313.8",
      //       },
      //     },
      //     // Other wildfires...
      //   ],
      // },
      {
        name: "Sonora",
        wildfires: [
          {
            id: "mex_no_1",
            name: "Nogales Wildfire",
            coordinates: [-110.8968082457804, 31.26933620026809],
            actualData: {
              startTime: "07/29/24 9:00",
              sheltering: "Fully Sheltered",
              liveMoist: "Fully Cured",
              elevDifference: "Below 1000 ft",
              aspect: "North",
              size: "231.4 ac",
              fuel: "9 (TL)",
              slope: "62° (188%)",
              frp: "21.4",
            },
            weatherConditions: {
              windDirection: "200°",
              windEyeLevel: "10 mi/h",
              airTemp: "32°F",
              relHumidity: "10%",
              precipitation: "0",
              shading: "0-20%",
              clouds: "0",
              solarRadiation: "343.6",
              heatIndex: "15.6",
              brightness: "313.8",
            },
          },

          // Other wildfires...
        ],
      },
    ],
  },
];

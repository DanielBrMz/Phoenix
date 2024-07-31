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
}

interface ActualData {
  startTime: string;
  endTime: string;
}

interface WeatherConditions {
  windDirection: string;
  windEyeLevel: string;
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
            name: "Fire1",
            actualData: {
              startTime: "06/10/23 09:00",
              endTime: "06/18/23 09:00",
            },
            weatherConditions: {
              windDirection: "200°",
              windEyeLevel: "10 mi/h",
            },
          },
          {
            id: "us_ca_2",
            name: "Fire2",
            actualData: {
              startTime: "06/11/23 10:00",
              endTime: "06/19/23 10:00",
            },
            weatherConditions: {
              windDirection: "210°",
              windEyeLevel: "12 mi/h",
            },
          },
        ],
      },
      {
        name: "New York",
        wildfires: [
          {
            id: "us_ny_1",
            name: "Fire1",
            actualData: {
              startTime: "06/13/23 12:00",
              endTime: "06/21/23 12:00",
            },
            weatherConditions: {
              windDirection: "230°",
              windEyeLevel: "20 mi/h",
            },
          },
          {
            id: "us_ny_2",
            name: "Fire2",
            actualData: {
              startTime: "06/14/23 13:00",
              endTime: "06/22/23 13:00",
            },
            weatherConditions: {
              windDirection: "240°",
              windEyeLevel: "25 mi/h",
            },
          },
        ],
      },
    ],
  },
  {
    country: "Canada",
    states: [
      {
        name: "Ontario",
        wildfires: [
          {
            id: "ca_on_1",
            name: "Fire1",
            actualData: {
              startTime: "06/19/23 18:00",
              endTime: "06/27/23 18:00",
            },
            weatherConditions: {
              windDirection: "290°",
              windEyeLevel: "50 mi/h",
            },
          },
          {
            id: "ca_on_2",
            name: "Fire2",
            actualData: {
              startTime: "06/20/23 19:00",
              endTime: "06/28/23 19:00",
            },
            weatherConditions: {
              windDirection: "300°",
              windEyeLevel: "55 mi/h",
            },
          },
        ],
      },
      {
        name: "Quebec",
        wildfires: [
          {
            id: "ca_qc_1",
            name: "Fire1",
            actualData: {
              startTime: "06/21/23 20:00",
              endTime: "06/29/23 20:00",
            },
            weatherConditions: {
              windDirection: "310°",
              windEyeLevel: "60 mi/h",
            },
          },
        ],
      },
    ],
  },
  {
    country: "Mexico",
    states: [
      {
        name: "Jalisco",
        wildfires: [
          {
            id: "mx_jal_1",
            name: "Fire1",
            actualData: {
              startTime: "06/24/23 23:00",
              endTime: "07/02/23 23:00",
            },
            weatherConditions: {
              windDirection: "340°",
              windEyeLevel: "75 mi/h",
            },
          },
          {
            id: "mx_jal_2",
            name: "Fire2",
            actualData: {
              startTime: "06/25/23 24:00",
              endTime: "07/03/23 24:00",
            },
            weatherConditions: {
              windDirection: "350°",
              windEyeLevel: "80 mi/h",
            },
          },
        ],
      },
      {
        name: "Nuevo Leon",
        wildfires: [
          {
            id: "mx_nl_1",
            name: "Fire1",
            actualData: {
              startTime: "06/27/23 02:00",
              endTime: "07/05/23 02:00",
            },
            weatherConditions: {
              windDirection: "10°",
              windEyeLevel: "90 mi/h",
            },
          },
          {
            id: "mx_nl_2",
            name: "Fire2",
            actualData: {
              startTime: "06/28/23 03:00",
              endTime: "07/06/23 03:00",
            },
            weatherConditions: {
              windDirection: "20°",
              windEyeLevel: "95 mi/h",
            },
          },
        ],
      },
    ],
  },
];

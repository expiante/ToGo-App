import MarkerIconChecked from 'assets/img/map-marker-checked.png';
import MarkerIconUnchecked from 'assets/img/map-marker-unchecked.png';
import MarkerIconNew from 'assets/img/map-marker-new.png';

export const mapConfig = {
  url: 'https://maps.googleapis.com/maps/api/js',
  key: 'AIzaSyBV1Lb6yFD656kORCtqHrtNnhaFNHmxxbg',
  ver: '3.exp',
  libs: [
    'geometry',
    'drawing',
    'places',
  ],
  defaultPosition: {
    lat: 33.974472,
    lng: 2.011706,
  },
  defaultZoom: 2,
  config: {
    disableDefaultUI: false,
    draggable: true,
    keyboardShortcuts: true,
    scaleControl: true,
    scrollwheel: true,
  },
  marker: {
    icons: {
      checkedMark: MarkerIconChecked,
      uncheckedMark: MarkerIconUnchecked,
      newMark: MarkerIconNew,
    },
  },
};

export const mockData = [
  {
    id: 1,
    visited: true,
    text: 'I Want to Go Yerevan!',
    lat: 40.181169,
    lng: 44.5133,
    zoom: 12,
  },
  {
    id: 2,
    lat: 40.40480441296835,
    lng: 45.1958256347657,
    text: "Go to sevan",
    visited: false,
    zoom: 12,
  },
  {
    id: 3,
    visited: false,
    text: 'Go to Equador',
    lat: -0.194834,
    lng: -78.471744,
    zoom: 10,
  },
  {
    id: 4,
    visited: true,
    text: 'Go to Malaysia',
    lat: 4.033869,
    lng: 101.951179,
    zoom: 8,
  },
  {
    id: 5,
    visited: true,
    text: 'Go to Lithuania',
    lat: 54.884704,
    lng: 23.903899,
    zoom: 14,
  },
  {
    id: 6,
    visited: true,
    text: 'Go to Vietnam',
    lat: 10.785622,
    lng: 106.636175,
    zoom: 12,
  },
  {
    id: 7,
    visited: false,
    text: 'Go to Holand',
    lat: 52.360763,
    lng: 4.886808,
    zoom: 13,
  },
  {
    id: 8,
    visited: false,
    text: 'Go to Beirut',
    lat: 33.884444,
    lng: 35.504536,
    zoom: 13,
  },
  {
    id: 9,
    visited: false,
    text: 'Go to Jerusalem',
    lat: 31.760442,
    lng: 35.220756,
    zoom: 13,
  },
  {
    id: 10,
    visited: true,
    text: 'Go to Cairo',
    lat: 30.015112,
    lng: 31.232141,
    zoom: 13,
  },
  {
    id: 11,
    visited: false,
    text: 'Go to Spain',
    lat: 40.374472,
    lng: -3.711706,
    zoom: 13,
  },
  {
    id: 12,
    visited: false,
    text: 'Go to USA',
    lat: 38.881742,
    lng: -77.037574,
    zoom: 13,
  },
  {
    id: 13,
    visited: false,
    text: 'Go to Mexico',
    lat: 19.410750,
    lng: -99.134828,
    zoom: 13,
  },
  {
    id: 14,
    visited: false,
    text: 'Go to Bolivia',
    lat: -16.525223,
    lng: -68.127868,
    zoom: 13,
  }
];

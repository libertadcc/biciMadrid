import Map from "https://js.arcgis.com/4.19/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.19/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import Legend from "https://js.arcgis.com/4.19/@arcgis/core/widgets/Legend.js";
import Search from "https://js.arcgis.com/4.19/@arcgis/core/widgets/Search.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK38d0654e1eb749b7b6cfc3079bbfdf44KkQ5OBC4rat6o-i1VOw7ZF1KBDM5dz15O0LTwwLLOdzqFeLwVopKBOQQ0Z-qP4VJ";

const map = new Map({
  basemap: "arcgis-navigation"
});

const view = new MapView({
  map: map,
  container: "map",
  center: [-3.696404,40.438854],
  zoom: 12
});

const bikeLaneRenderer = {
  type: "unique-value",
  field: "TIPOLOGÍA",
  defaultSymbol: { type: "simple-line", color: "pink", width: "1.5"},
  uniqueValueInfos: [
    {
      value: "ANILLO VERDE CICLISTA", 
      symbol: {
        type: "simple-line",
        color: "green",
        width: "1.5"
      }
    },
    {
      value: "VÍA EXCLUSIVA BICI", 
      symbol: {
        type: "simple-line",
        color: "red",
        width: "1.5"
      }
    },
    {
      value: "VÍA USO COMPARTIDO", 
      symbol: {
        type: "simple-line",
        color: "purple",
        width: "1.5"
      }
    },
    {
      value: "VÍA PREFERENTE BICI", 
      symbol: {
        type: "simple-line",
        color: "blue",
        width: "1.5"
      }
    },
    {
      value: "GIROS Y SENTIDOS", 
      symbol: {
        type: "simple-line",
        color: "orange",
        width: "1.5"
      }
    }
  ]
};

const bikeLaneLayer = new FeatureLayer({
  url: "https://services3.arcgis.com/3km0jzByGXckHKks/ArcGIS/rest/services/Carriles_Bici_Madrid/FeatureServer/0",
  renderer: bikeLaneRenderer,
  outFields: ['*'],
  popupTemplate: {
    title: "{TIPOLOGÍA}",
    content: "Esta es un vía: {TIPO_VIA}"
  }
});

const bikeStations = new FeatureLayer({
  url: "https://services3.arcgis.com/lnFkorfBb3ma2riJ/arcgis/rest/services/Aparcabicis/FeatureServer/0/",
  renderer: {
    "type": "simple",
    "symbol": {
      type: "simple-marker",
      outline: { color: [10, 113, 110, 1] },
      size: 7,
      color: [10, 113, 110, 1]
    }
  },
  popupTemplate: {
    title: "Estación de BiciMad",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "DIRECCION",
            label: "Dirección"
          },
          {
            fieldName: "TX_DISTRIT",
            label: "Distrito"
          }
        ]
      }
    ]
  }
});

map.addMany([bikeLaneLayer, bikeStations]);

view.ui.add(
  new Legend({
    view: view,
    layerInfos: [{
      layer: bikeStations
    }, {
      layer: bikeLaneLayer,
      title: "Carriles bici en Madrid"
    }]
  }),
  "bottom-right"
);

var searchWidget = new Search({
  view: view
});

view.ui.add(searchWidget, {
  position: "top-right"
});


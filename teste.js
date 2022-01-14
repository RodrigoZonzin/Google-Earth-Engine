//////////////////////// basico

var shapeImediata = ee.FeatureCollection('users/rodrigozonzin/MG_RG_Imediatas_2020')
  .filter('NM_RGI == "Belo Horizonte"'); 

var shapeIntermediaria = ee.FeatureCollection('users/rodrigozonzin/MG_RG_Intermediarias_2020')
  .filter('CD_RGINT == "3101"');

Map.addLayer(shapeImediata, {color: 'purple'}, 'imediata');
Map.addLayer(shapeIntermediaria, {}, 'intermediaria');

var minhaGeometria = shapeImediata.geometry(); 

//////////////////////// fazer o grid

var grid = require('users/gena/packages:grid');


var proj = 'EPSG:3857';
var dx = 5000;
var dy = 5000;
var marginx = 0;
var marginy = 0;
print('a');

var meuGrid = grid.generateGridForGeometry(minhaGeometria, dx, dy, 
  marginx, marginy, proj); 
  
  Map.addLayer(meuGrid, {color: 'red'}, 'meuGrid'); 

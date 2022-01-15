//////////////////////// basico

var shapeImediata = ee.FeatureCollection('users/rodrigozonzin/MG_RG_Imediatas_2020')
  .filter('NM_RGI == "Belo Horizonte"'); 

var shapeIntermediaria = ee.FeatureCollection('users/rodrigozonzin/MG_RG_Intermediarias_2020')
  .filter('CD_RGINT == "3101"');

//Map.addLayer(shapeImediata, {color: 'purple'}, 'imediata');
//tambem reescrito no final para facilitar
//Map.addLayer(shapeIntermediaria, {}, 'intermediaria');

var minhaGeometria = shapeImediata.geometry(); 

//////////////////////// fazer o grid

var grid = require('users/gena/packages:grid');


var proj = 'EPSG:3857';
var dx = 5000;
var dy = 5000;
var marginx = 0;
var marginy = 0;
print('Teste Grid');

var meuGrid = grid.generateGridForGeometry(minhaGeometria, dx, dy, 
  marginx, marginy, proj); 
  
 // Map.addLayer(meuGrid, {color: 'red'}, 'meuGrid'); 
  // eu reescrevi no final - mais tarde pode voltar aqui

//imagens 

// packages 
var spectral = require('users/dmlmont/spectral:spectral');
var palettes = require('users/gena/packages:palettes');

// primeiros passos - pegar a melhor imagem
var colID = "LANDSAT/LC08/C02/T1_L2";
var hoje = ee.Date(Date.now());
var img = ee.ImageCollection(colID)
          .filterBounds(shapeImediata)
          .sort('CLOUD_COVER')
          .first();
          
//print('Teste 1: ', img);
  
// selecionar as bandas com os dados de vizualização apenas
img = img.select('SR_B2', 'SR_B3', 'SR_B4', 'SR_B5');
//print('Teste 2:', img);
  
  
  
// calibração radiométrica 
var imgCa = img.multiply(2.75e-05)
        .add(-0.2)
        .copyProperties(img, img.propertyNames());
//print('3: ', img);
  
//vizualização 
//Map.centerObject(img, 12);

var trueColor = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0, 
  max: 0.4
};


Map.addLayer(shapeImediata, {color: 'purple'}, 'imediata');
Map.addLayer(meuGrid, {color: 'red'}, 'meuGrid');
Map.addLayer(imgCa, trueColor, 'Cor Verdadeira');
  

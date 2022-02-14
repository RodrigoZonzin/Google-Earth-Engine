var colID = "LANDSAT/LC08/C02/T1_RT_TOA"; 

shp = shp.filter('NM_RGI == "Belo Horizonte"');

//-----------------------------------
//var imgCa = img.multiply()
var imgTeste = img.median();
img = img.filterBounds(shp.geometry());
img = img.limit(100).first();
img = img.select('B2', 'B3', 'B4', 'B5');

var imgCal = img.multiply(2.75e-05)
      .add(-0.2)
      .copyProperties(img, img.propertyNames());


//-----------------------------------


//imgCal = imgCal.toImage();
//mapa
Map.addLayer(shp);
Map.centerObject(shp);
Map.addLayer(imgTeste.clip(shp.geometry()), {min: 0, max:0.4, bands: ['B4','B3','B2']}, 'Foto');

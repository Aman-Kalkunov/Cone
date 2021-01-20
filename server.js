const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set('views', 'frontend/views') //Каталог с шаблонами
app.set('view engine', 'ejs'); //Шаблонизатор "ejs"

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "frontend", "static")));
app.use("/build/", express.static(path.join(__dirname, "node_modules/three/build")));
app.use("/jsm/", express.static(path.join(__dirname, "node_modules/three/examples/jsm")));

//Рендерим "views/index.ejs" 
app.get("/*", (req, res) => {
  res.render('index'); 
});

// Рендерим "views/cone.ejs" при POST запросе с корня "/" и отправляем собранный массив "arrayPoints"
app.post("/", (req, res) => {
  let arrayPoints = calcCoordinates(req)
  res.render('cone', { points: JSON.stringify(arrayPoints) });
});

app.listen(process.env.PORT || 5080, () => console.log("Server running..."));

// Из полученных от клиена параметров
// собираем массив точек "arrayPoints"
const calcCoordinates = (coneParameter) => {
  let coneRadius = coneParameter.body.radius;
  let coneHeigth = coneParameter.body.height;
  let coneSegments = coneParameter.body.segments;

  const arrayPoints = [];
  arrayPoints[0] = { "x": 0, "y": 0, "z": +coneHeigth }; // первая точка - вершина конуса 

  for (let i = 0; i < coneSegments; i++) {
    let point = {
      "x": coneRadius * (Math.cos(2 * Math.PI * i / coneSegments)).toFixed(1),
      "y": coneRadius * (Math.sin(2 * Math.PI * i / coneSegments)).toFixed(1),
      "z": 0
    }
    arrayPoints.push(point);
  }
  return arrayPoints
}

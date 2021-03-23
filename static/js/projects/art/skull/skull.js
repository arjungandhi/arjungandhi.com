let distance_slider;


function setup() {
  box = document.getElementById("box");

  distance_slider = create_slider();

  // break
  box.append(document.createElement("br"));

  //canvas
  canvas = createCanvas(650, 650);
  canvas.elt.style.height = "auto";
  canvas.parent(box.id);
  colorMode(RGB, 255, 255, 255, 1);

  background("#4C566A");
}

function save_canvas() {
  save(canvas);
}

function draw() {

}

function create_slider() {
  //slider conatianer
  d = createDiv();
  d.class("slider-box");
  d.parent(box);
  // year slider
  let dl = document.createElement("label");
  dl.innerHTML = "Distance:";
  dl.for = "distance";
  d.elt.append(dl);

  let slider = createSlider(0, 12, 6);
  slider.class("slider");
  slider.elt.name = dl.for;
  slider.parent(d);

  t = createElement("text", slider.value());
  t.parent(d);

  slider.input((e) => (t.elt.innerHTML = e.target.value));
  return slider;
}


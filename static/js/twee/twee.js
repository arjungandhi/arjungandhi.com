const MODEL_URL = "https://data.arjungandhi.com/weights";
var face_params;
async function setup_face () {
  await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  await faceapi.loadFaceExpressionModel(MODEL_URL);
  await faceapi.loadAgeGenderModel(MODEL_URL)
}


async function handle_image(file) {
  if (file.type === "image") {
    let img = document.createElement('img')
    img.src = file.data
    let face_stuff = await faceapi.detectAllFaces(img).withFaceExpressions().withAgeAndGender();
    face_params = face_stuff[0]
    age = face_params.age
    console.log(face_params.age)
  } else {
    alert('Please Upload an Image')
  }


}


age = 30; //
max_len = 20; // det max branch len
min_len = 1; // det max branch len
lean = .7;
max_branch = 2;
var tree;
thicc_factor = 1;
branch_index = 0;

let bg;
var s = 1;
draw_bg = true;
transperency = 0.7;

let run_button

async function setup() {
  var canvas = createCanvas(570, 803);
  canvas.parent("twee-box");
  canvas.width = width
  canvas.height = height
  colorMode(RGB, 255, 255, 255, 1);
  await setup_face()
  input = createFileInput(handle_image);
  input.parent('twee-box')
  run_button = createButton('Gen Tree')
  run_button.mousePressed(setup_sim)
  run_button.parent('twee-box')
}



function setup_sim() {
    tree = get_tree(createVector(0, 0), tree_angle(0), age);
    let max_l = 0;
    for (let i = 0; i < tree.length; i++) {
      for (let j = 0; j < tree[i].length; j++) {
        let v = tree[i][j];
        if (v.mag() > max_l) {
          max_l = v.mag();
        }
      }
    }
    max_l = max_l*1.5;
    s = createVector(width, height).mag() / max_l;
    draw_bg = true
    branch_index = 0;
}

function draw() {
  if (draw_bg) {
    background(bg)
    draw_bg = false;
  }

  translate(width / 2, height);
  scale(s, -s);
  let prev = createVector(0, 0);
  if (tree !== undefined) {
    if (tree[branch_index] !== undefined) {
    for (
      let draw_index = 0;
      draw_index < tree[branch_index].length;
      draw_index++
    ) {
      let v = tree[branch_index][draw_index];
      stroke(118, 92, 72, transperency);
      if (draw_index > tree[branch_index].length - age * 0.4) {
        stroke(56, 188, 28, transperency);
      }

      strokeWeight(thicc_factor * (tree[branch_index].length - draw_index));

      line(prev.x, prev.y, v.x, v.y);
      prev = v;
    }
}
else {
    console.log(tree, branch_index)
}
 console.log(nf((branch_index * 100) / tree.length, 2, 2) + "%");
  branch_index++;

  if (branch_index >= tree.length) {
    tree = undefined;
  }
}
}

function get_tree(v, a, iter) {
  let branch_length = random(min_len * iter, max_len * iter);
  let num_branch = random(max_branch);

  let move = createVector(cos(a) * branch_length, sin(a) * branch_length);
  let new_v = p5.Vector.add(v, move);
  let gen_tree = [];
  if (iter > 0) {
    for (let i = 0; i < num_branch; i++) {
      branches = get_tree(new_v, tree_angle(lean), iter - 1);
      for (j = 0; j < branches.length; j++) {
        gen_tree.push(branches[j]);
      }
    }
  }
  if (gen_tree.length === 0) {
    gen_tree = [[]];
  }

  for (let i = 0; i < gen_tree.length; i++) {
    gen_tree[i].unshift(new_v);
  }

  return gen_tree;
}

function map_to_canvas(num, x = true) {
  if (x) {
    return map(num, 0, width, width / 2, (3 * width) / 2);
  } else {
    return map(num, 0, height, height, 0);
  }
}

function tree_angle(lean_multiplier) {
  return random(
    TAU / 4 - (TAU / 8) * (lean_multiplier + 1),
    TAU / 4 + (TAU / 8) * (lean_multiplier + 1)
  );
}


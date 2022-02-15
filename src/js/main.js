const lifts = document.getElementById("lifts");
const floors = document.getElementById("floors");
const root = document.getElementById("root");
const createFloorAndLiftsButton = document.getElementById(
  "create-floor-and-lifts"
);
let liftsFloors;
// create floors and no of of lifts on floor
const createLiftsAndFloors = (totalFloors, liftsPerFloor) => {
  const floorLiftMatrix = [];
  for (let i = 0; i < totalFloors; i++) {
    const liftsOnFloor = [];
    for (let j = 0; j < liftsPerFloor; j++) {
      if (i === 0) {
        liftsOnFloor.push(1);
      } else {
        liftsOnFloor.push(0);
      }
    }
    floorLiftMatrix.push(liftsOnFloor);
  }
  return floorLiftMatrix;
};

const nearbyLift = (floorIndex, liftsAndFloorsArray) => {
  //check if there is any lift on the current floor
  // for (let i = 0; i < liftsAndFloorsArray[floorIndex].length; i++) {
  //   if (liftsAndFloorsArray[floorIndex][i] === 1) {
  //     console.log("AT FLOOR", [floorIndex, i]);
  //     return [floorIndex, i];
  //   }
  // }

  /* check if nearyby floors for lifts[check for the direction where no of floors are less] 
 for ex: current floor is 3, total floor are 9 first we go for the bottom and above loop */
  for (let i = 0; i < liftsAndFloorsArray.length; i++) {
    for (let j = 0; j < liftsAndFloorsArray[i].length; j++) {
      if (floorIndex !== i && liftsAndFloorsArray[i][j] === 1) {
        return [i, j];
      }
    }
  }
};

const moveLiftUpOrDown = (floorIndex) => {
  const foundNearbyLift = nearbyLift(floorIndex, liftsFloors);
  if (!foundNearbyLift) return;
  liftsFloors[foundNearbyLift[0]][foundNearbyLift[1]] = 0;
  liftsFloors[floorIndex][foundNearbyLift[1]] = 1;
  root.innerHTML = null;
  createUI(liftsFloors);
};

createFloorAndLiftsButton.addEventListener("click", () => {
  liftsFloors = createLiftsAndFloors(Number(floors.value), Number(lifts.value));
  createUI(liftsFloors);
});

function createUI(liftAndFloorArray) {
  for (let i = 0; i < liftAndFloorArray.length; i++) {
    let div = document.createElement("div");
    div.style.height = "200px";
    div.style.margin = "1rem";
    div.style.display = "flex";
    div.style.borderBottom = "2px solid #ccc";
    div.innerHTML = `<div><span>Floor ${i}</span><button onclick="moveLiftUpOrDown(${i})" class="floor-btn">Up</button><button onclick="moveLiftUpOrDown(${i})" class="floor-btn">Down</button></div>`;
    for (let j = 0; j < liftAndFloorArray[i].length; j++) {
      if (liftAndFloorArray[i][j] === 1) {
        let innerDiv = document.createElement("div");
        innerDiv.style.height = "100%";
        innerDiv.style.width = "100px";
        innerDiv.style.backgroundColor = "blue";
        innerDiv.style.margin = "0 1rem";
        div.appendChild(innerDiv);
      } else {
        let innerDiv = document.createElement("div");
        innerDiv.style.height = "100%";
        innerDiv.style.width = "100px";
        innerDiv.style.margin = "0 1rem";
        div.appendChild(innerDiv);
      }
    }
    root.appendChild(div);
  }
}

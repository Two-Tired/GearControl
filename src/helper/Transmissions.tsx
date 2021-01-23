import { BestGearCombination, TransmissionState } from "../types";

const allowedSprockets = [1, 0.7, 0.6, 0.5, 0.4]; // These are experimental values for now.

export function createTransmissionTable(
  frontSprockets: number[],
  rearSprockets: number[]
) {
  let table = [] as TransmissionState[];

  const rearSprocketKeys = Array.from(rearSprockets.keys());
  const scaledFrontSprocketKeys = scaleBetween(
    Array.from(frontSprockets.keys()),
    Array.from(rearSprockets.keys())
  );
  const distArray = dist(scaledFrontSprocketKeys, rearSprocketKeys);
  const allowedArray = allowed(JSON.parse(JSON.stringify(distArray)));

  frontSprockets.map((valueFront, indexFront) => {
    rearSprockets.map((valueRear, indexRear) => {
      let row = {} as TransmissionState;
      row.frontSprocket = valueFront;
      row.frontSprocketKey = frontSprockets.length - indexFront;
      row.rearSprocket = valueRear;
      row.rearSprocketKey = rearSprockets.length - indexRear;
      row.transmission = valueFront / valueRear;
      row.validity = 1 - allowedArray[indexFront][indexRear];
      if (row.validity == 0) table.push(row);
    });
  });
  table.sort((a: TransmissionState, b: TransmissionState) =>
    a.transmission > b.transmission
      ? 1
      : a.transmission < b.transmission
      ? -1
      : 0
  );
  return [...table];
}

function scaleBetween(fromArray: number[], toArray: number[]): number[] {
  var max = Math.max.apply(Math, fromArray);
  var min = Math.min.apply(Math, fromArray);
  var scaledMax = Math.max.apply(Math, toArray);
  var scaledMin = Math.min.apply(Math, toArray);
  return fromArray.map(
    (num) => ((scaledMax - scaledMin) * (num - min)) / (max - min) + scaledMin
  );
}

export function scaleNumber(max: number, newMax:number, toScale: number): number {
  return newMax * toScale / max;
}

function dist(fromArray: number[], toArray: number[]): number[][] {
  const res = Array.from(
    Array(fromArray.length),
    () => new Array(toArray.length)
  );

  fromArray.map((valueFrom, keyFrom) => {
    toArray.map((valueTo, keyTo) => {
      res[keyFrom][keyTo] = Math.abs(valueFrom - valueTo);
    });
  });
  return res;
}

function allowed(distArray: number[][]): number[][] {
  distArray.map((value, key) => {
    const max = Math.max.apply(Math, value);
    value.map((_, keyInner) => {
      distArray[key][keyInner] =
        parseFloat((distArray[key][keyInner] / max).toFixed(2)) <=
        allowedSprockets[distArray.length - 1]
          ? 1
          : 0;
    });
  });
  return distArray;
}

const closestIndex = (num: number, arr: number[]) => {
  let curr = arr[0],
    diff = Math.abs(num - curr);
  let index = 0;
  for (let val = 0; val < arr.length; val++) {
    let newdiff = Math.abs(num - arr[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
      index = val;
    }
  }
  return index;
};

function getTransmissionNeeded(
  speed: number,
  tireCircumference: number,
  favoriteCadence: number
): number {
  return (60000 * speed) / (tireCircumference * favoriteCadence);
}

export function getGears(
  speed: number | null,
  transmissions: TransmissionState[],
  tireCircumference: number,
  favoriteCadence: number
) {
  if (speed === null) speed = 0;
  const transmissionNeeded = getTransmissionNeeded(
    speed,
    tireCircumference,
    favoriteCadence
  );

  let bestIndex = closestIndex(
    transmissionNeeded,
    transmissions.map((a) => a.transmission)
  );

  const transmissionBest = transmissions[bestIndex].transmission;
  const sprocketFront = transmissions[bestIndex].frontSprocket;
  const sprocketFrontKey = transmissions[bestIndex].frontSprocketKey;
  const sprocketRear = transmissions[bestIndex].rearSprocket;
  const sprocketRearKey = transmissions[bestIndex].rearSprocketKey;

  const bestGearCombo: BestGearCombination = {
    speed: speed,
    transmissionNeeded: transmissionNeeded,
    transmissionBest: transmissionBest,
    frontSprocket: sprocketFront,
    frontSprocketKey: sprocketFrontKey,
    rearSprocket: sprocketRear,
    rearSprocketKey: sprocketRearKey,
  };
  return bestGearCombo;
}

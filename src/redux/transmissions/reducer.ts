import { TransmissionState, TransmissionsAction, SetTransmissionsAction } from "../../types";
import { TRANSMISSIONS_ACTION_TYPE } from "./actions";

export const initialState: TransmissionState[] = createTransmissionTable([],[]);
const allowedSprockets = [1, 0.7, 0.6, 0.4];

export const transmissions = (
  state: TransmissionState[] = [ ... initialState ],
  action: TransmissionsAction,
) => {
  switch (action.type) {
    case TRANSMISSIONS_ACTION_TYPE.SET_TRANSMITTIONS:
      const { sprocketData } = <SetTransmissionsAction>action;
      let table = createTransmissionTable(sprocketData.sprocketsFront, sprocketData.sprocketsRear);
      return [ ...table ];
    default:
      return [ ...state ];
  }
};

function createTransmissionTable(frontSprockets : number[], rearSprockets : number[]) {
    let table = [] as TransmissionState[];
    const rearSprocketKeys = Array.from(rearSprockets.keys());
    const scaledFrontSprocketKeys = scaleBetween(
      Array.from(frontSprockets.keys()),
      Array.from(rearSprockets.keys())
    );
    const distArray = dist(scaledFrontSprocketKeys, rearSprocketKeys);
    const allowedArray = allowed(JSON.parse(JSON.stringify(distArray)));

    frontSprockets.map((sproketsFront, indexFront) => {
      rearSprockets.map((sproketsRear, indexRear) => {
        let row = {} as TransmissionState;
        row.frontSprocket = sproketsFront;
        row.rearSprocket = sproketsRear;
        row.transmission = sproketsFront / sproketsRear;
        row.validity = 1 - allowedArray[indexFront][indexRear];
        if(row.validity == 0)
          table.push(row); 
      })
    });
    table.sort((a : TransmissionState,b : TransmissionState) => (a.transmission > b.transmission) ? 1 : ((a.transmission < b.transmission) ? -1 : 0));
    return [ ...table];
}

function scaleBetween(fromArray: number[], toArray: number[]): number[] {
  var max = Math.max.apply(Math, fromArray);
  var min = Math.min.apply(Math, fromArray);
  var scaledMax = Math.max.apply(Math, toArray);
  var scaledMin = Math.min.apply(Math, toArray);
  return fromArray.map(
    (num) => ((scaledMax - scaledMin) * (num - min)) / (max - min) + scaledMin
  );
};

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
};

function allowed(distArray: number[][]): number[][]{
  distArray.map((value, key) => {
      const max = Math.max.apply(Math, value);
      value.map((valueInner, keyInner) => {
          distArray[key][keyInner] = parseFloat((distArray[key][keyInner] / max).toFixed(2)) <= allowedSprockets[distArray.length - 1] ? 1 : 0;
      });
    });
  return distArray;
}




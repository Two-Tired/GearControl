import { TransmissionState, TransmissionsAction, SetTransmissionsAction } from "../../types";
import { TRANSMISSIONS_ACTION_TYPE } from "./actions";

export const initialState: TransmissionState[] = createTransmissionTable([],[]);

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
    frontSprockets.map((sproketsFront, indexFront) => {
      rearSprockets.map((sproketsRear, indexRear) => {
        let row = {} as TransmissionState;
        row.frontSprocket = sproketsFront;
        row.rearSprocket = sproketsRear;
        row.transmission = sproketsFront / sproketsRear;
        row.validity = 0;
        table.push(row); 
      })
    });
    table.sort((a : TransmissionState,b : TransmissionState) => (a.transmission > b.transmission) ? 1 : ((a.transmission < b.transmission) ? -1 : 0));
    table.forEach(element => {
      console.log(element)
    });
    console.log("transmission table created"); 
    console.log(Array.isArray(table));
    return [ ...table];
}
import { SetTransmissionsAction} from "../../types";

export enum TRANSMISSIONS_ACTION_TYPE {
  SET_TRANSMITTIONS = "TRANSMISSIONS/SET_TRANSMISSIONS",
}

// export const setTransmissions = (): SetTransmissionsAction => ({
//   type: TRANSMISSIONS_ACTION_TYPE.SET_TRANSMITTIONS,
// });

export const setTransmissions = (
  frontSprockets: number[],
  rearSprockets: number[],
): SetTransmissionsAction => ({
  type: TRANSMISSIONS_ACTION_TYPE.SET_TRANSMITTIONS,
  sprocketData: {
    sprocketsFront: frontSprockets,
    sprocketsRear: rearSprockets,
  },
});

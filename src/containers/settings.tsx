import { Dispatch } from "react";
import { connect } from "react-redux";
import { setSettings } from "../redux/settings/actions";
import { AppState, SettingsAction } from "../types";
import SettingsBase from "../components/settings/settings-base";

const mapStateToProps = (state: AppState) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsAction>) => ({
  onSettingsSave: (
    frontSprocketNumber: number,
    rearSprocketNumber: number,
    frontSprockets: number[],
    rearSprockets: number[],
    favoriteCadence: number
  ) => {
    dispatch(
      setSettings(
        frontSprocketNumber,
        rearSprocketNumber,
        frontSprockets,
        rearSprockets,
        favoriteCadence
      )
    );
  },
});

export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsBase);

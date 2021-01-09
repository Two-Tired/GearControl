import { Dispatch } from "react";
import { connect } from "react-redux";
import { setSettings } from "../../redux/settings/actions";
import { AppState, SettingsAction } from "../../redux/types";
import SettingsBase from "../../containers/settings-base";

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

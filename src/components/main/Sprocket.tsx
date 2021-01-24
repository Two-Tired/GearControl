import { useTheme } from "@react-navigation/native";
import React, { useCallback, useState, memo } from "react";
import Svg, { SvgProps, Path, Text, Circle, TSpan } from "react-native-svg";
import { sprocketPathDs, boundingBoxes } from "./sprocketPathDs";
import { Dimensions } from "react-native";
import { SETTINGS_SPROCKET_TYPE } from "../../types";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

type Props = {
  sprockets: number[];
  gear: number;
  sprocketType: SETTINGS_SPROCKET_TYPE;
  svgProps?: SvgProps;
};

function Sprocket({ sprockets, gear, sprocketType, svgProps }: Props) {
  const { colors } = useTheme();
  const [dimensions, _] = useState({ window, screen });

  const viewBox =
    boundingBoxes[sprockets[0]].x +
    " " +
    boundingBoxes[sprockets[0]].y +
    " " +
    boundingBoxes[sprockets[0]].width +
    " " +
    boundingBoxes[sprockets[0]].height;
  const viewBoxWidth = boundingBoxes[sprockets[0]].width;

  const strokeWidth = viewBoxWidth / 170;
  const innerRadius = viewBoxWidth * 0.17;

  const highlight = useCallback(
    (index: number): string => {
      return sprocketType === SETTINGS_SPROCKET_TYPE.FRONT
        ? sprockets.length - index == gear
          ? "#000"
          : "#000"
        : index + 1 == gear
        ? "#000"
        : "#000";
    },
    [gear, sprockets]
  );

  const highlightFill = useCallback(
    (index: number): string => {
      return sprocketType === SETTINGS_SPROCKET_TYPE.FRONT
        ? sprockets.length - index == gear
          ? "#4f4f4f"
          : "#f0f0f0"
        : index + 1 == gear
        ? "#4f4f4f"
        : "#f0f0f0";
    },
    [gear, sprockets]
  );

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="40%"
      height={dimensions.window.width * 0.4}
      viewBox={viewBox}
      {...svgProps}
    >
      {sprockets.map((value, index) => {
        return (
          <Path
            key={index}
            d={sprocketPathDs[value]}
            // d={sprocketPathDs[40]}
            fillRule="evenodd"
            // fill={
            //   sprocketColors[
            //     Math.ceil(scaleNumber(sprockets.length - 1, 14, index))
            //   ]
            // }
            fill={highlightFill(index)}
            stroke={highlight(index)}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            // stroke="#000"
            strokeMiterlimit={10}
          />
        );
      })}
      <Circle
        cx="0"
        cy="0"
        r={innerRadius}
        stroke="#000"
        strokeWidth={strokeWidth}
        fill="#f0f0f0"
      />
      <Text
        x="0"
        y="0"
        textAnchor="middle"
        alignmentBaseline="central" // android
        dominantBaseline="central" // firefox
        id="rearSprocket"
        fill={colors.primary}
        fontSize={boundingBoxes[sprockets[0]].width / 3}
        fontWeight="bold"
      >
        <TSpan>{gear}</TSpan>
      </Text>
    </Svg>
  );
}

// Sprocket.whyDidYouRender = true;

export default memo(Sprocket);

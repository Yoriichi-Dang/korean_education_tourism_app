import React from "react";
import { Svg, Path } from "react-native-svg";
import { IconProps } from "./types";
import { Pressable } from "react-native";
const EyeIcon = ({ width, height }: IconProps) => {
  return (
    <Svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default EyeIcon;

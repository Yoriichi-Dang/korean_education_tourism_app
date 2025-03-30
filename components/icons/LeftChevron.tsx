import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Svg, Polygon } from "react-native-svg";
import { IconProps } from "./types";

const LeftChevron = ({ width = 48, height = 48 }: IconProps) => {
  return (
    <Svg
      viewBox="0 0 404.258 404.258"
      width={`${width}px`}
      height={`${height}px`}
      fill="#000000"
      id="Layer_1"
    >
      <Polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 " />
    </Svg>
  );
};

export default LeftChevron;

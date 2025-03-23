import { Svg, Path, Defs, G } from "react-native-svg";
import { IconProps } from "./types";
import React from "react";

const DotMore = ({ width, height }: IconProps) => {
  return (
    <Svg
      fill="#000000"
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 32 32"
      enable-background="new 0 0 32 32"
      id="Glyph"
    >
      <Path
        d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
        id="XMLID_294_"
      />
      <Path
        d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
        id="XMLID_295_"
      />
      <Path
        d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
        id="XMLID_297_"
      />
    </Svg>
  );
};

export default DotMore;

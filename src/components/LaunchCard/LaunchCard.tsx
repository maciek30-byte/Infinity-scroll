import React from "react";
import { cardStyles } from "./launchCard.styles";

interface LaunchCardProps {
  mission_name: string;
}

export const LaunchCard = ({ mission_name }: LaunchCardProps) => {
  return (
    <div style={cardStyles}>
      <p>{mission_name} </p>
    </div>
  );
};

import React from "react";
import ContentLoader from "react-content-loader";

const TaskCardLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={270}
    height={400}
    viewBox="0 0 270 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Image placeholder */}
    <rect x="0" y="0" rx="20" ry="20" width="270" height="143" />

    {/* Title */}
    <rect x="0" y="155" rx="3" ry="3" width="200" height="18" />

    {/* Price */}
    <rect x="0" y="180" rx="3" ry="3" width="100" height="24" />

    {/* Stats section */}
    <rect x="0" y="220" rx="3" ry="3" width="60" height="12" />
    <rect x="0" y="238" rx="3" ry="3" width="50" height="20" />

    {/* Divider line */}
    <rect x="120" y="220" rx="0" ry="0" width="2" height="38" />

    <rect x="140" y="220" rx="3" ry="3" width="60" height="12" />
    <rect x="140" y="238" rx="3" ry="3" width="50" height="20" />

    {/* Time section */}
    <rect x="0" y="275" rx="8" ry="8" width="270" height="50" />

    {/* Button */}
    <rect x="0" y="340" rx="20" ry="20" width="270" height="50" />
  </ContentLoader>
);

export default TaskCardLoader;

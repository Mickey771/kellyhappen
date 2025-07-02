// src/components/layout/PreLoader.tsx
import React from "react";

const PreLoader = () => {
  return (
    <div
      className="flex items-center justify-center h-lvh w-full"
      suppressHydrationWarning
    >
      <div
        className="w-[160px] h-[160px] border-t-4 border-b-4 border-primaryBrown rounded-full animate-spin"
        suppressHydrationWarning
      ></div>
    </div>
  );
};

export default PreLoader;

import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="spinner">
        <div className="half-spinner"></div>
      </div>
    </div>
  );
};

export default Loading;

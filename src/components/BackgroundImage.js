import React from "react";

const BackgroundImage = () => {
  return (
    <div
      style={{
        position: "absolute",
        backgroundImage: `url("https://picsum.photos/1366/768")`,
        zIndex: "-10",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
    />
  );
};

export default BackgroundImage;

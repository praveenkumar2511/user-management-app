import React from "react";
const AppHeader = () => {
  return (
    <header
      style={{
        backgroundColor: "#1f2937",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
        borderBottom: "0px solid transparent",
      }}
    >
      {" "}
      <div></div>{" "}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {" "}
        <span style={{ color: "white", fontSize: "14px", fontWeight: 500 }}>
          {" "}
          Elon Musk{" "}
        </span>{" "}
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#ef4444",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <span
            style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
          >
            {" "}
            G{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
    </header>
  );
};
export default AppHeader;

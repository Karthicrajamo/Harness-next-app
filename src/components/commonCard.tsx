import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const CommonCard = ({
  title,
  subTitle,
  children,
  footerButtons = [],
  className = "",
  style = {},
}) => {
  const footer = footerButtons.length ? (
    <div className="flex gap-2 justify-content-end ">
      {footerButtons.map((btn, index) => (
        <Button
          key={index}
          label={btn.label}
          icon={btn.icon}
          className={btn.className}
          onClick={btn.onClick}
          severity={btn.severity}
          outlined={btn.outlined}
        />
      ))}
    </div>
  ) : null;

  return (
    <Card
      title={title}
      subTitle={subTitle}
     
      className={`shadow-2 border-round-xl ${className} my-card-gradient border-l-[6px] border-[#2196f3] dark:bg-gray-700 px-4 py-3 rounded-bl-[8px]`}
      style={style}
    >
      {children}
    </Card>
  );
};

export default CommonCard;
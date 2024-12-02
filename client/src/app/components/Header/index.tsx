import React from "react";

type Props = {
  name: string;
  // buttonComponent?
  isSmallText?: boolean;
};

const Header = ({ name, isSmallText = false }: Props) => {
  return (
    <div className="w-ful mb-5 flex items-center justify-between">
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}
      >
        {name}
      </h1>
    </div>
  );
};

export default Header;

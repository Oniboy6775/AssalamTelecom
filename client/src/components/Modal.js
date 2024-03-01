import React from "react";

export const Modal = ({
  children,
  title = "",
  type = "",
  list = [],
  buttons = [],
}) => {
  return (
    <div className="bg-black/50 fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center z-50 ">
      <div className=" bg-white p-4 rounded-lg w-10/12 max-w-[400px]">
        <p className="uppercase text-center font-bold text-lg underline">
          {title}
        </p>
        <p className="font-bold text-sm text-center">{children}</p>
        {type === "list" &&
          list.map((e, index) => {
            return (
              <div
                key={index}
                className="flex justify-between text-sm font-bold capitalize border-b-2 border-black/5"
              >
                <p className="uppercase">{e.name}</p>
                <p>{e.value}</p>
              </div>
            );
          })}

        <div className="flex gap-2 justify-center mt-2">
          {buttons &&
            buttons.map((e) => (
              <button
                key={e.name}
                onClick={e.handleClick}
                className={` btn ${e.className}`}
              >
                {e.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

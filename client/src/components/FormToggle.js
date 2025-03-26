import React from "react";

export default function FormToggle({ toggled, setToggle, labelText }) {
  return (
    <div className="p-2">
      {/* Start */}
      <p>{labelText}</p>
      <div className="flex items-center">
        <div className="form-switch">
          <input
            type="checkbox"
            id="switch-1"
            className="sr-only"
            checked={toggled}
            onChange={() => setToggle(!toggled)}
          />
          <label className="bg-gray-400 dark:bg-gray-700" htmlFor="switch-1">
            <span className="bg-white shadow-sm" aria-hidden="true"></span>
            <span className="sr-only">Switch label</span>
          </label>
        </div>
        <div className="text-sm text-gray-400 dark:text-gray-500 italic ml-2">
          {toggled ? "On" : "Off"}
        </div>
      </div>
      {/* End */}
    </div>
  );
}

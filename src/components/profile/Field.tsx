import { useAlert } from "@/contexts/AlertContext";
import profile from "@/styles/modules/profile.module.scss";
import { useEffect, useId, useRef, useState } from "react";
export default function Field({
  label,
  initialValue,
  name,
  editable = false,
  pattern,
  patternMessage,
}: {
  label: string;
  initialValue: string;
  name: string;
  editable?: boolean;
  pattern: string;
  patternMessage: string;
}) {
  const { showAlert } = useAlert();
  const [value, setValue] = useState<string>(initialValue);

  type ValueState = "unchanged" | "isBeingEdited" | "changed";
  const [valueState, setValueState] = useState<ValueState>("unchanged");
  const [error, setError] = useState("");
  const fieldRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (fieldRef.current && !fieldRef.current.contains(e.target as Node)) {
      setValue(initialValue);
      setValueState("unchanged");
      setError("");
    }
  };
  useEffect(() => {
    if (valueState == "isBeingEdited") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [valueState]);

  const handleIconClick = (e: React.MouseEvent) => {
    // Must be executed only when icon container is clicked
    try {
      switch (valueState) {
        case "unchanged":
          // open input for editing
          setValueState("isBeingEdited");
          break;
        case "isBeingEdited":
          // To be implemented:
          // send confirm code request to backend
          // and spawn confirm code field
          if (!error) {
            if (value == initialValue) {
              setValueState("unchanged");
            } else {
              setValueState("changed");
            }
          } else {
            showAlert("You can not submit changes when there are any errors");
          }
          break;
        case "changed":
          // Reset changes
          setValue(initialValue);
          setValueState("unchanged");
          break;
        default:
          throw new Error(`Unknown valueState type: ${valueState}`);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const checkPattern = (e) => {
    e.preventDefault();
    if (pattern) {
      if (!e.target.value.match(pattern)) {
        setError(patternMessage);
      } else {
        setError("");
      }
    }
  };
  return (
    <>
      <div className={profile.field} ref={fieldRef} key={useId()}>
        <div className={profile.fieldLabel}>{label}</div>
        {editable && valueState == "isBeingEdited" ? (
          <input
            type="text"
            className={profile.fieldInput}
            placeholder="Enter new value"
            value={value}
            name={name}
            id={name}
            onChange={(e) => {
              checkPattern(e);
              setValue(e.target.value);
            }}
          />
        ) : (
          <div className={profile.fieldValue}>
            {value || "Failed to retrieve value"}
          </div>
        )}
        {editable ? (
          <div
            className={`${profile.iconContainer} ${
              valueState == "unchanged" ? profile.hoverOnly : ""
            }`}
            onClick={handleIconClick}
          >
            {/* Edit icon */}
            {valueState == "unchanged" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
              </svg>
            ) : (
              ""
            )}
            {/* Save icon */}
            {valueState == "isBeingEdited" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            ) : (
              ""
            )}
            {/* Reset icon */}
            {valueState == "changed" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
              </svg>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {error ? <div className={profile.fieldError}>{error}</div> : ""}
    </>
  );
}

import { IActiveTab } from "@/app/interfaces";
import { FocusEvent, memo } from "react";

interface ITextEditor {
  checkBrackets: () => void;
  handleOnBlur: (e: FocusEvent<HTMLDivElement>) => void;
  activeTab: IActiveTab;
}

const TextEditor = ({
  checkBrackets,
  handleOnBlur,
  activeTab,
}: ITextEditor) => {
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "0.25rem",
        height: 600,
        position: "relative",
        overflow: "scroll",
      }}
      contentEditable
      suppressContentEditableWarning
      onKeyUp={checkBrackets}
      onClick={checkBrackets}
      onBlur={handleOnBlur}
      dangerouslySetInnerHTML={{ __html: activeTab.content }}
      id="selectable"
    ></div>
  );
};

export default memo(TextEditor);

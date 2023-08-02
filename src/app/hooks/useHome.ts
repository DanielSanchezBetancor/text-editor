import { FocusEvent, useCallback, useEffect, useRef, useState } from "react";
import { IActiveTab, IItemList } from "../interfaces";
import { DEFAULT_TAB_CONTENT } from "../globals";

const useHome = () => {
  const [tabs, setTabs] = useState(DEFAULT_TAB_CONTENT);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeLine, setActiveLine] = useState("");

  const handleActiveTab = (tabIndex: number) => {
    setActiveTab(tabs[tabIndex]);
  };

  const checkBrackets = useCallback(() => {
    const userSelection = window.getSelection();
    const userRange = userSelection?.getRangeAt(0);
    const currentLine = userRange?.startContainer.textContent ?? "";
    const userCursorPos = userRange?.startOffset ?? 0;
    const openingBracketPos =
      currentLine.substring(0, userCursorPos).lastIndexOf("[") ?? 0;
    const closingBracketPos = currentLine
      .substring(openingBracketPos)
      .indexOf("]");
    if (openingBracketPos !== -1 && closingBracketPos > 0 && userRange) {
      setActiveLine(
        currentLine.substring(
          openingBracketPos + 1,
          closingBracketPos + openingBracketPos
        )
      );
    }
    handleModal(
      openingBracketPos !== -1 &&
        openingBracketPos <= userCursorPos &&
        userCursorPos <= closingBracketPos + openingBracketPos &&
        openingBracketPos !== closingBracketPos,
      userRange
    );
  }, []);

  const handleModal = (open: boolean, userRange?: Range) => {
    const dialog = document.querySelector("dialog");
    if (!dialog) return;
    open ? dialog.setAttribute("open", "true") : dialog.removeAttribute("open");
    if (open) {
      const span = userRange?.startContainer.parentElement;
      if (span) {
        const top = span?.offsetTop ?? 0;
        const left = userRange?.startOffset ?? 0;
        dialog.style.top = `${top + 20}px`;
        dialog.style.left = `${left * 8}px`;
      }
    }
  };

  const handleModalListClick = (selectedItem: IItemList) => {
    const editor = document.getElementById("selectable");
    if (editor) {
      const startPos = editor.innerHTML.search(`\\[${activeLine}\\]`);
      const leftText = editor.innerHTML.substring(0, startPos);
      const rightText = editor.innerHTML.substring(
        startPos + 2 + activeLine.length
      );
      const imageBlock = `<br/> <img src="${selectedItem.image}" />`;
      editor.innerHTML = `${leftText}${imageBlock}${rightText}`;
      handleModal(false);
    }
  };

  const handleOnBlur = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      const newContent = e.target.innerHTML;
      const newTabInfo: IActiveTab = {
        ...activeTab,
        content: newContent,
      };
      const newTabs = tabs.map((tab) =>
        tab.id === newTabInfo.id ? newTabInfo : tab
      );
      setActiveTab(newTabInfo);
      setTabs(newTabs);
    },
    [activeTab, tabs]
  );

  /**
   * Liberate for polling interval to fetch back and post the new content
   */
//   useEffect(() => {
//     const polling = setInterval(() => {
//       const newContent = document.getElementById("selectable")?.innerHTML;
//       const newActiveTab: IActiveTab = {
//         ...activeTab,
//         content: newContent ?? "",
//       };

//       fetch("http://localhost:4000/test", {
//         method: "POST",
//         body: JSON.stringify(newActiveTab),
//       })
//         .then(() => {})
//         .catch(() => {});
//     }, 10000);

//     return () => {
//       clearInterval(polling);
//     };
//   }, [activeTab]);

  return {
    handleActiveTab,
    activeLine,
    handleModalListClick,
    checkBrackets,
    handleOnBlur,
    activeTab,
  };
};

export default useHome;

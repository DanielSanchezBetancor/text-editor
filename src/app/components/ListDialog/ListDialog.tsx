import { IItemList } from "@/app/interfaces";
import React from "react";

/**
 * This options can come from anywhere you like, for example, redux
 */
const OPTIONS = [
  {
    key: "image_1",
    image: "https://picsum.photos/200/301",
  },
  {
    key: "asdf",
    image: "https://picsum.photos/200/300",
  },
];

interface IListDialog {
  activeLine: string;
  handleModalListClick: (selectedItem: IItemList) => void;
}

const ListDialog = ({ activeLine, handleModalListClick }: IListDialog) => {
  const possibleOptions = OPTIONS.filter((option) =>
    new RegExp(activeLine).exec(option.key)
  );
  return (
    <dialog id="dialog" style={{ top: 0, left: 0, margin: 0, zIndex: 2 }}>
      <ul>
        {possibleOptions.map((possibleOption) => (
          <li
            onClick={() => handleModalListClick(possibleOption)}
            key={possibleOption.key}
          >
            {possibleOption.key}
          </li>
        ))}
      </ul>
    </dialog>
  );
};

export default ListDialog;

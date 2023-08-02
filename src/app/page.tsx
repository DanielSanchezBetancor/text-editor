"use client";

import Tabs from "./components/Tabs";
import TextEditor from "./components/TextEditor/TextEditor";
import ListDialog from "./components/ListDialog";
import useHome from "./hooks/useHome";

const Home = () => {
  const {
    handleActiveTab,
    activeLine,
    handleModalListClick,
    checkBrackets,
    handleOnBlur,
    activeTab,
  } = useHome();

  return (
    <>
      <Tabs handleActiveTab={handleActiveTab} />
      <div>
        <ListDialog
          activeLine={activeLine}
          handleModalListClick={handleModalListClick}
        />
        <TextEditor
          checkBrackets={checkBrackets}
          handleOnBlur={handleOnBlur}
          activeTab={activeTab}
        />
      </div>
    </>
  );
};

export default Home;

interface ITabs {
  handleActiveTab: (tabIndex: number) => void;
}

const Tabs = ({ handleActiveTab }: ITabs) => {
  return (
    <>
      <button onClick={() => handleActiveTab(0)}>Tab 1</button>
      <button onClick={() => handleActiveTab(1)}>Tab 2</button>
    </>
  );
};

export default Tabs;

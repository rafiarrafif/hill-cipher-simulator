import MainSection from "./components/MainSection";

const App = () => {
  return (
    <div className="w-screen h-screen flex justify-center overflow-x-hidden bg-white">
      <div className="bg-white w-full max-w-140">
        <MainSection />
      </div>
    </div>
  );
};

export default App;

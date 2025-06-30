import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Main from "./layout/Main";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;

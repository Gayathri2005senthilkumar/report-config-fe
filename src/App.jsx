import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import MainLayout from "./layout/MainLayout";


function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainLayout />
      </div>
    </div>
  );
}

export default App;

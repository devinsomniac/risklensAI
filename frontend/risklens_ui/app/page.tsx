import Breadcrumb_home from "./components/Breadcrumb_home";
import Decision from "./components/Decision";
import Footer from "./components/Footer";
import Info from "./components/Info";
import RiskForm from "./components/RiskForm";
import Title from "./components/Title";


export default function Home() {
  return (
    <div >
      <Breadcrumb_home />
      <div className="p-8 md:p-8">
        <Title />
        <div className="mt-6 ">
          <RiskForm />
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Decision />
          </div>
          <div>
            <Info />
          </div>
        </div>
      </div>
    <Footer/>
    </div>
  );
}

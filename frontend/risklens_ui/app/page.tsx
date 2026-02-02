import Breadcrumb_home from "./components/Breadcrumb_home";
import RiskForm from "./components/RiskForm";
import Title from "./components/Title";


export default function Home() {
  return (
    <div >
      <Breadcrumb_home/>
      <div className="p-8 md:p-8">
        <Title />
        <div className="mt-6 ">
          <RiskForm/>
        </div>
      </div>

    </div>
  );
}

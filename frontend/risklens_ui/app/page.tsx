"use client"
import { useState } from "react";
import Breadcrumb_home from "./components/Breadcrumb_home";
import Decision from "./components/Decision";
import Footer from "./components/Footer";
import Info from "./components/Info";
import RiskForm from "./components/RiskForm";
import Title from "./components/Title";


export default function Home() {
  const [assessment,setAssessment] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  return (
    <div >
      <Breadcrumb_home />
      <div className="p-8 md:p-8">
        <Title />
        <div className="mt-6 ">
          <RiskForm 
              setAssessment={setAssessment}
              setLoading={setLoading}
              setError={setError} 
              loading = {loading}
          />
        </div>
        <div className="mt-6 flex flex-col gap-5">
          <div>
            <Decision assessment={assessment} loading={loading} error={error} />
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

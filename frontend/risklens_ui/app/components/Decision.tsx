import Image from 'next/image'
import React from 'react'
import RiskMeter from './RiskMeter'
import { ShapReasons } from './ShapReasons'
import DecisionBadge from './DecisionBadge'

const Decision = ({ assessment, loading, error }: any) => {
  const score = assessment ? Math.round(assessment.probability * 100) : 0
  const reasons = assessment?.explanations
  ? [
      ...assessment.explanations.top_drivers.map((x: any) => ({
        feature: x.feature,
        impact: x.impact,
      })),
      ...assessment.explanations.top_reducers.map((x: any) => ({
        feature: x.feature,
        impact: x.impact,
      })),
    ]
  : []
  return (
    <div className='p-2 md:p-3 bg-white border-2 border-gray-500'>
      <h1 className='font-bold text-[#003d5c] text-2xl'>Assessment Information</h1>
      <hr className='h-0.5 bg-[#003d5c] border-0' />
      {/* Decision */}
      <div className='flex justify-center items-center p-10'>
        <RiskMeter score={score} />
      </div>
      <div>
        <DecisionBadge decision={assessment?.decision} />
      </div>
      <div>
        <ShapReasons reasons={reasons} />
      </div>
    </div>
  )
}

export default Decision
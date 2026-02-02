import Image from 'next/image'
import React from 'react'
import RiskMeter from './RiskMeter'
import { ShapReasons } from './ShapReasons'
import DecisionBadge from './DecisionBadge'

const Decision = () => {
  return (
    <div className='p-2 md:p-3 bg-white border-2 border-gray-500'>
      <h1 className='font-bold text-[#003d5c] text-2xl'>Assessment Information</h1>
      <hr className='h-0.5 bg-[#003d5c] border-0' />
      {/* Decision */}
      <div className='flex justify-center items-center p-10'>
        <RiskMeter score={25} />
      </div>
      <div>
        <DecisionBadge/>
      </div>
      <div>
        <ShapReasons reasons={[
          { feature: "PAY_0 (September delay)", impact: 0.42 },
          { feature: "High credit limit", impact: -0.31 },
          { feature: "Consistent recent payments", impact: -0.27 },
        ]} />
      </div>
    </div>
  )
}

export default Decision
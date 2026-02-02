import React from 'react'

const Info = () => {
  return (
    <div className='p-4 md:p-3 bg-white border-2 border-gray-500 h-full'>
      <h1 className='font-bold text-[#003d5c] text-2xl'>Useful Information</h1>
      <hr className='h-0.5 bg-[#003d5c] border-0' />
      <div>
        {/* About This Assessment */}
        <div className='p-2 bg-[#e3f2fd] border-l-8 border-[#0066a1] mt-4 rounded-l-lg'>
            <h3 className='font-semibold text-[#003d5c]'>About This Assessment</h3>
            <p className='text-gray-500'>This credit risk assessment is generated using a supervised machine-learning model trained on historical credit card repayment data. The inputs include customer demographics (credit limit, age, education, marital status), recent repayment behavior, monthly bill statement amounts, and previous payment amounts across multiple billing cycles.</p>
        </div>
        {/* Risk Score Interpretation */}
        <div className='p-2 bg-[#e3f2fd] border-l-8 border-[#0066a1] mt-4 rounded-l-lg'>
            <h3 className='font-semibold text-[#003d5c]'>Risk Score Interpretation</h3>
            <p className='text-gray-500'>The model estimates the probability of default in the next payment period. A lower probability indicates lower risk. The decision outcome (Approve, Review, or Reject) is derived from calibrated risk thresholds and should be interpreted as decision support rather than a replacement for professional judgment.</p>
            <ul className='mt-2'>
                <li className='text-[#003d5c] font-bold'>0-30:</li>
                <p className='text-gray-500'>Low Risk - Approve with standard terms</p>
                <li className='text-[#003d5c] font-bold'>31-60:</li>
                <p className='text-gray-500'>Medium Risk - Manual review required</p>
                <li className='text-[#003d5c] font-bold'>61-100:</li>
                <p className='text-gray-500'>High Risk - Rejection recommended</p>
            </ul>
        </div>
        {/* Important Notice */}
        <div className='p-2 bg-[#fff3e0] border-l-8 border-[#f57c00] mt-4 rounded-l-lg'>
            <h3 className='font-semibold text-[#003d5c]'>⚠️ Important Notice</h3>
            <p className='text-gray-500'>Cases marked for review may require additional verification or manual underwriting before a final decision is made. This assessment is one component of a comprehensive credit evaluation process.</p>
        </div>
      </div>
    </div>
  )
}

export default Info
import Image from 'next/image'
import React from 'react'

const DecisionBadge = ({decision} : any) => {
  return (
    <div className='flex justify-center items-center p-8'>
        <div className='h-50 flex flex-col p-4 gap-3 justify-center items-center w-125 shadow-xl bg-gray-100 rounded-md'>
            <Image src={"/red_reject.png"} alt='approve' height={120} width={120}  className=''/>
            <p>{decision ? decision : ""}</p>
            <p className='text-center'>Low default risk detected. Credit facility approved subject to standard terms and conditions.</p>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default DecisionBadge
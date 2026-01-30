import Image from "next/image"
import { TbUserFilled } from "react-icons/tb";

const Header = () => {
    return (
        <div className='p-2 md:p-3 bg-[#003d5c] flex justify-between text-white'>
            <div>
                <p className="text-white text-xl md:text-4xl">RiskLens AI</p>
            </div>
            <div>
                <div className="flex items-center gap-5">
                    <p className="text-sm">John Smith</p>
                    <div className="h-8 md:h-12 w-8 md:w-12  bg-amber-50 flex justify-center items-center rounded-full">
                        <TbUserFilled className="text-black text-2xl" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Header
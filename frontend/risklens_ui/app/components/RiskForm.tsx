import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const RiskForm = () => {
    return (
        <div className='p-2 md:p-3 bg-white border-2 border-gray-500'>
            <h1 className='font-bold text-[#003d5c] text-2xl'>Customer Credit Information</h1>
            <hr className='h-0.5 bg-[#003d5c] border-0' />
            {/* Form Div */}
            <div className='p-4'>
                <div>
                    <h2 className='font-bold text-[#003d5c]'>Basic Demographics</h2>
                    <hr />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2">
                        <Field>
                            <FieldLabel htmlFor="Credit_Limit">Credit Limit (£)</FieldLabel>
                            <Input id="credit_limit" placeholder="e.g., 50000" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="Gender">Gender (£)</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="light">Male</SelectItem>
                                        <SelectItem value="dark">Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </Field>
                        <Field>
                            <FieldLabel htmlFor="Educatiom">Edication label</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Education" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="graduate_school">Graduate School</SelectItem>
                                        <SelectItem value="university">University</SelectItem>
                                        <SelectItem value="high_school">High School</SelectItem>
                                        <SelectItem value="others">others</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="Marraige">Marital Status</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="married">Married</SelectItem>
                                        <SelectItem value="single">Single</SelectItem>
                                        <SelectItem value="others">others</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="age">Age</FieldLabel>
                            <Input id="age" placeholder="e.g., 45" />
                        </Field>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default RiskForm
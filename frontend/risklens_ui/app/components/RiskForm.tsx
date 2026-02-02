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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const RiskForm = () => {
    return (
        <div className='p-2 md:p-3 bg-white border-2 border-gray-500'>
            <h1 className='font-bold text-[#003d5c] text-2xl'>Customer Credit Information</h1>
            <hr className='h-0.5 bg-[#003d5c] border-0' />
            {/* Form Div */}
            <div className='p-4'>
                {/* Demographic form */}
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
                {/* Repayment Status */}
                <div className="mt-4">
                    {/* Repayment status */}
                    <h2 className='font-bold text-[#003d5c]'>Repayment Status (months delay)</h2>
                    <hr />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2">
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - September</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="No_consumption">No Consumption</SelectItem>
                                        <SelectItem value="pay_duly">Pay Duly</SelectItem>
                                        <SelectItem value="revolving_credit">Revolving Credit</SelectItem>
                                        <SelectItem value="one">1 month Delay</SelectItem>
                                        <SelectItem value="one">2 months Delay</SelectItem>
                                        <SelectItem value="one">3 months Delay</SelectItem>
                                        <SelectItem value="one">4 months Delay</SelectItem>
                                        <SelectItem value="one">5 months Delay</SelectItem>
                                        <SelectItem value="one">6 months Delay</SelectItem>
                                        <SelectItem value="one">7 months Delay</SelectItem>
                                        <SelectItem value="one">8 months Delay</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - August</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="No_consumption">No Consumption</SelectItem>
                                        <SelectItem value="pay_duly">Pay Duly</SelectItem>
                                        <SelectItem value="revolving_credit">Revolving Credit</SelectItem>
                                        <SelectItem value="one">1 month Delay</SelectItem>
                                        <SelectItem value="one">2 months Delay</SelectItem>
                                        <SelectItem value="one">3 months Delay</SelectItem>
                                        <SelectItem value="one">4 months Delay</SelectItem>
                                        <SelectItem value="one">5 months Delay</SelectItem>
                                        <SelectItem value="one">6 months Delay</SelectItem>
                                        <SelectItem value="one">7 months Delay</SelectItem>
                                        <SelectItem value="one">8 months Delay</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - July</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="No_consumption">No Consumption</SelectItem>
                                        <SelectItem value="pay_duly">Pay Duly</SelectItem>
                                        <SelectItem value="revolving_credit">Revolving Credit</SelectItem>
                                        <SelectItem value="one">1 month Delay</SelectItem>
                                        <SelectItem value="one">2 months Delay</SelectItem>
                                        <SelectItem value="one">3 months Delay</SelectItem>
                                        <SelectItem value="one">4 months Delay</SelectItem>
                                        <SelectItem value="one">5 months Delay</SelectItem>
                                        <SelectItem value="one">6 months Delay</SelectItem>
                                        <SelectItem value="one">7 months Delay</SelectItem>
                                        <SelectItem value="one">8 months Delay</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - June</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="No_consumption">No Consumption</SelectItem>
                                        <SelectItem value="pay_duly">Pay Duly</SelectItem>
                                        <SelectItem value="revolving_credit">Revolving Credit</SelectItem>
                                        <SelectItem value="one">1 month Delay</SelectItem>
                                        <SelectItem value="one">2 months Delay</SelectItem>
                                        <SelectItem value="one">3 months Delay</SelectItem>
                                        <SelectItem value="one">4 months Delay</SelectItem>
                                        <SelectItem value="one">5 months Delay</SelectItem>
                                        <SelectItem value="one">6 months Delay</SelectItem>
                                        <SelectItem value="one">7 months Delay</SelectItem>
                                        <SelectItem value="one">8 months Delay</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - May</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="No_consumption">No Consumption</SelectItem>
                                        <SelectItem value="pay_duly">Pay Duly</SelectItem>
                                        <SelectItem value="revolving_credit">Revolving Credit</SelectItem>
                                        <SelectItem value="one">1 month Delay</SelectItem>
                                        <SelectItem value="one">2 months Delay</SelectItem>
                                        <SelectItem value="one">3 months Delay</SelectItem>
                                        <SelectItem value="one">4 months Delay</SelectItem>
                                        <SelectItem value="one">5 months Delay</SelectItem>
                                        <SelectItem value="one">6 months Delay</SelectItem>
                                        <SelectItem value="one">7 months Delay</SelectItem>
                                        <SelectItem value="one">8 months Delay</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - April</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="No_consumption">No Consumption</SelectItem>
                                        <SelectItem value="pay_duly">Pay Duly</SelectItem>
                                        <SelectItem value="revolving_credit">Revolving Credit</SelectItem>
                                        <SelectItem value="one">1 month Delay</SelectItem>
                                        <SelectItem value="one">2 months Delay</SelectItem>
                                        <SelectItem value="one">3 months Delay</SelectItem>
                                        <SelectItem value="one">4 months Delay</SelectItem>
                                        <SelectItem value="one">5 months Delay</SelectItem>
                                        <SelectItem value="one">6 months Delay</SelectItem>
                                        <SelectItem value="one">7 months Delay</SelectItem>
                                        <SelectItem value="one">8 months Delay</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>


                </div>
                {/* Bill Statement Amounts (£) */}
                <div className="mt-4">
                    <h2 className='font-bold text-[#003d5c]'>Bill Statement Amounts (£)</h2>
                    <hr />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2">
                        <Field>
                            <FieldLabel htmlFor="bill_amt_sept">Bill Amount - September</FieldLabel>
                            <Input id="bill_amt_sept" placeholder="e.g., 2100" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bill_amt_aug">Bill Amount - August</FieldLabel>
                            <Input id="bill_amt_aug" placeholder="e.g., 3200" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bill_amt_jul">Bill Amount - July</FieldLabel>
                            <Input id="bill_amt_jul" placeholder="e.g., 2900" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bill_amt_jun">Bill Amount - June</FieldLabel>
                            <Input id="bill_amt_jun" placeholder="e.g., 3100" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bill_amt_may">Bill Amount - May</FieldLabel>
                            <Input id="bill_amt_may" placeholder="e.g., 3200" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bill_amt_apr">Bill Amount - April</FieldLabel>
                            <Input id="bill_amt_apr" placeholder="e.g., 3100" />
                        </Field>
                    </div>
                </div>
                {/* Bill Statement Amounts (£) */}
                <div className="mt-4">
                    <h2 className='font-bold text-[#003d5c]'>Previous Payment Amounts (£)</h2>
                    <hr />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2">
                        <Field>
                            <FieldLabel htmlFor="pay_amt_sept">Previous Amount - September</FieldLabel>
                            <Input id="pay_amt_sept" placeholder="e.g., 2100" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pay_amt_aug">Previous Amount - August</FieldLabel>
                            <Input id="pay_amt_aug" placeholder="e.g., 3200" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pay_amt_jul">Previous Amount - July</FieldLabel>
                            <Input id="pay_amt_jul" placeholder="e.g., 2900" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pay_amt_jun">Previous Amount - June</FieldLabel>
                            <Input id="pay_amt_jun" placeholder="e.g., 3100" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pay_amt_may">Previous Amount - May</FieldLabel>
                            <Input id="pay_amt_may" placeholder="e.g., 3200" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pay_amt_apr">Previous Amount - April</FieldLabel>
                            <Input id="pay_amt_apr" placeholder="e.g., 3100" />
                        </Field>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button variant="default" className="bg-[#003d5c] w-[250px] mt-5 font-bold">Calculate Risk Score</Button>
                </div>

            </div>
        </div>
    )
}

export default RiskForm
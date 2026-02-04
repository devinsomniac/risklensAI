"use client"
import { useState } from "react"
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

const RiskForm = ({
    setAssessment,
    setLoading,
    setError,
    loading
}: {
    setAssessment: (data: any) => void
    setLoading: (v: boolean) => void
    setError: (v: string | null) => void
    loading: boolean
}) => {
    const [form, setForm] = useState({
        LIMIT_BAL: "",
        SEX: "",
        EDUCATION: "",
        MARRIAGE: "",
        AGE: "",

        PAY_0: "",
        PAY_2: "",
        PAY_3: "",
        PAY_4: "",
        PAY_5: "",
        PAY_6: "",

        BILL_AMT1: "",
        BILL_AMT2: "",
        BILL_AMT3: "",
        BILL_AMT4: "",
        BILL_AMT5: "",
        BILL_AMT6: "",

        PAY_AMT1: "",
        PAY_AMT2: "",
        PAY_AMT3: "",
        PAY_AMT4: "",
        PAY_AMT5: "",
        PAY_AMT6: "",
    })

    const PayStatusSelect = ({
        value,
        onChange,
    }: {
        value: string
        onChange: (v: string) => void
    }) => (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="-2">No Consumption</SelectItem>
                    <SelectItem value="-1">Pay Duly</SelectItem>
                    <SelectItem value="0">Revolving Credit</SelectItem>
                    <SelectItem value="1">1 month Delay</SelectItem>
                    <SelectItem value="2">2 months Delay</SelectItem>
                    <SelectItem value="3">3 months Delay</SelectItem>
                    <SelectItem value="4">4 months Delay</SelectItem>
                    <SelectItem value="5">5 months Delay</SelectItem>
                    <SelectItem value="6">6 months Delay</SelectItem>
                    <SelectItem value="7">7 months Delay</SelectItem>
                    <SelectItem value="8">8 months Delay</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )



    const setField = (key: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const toInt = (v: string) => {
        const n = Number(v)
        if (!Number.isFinite(n)) return 0
        return Math.trunc(n)
    }

    const buildPayload = () => ({
        applicant: {
            LIMIT_BAL: toInt(form.LIMIT_BAL),
            SEX: toInt(form.SEX),
            EDUCATION: toInt(form.EDUCATION),
            MARRIAGE: toInt(form.MARRIAGE),
            AGE: toInt(form.AGE),

            PAY_0: toInt(form.PAY_0),
            PAY_2: toInt(form.PAY_2),
            PAY_3: toInt(form.PAY_3),
            PAY_4: toInt(form.PAY_4),
            PAY_5: toInt(form.PAY_5),
            PAY_6: toInt(form.PAY_6),

            BILL_AMT1: toInt(form.BILL_AMT1),
            BILL_AMT2: toInt(form.BILL_AMT2),
            BILL_AMT3: toInt(form.BILL_AMT3),
            BILL_AMT4: toInt(form.BILL_AMT4),
            BILL_AMT5: toInt(form.BILL_AMT5),
            BILL_AMT6: toInt(form.BILL_AMT6),

            PAY_AMT1: toInt(form.PAY_AMT1),
            PAY_AMT2: toInt(form.PAY_AMT2),
            PAY_AMT3: toInt(form.PAY_AMT3),
            PAY_AMT4: toInt(form.PAY_AMT4),
            PAY_AMT5: toInt(form.PAY_AMT5),
            PAY_AMT6: toInt(form.PAY_AMT6),
        },
        include_explanations: true,
    })

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        setAssessment(null)

        try {
            const payload = buildPayload()
            console.log("SENDING PAYLOAD 👉", payload)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/score`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(`API error ${res.status}: ${text}`)
            }

            const data = await res.json()
            console.log("API RESPONSE 👉", data)
            setAssessment(data)
        }
        catch (e: any) {
            setError(e.message ?? "Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }

    const demoFormData: typeof form = {
        LIMIT_BAL: "50000",
        SEX: "1",
        EDUCATION: "2",
        MARRIAGE: "1",
        AGE: "35",

        PAY_0: "0",
        PAY_2: "-1",
        PAY_3: "0",
        PAY_4: "0",
        PAY_5: "1",
        PAY_6: "-1",

        BILL_AMT1: "2100",
        BILL_AMT2: "3200",
        BILL_AMT3: "2900",
        BILL_AMT4: "3100",
        BILL_AMT5: "3200",
        BILL_AMT6: "3100",

        PAY_AMT1: "2100",
        PAY_AMT2: "2000",
        PAY_AMT3: "2900",
        PAY_AMT4: "3000",
        PAY_AMT5: "3200",
        PAY_AMT6: "3100",
    }

    const fillDemo = () => {
        setForm(demoFormData)
    }



    return (
        <div className='p-2 md:p-3 bg-white border-2 border-gray-500'>
            <h1 className='font-bold text-[#003d5c] text-2xl'>Customer Credit Information</h1>
            <button
                type="button"
                onClick={fillDemo}
                className="text-xs font-semibold px-3 py-1 rounded-full border border-[#003d5c] text-[#003d5c] hover:bg-slate-50 mt-2 mb-2"
                title="Fill sample values for demo"
            >
                Fill demo data
            </button>
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
                            <Input
                                id="credit_limit"
                                type="number"
                                placeholder="e.g., 50000"
                                value={form.LIMIT_BAL}
                                onChange={(e) => setField("LIMIT_BAL", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="Gender">Gender (£)</FieldLabel>
                            <Select value={form.SEX} onValueChange={(v) => setField("SEX", v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="1">Male</SelectItem>
                                        <SelectItem value="2">Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>


                        </Field>
                        <Field>
                            <FieldLabel htmlFor="Educatiom">Edication label</FieldLabel>
                            <Select value={form.EDUCATION} onValueChange={(v) => setField("EDUCATION", v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Education" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="1">Graduate School</SelectItem>
                                        <SelectItem value="2">University</SelectItem>
                                        <SelectItem value="3">High School</SelectItem>
                                        <SelectItem value="4">Others</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </Field>
                        <Field>
                            <FieldLabel htmlFor="Marraige">Marital Status</FieldLabel>
                            <Select value={form.MARRIAGE} onValueChange={(v) => setField("MARRIAGE", v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="1">Married</SelectItem>
                                        <SelectItem value="2">Single</SelectItem>
                                        <SelectItem value="3">Others</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </Field>
                        <Field>
                            <FieldLabel htmlFor="age">Age</FieldLabel>
                            <Input
                                id="age"
                                type="number"
                                placeholder="e.g., 45"
                                value={form.AGE}
                                onChange={(e) => setField("AGE", e.target.value)}
                            />
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
                            <PayStatusSelect
                                value={form.PAY_0}
                                onChange={(v) => setField("PAY_0", v)}
                            />

                        </Field>
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - August</FieldLabel>
                            <PayStatusSelect value={form.PAY_2} onChange={(v) => setField("PAY_2", v)} />

                        </Field>
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - July</FieldLabel>
                            <PayStatusSelect value={form.PAY_3} onChange={(v) => setField("PAY_3", v)} />

                        </Field>
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - June</FieldLabel>
                            <PayStatusSelect value={form.PAY_4} onChange={(v) => setField("PAY_4", v)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - May</FieldLabel>
                            <PayStatusSelect value={form.PAY_5} onChange={(v) => setField("PAY_5", v)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="repayment_status_sept">Repayment Status - April</FieldLabel>
                            <PayStatusSelect value={form.PAY_6} onChange={(v) => setField("PAY_6", v)} />
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
                            <Input id="bill_amt_sept" type="number" placeholder="e.g., 2100" value={form.BILL_AMT1} onChange={(e) => setField("BILL_AMT1", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bill_amt_aug">Bill Amount - August</FieldLabel>
                            <Input id="bill_amt_aug" type="number" placeholder="e.g., 3200" value={form.BILL_AMT2} onChange={(e) => setField("BILL_AMT2", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bill_amt_jul">Bill Amount - July</FieldLabel>
                            <Input id="bill_amt_jul" type="number" placeholder="e.g., 2900" value={form.BILL_AMT3} onChange={(e) => setField("BILL_AMT3", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bill_amt_jun">Bill Amount - June</FieldLabel>
                            <Input id="bill_amt_jun" type="number" placeholder="e.g., 3100" value={form.BILL_AMT4} onChange={(e) => setField("BILL_AMT4", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bill_amt_may">Bill Amount - May</FieldLabel>
                            <Input id="bill_amt_may" type="number" placeholder="e.g., 3200" value={form.BILL_AMT5} onChange={(e) => setField("BILL_AMT5", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="bill_amt_apr">Bill Amount - April</FieldLabel>
                            <Input id="bill_amt_apr" type="number" placeholder="e.g., 3100" value={form.BILL_AMT6} onChange={(e) => setField("BILL_AMT6", e.target.value)} />
                        </Field>
                    </div>
                </div>
                {/* pay Statement Amounts (£) */}
                <div className="mt-4">
                    <h2 className='font-bold text-[#003d5c]'>Previous Payment Amounts (£)</h2>
                    <hr />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2">
                        <Field>
                            <FieldLabel htmlFor="pay_amt_sept">Previous Amount - September</FieldLabel>
                            <Input id="pay_amt_sept" type="number" placeholder="e.g., 2100" value={form.PAY_AMT1} onChange={(e) => setField("PAY_AMT1", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pay_amt_aug">Previous Amount - August</FieldLabel>
                            <Input id="pay_amt_aug" type="number" placeholder="e.g., 3200" value={form.PAY_AMT2} onChange={(e) => setField("PAY_AMT2", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pay_amt_jul">Previous Amount - July</FieldLabel>
                            <Input id="pay_amt_jul" type="number" placeholder="e.g., 2900" value={form.PAY_AMT3} onChange={(e) => setField("PAY_AMT3", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pay_amt_jun">Previous Amount - June</FieldLabel>
                            <Input id="pay_amt_jun" type="number" placeholder="e.g., 3100" value={form.PAY_AMT4} onChange={(e) => setField("PAY_AMT4", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pay_amt_may">Previous Amount - May</FieldLabel>
                            <Input id="pay_amt_may" type="number" placeholder="e.g., 3200" value={form.PAY_AMT5} onChange={(e) => setField("PAY_AMT5", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="pay_amt_apr">Previous Amount - April</FieldLabel>
                            <Input id="pay_amt_apr" type="number" placeholder="e.g., 3100" value={form.PAY_AMT6} onChange={(e) => setField("PAY_AMT6", e.target.value)} />
                        </Field>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button variant="default" disabled={loading} onClick={handleSubmit} className="bg-[#003d5c] w-[250px] mt-5 font-bold">{loading ? "Calculating..." : "Calculate Risk Score"}</Button>
                </div>
            </div>
        </div>
    )
}

export default RiskForm
"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const page = () => {
  const [form,setForm] = useState({
    name:"",
    address : "",
    phone : "",
    email : "",
    theme : ""
  })


  const setField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

    const handleSubmit = () => {
    console.log("FORM DATA 👉", form)
  }

  return (
    <div className='h-5 w-50 p-8'>
      <div className='flex flex-col bg-amber-50 p-2 gap-2.5'>
        <Label>Name</Label>
        <Input value={form.name} onChange={(e) => setField("name",e.target.value)}></Input>
        <Label>Address</Label>
        <Input value={form.address} onChange={(e) => setField("address",e.target.value)}></Input>
        <Label>Phone</Label>
        <Input value={form.phone} onChange={(e)=>setField("phone",e.target.value)}></Input>
        <Label>Email</Label>
        <Input value={form.email} onChange={(e) => setField("email",e.target.value)}></Input>
        <Label>Theme</Label>
        <Select value={form.theme} onValueChange={(v) => setField("theme",v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>

    </div>
  )
}

export default page
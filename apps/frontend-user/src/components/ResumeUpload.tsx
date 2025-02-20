"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { FileText, Upload } from 'lucide-react'

interface ResumeUploadProps {
  currentResume?: string
}

export function ResumeUpload({ currentResume }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    // file upload
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success("Resume uploaded")
    setFile(null)
  }

  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <h3 className="text-2xl font-semibold">Resume</h3>
      {currentResume && (
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>{currentResume}</span>
          <Button variant="outline" size="sm">Download</Button>
        </div>
      )}
      <div className="w-full max-w-sm items-center flex gap-1.5">
        <Label htmlFor="resume">Upload a new resume</Label>
        <Input id="resume" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" /> Upload Resume
        </Button>
      )}
    </div>
  )
}


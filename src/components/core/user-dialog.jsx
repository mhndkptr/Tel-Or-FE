"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState, useEffect } from "react"

export function UserDialog({ open, onOpenChange, user, isEditing, onSave }) {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("ADMIN")

  useEffect(() => {
    if (user) {
      setFullname(user.fullname)
      setEmail(user.email)
      setRole(user.role)
    } else {
      setFullname("")
      setEmail("")
      setRole("ADMIN")
    }
  }, [user])

  const handleSubmit = () => {
    onSave({ fullname, email, role })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="ORGANIZER">ORGANIZER</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>{isEditing ? "Update" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

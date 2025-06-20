// ✅ user-dialog.jsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState, useEffect } from "react";

export function UserDialog({ open, onOpenChange, user, isEditing, onSave }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ORGANIZER");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (open && !user) {
      // Tambah user, reset semua field
      setFullname("");
      setEmail("");
      setRole("ORGANIZER");
      setPassword("");
    }

    if (open && user) {
      // Edit user
      setFullname(user.fullname || "");
      setEmail(user.email || "");
      setRole(user.role || "ADMIN");
      setPassword("");
    }

    setErrorMessage("");
  }, [user, open]);

  const handleSubmit = () => {
    if (!fullname || !email || !role || (!isEditing && !password)) {
      setErrorMessage("Semua field wajib diisi dan password minimal 8 karakter.");
      return;
    }
    if (!isEditing && password.length < 8) {
      setErrorMessage("Password harus minimal 8 karakter.");
      return;
    }

    const userData = { fullname, email, role };
    if (!isEditing) userData.password = password;
    onSave(userData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {!isEditing && (
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <Select disabled value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="ORGANIZER">ORGANIZER</SelectItem>
            </SelectContent>
          </Select>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="button">
            {isEditing ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

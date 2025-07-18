"use client";

import AddButton from "@/components/_shared/AddButton";
import SearchBox from "@/components/_shared/SearchBox";
import Pagination from "@/components/ui/Pagination";
import { useState, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDialog } from "@/components/core/user-dialog";
import { DeleteUserDialog } from "@/components/core/delete-user-dialog";
import { useGetAllUsers, useAddUserMutation, useEditUserMutation, useDeleteUserMutation } from "@/hooks/user.hooks";
import { DashboardHeader } from "@/components/_shared/header/DashboardHeader";
import { ROLE } from "@/utils/constants";

export default function UsersPage() {
  const { users, isLoading, refetch } = useGetAllUsers();
  const { addUserMutation } = useAddUserMutation({ successAction: refetch });
  const { editUserMutation } = useEditUserMutation({ successAction: refetch });
  const { deleteUserMutation } = useDeleteUserMutation({
    successAction: () => {
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      refetch();
    },
  });

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    if (users && Array.isArray(users)) {
      const filtered = users.filter(
        (user) =>
          user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setCurrentPage(1); // Reset ke halaman 1 saat pencarian
    }
  }, [users, searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSaveUser = (userData) => {
    if (isEditing && selectedUser?.id) {
      editUserMutation.mutate({ userId: selectedUser.id, payload: userData });
    } else {
      addUserMutation.mutate({ payload: userData });
    }
    setSelectedUser(null);
    setIsEditing(false);
    setIsUserDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedUser?.id) {
      deleteUserMutation.mutate({ userId: selectedUser.id });
    }
  };

  return (
    <>
      <DashboardHeader title="Manajemen User" />
      <main className="md:p-5 p-3 bg-[#FCFCFC] min-h-screen md:space-y-5 space-y-3">
        <Card className={"w-full gap-3"}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={"text-xl font-bold"}>Kelola Data User</CardTitle>
                <CardDescription>Daftar user yang terdaftar</CardDescription>
              </div>
              <div>
                <Button
                  className={"cursor-pointer"}
                  variant={"default"}
                  onClick={() => {
                    setSelectedUser(null);
                    setIsEditing(false);
                    setIsUserDialogOpen(true);
                  }}
                >
                  Add User
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <SearchBox
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
                placeholder="Search by name, email or role..."
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.fullname}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditing(true);
                                setIsUserDialogOpen(true);
                              }}
                            >
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            {user.role !== ROLE.ADMIN && (
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </CardContent>
        </Card>

        <UserDialog
          open={isUserDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsUserDialogOpen(false);
              setSelectedUser(null);
              setIsEditing(false);
            }
          }}
          user={selectedUser}
          isEditing={isEditing}
          onSave={handleSaveUser}
        />

        <DeleteUserDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          user={selectedUser}
          onConfirm={handleConfirmDelete}
        />
      </main>
    </>
  );
}

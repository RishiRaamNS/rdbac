"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserTable } from './user-table'
import { AddEditUserDialog } from './add-edit-user-dialog'
import { PaginationComponent } from '@/components/pagination-component'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

interface Role {
  id: number
  name: string
  permissions: string[]
  customAttributes: Record<string, string>
}

interface UserManagementProps {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  roles: Role[]
}

export function UserManagement({ users, setUsers, roles }: UserManagementProps) {
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ name: '', email: '', role: '', status: 'Active' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (roleFilter === 'all' || user.role === roleFilter)
  )

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const handleAddUser = () => {
    if (editingUser) {
      setUsers(prevUsers => prevUsers.map(user => user.id === editingUser.id ? { ...editingUser, ...newUser } : user))
    } else {
      setUsers(prevUsers => [...prevUsers, { ...newUser, id: prevUsers.length + 1 }])
    }
    setNewUser({ name: '', email: '', role: '', status: 'Active' })
    setEditingUser(null)
    setIsDialogOpen(false)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setNewUser(user)
    setIsDialogOpen(true)
  }

  const handleDeleteUser = (id: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, roleFilter])

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
        <Button
          className="bg-black hover:bg-gray-800 text-white transition-colors duration-200"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select onValueChange={setRoleFilter} value={roleFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.name}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <UserTable
        users={currentUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      <PaginationComponent
        currentPage={currentPage}
        totalCount={filteredUsers.length}
        pageSize={usersPerPage}
        onPageChange={setCurrentPage}
      />
      <AddEditUserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddUser}
        user={newUser}
        setUser={setNewUser}
        roles={roles}
        isEditing={!!editingUser}
      />
    </motion.div>
  )
}

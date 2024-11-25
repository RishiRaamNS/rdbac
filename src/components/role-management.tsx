"use client"

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PaginationComponent } from '@/components/pagination-component'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Trash2, Plus, Search } from 'lucide-react'

interface Role {
  id: number;
  name: string;
  permissions: string[];
  customAttributes: { accessLevel: string };
}

interface RoleManagementProps {
  roles: Role[]
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>
}

const availablePermissions = [
  'read:users', 'write:users', 'delete:users',
  'read:roles', 'write:roles', 'delete:roles',
  'read:settings', 'write:settings'
]

export function RoleManagement({ roles, setRoles }: RoleManagementProps) {
  const [newRole, setNewRole] = useState<Omit<Role, 'id'>>({
    name: '',
    permissions: [],
    customAttributes: { accessLevel: '' }
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const rolesPerPage = 5

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastRole = currentPage * rolesPerPage
  const indexOfFirstRole = indexOfLastRole - rolesPerPage
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole)

  const handleAddRole = () => {
    if (editingRole) {
      setRoles(prevRoles => prevRoles.map(role => role.id === editingRole.id ? { ...editingRole, ...newRole } : role))
    } else {
      setRoles(prevRoles => [...prevRoles, { ...newRole, id: prevRoles.length + 1 }])
    }
    setNewRole({ name: '', permissions: [], customAttributes: { accessLevel: '' } })
    setEditingRole(null)
    setIsDialogOpen(false)
  }

  const handleEditRole = (role: Role) => {
    setEditingRole(role)
    setNewRole(role)
    setIsDialogOpen(true)
  }

  const handleDeleteRole = (id: number) => {
    setRoles(prevRoles => prevRoles.filter(role => role.id !== id))
  }

  const handlePermissionChange = (permission: string) => {
    setNewRole(prevRole => ({
      ...prevRole,
      permissions: prevRole.permissions.includes(permission)
        ? prevRole.permissions.filter(p => p !== permission)
        : [...prevRole.permissions, permission]
    }))
  }

  const handleCustomAttributeChange = (key: string, value: string) => {
    setNewRole(prevRole => ({
      ...prevRole,
      customAttributes: {
        ...prevRole.customAttributes,
        [key]: value
      }
    }))
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Role Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black hover:bg-gray-800 text-white transition-colors duration-200">
              <Plus className="mr-2 h-4 w-4" /> Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right">Permissions</Label>
                <div className="col-span-3 space-y-2">
                  {availablePermissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission}
                        checked={newRole.permissions.includes(permission)}
                        onCheckedChange={() => handlePermissionChange(permission)}
                      />
                      <label
                        htmlFor={permission}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="accessLevel" className="text-right">
                  Access Level
                </Label>
                <Input
                  id="accessLevel"
                  value={newRole.customAttributes.accessLevel || ''}
                  onChange={(e) => handleCustomAttributeChange('accessLevel', e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., Full, Partial, Limited"
                />
              </div>
            </div>
            <Button onClick={handleAddRole} className="bg-black hover:bg-gray-800 text-white transition-colors duration-200">
              {editingRole ? 'Update Role' : 'Add Role'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4 relative w-full sm:w-64">
        <Input
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Custom Attributes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {currentRoles.map((role) => (
              <motion.tr
                key={role.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.permissions.join(', ')}</TableCell>
                <TableCell>
                  {Object.entries(role.customAttributes).map(([key, value]) => (
                    <div key={key}>{key}: {value}</div>
                  ))}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" className="mr-2 text-blue-600 hover:text-blue-800" onClick={() => handleEditRole(role)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" className="text-red-600 hover:text-red-800" onClick={() => handleDeleteRole(role.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalCount={filteredRoles.length}
        pageSize={rolesPerPage}
        onPageChange={setCurrentPage}
      />
    </motion.div>
  )
}

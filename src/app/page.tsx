"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserManagement } from '@/components/user-management'
import { RoleManagement } from '@/components/role-management'
import { Header } from '@/components/header'
import { AuthProvider } from '@/components/auth-provider'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, ShieldCheck } from 'lucide-react'

// Mock data for initial users and roles
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
]

const initialRoles = [
  { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'], customAttributes: { accessLevel: 'Full' } },
  { id: 2, name: 'Editor', permissions: ['read', 'write'], customAttributes: { accessLevel: 'Partial' } },
  { id: 3, name: 'Viewer', permissions: ['read'], customAttributes: { accessLevel: 'Limited' } },
]

export default function RBACDashboard() {
  // State for users and roles
  const [users, setUsers] = useState(initialUsers)
  const [roles, setRoles] = useState(initialRoles)
  const [activeTab, setActiveTab] = useState('users')

  // Effect to load data from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const storedRoles = JSON.parse(localStorage.getItem('roles') || '[]')

    if (storedUsers.length > 0) setUsers(storedUsers)
    if (storedRoles.length > 0) setRoles(storedRoles)
  }, [])

  // Effect to save users to localStorage when they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  // Effect to save roles to localStorage when they change
  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles))
  }, [roles])

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
              <TabsTrigger
                value="users"
                className="flex items-center justify-center space-x-2 text-sm sm:text-lg py-2 sm:py-3 transition-all duration-200 ease-in-out"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">User Management</span>
                <span className="sm:hidden">Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="roles"
                className="flex items-center justify-center space-x-2 text-sm sm:text-lg py-2 sm:py-3 transition-all duration-200 ease-in-out"
              >
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Role Management</span>
                <span className="sm:hidden">Roles</span>
              </TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'users' && <UserManagement users={users} setUsers={setUsers} roles={roles} />}
                {activeTab === 'roles' && <RoleManagement roles={roles} setRoles={setRoles} />}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>
    </AuthProvider>
  )
}

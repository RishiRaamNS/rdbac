import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  name: string
  email: string
  role: string
  status: string
}

interface Role {
  id: number
  name: string
}

interface AddEditUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  roles: Role[]
  isEditing: boolean
}

export function AddEditUserDialog({ isOpen, onClose, onSave, user, setUser, roles, isEditing }: AddEditUserDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="sm:text-right">
              Name
            </Label>
            <Input
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="sm:col-span-3"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="sm:text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="sm:col-span-3"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="sm:text-right">
              Role
            </Label>
            <Select onValueChange={(value) => setUser({ ...user, role: value })}>
              <SelectTrigger className="sm:col-span-3">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="sm:text-right">
              Status
            </Label>
            <Select onValueChange={(value) => setUser({ ...user, status: value })}>
              <SelectTrigger className="sm:col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={onSave} className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white transition-colors duration-200">
          {isEditing ? 'Update User' : 'Add User'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}


import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header 
      className="bg-white shadow-sm border-b border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-center items-center">
        <h1 className="text-lg font-semibold text-gray-800">RBAC Dashboard</h1>
      </div>
    </motion.header>
  )
}


"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export function UserList({ users, onUserHover, highlightedUser }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Team Members</h2>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            className="w-full pl-8 pr-4 py-2 text-sm border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                highlightedUser === user.id
                  ? "bg-purple-100 dark:bg-purple-900"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onMouseEnter={() => onUserHover(user.id)}
              onMouseLeave={() => onUserHover(null)}
            >
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.charAt(0)}
                </div>
                
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-[10px] wrap-anywhere text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

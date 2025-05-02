"use client"

import { useState } from "react"
import { UserList } from "./user-list"
import { ActivityGraph } from "./activity-graph"
import { MetricsPanel } from "./metrics-panel"

export function TeamDashboard({ data }) {
  console.log("data is",data)
  const [highlightedUser, setHighlightedUser] = useState(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

  // Filter data based on selected timeframe
  const filteredData = data.activities.filter((activity) => {
    const date = new Date(activity.timestamp)
    const now = new Date()

    if (selectedTimeframe === "day") {
      return date.toDateString() === now.toDateString()
    } else if (selectedTimeframe === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(now.getDate() - 7)
      return date >= weekAgo
    } else if (selectedTimeframe === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(now.getMonth() - 1)
      return date >= monthAgo
    }

    return true
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* User list - Left column */}
      <div className="md:col-span-3 lg:col-span-2">
        <UserList users={data.users} onUserHover={setHighlightedUser} highlightedUser={highlightedUser} />
      </div>

      {/* Activity graph - Middle column */}
      <div className="md:col-span-6 lg:col-span-7">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Team Activity</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTimeframe("day")}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedTimeframe === "day"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setSelectedTimeframe("week")}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedTimeframe === "week"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setSelectedTimeframe("month")}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedTimeframe === "month"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <ActivityGraph
            data={filteredData}
            users={data.users}
            highlightedUser={highlightedUser}
            setHighlightedUser={setHighlightedUser}
            timeframe={selectedTimeframe}
          />
        </div>
      </div>

      {/* Metrics panel - Right column */}
      <div className="md:col-span-3">
        <MetricsPanel
          data={filteredData}
          users={data.users}
          highlightedUser={highlightedUser}
          timeframe={selectedTimeframe}
        />
      </div>
    </div>
  )
}

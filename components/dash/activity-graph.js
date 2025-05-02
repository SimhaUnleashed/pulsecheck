"use client"

import { useState, useMemo } from "react"
import { format, subDays, eachDayOfInterval, startOfDay, endOfDay } from "date-fns"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function ActivityGraph({ data, users, highlightedUser, setHighlightedUser, timeframe }) {
  const [activeType, setActiveType] = useState("all")

  // Prepare data for the chart
  const chartData = useMemo(() => {
    // Determine date range based on timeframe
    const now = new Date()
    let startDate

    if (timeframe === "day") {
      startDate = startOfDay(now)
    } else if (timeframe === "week") {
      startDate = subDays(now, 7)
    } else if (timeframe === "month") {
      startDate = subDays(now, 30)
    }

    // Generate array of dates for the x-axis
    const dateRange = eachDayOfInterval({
      start: startDate,
      end: now,
    })

    // Create data points for each date
    return dateRange.map((date) => {
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)

      // Initialize result object with date
      const result = {
        date: format(date, "MMM dd"),
        dateObj: date,
      }

      // Add data for each user
      users.forEach((user) => {
        // Filter activities for this user and date
        const userActivities = data.filter(
          (activity) =>
            activity.userId === user.id &&
            new Date(activity.timestamp) >= dayStart &&
            new Date(activity.timestamp) <= dayEnd &&
            (activeType === "all" || activity.type === activeType),
        )

        // Count activities by type
        const commits = userActivities.filter((a) => a.type === "commit").length
        const prs = userActivities.filter((a) => a.type === "pullRequest").length
        const messages = userActivities.filter((a) => a.type === "message").length
        const blockers = userActivities.filter((a) => a.type === "blocker").length

        // Add to result
        result[`${user.id}_total`] = userActivities.length
        result[`${user.id}_commits`] = commits
        result[`${user.id}_prs`] = prs
        result[`${user.id}_messages`] = messages
        result[`${user.id}_blockers`] = blockers
      })

      return result
    })
  }, [data, users, timeframe, activeType])

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveType("all")}
          className={`px-3 py-1 text-xs rounded-md ${
            activeType === "all"
              ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          All Activity
        </button>
        <button
          onClick={() => setActiveType("commit")}
          className={`px-3 py-1 text-xs rounded-md ${
            activeType === "commit"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Commits
        </button>
        <button
          onClick={() => setActiveType("pullRequest")}
          className={`px-3 py-1 text-xs rounded-md ${
            activeType === "pullRequest"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Pull Requests
        </button>
        <button
          onClick={() => setActiveType("message")}
          className={`px-3 py-1 text-xs rounded-md ${
            activeType === "message"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setActiveType("blocker")}
          className={`px-3 py-1 text-xs rounded-md ${
            activeType === "blocker"
              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Blockers
        </button>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip
              formatter={(value, name) => {
                const userId = name.split("_")[0]
                const type = name.split("_")[1]
                const user = users.find((u) => u.id === userId)

                if (!user) return [value, name]

                let label
                if (type === "total") label = `${user.name} (Total)`
                else if (type === "commits") label = `${user.name} (Commits)`
                else if (type === "prs") label = `${user.name} (PRs)`
                else if (type === "messages") label = `${user.name} (Messages)`
                else if (type === "blockers") label = `${user.name} (Blockers)`

                return [value, label]
              }}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend
              formatter={(value, entry) => {
                const userId = value.split("_")[0]
                const user = users.find((u) => u.id === userId)
                return user ? user.name : value
              }}
              onMouseEnter={(e) => {
                const userId = e.dataKey.split("_")[0]
                setHighlightedUser(userId)
              }}
              onMouseLeave={() => setHighlightedUser(null)}
            />
            {users.map((user) => {
              const dataKey =
                activeType === "all"
                  ? `${user.id}_total`
                  : activeType === "commit"
                    ? `${user.id}_commits`
                    : activeType === "pullRequest"
                      ? `${user.id}_prs`
                      : activeType === "message"
                        ? `${user.id}_messages`
                        : `${user.id}_blockers`

              const opacity = highlightedUser === null || highlightedUser === user.id ? 1 : 0.2

              return (
                <Line
                  key={user.id}
                  type="monotone"
                  dataKey={dataKey}
                  stroke={user.color}
                  strokeWidth={highlightedUser === user.id ? 3 : 2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  strokeOpacity={opacity}
                />
              )
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

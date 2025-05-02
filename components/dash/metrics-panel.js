"use client"

import { useMemo } from "react"
import { GitCommit, GitPullRequest, MessageSquare, AlertTriangle, Activity } from "lucide-react"

export function MetricsPanel({ data, users, highlightedUser, timeframe }) {
  // Calculate metrics
  const metrics = useMemo(() => {
    // Filter data for highlighted user if any
    const filteredData = highlightedUser ? data.filter((activity) => activity.userId === highlightedUser) : data

    // Count activities by type
    const commits = filteredData.filter((a) => a.type === "commit").length
    const prs = filteredData.filter((a) => a.type === "pullRequest").length
    const messages = filteredData.filter((a) => a.type === "message").length
    const blockers = filteredData.filter((a) => a.type === "blocker").length
    const total = filteredData.length

    // Calculate per user metrics
    const userMetrics = users
      .map((user) => {
        const userActivities = data.filter((a) => a.userId === user.id)
        return {
          userId: user.id,
          name: user.name,
          color: user.color,
          total: userActivities.length,
          commits: userActivities.filter((a) => a.type === "commit").length,
          prs: userActivities.filter((a) => a.type === "pullRequest").length,
          messages: userActivities.filter((a) => a.type === "message").length,
          blockers: userActivities.filter((a) => a.type === "blocker").length,
        }
      })
      .sort((a, b) => b.total - a.total)

    // Calculate team averages
    const activeUsers = users.length
    const avgCommits = activeUsers ? commits / activeUsers : 0
    const avgPrs = activeUsers ? prs / activeUsers : 0
    const avgMessages = activeUsers ? messages / activeUsers : 0
    const avgBlockers = activeUsers ? blockers / activeUsers : 0

    return {
      total,
      commits,
      prs,
      messages,
      blockers,
      avgCommits,
      avgPrs,
      avgMessages,
      avgBlockers,
      userMetrics,
    }
  }, [data, users, highlightedUser])

  // Get title based on timeframe and highlighted user
  const getTitle = () => {
    const timeframeText = timeframe === "day" ? "Today" : timeframe === "week" ? "This Week" : "This Month"

    if (highlightedUser) {
      const user = users.find((u) => u.id === highlightedUser)
      return user ? `${user.name}'s Activity (${timeframeText})` : `Activity ${timeframeText}`
    }

    return `Team Activity (${timeframeText})`
  }

  return (
    <div className="space-y-4">
      {/* Summary metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">{getTitle()}</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-md">
                <GitCommit className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">Commits</p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-200">{metrics.commits}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-800 p-2 rounded-md">
                <GitPullRequest className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-green-600 dark:text-green-300 font-medium">Pull Requests</p>
                <p className="text-lg font-bold text-green-700 dark:text-green-200">{metrics.prs}</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="bg-yellow-100 dark:bg-yellow-800 p-2 rounded-md">
                <MessageSquare className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-yellow-600 dark:text-yellow-300 font-medium">Messages</p>
                <p className="text-lg font-bold text-yellow-700 dark:text-yellow-200">{metrics.messages}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="bg-red-100 dark:bg-red-800 p-2 rounded-md">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-red-600 dark:text-red-300 font-medium">Blockers</p>
                <p className="text-lg font-bold text-red-700 dark:text-red-200">{metrics.blockers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Total Activity</p>
            <p className="text-lg font-bold">{metrics.total}</p>
          </div>
        </div>
      </div>

      {/* Team averages - only show if not highlighting a specific user */}
      {!highlightedUser && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Team Averages</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GitCommit className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                <p className="text-sm">Commits per member</p>
              </div>
              <p className="font-medium">{metrics.avgCommits.toFixed(1)}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GitPullRequest className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                <p className="text-sm">PRs per member</p>
              </div>
              <p className="font-medium">{metrics.avgPrs.toFixed(1)}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                <p className="text-sm">Messages per member</p>
              </div>
              <p className="font-medium">{metrics.avgMessages.toFixed(1)}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mr-2" />
                <p className="text-sm">Blockers per member</p>
              </div>
              <p className="font-medium">{metrics.avgBlockers.toFixed(1)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top contributors */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Top Contributors</h2>

        <div className="space-y-3">
          {metrics.userMetrics.slice(0, 5).map((user, index) => (
            <div
              key={user.userId}
              className={`flex items-center justify-between p-2 rounded-md ${
                highlightedUser === user.userId
                  ? "bg-purple-100 dark:bg-purple-900/50"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ backgroundColor: user.color }}
                >
                  {index + 1}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user.name}</p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Activity className="h-3 w-3 mr-1" />
                    <span>{user.total} activities</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <GitCommit className="h-3 w-3 mr-1" />
                  <span>{user.commits}</span>
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <GitPullRequest className="h-3 w-3 mr-1" />
                  <span>{user.prs}</span>
                </div>
                <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>{user.messages}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

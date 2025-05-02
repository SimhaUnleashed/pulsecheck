// Generate random colors for users

import { fetchTeamUsers } from "./actions/teams.action";

const generatedColors = []; // Initialize an empty array to store generated colors

function getRandomColor() {
  let color;
  do {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    color = '#' + n.slice(0, 6).padEnd(6, '0');
  } while (generatedColors.includes(color)); // Check if the color already exists

  generatedColors.push(color);

  return color;
}
  
  // Generate random date within a range
  function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }
  
  // Generate mock data for the dashboard
  export async function generateMockData(id) {

    const userData = await fetchTeamUsers(id);
    const users = userData?.users || [];
    console.log("users",users);

    // Create mock users
    // const users = [
    //   { id: "user1", name: "Manish Kumar", role: "Frontend Developer", color: getRandomColor() },
    //   { id: "user2", name: "Ganesh R", role: "Backend Developer", color: getRandomColor() },
    //   { id: "user3", name: "Ram Mehra", role: "Full Stack Developer",  color: getRandomColor() },
    //   { id: "user4", name: "Anirudh Karthik", role: "DevOps Engineer",  color: getRandomColor() },
    //   { id: "user5", name: "Priyam Gupta", role: "UI/UX Designer",  color: getRandomColor() },
    //   { id: "user6", name: "Tanu Mishra", role: "Product Manager", color: getRandomColor() },
    //   { id: "user7", name: "Sameera S", role: "QA Engineer",  color: getRandomColor() },
    // ]
  
    // Create mock teams
    const teams = [
      { id: "team1", name: "Frontend Team" },
      { id: "team2", name: "Backend Team" },
      { id: "team3", name: "DevOps Team" },
    ]
  
    // Assign users to teams
    const userTeams = {
      user1: "team1",
      user2: "team2",
      user3: "team1",
      user4: "team3",
      user5: "team1",
      user6: "team2",
      user7: "team3",
    }
  
    // Create mock activities
    const activities = []
  
    // Set date range for activities (last 30 days)
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - 30)
  
    // Generate random activities for each user
    users.forEach((user) => {
      // Number of activities per user (random between 50-150)
      const numActivities = Math.floor(Math.random() * 100) + 50
  
      for (let i = 0; i < numActivities; i++) {
        // Determine activity type
        const activityTypes = ["commit", "pullRequest", "message", "blocker"]
        const weights = [0.5, 0.2, 0.25, 0.05] // Weighted probabilities
  
        // Select activity type based on weights
        let rand = Math.random()
        let type = activityTypes[0]
  
        for (let j = 0; j < weights.length; j++) {
          if (rand < weights[j]) {
            type = activityTypes[j]
            break
          }
          rand -= weights[j]
        }
  
        // Create activity
        const activity = {
          id: `activity-${user.id}-${i}`,
          userId: user.id,
          teamId: userTeams[user.id],
          type: type,
          timestamp: getRandomDate(startDate, endDate).toISOString(),
          category: type === "commit" || type === "pullRequest" ? "code" : type === "message" ? "chat" : "blocker",
        }
  
        // Add activity-specific details
        if (type === "commit") {
          activity.details = {
            repository: ["frontend-app", "backend-api", "infrastructure", "design-system"][Math.floor(Math.random() * 4)],
            message: `feat: ${["Add new feature", "Fix bug", "Update documentation", "Refactor code", "Improve performance"][Math.floor(Math.random() * 5)]}`,
            hash: Math.random().toString(36).substring(2, 10),
          }
        } else if (type === "pullRequest") {
          activity.details = {
            repository: ["frontend-app", "backend-api", "infrastructure", "design-system"][Math.floor(Math.random() * 4)],
            title: `${["Add", "Fix", "Update", "Refactor", "Improve"][Math.floor(Math.random() * 5)]} ${["login page", "dashboard", "API endpoint", "database schema", "CI/CD pipeline"][Math.floor(Math.random() * 5)]}`,
            status: ["open", "merged", "closed"][Math.floor(Math.random() * 3)],
            number: Math.floor(Math.random() * 1000) + 1,
          }
        } else if (type === "message") {
          activity.details = {
            channel: ["general", "frontend", "backend", "devops", "random"][Math.floor(Math.random() * 5)],
            content: [
              "Hey team, quick update...",
              "Has anyone seen this error?",
              "Great work on the release!",
              "I'm working on the new feature",
              "Meeting in 10 minutes",
            ][Math.floor(Math.random() * 5)],
            reactions: Math.floor(Math.random() * 5),
          }
        } else if (type === "blocker") {
          activity.details = {
            title: [
              "API integration issue",
              "Build failing",
              "Deployment blocked",
              "Design inconsistency",
              "Performance bottleneck",
            ][Math.floor(Math.random() * 5)],
            severity: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)],
            status: ["open", "in-progress", "resolved"][Math.floor(Math.random() * 3)],
          }
        }
  
        activities.push(activity)
      }
    })
  
    // Sort activities by timestamp (newest first)
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  
    return {
      users,
      teams,
      activities,
    }
  }
  
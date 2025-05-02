"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Github, Slack, LogOut, UserMinus, Settings, Shield, UserIcon } from "lucide-react"
import { ConfirmDialog } from "../../../components/confirm-dialog"
import { clearUserFieldByEmail, fetchTeamUsers, removeParticipant } from "../../../lib/actions/teams.action"
import { logOut } from "../../../lib/actions/auth.action"
import { redirect } from "next/navigation"




export default function ProfilePage() {
  const [showLeaveTeamDialog, setShowLeaveTeamDialog] = useState(false)
  const [showLogoutSlackDialog, setShowLogoutSlackDialog] = useState(false)
  const [showLogoutGithubDialog, setShowLogoutGithubDialog] = useState(false)

  const [currentUser, setCurrentUser] = useState("");
  const [currentTeam,setCurrentTeam]= useState("");

    const [teamMembers,setTeamMembers] = useState(null);
    // Integration status
  const [integrations, setIntegrations] = useState({
    slack: true,
    github: true,
  })
  const handlelogOut = async() =>{
    await logOut();
    redirect("/");
  }
    
    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/loggedUser");
            const data = await res.json();
            console.log(data.user)
            if (data.success) {
              setCurrentUser(data.user);
                if(!data.user.githubUsername) setIntegrations(prev => ({ ...prev, github: false }));
                if(!data.user.slackUsername) setIntegrations(prev => ({ ...prev, slack: false }));
              if(data.user.teamId){
                setCurrentTeam(data.user.teamId);
                const team = await fetchTeamUsers(data.user.teamId);
                console.log("teamMembers:",team);
                setTeamMembers(team.users);
              }
              
              
            }
          }
      
          fetchUser();
    }, []);

  

  const handleLogoutSlack = async() => {
    await clearUserFieldByEmail(currentUser.email,"slackUsername")
    setIntegrations((prev) => ({ ...prev, slack: false }))
    setShowLogoutSlackDialog(false)
  }

  const handleLogoutGithub = async() => {
    await clearUserFieldByEmail(currentUser.email,"githubUsername")
    setIntegrations((prev) => ({ ...prev, github: false }))
    setShowLogoutGithubDialog(false)
  }

  const handleLeaveTeam = async() => {
    await removeParticipant(currentUser.teamId, currentUser.email)
    setShowLeaveTeamDialog(false)
    alert("You have left the team.")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-6 px-4">
        {/* Header with back button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - User profile */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex flex-col items-center">
                {currentUser && <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-medium mb-4"
                  style={{ backgroundColor: "purple" }}
                >
                  {currentUser.name.charAt(0)}
                </div>}
                
                <h1 className="text-xl font-bold">{currentUser.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{currentUser.email}</p>

                <div className="w-full border-t pt-4 mt-2">
                  <h2 className="text-lg font-semibold mb-3">Account Settings</h2>
                  <div className="space-y-2">
                    
                    <div
                      onClick={handlelogOut}
                      className="cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-red-600 dark:text-red-400"
                    >
                      <LogOut  className="h-5 w-5 mr-3" />
                      <span>Log Out</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle column - Integrations */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-full">
              <h2 className="text-lg font-semibold mb-4">Connected Services</h2>

              <div className="space-y-4">
                {/* Slack Integration */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-[#4A154B] p-2 rounded-md">
                        <Slack className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Slack</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {integrations.slack ? "Connected" : "Disconnected"}
                        </p>
                      </div>
                    </div>
                    {integrations.slack ? (
                      <button
                        onClick={() => setShowLogoutSlackDialog(true)}
                        className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                        Connect
                      </button>
                    )}
                  </div>
                  {integrations.slack && (
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      Connected to : <span className="font-medium">{currentUser.slackUsername}</span>
                    </div>
                  )}
                </div>

                {/* GitHub Integration */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-[#24292e] p-2 rounded-md">
                        <Github className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">GitHub</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {integrations.github ? "Connected" : "Disconnected"}
                        </p>
                      </div>
                    </div>
                    {integrations.github ? (
                      <button
                        onClick={() => setShowLogoutGithubDialog(true)}
                        className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                        Connect
                      </button>
                    )}
                  </div>
                  {integrations.github && (
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      Connected to account:{" "}
                      <span className="font-medium">github/{currentUser.githubUsername}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <h2 className="text-lg font-semibold mb-4">Team Membership</h2>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                    {currentUser && currentUser.teamId ?
                      <p className="font-medium">Team Details</p> : <p className="font-medium">You are not in any team</p>}
                      {teamMembers && <p className="text-sm text-gray-500 dark:text-gray-400">{teamMembers.length} members</p>}
                      
                    </div>
                    {currentUser && currentUser.teamId && (
                        <button
                        onClick={() => setShowLeaveTeamDialog(true)}
                        className="flex items-center text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <UserMinus className="h-4 w-4 mr-1" />
                        Leave Team
                      </button>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Team members */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-full">
              <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            {teamMembers && 
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="relative">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.name.charAt(0)}
                      </div>
                      
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{member.name}</p>
                        {member.id === currentUser.id && (
                          <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-0.5 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
}

              
            </div>
          </div>
        </div>
      </div>

      {/* Leave Team Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLeaveTeamDialog}
        onClose={() => setShowLeaveTeamDialog(false)}
        onConfirm={handleLeaveTeam}
        title="Leave Team"
        message={`Are you sure you want to leave this team? You will lose access to all team data and activities.`}
        confirmText="Leave Team"
        confirmVariant="destructive"
      />

      {/* Logout Slack Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutSlackDialog}
        onClose={() => setShowLogoutSlackDialog(false)}
        onConfirm={handleLogoutSlack}
        title="Disconnect Slack"
        message="Are you sure you want to disconnect your Slack account? PulseCheck will no longer be able to track your Slack activity."
        confirmText="Disconnect"
        confirmVariant="destructive"
      />

      {/* Logout GitHub Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutGithubDialog}
        onClose={() => setShowLogoutGithubDialog(false)}
        onConfirm={handleLogoutGithub}
        title="Disconnect GitHub"
        message="Are you sure you want to disconnect your GitHub account? PulseCheck will no longer be able to track your GitHub activity."
        confirmText="Disconnect"
        confirmVariant="destructive"
      />
    </div>
  )
}

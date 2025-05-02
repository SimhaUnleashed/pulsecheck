"use client"

import { getCurrentUser, logOut, verifyGithubAndSlack } from '../../lib/actions/auth.action';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { FaGithub,FaSlack } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/client";
import { redirect } from "next/navigation";
import Link from 'next/link';


const DropDownComponent = () => {
  const [user, setUser] = useState(null);
  async function fetchUser() {
    const user = await getCurrentUser();
    setUser(user);
  }

  async function signInWithGithub() {
    const provider = new GithubAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      const githubUsername= result._tokenResponse.screenName;
  
      // Send to server
      await fetch("/api/sessionLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, githubUsername }),
      });
  
      console.log("Signed in with GitHub:", githubUsername);
      fetchUser();
    } catch (error) {
      console.error("GitHub Sign In Error:", error.message);
    }
  }
  
  
  async function signInWithSlack(){
    const clientId = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI;
  
    const scopes = encodeURIComponent('users:read,users:read.email');
  
    if (!clientId || !redirectUri) {
      console.error("Slack OAuth environment variables are not set.");
      return;
    }
  
    const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
  
    redirect(slackAuthUrl);
  };
  

  useEffect(() => {
    fetchUser(); 
  }, []);
  
  return (
    <DropdownMenu.Root>
     
      <DropdownMenu.Trigger asChild>
   
        <div className="text-3xl cursor-pointer hover:text-purple-800 transition duration-200 ease-in-out">
          <IoPersonCircleOutline />
        </div>
      </DropdownMenu.Trigger>

    
      <DropdownMenu.Portal>
        
        <DropdownMenu.Content className="bg-purple-700 rounded-md p-2 shadow-lg z-50 border border-purple-500 text-purple-100">
        <DropdownMenu.Item onClick={signInWithGithub}
            className="px-1 py-1 rounded cursor-pointer outline-none focus:bg-purple-600 hover:bg-purple-600 transition duration-200 ease-in-out text-[13px] font-bold"
          >
            <div className="flex items-center gap-0.5">
           <span><FaGithub/></span> {user && user.githubUsername ? user.githubUsername : "Connect to Github"}
           </div>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-px bg-purple-500 my-2" />
          <DropdownMenu.Item onClick={signInWithSlack}
            className="px-1 py-1 rounded cursor-pointer outline-none focus:bg-purple-600 hover:bg-purple-600 transition duration-200 ease-in-out text-[13px] font-bold"
          >
            <div className="flex items-center gap-0.5">
           <span><FaSlack/></span> {user && user.slackUsername ? user.slackUsername : "Connect to Slack"}
           </div>
            
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-px bg-purple-500 my-2" />
          <DropdownMenu.Item
            className="px-1 py-1 rounded cursor-pointer outline-none focus:bg-purple-600 hover:bg-purple-600 transition duration-200 ease-in-out text-[13px] font-bold"
          >
           <Link href="/profile">My Profile</Link> 
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-px bg-purple-500 my-2" />
          <DropdownMenu.Item
            onClick={() => logOut()} // Assuming logOut is defined and imported
            className="px-1 py-1 rounded cursor-pointer outline-none focus:bg-purple-600 hover:bg-purple-600 transition duration-200 ease-in-out text-[13px] font-bold"
          >
            Logout
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-purple-700" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDownComponent;

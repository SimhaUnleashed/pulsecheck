import React from 'react'
import DropDownComponent from './DropDown'
import { Zap } from "lucide-react";
import { getCurrentUser, isAuthenticated } from '../../lib/actions/auth.action';
import Link from 'next/link';
const NavBar = async({type}) => {
  const isUserAuthenticated = await isAuthenticated();
  const user = await getCurrentUser();
  // console.log(user);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-purple-600" />
              <span className="inline-block font-bold">PulseCheck</span>
            </Link>
            {type==="root" && (<nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Pricing
              </Link>
            </nav>)}
            
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {!isUserAuthenticated &&
            <nav className="flex items-center space-x-2">
              <Link
                href="/sign-in"
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-purple-700"
              >
                Get Started
              </Link>
            </nav>
}

{isUserAuthenticated && 
            <nav className="flex items-center space-x-2">
              
                {type==="root" && <Link
                href="/new-team"
                className="border border-purple-400 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Create a New Team
              </Link>}
              {type==="root" && <Link
                href={user && user.teamId ? `/dashboard/${user.teamId}` : "/join-team"}
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-purple-700"
              >
                {user && user.teamId ? "View Team" : "Join a New Team"}
              </Link>}
              <DropDownComponent />
            </nav>}
          </div>
        </div>
      </header>

      
  )
}

export default NavBar
"use client"
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { createTeam } from "../../../lib/actions/teams.action";

export default function newTeam() {
  const [email, setEmail] = useState("");
  const [uniqueId] = useState(uuidv4());
  const [user,setUser] = useState("");
  
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/loggedUser");
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
  
    async function createTeamWrapper() {
      const result = await createTeam(user.name,user.email,uniqueId);
      console.log("create team", result);
    }
  
    createTeamWrapper();
  }, [user]);

  function handleBackToHome(){
    redirect("/");
  }
  function isValidEmail() {
    if (typeof email !== "string") {
      console.error("Email must be a string:", email);
      return false;
    }
  
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(trimmed);
  
    console.log("Validating:", trimmed, "=>", isValid);
    return isValid;
  }
  

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
  
  async function sendEmail() {
    if(!isValidEmail()) return toast.error("Invalid email");
    const subject = "Pulse Check Invite";
    const message = `Use this unique ID to join: ${uniqueId}`;
    const to = email;
  const res = await fetch("/api/sendEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, subject, text: message }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to send email");
  toast.success("Invited Successfully");
  redirect("/");
}

  return (
    <div className="p-6">

  <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Send Invite</h2>
      <p className="mb-2 text-sm text-gray-600">Invite using Unique ID: </p>
      <div className="flex justify-between">{uniqueId} <MdOutlineContentCopy className="cursor-pointer" onClick={() => copyToClipboard(uniqueId)}/></div>
      <p className="mt-5 mb-2 text-sm text-gray-600">Invite using email: </p>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=" w-full p-2 border rounded mb-4"
        placeholder="Enter email"
      />
      <div className="flex justify-end gap-2">
        <button onClick={handleBackToHome} className="cursor-pointer px-4 py-2 rounded border border-gray-500">Cancel</button>
        <button onClick={sendEmail} className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded">Send</button>
      </div>
    </div>
  </div>

    </div>
  );
}

"use client"

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addUserToTeam } from "../../../lib/actions/teams.action";

export default function newTeam() {
    const [id,setId] = useState("");
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const router = useRouter();

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
    async function joinTeam(){
        // console.log(id,email);
        if(!isValidEmail()) return toast.error("Invalid email");
        console.log("join");
        try{
        const result = await addUserToTeam({name:name, teamId:id,userEmail:email});
        console.log(result)
        if(result.success) {
            toast.success("Joined Successfully");
            router.push("/");
        }
        
        }
        catch(error){
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }
        
    }
  return (
    <div className="p-6">

  <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Join Using Invite ID</h2>

      <p className="mt-5 mb-2 text-sm text-gray-600">Enter Your name: </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className=" w-full p-2 border rounded mb-4"
        placeholder="Enter name"
      />

      <p className="mt-5 mb-2 text-sm text-gray-600">Enter Your email: </p>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=" w-full p-2 border rounded mb-4"
        placeholder="Enter Email"
      />
      
      <p className="mt-5 mb-2 text-sm text-gray-600">Enter ID here: </p>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className=" w-full p-2 border rounded mb-4"
        placeholder="Enter Id"
      />
      <div className="flex justify-end gap-2">
        <button onClick={handleBackToHome} className="cursor-pointer px-4 py-2 rounded border border-gray-500">Cancel</button>
        <button onClick={joinTeam} className="px-4 py-2 bg-purple-600 text-white rounded">Join Team</button>
      </div>
    </div>
  </div>

    </div>
  );
}

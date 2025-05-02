"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "../firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";


import { signIn, signUp } from "../lib/actions/auth.action";

const authFormSchema = (type) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("onSubmit function called", data);
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        console.log("sign-in-clicked");
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="rounded-2xl bg-gradient-to-b border border-blue-400 p-10 m-auto w-[100%] lg:min-w-[566px] max-w-2xl ">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          {/* <Image src="/logo.svg" alt="logo" height={32} width={38} /> */}
          <h2 className="text-3xl font-bold">PulseCheck</h2>
          
        </div>
        <h3 className="text-center">Track your dev team's collaborative energy</h3>
        

        
        <form
  onSubmit={handleSubmit(onSubmit)}
  className="w-full space-y-6 mt-4 form"
>
  {!isSignIn && (
    <input
      className="w-full border-2 border-gray-500 rounded-lg p-2"
      type='text'
      placeholder="Enter your name"
      {...register('name')} // <-- Register the name input
    />
  )}

  <input
    className="w-full border-2 border-gray-500 rounded-lg p-2"
    type='email'
    placeholder="Enter your email"
    {...register('email')} // <-- Register the email input
  />

  <input
    className="w-full border-2 border-gray-500 rounded-lg p-2"
    type='password'
    placeholder="Enter your password"
    {...register('password')} // <-- Register the password input
  />

  <div className="flex justify-center ">
    <button disabled={formState.isSubmitting} className="cursor-pointer align-center bg-blue-900 p-3 rounded-md" type="submit">
      {isSignIn ? "Sign In" : "Create an Account"}
    </button>
  </div>
</form>
        

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default AuthForm;


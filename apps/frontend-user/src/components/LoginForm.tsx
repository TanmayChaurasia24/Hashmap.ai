"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

export const formSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  })
});

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("Form data submitted:", data);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error("No response data received");
      }

      // @ts-ignore
      const { token } = response.data;
      console.log("Token received:", token);

      // Set the token in cookies
      Cookies.set("User", token, {
        expires: 2,
        path: "/",
        secure: true,
        sameSite: "Lax",
      });

      toast.success("We've created your account for you.");
      navigate("/");
    } catch (error: any) {
      console.error("Error during signup:", error);
      if (error.response) {
        // Backend returned an error response
        toast.error(error.response.data.message || "Failed to create an account.");
      } else {
        // Network or other errors
        toast.error(error.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Please Wait..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}

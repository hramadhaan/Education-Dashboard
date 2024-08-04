"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoginAsComponent from "@/components/widget/LoginAs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { BsJournal } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const enumLogin = [
  {
    type: "student",
    value: "Murid",
    icon: <PiStudentBold size={12} className="m-auto" />,
  },
  {
    type: "bagian-kurikulum",
    value: "Kurikulum",
    icon: <BsJournal size={12} className="m-auto" />,
  },
  {
    type: "teacher",
    value: "Guru",
    icon: <GiTeacher size={12} className="m-auto" />,
  },
];

const formSchema = z.object({
  user: z.string().min(4, {
    message: "User must be at least 4 characters",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
});

export default function LoginPage() {
  const [loginAs, setLoginAs] = useState("student");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  console.log("rerender: ");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn("credentials", {
      user: values.user,
      password: values.password,
      typeLogin: loginAs,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <main className="flex flex-row w-full min-h-screen bg-white">
      {/* Main Container */}
      <div className="w-3/6 bg-white flex items-center justify-center container">
        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / NIP</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter your Email or NIP"
                    />
                  </FormControl>
                  <FormDescription>Email ataupun NIP</FormDescription>
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
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter your Password"
                    />
                  </FormControl>
                  <FormDescription>Password minimal 5 karakter</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoginAsComponent enumLogin={enumLogin} setLoginAs={setLoginAs} />
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </Form>
      </div>
      {/* Image Container */}
      <div className="flex flex-1 bg-green-200"></div>
    </main>
  );
}

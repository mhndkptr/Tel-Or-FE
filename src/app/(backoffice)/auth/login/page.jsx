"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from "zod";
import { useLoginMutation } from "@/hooks/auth.hooks";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email wajib diisi.",
    })
    .email({
      message: "Email harus berupa alamat email yang valid.",
    }),
  password: z.string().min(8, {
    message: "Kata sandi minimal harus 8 karakter.",
  }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginMutation } = useLoginMutation();

  const handleSubmit = (data) => {
    const payload = { email: data.email, password: data.password };
    loginMutation.mutate({ payload: payload });
  };

  const loginFormConfig = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="min-h-screen bg-greyDark-100 flex m-auto">
      <div className="flex justify-center md:items-center w-full">
        <div className="grid lg:grid-cols-2 overflow-hidden rounded-lg min-h-[80%] md:max-w-[85%] md:centered-shadow bg-white">
          <div className="flex flex-col p-5 md:p-12">
            <div className="md:mb-6 mb-4">
              <Image
                src="/assets/logos/logo-telkom-university.jpg"
                alt="Telkom University Logo"
                width={200}
                height={60}
                className="md:mb-6 mb-4 w-[150px]"
              />
              <h1 className="lg:text-3xl text-2xl font-bold mb-2">Selamat Datang!</h1>
              <p className="text-gray-600 md:text-base text-sm">Masuk untuk dapat mengelola ormawa anda.</p>
            </div>

            <Form {...loginFormConfig}>
              <form onSubmit={loginFormConfig.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={loginFormConfig.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email" className="font-semibold md:text-base text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Masukkan email"
                          className="h-max lg:px-5 lg:py-3 sm:px-3.5 sm:py-2.5 px-4 py-2.5 md:text-base text-sm border-[#ADADAD] placeholder-[#808080] focus:ring-1 focus:ring-[#ADADAD] rounded-md"
                          {...field}
                          disabled={loginMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginFormConfig.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password" className="font-semibold md:text-base text-sm">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan password"
                            className="md:text-base text-sm h-max lg:px-5 lg:py-3 sm:px-3.5 sm:py-2.5 px-4 py-2.5 border-[#ADADAD] placeholder-[#808080] focus:ring-1 focus:ring-[#ADADAD] rounded-md group-aria-invalid:focus-visible:ring-destructive/20 group-aria-invalid:focus-visible:border-destructive group-aria-invalid:ring-destructive/20 group-aria-invalid:border-destructive dark:group-aria-invalid:ring-destructive/40"
                            {...field}
                            disabled={loginMutation.isPending}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 w-8 text-[#8E8E8E]"
                            onClick={() => setShowPassword((prev) => !prev)}
                            disabled={loginMutation.isPending}
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 h-max text-white rounded-md w-full md:w-max md:px-4 md:py-2.5 p-2.5 font-semibold md:text-base text-sm cursor-pointer"
                    disabled={loginMutation.isPending}
                    aria-label="Masuk"
                  >
                    {loginMutation.isPending ? "Loading..." : "Masuk"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="hidden lg:block">
            <Image
              src="/assets/images/img-telkom-tult.jpg"
              alt="Telkom University Campus"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

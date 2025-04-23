import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  collegeId: z.string().min(4, "College ID is required"),
  collegeTag: z.string().min(3, "College Tag is required"),
  collegeName: z.string().min(6, "College Name is required"),
  collegeMail: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Register() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegeId: "",
      collegeTag: "",
      collegeName: "",
      collegeMail: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_COLLEGE_AUTH_URL}/register`,
        data
      );
      toast.success(res.data.message || "Registration successful!");
      form.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          College Registration
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={(e) => e.key === "Enter" && form.handleSubmit(onSubmit)()}
            className="space-y-5 mt-6"
          >
            {/* College ID */}
            <FormField
              control={form.control}
              name="collegeId"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-gray-700 font-medium">College ID</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter College ID"
                      className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* College Tag */}
            <FormField
              control={form.control}
              name="collegeTag"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-gray-700 font-medium">College Tag</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter College Tag"
                      className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* College Name */}
            <FormField
              control={form.control}
              name="collegeName"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-gray-700 font-medium">College Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter College Name"
                      className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* College Email */}
            <FormField
              control={form.control}
              name="collegeMail"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-gray-700 font-medium">College Email</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter Email"
                      className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-gray-700 font-medium">Password</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter Password"
                      className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full bg-white text-black border-2 border-blue-600 font-semibold py-2 rounded-lg transition-all duration-300 shadow-md transform 
              hover:text-white hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            {/* Login Redirect */}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline hover:text-blue-700 transition duration-200"
              >
                Login here
              </a>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

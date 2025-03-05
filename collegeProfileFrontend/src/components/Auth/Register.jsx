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
  collegeId: z.string().min(3, "College ID is required"),
  collegeTag: z.string().min(4, "College Tag is required"),
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
      form.reset(); // Reset form on successful registration
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-center">College Registration</h2>

        <FormField
          control={form.control}
          name="collegeId"
          render={({ field }) => (
            <FormItem>
              <Label>College ID</Label>
              <FormControl>
                <Input {...field} placeholder="Enter College ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="collegeTag"
          render={({ field }) => (
            <FormItem>
              <Label>College Tag</Label>
              <FormControl>
                <Input {...field} placeholder="Enter College Tag" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="collegeName"
          render={({ field }) => (
            <FormItem>
              <Label>College Name</Label>
              <FormControl>
                <Input {...field} placeholder="Enter College Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="collegeMail"
          render={({ field }) => (
            <FormItem>
              <Label>College Email</Label>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter Email" />
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
              <Label>Password</Label>
              <FormControl>
                <Input {...field} type="password" placeholder="Enter Password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}

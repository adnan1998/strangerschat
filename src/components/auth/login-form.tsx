
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { collection } from "firebase/firestore";
import { type User } from "@/types";

const formSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters.").max(15, "Username cannot exceed 15 characters.").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
  gender: z.enum(["Male", "Female"], {
    required_error: "Please select a gender.",
  }),
  age: z.coerce.number().min(18, "You must be 18 or older to chat.").max(99, "Please enter a valid age."),
});

export default function Login() {
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  const onlineUsersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'online_users');
  }, [firestore]);
  const { data: onlineUsers, isLoading } = useCollection<User>(onlineUsersQuery);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: typeof window !== 'undefined' ? localStorage.getItem('last-username') || '' : '',
      age: 18,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth || !firestore) return;

    const isTaken = onlineUsers?.some(
      (user) => user.username.toLowerCase() === values.username.toLowerCase() && user.isOnline
    );

    if (isTaken) {
      form.setError("username", {
        type: "manual",
        message: "Username taken, please try another.",
      });
      return;
    }

    localStorage.setItem('last-username', values.username);
    initiateAnonymousSignIn(auth);
    
    localStorage.setItem('pending-user-details', JSON.stringify(values));

    toast({
      title: "Logging in...",
      description: `You are about to start chatting as ${values.username}.`,
    });
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-background">
      <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">AnonChat</CardTitle>
          <CardDescription>Enter the lobby with an anonymous identity</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Choose a username" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} disabled={isLoading}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full text-lg font-semibold" size="lg" disabled={isLoading}>
                {isLoading ? 'Checking...' : 'Enter Chat'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}


// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
// import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
// import { collection } from "firebase/firestore";
// import { type User } from "@/types";

// const formSchema = z.object({
//   username: z.string().trim().min(3, "Username must be at least 3 characters.").max(15, "Username cannot exceed 15 characters.").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
//   gender: z.enum(["Male", "Female"], {
//     required_error: "Please select a gender.",
//   }),
//   age: z.coerce.number().min(18, "You must be 18 or older to chat.").max(99, "Please enter a valid age."),
// });

// export default function Login() {
//   const { toast } = useToast();
//   const auth = useAuth();
//   const firestore = useFirestore();

//   const onlineUsersQuery = useMemoFirebase(() => {
//     if (!firestore) return null;
//     return collection(firestore, 'online_users');
//   }, [firestore]);
//   const { data: onlineUsers, isLoading } = useCollection<User>(onlineUsersQuery);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: typeof window !== 'undefined' ? localStorage.getItem('last-username') || '' : '',
//       age: 18,
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     if (!auth || !firestore) return;

//     const isTaken = onlineUsers?.some(
//       (user) => user.username.toLowerCase() === values.username.toLowerCase() && user.isOnline
//     );

//     if (isTaken) {
//       form.setError("username", {
//         type: "manual",
//         message: "Username taken, please try another.",
//       });
//       return;
//     }

//     localStorage.setItem('last-username', values.username);
//     initiateAnonymousSignIn(auth);
    
//     localStorage.setItem('pending-user-details', JSON.stringify(values));

//     toast({
//       title: "Logging in...",
//       description: `You are about to start chatting as ${values.username}.`,
//     });
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Decorative background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       {/* Main login card */}
//       <div className="w-full max-w-md relative z-10">
//         {/* Welcome badge */}
//         <div className="text-center mb-6">
//           <div className="inline-block px-6 py-2 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-900/40 dark:to-purple-900/40 rounded-full text-sm font-semibold text-pink-700 dark:text-pink-300 border border-pink-300 dark:border-pink-700 shadow-lg">
//             ✨ Welcome to AnonChat
//           </div>
//         </div>

//         <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border-0 rounded-3xl overflow-hidden">
//           {/* Gradient header */}
//           <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-1">
//             <div className="bg-white/95 dark:bg-gray-900/95 rounded-t-3xl">
//               <CardHeader className="text-center pb-8 pt-8">
//                 {/* Logo */}
//                 <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
//                   <span className="text-2xl">💬</span>
//                 </div>
//                 <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
//                   Join the Conversation
//                 </CardTitle>
//                 <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
//                   Create your anonymous identity and dive into meaningful connections
//                 </CardDescription>
//               </CardHeader>
//             </div>
//           </div>

//           <CardContent className="p-8">
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                 {/* Username field with enhanced styling */}
//                 <FormField
//                   control={form.control}
//                   name="username"
//                   render={({ field }) => (
//                     <FormItem className="space-y-3">
//                       <FormLabel className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
//                         <span className="text-lg">👤</span> Choose Your Username
//                       </FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Input 
//                             placeholder="Enter a unique username..." 
//                             {...field} 
//                             disabled={isLoading}
//                             className="pl-4 pr-4 py-3 text-lg border-2 border-pink-200 dark:border-pink-800 focus:border-pink-400 dark:focus:border-pink-600 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/25"
//                           />
//                           <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
//                             <span className="text-pink-400">✨</span>
//                           </div>
//                         </div>
//                       </FormControl>
//                       <FormMessage className="text-red-500" />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Gender and Age in a beautiful grid */}
//                 <div className="grid grid-cols-2 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="gender"
//                     render={({ field }) => (
//                       <FormItem className="space-y-3">
//                         <FormLabel className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
//                           <span className="text-lg">🎭</span> Gender
//                         </FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
//                           <FormControl>
//                             <SelectTrigger className="border-2 border-purple-200 dark:border-purple-800 focus:border-purple-400 dark:focus:border-purple-600 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm h-12 transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/25">
//                               <SelectValue placeholder="Select..." />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="rounded-xl border-2 border-purple-200 dark:border-purple-800">
//                             <SelectItem value="Male" className="focus:bg-purple-100 dark:focus:bg-purple-900">👨 Male</SelectItem>
//                             <SelectItem value="Female" className="focus:bg-purple-100 dark:focus:bg-purple-900">👩 Female</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage className="text-red-500" />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="age"
//                     render={({ field }) => (
//                       <FormItem className="space-y-3">
//                         <FormLabel className="text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
//                           <span className="text-lg">🎂</span> Age
//                         </FormLabel>
//                         <FormControl>
//                           <Input 
//                             type="number" 
//                             {...field} 
//                             disabled={isLoading}
//                             className="border-2 border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-600 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm h-12 text-lg transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25"
//                             placeholder="18+"
//                           />
//                         </FormControl>
//                         <FormMessage className="text-red-500" />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 {/* Enhanced submit button */}
//                 <div className="pt-4">
//                   <Button 
//                     type="submit" 
//                     disabled={isLoading}
//                     className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-xl shadow-pink-500/50 hover:shadow-pink-500/70 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
//                   >
//                     {isLoading ? (
//                       <div className="flex items-center gap-2">
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                         Checking availability...
//                       </div>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <span>💬</span>
//                         Enter the Chat
//                         <span>🚀</span>
//                       </div>
//                     )}
//                   </Button>
//                 </div>

//                 {/* Privacy note */}
//                 <div className="text-center pt-2">
//                   <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
//                     🔒 Your privacy is our priority. No personal data is stored.
//                     <br />
//                     <span className="text-pink-500">💝 Chat safely and authentically</span>
//                   </p>
//                 </div>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>

//         {/* Bottom decorative element */}
//         <div className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
//           <div className="flex items-center justify-center gap-2">
//             <span>Ready to make connections?</span>
//             <span className="animate-bounce">💕</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { isUsernameAllowed } from "@/lib/content-filter";
import { SafetyNotice, AgeVerificationNotice, SafetyFooter } from "@/components/safety-notice";
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, User as UserIcon, Users, Cake, Shield, Heart, Rocket, MapPin, Globe, Check, ChevronDown } from "lucide-react";
import { Country, State } from 'country-state-city';
import { getCountryFlag } from '@/lib/country-utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";


const formSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters.").max(15, "Username cannot exceed 15 characters.").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
  gender: z.enum(["Male", "Female"], {
    required_error: "Please select a gender.",
  }),
  age: z.coerce.number().min(18, "You must be 18 or older to chat.").max(99, "Please enter a valid age."),
  country: z.string().min(1, {
    message: "Please select your country.",
  }),
  countryCode: z.string().min(1),
  state: z.string().optional(), // Optional since some countries don't have states
  stateCode: z.string().optional(),
});

export default function Login() {
  const { toast } = useToast();
  const auth = useAuth();
  const { playSuccess } = useAudioFeedback();
  
  // Get countries and manage state for dynamic state dropdown
  const countries = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [availableStates, setAvailableStates] = useState<any[]>([]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: typeof window !== 'undefined' ? localStorage.getItem('last-username') || '' : '',
      gender: "Female",
      age: 18,
      country: '',
      countryCode: '',
      state: '',
      stateCode: '',
    },
  });

  // Handle country selection and update available states
  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.isoCode === countryCode);
    if (country) {
      setSelectedCountry(countryCode);
      const states = State.getStatesOfCountry(countryCode);
      setAvailableStates(states);
      
      // Update form values
      form.setValue('country', country.name);
      form.setValue('countryCode', country.isoCode);
      
      // Clear state selection when country changes
      form.setValue('state', '');
      form.setValue('stateCode', '');
    }
  };

  // Handle state selection
  const handleStateChange = (stateCode: string) => {
    const state = availableStates.find(s => s.isoCode === stateCode);
    if (state) {
      form.setValue('state', state.name);
      form.setValue('stateCode', state.isoCode);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) return;

    // Validate username against content filter
    const usernameValidation = isUsernameAllowed(values.username);
    if (!usernameValidation.allowed) {
      toast({
        title: "Username not allowed",
        description: usernameValidation.reason,
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('last-username', values.username);
    
    // Play success sound when login is initiated
    try {
      await playSuccess();
    } catch (error) {
      console.log('Audio feedback not available:', error);
    }
    
    initiateAnonymousSignIn(auth);
    
    localStorage.setItem('pending-user-details', JSON.stringify(values));

    toast({
      title: "Welcome to safe chatting!",
      description: `You are joining as ${values.username}. Remember to keep conversations friendly! 🎉`,
    });
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-purple-50 to-white py-8">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 text-sm font-semibold text-primary shadow-sm mb-6"
        >
            <Sparkles className="h-4 w-4 text-pink-500"/>
            Welcome to AnonChat
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100, delay: 0.4 }}
            className="w-full max-w-md rounded-3xl bg-white shadow-2xl shadow-purple-200/50 overflow-hidden"
        >
            <div className="relative text-center bg-white/80 backdrop-blur-sm rounded-t-2xl px-6 py-6">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
                    className="mx-auto h-12 w-12 mb-3 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-purple-500/20"
                >
                    <MessageCircle className="h-6 w-6 text-white"/>
                </motion.div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700">Join the Chat</h1>
                <p className="text-sm text-muted-foreground mt-1">Quick & anonymous</p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
            </div>
            
            <div className="p-5 bg-gradient-to-t from-purple-50/70 to-white">
            
            {/* Compact welcome message */}
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Welcome to anonymous conversations! 🌟
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                18+ • Keep it friendly • Have fun!
              </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2 font-semibold text-muted-foreground"><UserIcon className="h-4 w-4 text-primary"/>Choose Your Username</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input placeholder="Enter a cool username" {...field} className="pr-8 bg-white/50 focus:bg-white"/>
                                <Sparkles className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-yellow-400"/>
                            </div>
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
                        <FormLabel className="flex items-center gap-2 font-semibold text-muted-foreground"><Users className="h-4 w-4 text-primary"/>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="bg-white/50 focus:bg-white">
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Male">Male</SelectItem>
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
                        <FormLabel className="flex items-center gap-2 font-semibold text-muted-foreground"><Cake className="h-4 w-4 text-primary"/>Age</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} className="bg-white/50 focus:bg-white"/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                {/* Country and State Selection */}
                <div className="grid grid-cols-1 gap-4">
                    <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2 font-semibold text-muted-foreground">
                                    <Globe className="h-4 w-4 text-primary"/>
                                    Country
                                </FormLabel>
                                <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={countryOpen}
                                                className="w-full justify-between bg-white/50 focus:bg-white hover:bg-white"
                                            >
                                                {field.value ? (
                                                    <span className="flex items-center gap-2">
                                                        <span className="text-base">
                                                            {field.value ? String.fromCodePoint(...field.value.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))) : '🌍'}
                                                        </span>
                                                        <span>{countries.find((country) => country.isoCode === field.value)?.name}</span>
                                                    </span>
                                                ) : (
                                                    "Select your country..."
                                                )}
                                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search countries..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No country found.</CommandEmpty>
                                                <CommandGroup>
                                                    {countries.map((country) => (
                                                        <CommandItem
                                                            value={country.name}
                                                            key={country.isoCode}
                                                            onSelect={() => {
                                                                field.onChange(country.isoCode);
                                                                handleCountryChange(country.isoCode);
                                                                setCountryOpen(false);
                                                            }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <span className="text-base flex-shrink-0">
                                                             {country.isoCode ? String.fromCodePoint(...country.isoCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))) : '🌍'}
                                                         </span>
                                                            <span className="flex-1">{country.name}</span>
                                                            <Check
                                                                className={cn(
                                                                    "h-4 w-4 flex-shrink-0",
                                                                    country.isoCode === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stateCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2 font-semibold text-muted-foreground">
                                    <MapPin className="h-4 w-4 text-primary"/>
                                    State / Province (Optional)
                                </FormLabel>
                                <Popover open={stateOpen} onOpenChange={setStateOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={stateOpen}
                                                className="w-full justify-between bg-white/50 focus:bg-white hover:bg-white"
                                                disabled={!selectedCountry}
                                            >
                                                {field.value && availableStates.length > 0
                                                    ? availableStates.find((state) => state.isoCode === field.value)?.name
                                                    : !selectedCountry 
                                                        ? "Select country first..."
                                                        : availableStates.length === 0
                                                            ? "No states available"
                                                            : "Select state/province..."}
                                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search states/provinces..." className="h-9" />
                                            <CommandList>
                                                {availableStates.length === 0 ? (
                                                    <CommandEmpty>No states/provinces available for this country.</CommandEmpty>
                                                ) : (
                                                    <>
                                                        <CommandEmpty>No state found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {availableStates.map((state) => (
                                                                <CommandItem
                                                                    value={state.name}
                                                                    key={state.isoCode}
                                                                    onSelect={() => {
                                                                        field.onChange(state.isoCode);
                                                                        handleStateChange(state.isoCode);
                                                                        setStateOpen(false);
                                                                    }}
                                                                >
                                                                    {state.name}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto h-4 w-4",
                                                                            state.isoCode === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </>
                                                )}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300" size="lg">
                    <MessageCircle className="mr-2 h-5 w-5"/>
                    Enter the Chat
                    <Rocket className="ml-2 h-5 w-5"/>
                </Button>
                </form>
            </Form>
            {/* Compact footer */}
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield className="h-3 w-3 text-green-500"/>
                <span>Safe & anonymous</span>
                <Heart className="h-3 w-3 text-pink-500"/>
              </div>
              <div className="flex justify-center gap-3 text-xs">
                <a 
                  href="/terms" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Terms
                </a>
                <a 
                  href="/privacy" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Privacy
                </a>
              </div>
            </div>
            </div>
        </motion.div>
    </div>
  );
}

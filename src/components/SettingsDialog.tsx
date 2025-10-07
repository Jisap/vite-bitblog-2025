import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useFetcher } from "react-router";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { InputPassword } from "./InputPassword";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useUser } from "@/hooks/useUser";
import { AtSignIcon, Loader2Icon, MailIcon } from "lucide-react";


import type { DialogProps } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";


const profileSchema = z.object({
  firstName: z
    .string()
    .max(20, "First name must be than 20 characters" ),
  lastName: z
    .string()
    .max(20, "Last name must be than 20 characters" ),
  email: z
    .email({ message: "Invalid email address" })
    .max(50, "Email must be less than 50 characters"),
  username: z.string().max(20, "Username must be less than 20 characters")
});

const ProfileSettingsForm = () => {

  const fetcher = useFetcher();
  const user = useUser();

  const loading = fetcher.state !== "idle" && Boolean(fetcher.formData)

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: user?.email,
    username: user?.username
  }

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues
  })

  const onSubmit = useCallback(async (values: z.infer<typeof profileSchema>) => {
    console.log(values);
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Encabezado */}
        <div>
          <h3 className="font-semibold text-lg">Personal Info</h3>

          <p className="text-sm text-muted-foreground">
            Update your photo and personal details here.
          </p>

          <Separator className="my-5"/>
        </div>

        {/* First Name & Last Name */}
        <div className="grid gap-4 items-start lg:grid-cols-[1fr_2fr]">
          <div className={cn(
            "text-sm leading-none font-medium",
            (form.formState.errors.firstName || form.formState.errors.lastName) && "test-destructive"
          )}>
            Name
          </div>

          <div className="grid max-md:gap-y-4 gap-x-6 md:grid-cols-2">
            <FormField 
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="md:sr-only">First Name</FormLabel>

                  <FormControl>
                    <Input type="text" placeholder="John" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="md:sr-only">Last Name</FormLabel>

                  <FormControl>
                    <Input type="text" placeholder="Doe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
              />
          </div>
        </div>

        <Separator className="my-5" />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-2 items-start lg:grid-cols-[1fr_2fr]">
              <FormLabel>Email address</FormLabel>
              <div className="space-y-2">
                <div className="relative">
                  <MailIcon 
                    size={20}
                    className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-muted-foreground"
                  />

                  <FormControl defaultValue={user?.email}>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="ps-10"
                      {...field} 
                    />
                  </FormControl>

                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        /> 

        <Separator className="my-5" />

        {/* Email */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grid gap-2 items-start lg:grid-cols-[1fr_2fr]">
              <FormLabel>Username</FormLabel>
              <div className="space-y-2">
                <div className="relative">
                  <AtSignIcon
                    size={20}
                    className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-muted-foreground"
                  />

                  <FormControl defaultValue={user?.username}>
                    <Input
                      type="text"
                      placeholder="johndoe"
                      className="ps-10"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

const passwordFormSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  confirm_Password: z
    .string()
})
.refine((data) => data.password === data.confirm_Password, {
  message: "Passwords do not match",
  path: ["confirm_Password"],
});

const PasswordSettingsForm = () => {
  return (
    <div>
      Password Settings Form
    </div>
  )
}


export const SettingsDialog = ({ children, ...props }: React.PropsWithChildren<DialogProps>) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="md:min-w-[80vw] xl:min-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="gap-5">
          <TabsList className="w-full">
            <TabsTrigger value="profile">
              Profile
            </TabsTrigger>
            <TabsTrigger value="password">
              password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettingsForm />
          </TabsContent>
          <TabsContent value="password">
            <PasswordSettingsForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
  
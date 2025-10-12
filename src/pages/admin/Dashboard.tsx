import { Link, useLoaderData } from "react-router";
import { Fragment } from "react";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";
import { MessageSquare, TextIcon, UserRoundIcon } from "lucide-react";




export const Dashboard = () => {
  return (
    <div className="container p-4 space-y-4">
      <h2 className="text-2xl font-semibold"> 
        Dashboard
      </h2>
    </div>
  )
}


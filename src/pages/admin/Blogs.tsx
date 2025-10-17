import { BlogTable, columns } from "@/components/BlogTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

import type { Blog, PaginatedResponse } from '../../types/index';

type PaginateTo = "first" | "last" | "previous" | "next" | null;

const LIMITS = [5, 10, 20, 30, 40];


export const BlogsAdmin = () => {
  return (
    <div>
      Blogs Admin
    </div>
  )
}
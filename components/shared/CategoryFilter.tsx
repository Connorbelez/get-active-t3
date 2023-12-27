"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/../components/ui/select"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {

    }

    getCategories();
  }, [])

  const onSelectCategory = (category: string) => {
      let newUrl = '';

    
      }


  

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

        {categories.map((category) => (
          <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CategoryFilter
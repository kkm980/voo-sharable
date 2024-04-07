"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes";
// import callFn from "@/app/api/test/route"
import { Button } from "@/components/ui/button"
// import axios from "axios";

export function ThemeToggler() {
    const { theme, setTheme } = useTheme();
    const [resp, setResp] = React.useState<any>('');
    React.useEffect(() => {
        theme && console.log("theme", theme, "theme");
    }, [theme])

    React.useEffect(() => {
        resp && console.log("resp", resp, "resp");
    }, [resp])
    
    const handleClick = async () => {
        try {
          const response = await fetch("/api/test", {
            method: "POST",
            body: JSON.stringify({ theme: theme }),
          });
          const responseData = await response.json();
          setResp(responseData);
        } catch (error) {
          console.error("Error fetching theme:", error);
        }
      };

    return (
        <Button variant="outline" size="icon"
        onClick={()=>{
            theme === "light" ? setTheme("dark") : setTheme("light");
            handleClick();
        }}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    )
}

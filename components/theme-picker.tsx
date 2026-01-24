"use client"

import * as React from "react"
import { Moon, Sun, Palette, Check } from "lucide-react"

import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
} from "./ui/dropdown-menu"
import { useTheme } from "./theme-provider"
import { cn } from "@/lib/utils"

const colors = [
    { name: "Zinc", value: "zinc", class: "bg-zinc-500" },
    { name: "Blue", value: "blue", class: "bg-blue-500" },
    { name: "Red", value: "red", class: "bg-red-500" },
    { name: "Green", value: "green", class: "bg-green-500" },
    { name: "Orange", value: "orange", class: "bg-orange-500" },
    { name: "Violet", value: "violet", class: "bg-violet-500" },
] as const

export function ThemePicker() {
    const { theme, setTheme, color, setColor } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
                    <Palette className="h-5 w-5" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme("light")} className="justify-between">
                    <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                    </div>
                    {theme === "light" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="justify-between">
                    <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                    </div>
                    {theme === "dark" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="justify-between">
                    <div className="flex items-center gap-2">
                        <span className="h-4 w-4 flex items-center justify-center text-[10px] font-bold border rounded-sm">SY</span>
                        <span>System</span>
                    </div>
                    {theme === "system" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Palette className="mr-2 h-4 w-4" />
                        <span>Color Palette</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-48">
                            {colors.map((c) => (
                                <DropdownMenuItem
                                    key={c.value}
                                    onClick={() => setColor(c.value)}
                                    className="justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={cn("h-3 w-3 rounded-full", c.class)} />
                                        <span>{c.name}</span>
                                    </div>
                                    {color === c.value && <Check className="h-4 w-4" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

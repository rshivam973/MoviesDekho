"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"
type Color = "zinc" | "blue" | "red" | "green" | "orange" | "violet"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    defaultColor?: Color
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    color: Color
    setTheme: (theme: Theme) => void
    setColor: (color: Color) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    color: "zinc",
    setTheme: () => null,
    setColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    defaultColor = "zinc",
    storageKey = "movies-dekho-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme)
    const [color, setColor] = useState<Color>(defaultColor)

    useEffect(() => {
        const savedTheme = localStorage.getItem(`${storageKey}-theme`) as Theme
        const savedColor = localStorage.getItem(`${storageKey}-color`) as Color
        if (savedTheme) setTheme(savedTheme)
        if (savedColor) setColor(savedColor)
    }, [storageKey])

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
        } else {
            root.classList.add(theme)
        }
    }, [theme])

    useEffect(() => {
        const root = window.document.documentElement

        // Remove all possible theme attributes
        root.removeAttribute("data-theme")

        if (color !== "zinc") {
            root.setAttribute("data-theme", color)
        }
    }, [color])

    const value = {
        theme,
        color,
        setTheme: (theme: Theme) => {
            localStorage.setItem(`${storageKey}-theme`, theme)
            setTheme(theme)
        },
        setColor: (color: Color) => {
            localStorage.setItem(`${storageKey}-color`, color)
            setColor(color)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}

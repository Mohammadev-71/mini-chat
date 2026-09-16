"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
        <button type="button" className="w-9 h-9" aria-label="Change theme" />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")}>
        {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
        </button>
    );
}

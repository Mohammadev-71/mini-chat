"use client";

import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

export default function PasswordField({
    defaultValue,
    placeholder,
    label
}: {
    defaultValue?:string;
    placeholder: string;
    label:string
}) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <label className="w-full text-indigo-800 dark:text-indigo-300">
        {label}
        <div className="flex justify-between items-center w-full px-4 py-2 bg-white/50 dark:bg-black/50 shadow-inner rounded-lg outline-none text-gray-800 dark:text-gray-200">
            <input
            defaultValue={defaultValue}
            className="min-w-0 flex-1 bg-transparent outline-none p-2 text-indigo-800 dark:text-indigo-300"
            name="password"
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            />

            <button
            type="button"
            
            className="cursor-pointer text-indigo-800 dark:text-indigo-300"
            onClick={() => setShowPassword(!showPassword)}
            >
            {showPassword ? <FaEyeSlash size={20} /> : <FaRegEye size={20} />}
            </button>
        </div>
        </label>
    );
}

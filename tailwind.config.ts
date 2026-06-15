import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            color: {
                greenery: "#007e5d",
                golden: "#f8c828",
                darkGreen: "#014231",
                cream: "#fdfbf0",
            },
            boxShadow: {
                'solid': '6px 6px 0px 0px rgba(1, 66, 49, 1)'
            }
        },
    },
    plugins: [],
};
export default config;
var config = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#090b10",
                surface: "#10131c",
                border: "#1e2634",
                muted: "#94a3b8",
                primary: "#38bdf8",
                accent: "#22d3ee",
            },
            boxShadow: {
                soft: "0 10px 30px rgba(0,0,0,0.35)",
            },
            backgroundImage: {
                noise: "radial-gradient(circle at 1px 1px, rgba(255,255,255,.04) 1px, transparent 0)",
            },
        },
    },
    plugins: [],
};
export default config;

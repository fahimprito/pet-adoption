/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                clifford: '#da373d',
                gray1: '#737373',
                primary: '#0E7A81',
            },
            fontFamily: {
                lato: "Lato",
            }
        },
    },
    plugins: [],
}
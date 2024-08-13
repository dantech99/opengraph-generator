import { defineConfig, presetWind } from "unocss";
import { presetAnimations } from "unocss-preset-animations";

export default defineConfig({
	presets: [presetWind(), presetAnimations()],
	theme: {
		fontFamily: {
			sans: "Satoshi",
			boska: "Boska",
			switzer: "Switzer",
			grotesk: "Space Grotesk",
		},
	},
	safelist: [
		"bg-[url('/assets/1.jpg')]",
		"bg-[url('/assets/2.jpg')]",
		"bg-[url('/assets/3.jpg')]",
		"text-lg",
		"text-xl",
		"text-2xl",
		"text-3xl",
		"text-4xl",
		"text-5xl",
		"text-6xl",
		"text-7xl",
		"text-8xl",
		"text-9xl",
		"top-4",
		"top-6",
		"bottom-4",
		"left-4",
		"left-5",
		"left-6",
		"right-4",
		"right-5",
		"bg-black",
		"bg-white",
		"bg-gray-200",
		"bg-cover",
		"bg-top",
		"bg-gradient-to-r",
		"bg-gradient-to-b",
		"bg-gradient-to-l",
		"from-purple-400",
		"via-pink-500",
		"to-red-500",
		"from-blue-400",
		"to-cyan-500",
		"from-green-400",
		"via-yellow-300",
		"to-lime-500",
		"bg-gray-50",
		"bg-gray-100",
		"text-white",
		"text-gray-300",
		"text-gray-400",
		"text-blue-500",
		"text-gray-800",
		"text-gray-600",
		"text-gray-700",
		"text-gray-900",
		"text-gray-50",
		"text-gray-200",
		"text-gray-100",
		"text-pink-600",
		"text-purple-800",
		"text-yellow-500",
		"text-teal-500",
		"text-blue-800",
		"text-blue-600",
		"text-cyan-500",
		"text-indigo-500",
		"text-green-800",
		"text-green-600",
		"text-lime-500",
		"text-yellow-400",
		"text-gray-900",
		"text-gray-700",
		"text-gray-600",
		"text-gray-800",
		"text-gray-500",
		"text-gray-50",
		"text-gray-100",
		"text-white/90",
		"text-white/80",
		"text-white/75",
		"text-center",
		"text-left",
		"text-right",
		"italic",
		"underline",
		"font-bold",
		"font-extrabold",
		"font-medium",
		"font-light",
		"font-semibold",
		"font-normal",
		"font-thin",
		"font-serif",
		"font-sans",
		"font-mono",
		"absolute",
		"size-6",
		"size-7",
		"size-8",
	],
});

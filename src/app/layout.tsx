import "@/styles/globals.css";
import "@/styles/typography.css";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html  className={`${inter.variable}`}>
			<body>{children}</body>
		</html>
	);
}
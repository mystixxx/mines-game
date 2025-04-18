import "@/styles/globals.css";
import "@/styles/typography.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import Head from "next/head";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Mines Game",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html className={`${inter.variable}`}>
			<Head>	
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<body>
				<Toaster position="bottom-center" toastOptions={{
					error: {
						style: {
							backgroundColor: "#242545",
							color: "#fff",
						},
					},
					duration: 3000,
				}}/>
				{children}
			</body>
		</html>
	);
}
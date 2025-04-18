import "@/styles/globals.css";
import "@/styles/typography.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

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
		<html className={`${inter.variable}`}>
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
import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Providers } from "./providers";
import CleanupScheduler from "./components/CleanupScheduler/CleanupScheduler"; // 👈 import

export const metadata = {
  title: "hulu_guzo",
  description:
    "Easily book, manage, and track tickets for regional bus services across Ethiopia—all in one app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          {/* Scheduler runs in background */}
          <CleanupScheduler />

          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pb-3">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

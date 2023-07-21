import "../globals.css";
import GlassPane from "@/components/GlassPane";

const AuthRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
};

export default AuthRootLayout;

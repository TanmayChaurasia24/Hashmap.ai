import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Sun, Menu, Layout, Briefcase, BookOpen, Code, Coins, PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [cookie, setCookie] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("User")) {
      setCookie(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cookie]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const navigationLinks = [
    { href: "/", label: "Home", icon: <Layout className="w-4 h-4" /> },
    { href: "/jobs", label: "Jobs", icon: <Briefcase className="w-4 h-4" /> },
    { href: "/blogs", label: "Blogs", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/write", label: "Write Blog", icon: <PenTool className="w-4 h-4" /> },
    { href: "/create/resume", label: "Create Resume", icon: <PenTool className="w-4 h-4" /> },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 bg-background/80 backdrop-blur-md transition-all duration-200 ${
        isScrolled ? 'border-b shadow-sm' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          >
            <Layout className="w-8 h-8 text-primary" />
            <span>Hashmap.ai</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-lg"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {!cookie ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  onClick={() => navigate("/login")}
                  variant="ghost"
                  className="rounded-lg"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="rounded-lg"
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="rounded-lg"
                  onClick={() => {
                    Cookies.remove("User");
                    setCookie(false);
                    navigate("/");
                  }}
                >
                  Log Out
                </Button>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <CgProfile className="h-6 w-6 text-primary" />
                </button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-lg">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 py-4">
                  <a href="/" className="flex items-center space-x-2 text-2xl font-bold">
                    <Layout className="w-8 h-8 text-primary" />
                    <span>Hashmap.ai</span>
                  </a>
                  <nav className="flex flex-col space-y-1">
                    {navigationLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </nav>
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    {!cookie ? (
                      <>
                        <Button
                          onClick={() => navigate("/login")}
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Log In
                        </Button>
                        <Button
                          onClick={() => navigate("/signup")}
                          className="w-full justify-start"
                        >
                          Sign Up
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={handleProfileClick}
                        >
                          Profile
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => {
                            Cookies.remove("User");
                            setCookie(false);
                            navigate("/");
                          }}
                        >
                          Log Out
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header
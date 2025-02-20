import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SignupForm } from "@/components/SignupForm";
import { LockKeyhole } from "lucide-react";
// Import the functions you need from the SDKs you need
import { signInWithGithubPopup, signInWithGooglePopup } from "../utils/firebase.utils";

export default function SignupPage() {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  const loggithubuser = async () => {
    const response = await signInWithGithubPopup();
    console.log(response);
    
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-4 lg:p-8 xl:p-12 flex flex-col justify-center bg-background">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <LockKeyhole className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Create Account</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Join our community of developers and start your journey today.
              </p>
            </div>
            <SignupForm />
            <div>
              <button onClick={logGoogleUser}>Sign In With Google</button>
            </div>
            <div>
              <button onClick={loggithubuser}>Sign In With github</button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 mix-blend-multiply z-10" />
          <img
            src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=2560&auto=format&fit=crop"
            alt="Developer workspace"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="max-w-xl p-8 text-white text-center">
              <h2 className="text-4xl font-bold mb-4">Welcome to Hashmap.ai</h2>
              <p className="text-lg opacity-90">
                Join a community of passionate developers, share your knowledge,
                and build amazing things together.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

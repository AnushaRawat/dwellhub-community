
import { LoginForm } from "@/components/auth/LoginForm";
import { Container } from "@/components/ui/Container";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-background via-secondary/40 to-background px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <Container maxWidth="md" className="flex flex-col items-center relative z-10">
        <div className="mb-8 text-center space-y-2">
          <div className="flex justify-center mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-lg opacity-70"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl animate-floating relative">
              A
            </div>
            <Sparkles className="absolute top-0 right-0 h-5 w-5 text-primary animate-pulse-subtle" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">AVA</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your community property and service management platform
          </p>
        </div>
        <div className="w-full max-w-md p-1 gradient-border rounded-xl">
          <LoginForm 
            onSwitchToSignup={() => {}} 
            userType="tenant"
          />
        </div>
      </Container>
    </div>
  );
}

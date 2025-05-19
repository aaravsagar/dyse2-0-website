import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DiscordCard } from '@/components/ui/discord-card';
import { loginUser } from '@/lib/firebase';
import { AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await loginUser(data.email);
      
      if (result.success && result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        
        if (!result.user.verified) {
          navigate('/verify');
        } else {
          navigate('/');
        }
      } else {
        setError('Failed to log in. Please check your email and try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container px-4 mx-auto py-16">
      <div className="max-w-md mx-auto">
        <DiscordCard>
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">Login to DYSE 2.0</h1>
              <p className="text-[#B9BBBE] mt-2">Enter your email to access your account</p>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#B9BBBE]">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#40444B] border-[#36393F] text-white"
                          placeholder="Enter your email"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
            
            <div className="text-center text-sm text-[#B9BBBE]">
              <p>Don't have an account?{' '}
                <Link to="/register" className="text-[#5865F2] hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </DiscordCard>
      </div>
    </div>
  );
}
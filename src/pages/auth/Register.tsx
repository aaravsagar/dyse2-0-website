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
import { registerUser } from '@/lib/firebase';
import { AlertCircle } from 'lucide-react';

const registerSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  discordUsername: z.string().min(2, { message: 'Discord username is required' }),
  discordID: z.string()
    .min(17, { message: 'Discord ID must be at least 17 characters' })
    .max(19, { message: 'Discord ID must be at most 19 characters' })
    .regex(/^\d+$/, { message: 'Discord ID must contain only numbers' }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      discordUsername: '',
      discordID: '',
    },
  });
  
  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await registerUser(
        data.email,
        data.discordUsername,
        data.discordID
      );
      
      if (result.success && result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/verify');
      } else {
        setError('Failed to create account. This email may already be in use.');
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
              <h1 className="text-2xl font-bold text-white">Create an Account</h1>
              <p className="text-[#B9BBBE] mt-2">Join DYSE 2.0 to report issues and track your stats</p>
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
                
                <FormField
                  control={form.control}
                  name="discordUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#B9BBBE]">Discord Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#40444B] border-[#36393F] text-white"
                          placeholder="Your Discord username"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="discordID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#B9BBBE]">Discord ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#40444B] border-[#36393F] text-white"
                          placeholder="Your Discord ID (e.g., 746215033502957650)"
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
                  {isLoading ? 'Creating Account...' : 'Register'}
                </Button>
              </form>
            </Form>
            
            <div className="text-center text-sm text-[#B9BBBE]">
              <p>Already have an account?{' '}
                <Link to="/login" className="text-[#5865F2] hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </DiscordCard>
      </div>
    </div>
  );
}
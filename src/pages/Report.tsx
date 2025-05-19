import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscordCard } from '@/components/ui/discord-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { submitUserReport, submitBugReport } from '@/lib/firebase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, UserX, Bug } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

const userReportSchema = z.object({
  reporterUsername: z.string().min(2, { message: 'Username is required' }),
  reporterDiscordId: z.string()
    .min(17, { message: 'Discord ID must be at least 17 characters' })
    .max(19, { message: 'Discord ID must be at most 19 characters' })
    .regex(/^\d+$/, { message: 'Discord ID must contain only numbers' }),
  targetUsername: z.string().min(2, { message: 'Username is required' }),
  targetDiscordId: z.string()
    .min(17, { message: 'Discord ID must be at least 17 characters' })
    .max(19, { message: 'Discord ID must be at most 19 characters' })
    .regex(/^\d+$/, { message: 'Discord ID must contain only numbers' }),
  serverName: z.string().min(1, { message: 'Server name is required' }),
  serverId: z.string()
    .regex(/^\d+$/, { message: 'Server ID must contain only numbers' }),
  description: z.string().min(10, { message: 'Please provide a detailed description (min 10 characters)' }),
  screenshotUrl: z.string().url().optional().or(z.literal(''))
});

const bugReportSchema = z.object({
  reporterUsername: z.string().min(2, { message: 'Username is required' }),
  reporterDiscordId: z.string()
    .min(17, { message: 'Discord ID must be at least 17 characters' })
    .max(19, { message: 'Discord ID must be at most 19 characters' })
    .regex(/^\d+$/, { message: 'Discord ID must contain only numbers' }),
  description: z.string().min(10, { message: 'Please provide a detailed description (min 10 characters)' }),
  stepsToReproduce: z.string().min(10, { message: 'Please provide steps to reproduce (min 10 characters)' }),
  screenshotUrl: z.string().url().optional().or(z.literal(''))
});

type UserReportFormValues = z.infer<typeof userReportSchema>;
type BugReportFormValues = z.infer<typeof bugReportSchema>;

export default function Report() {
  const [activeTab, setActiveTab] = useState('user');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
  const userForm = useForm<UserReportFormValues>({
    resolver: zodResolver(userReportSchema),
    defaultValues: {
      reporterUsername: '',
      reporterDiscordId: '',
      targetUsername: '',
      targetDiscordId: '',
      serverName: '',
      serverId: '',
      description: '',
      screenshotUrl: ''
    }
  });
  
  const bugForm = useForm<BugReportFormValues>({
    resolver: zodResolver(bugReportSchema),
    defaultValues: {
      reporterUsername: '',
      reporterDiscordId: '',
      description: '',
      stepsToReproduce: '',
      screenshotUrl: ''
    }
  });
  
  const onUserReportSubmit = async (data: UserReportFormValues) => {
    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      const result = await submitUserReport(
        `${data.reporterUsername}#${data.reporterDiscordId}`,
        data.reporterDiscordId,
        data.targetUsername,
        data.targetDiscordId,
        data.serverName,
        data.serverId,
        data.description,
        data.screenshotUrl || undefined
      );
      
      if (result.success) {
        toast({
          title: "Report Submitted",
          description: "Your report has been submitted successfully.",
        });
        userForm.reset();
        setRecaptchaToken(null);
      } else {
        setError('Failed to submit report. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const onBugReportSubmit = async (data: BugReportFormValues) => {
    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      const result = await submitBugReport(
        `${data.reporterUsername}#${data.reporterDiscordId}`,
        data.reporterDiscordId,
        data.description,
        data.stepsToReproduce,
        data.screenshotUrl || undefined
      );
      
      if (result.success) {
        toast({
          title: "Bug Report Submitted",
          description: "Your bug report has been submitted successfully.",
        });
        bugForm.reset();
        setRecaptchaToken(null);
      } else {
        setError('Failed to submit bug report. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };
  
  return (
    <div className="container px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Report Form</h1>
      
      <div className="max-w-3xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-[#2F3136]">
            <TabsTrigger value="user" className="data-[state=active]:bg-[#5865F2]">
              Report User
            </TabsTrigger>
            <TabsTrigger value="bug" className="data-[state=active]:bg-[#5865F2]">
              Report Bug
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="mt-6">
            <DiscordCard>
              <div className="flex items-center justify-center gap-4 mb-6">
                <UserX className="w-10 h-10 text-[#5865F2]" />
                <h2 className="text-2xl font-bold">Report a User</h2>
              </div>
              
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Form {...userForm}>
                <form onSubmit={userForm.handleSubmit(onUserReportSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={userForm.control}
                      name="reporterUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#B9BBBE]">Your Discord Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-[#40444B] border-[#36393F] text-white"
                              placeholder="Your Discord username"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={userForm.control}
                      name="reporterDiscordId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#B9BBBE]">Your Discord ID</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-[#40444B] border-[#36393F] text-white"
                              placeholder="Your Discord ID"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={userForm.control}
                      name="targetUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#B9BBBE]">Target Discord Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-[#40444B] border-[#36393F] text-white"
                              placeholder="Username of the user you're reporting"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={userForm.control}
                      name="targetDiscordId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#B9BBBE]">Target Discord ID</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-[#40444B] border-[#36393F] text-white"
                              placeholder="Discord ID of the user you're reporting"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={userForm.control}
                      name="serverName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#B9BBBE]">Server Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-[#40444B] border-[#36393F] text-white"
                              placeholder="Name of the server where the incident occurred"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={userForm.control}
                      name="serverId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#B9BBBE]">Server ID</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-[#40444B] border-[#36393F] text-white"
                              placeholder="ID of the server"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={userForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#B9BBBE]">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-[#40444B] border-[#36393F] text-white min-h-32"
                            placeholder="Describe the issue in detail. What happened? When did it happen?"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={userForm.control}
                    name="screenshotUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#B9BBBE]">Screenshot URL (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#40444B] border-[#36393F] text-white"
                            placeholder="Link to a screenshot image (e.g., from Discord, Imgur)"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-center my-4">
                    <ReCAPTCHA
                      sitekey="6LcD0D8rAAAAAOcECo801pLG4DK7Qm0avVHXpQLo"
                      onChange={handleRecaptchaChange}
                      theme="dark"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </form>
              </Form>
            </DiscordCard>
          </TabsContent>
          
          <TabsContent value="bug" className="mt-6">
            <DiscordCard>
              <div className="flex items-center justify-center gap-4 mb-6">
                <Bug className="w-10 h-10 text-[#5865F2]" />
                <h2 className="text-2xl font-bold">Report a Bug</h2>
              </div>
              
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Form {...bugForm}>
                <form onSubmit={bugForm.handleSubmit(onBugReportSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={bugForm.control}
                      name="reporterUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#B9BBBE]">Your Discord Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-[#40444B] border-[#36393F] text-white"
                              placeholder="Your Discord username"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={bugForm.control}
                      name="reporterDiscordId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#B9BBBE]">Your Discord ID</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-[#40444B] border-[#36393F] text-white"
                              placeholder="Your Discord ID"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={bugForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#B9BBBE]">Bug Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-[#40444B] border-[#36393F] text-white min-h-32"
                            placeholder="Describe the bug in detail. What were you trying to do? What happened instead?"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={bugForm.control}
                    name="stepsToReproduce"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#B9BBBE]">Steps to Reproduce</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-[#40444B] border-[#36393F] text-white min-h-32"
                            placeholder="List the exact steps needed to reproduce this bug. Be as specific as possible."
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={bugForm.control}
                    name="screenshotUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#B9BBBE]">Screenshot URL (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#40444B] border-[#36393F] text-white"
                            placeholder="Link to a screenshot image (e.g., from Discord, Imgur)"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                
                    )}
                  />
                  
                  <div className="flex justify-center my-4">
                    <ReCAPTCHA
                      sitekey="6LcD0D8rAAAAAOcECo801pLG4DK7Qm0avVHXpQLo"
                      onChange={handleRecaptchaChange}
                      theme="dark"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Bug Report'}
                  </Button>
                </form>
              </Form>
            </DiscordCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
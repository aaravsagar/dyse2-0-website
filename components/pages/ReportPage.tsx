'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
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
import { motion } from 'framer-motion';

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

export function ReportPage() {
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
    <div className="container px-4 mx-auto py-8 max-w-4xl">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Report Form</h1>
        <p className="text-xl text-gray-400">Help us maintain a safe and functional bot experience</p>
      </motion.div>
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-gray-800/50 rounded-xl p-1">
            <TabsTrigger 
              value="user" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <UserX className="w-4 h-4 mr-2" />
              Report User
            </TabsTrigger>
            <TabsTrigger 
              value="bug" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <Bug className="w-4 h-4 mr-2" />
              Report Bug
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="mt-8">
            <Card className="enhanced-card p-8">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                  <UserX className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Report a User</h2>
              </div>
              
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Form {...userForm}>
                <form onSubmit={userForm.handleSubmit(onUserReportSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={userForm.control}
                      name="reporterUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-red-400 font-medium">Your Discord Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
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
                          <FormLabel className="text-red-400 font-medium">Your Discord ID</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
                              placeholder="Your Discord ID"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={userForm.control}
                      name="targetUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-red-400 font-medium">Target Discord Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
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
                          <FormLabel className="text-red-400 font-medium">Target Discord ID</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
                              placeholder="Discord ID of the user you're reporting"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={userForm.control}
                      name="serverName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-red-400 font-medium">Server Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
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
                          <FormLabel className="text-red-400 font-medium">Server ID</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
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
                        <FormLabel className="text-red-400 font-medium">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-gray-800/50 border-gray-700 text-white min-h-32 rounded-lg"
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
                        <FormLabel className="text-red-400 font-medium">Screenshot URL (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
                            placeholder="Link to a screenshot image (e.g., from Discord, Imgur)"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-center my-6">
                    <ReCAPTCHA
                      sitekey="6LcD0D8rAAAAAOcECo801pLG4DK7Qm0avVHXpQLo"
                      onChange={handleRecaptchaChange}
                      theme="dark"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-primary font-bold text-white py-3 text-lg rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="bug" className="mt-8">
            <Card className="enhanced-card p-8">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                  <Bug className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Report a Bug</h2>
              </div>
              
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Form {...bugForm}>
                <form onSubmit={bugForm.handleSubmit(onBugReportSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={bugForm.control}
                      name="reporterUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-red-400 font-medium">Your Discord Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
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
                          <FormLabel className="text-red-400 font-medium">Your Discord ID</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
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
                        <FormLabel className="text-red-400 font-medium">Bug Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-gray-800/50 border-gray-700 text-white min-h-32 rounded-lg"
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
                        <FormLabel className="text-red-400 font-medium">Steps to Reproduce</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-gray-800/50 border-gray-700 text-white min-h-32 rounded-lg"
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
                        <FormLabel className="text-red-400 font-medium">Screenshot URL (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
                            placeholder="Link to a screenshot image (e.g., from Discord, Imgur)"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-center my-6">
                    <ReCAPTCHA
                      sitekey="6LcD0D8rAAAAAOcECo801pLG4DK7Qm0avVHXpQLo"
                      onChange={handleRecaptchaChange}
                      theme="dark"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-primary font-bold text-white py-3 text-lg rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Bug Report'}
                  </Button>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { submitFeedback } from '@/lib/firebase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, MessageSquare, Send } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';

const feedbackSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(10, { message: 'Please provide a detailed message (min 10 characters)' }),
  screenshotUrl: z.string().url().optional().or(z.literal('')),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export function FeedbackPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      screenshotUrl: '',
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await submitFeedback(data.name, data.email, data.message);

      if (result.success) {
        toast({
          title: 'Feedback Submitted',
          description: 'Thank you for your feedback!',
        });
        form.reset();
        setRecaptchaToken(null);
      } else {
        setError('Failed to submit feedback. Please try again.');
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Feedback Form</h1>
        <p className="text-xl text-gray-400">Share your thoughts and help us improve DYSE</p>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="enhanced-card p-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Send Us Your Feedback</h2>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-400 font-medium">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
                          placeholder="Your name"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-red-400 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
                          placeholder="Your email address"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-red-400 font-medium">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-gray-800/50 border-gray-700 text-white min-h-32 rounded-lg"
                        placeholder="Write your feedback here..."
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="screenshotUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-red-400 font-medium">Screenshot URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-800/50 border-gray-700 text-white rounded-lg"
                        placeholder="Link to a screenshot image (e.g., Discord, Imgur)"
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
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
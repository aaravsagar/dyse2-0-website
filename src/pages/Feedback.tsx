import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscordCard } from '@/components/ui/discord-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { submitFeedback } from '@/lib/firebase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, MessageSquare, User } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

const feedbackSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(10, { message: 'Please provide a detailed message (min 10 characters)' }),
  screenshotUrl: z.string().url().optional().or(z.literal('')),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function Feedback() {
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
      const result = await submitFeedback(
        data.name,
        data.email,
        data.message,
        data.screenshotUrl || undefined
      );

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
    <div className="container px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Feedback Form</h1>

      <div className="max-w-3xl mx-auto">
        <DiscordCard>
          <div className="flex items-center justify-center gap-4 mb-6">
            <MessageSquare className="w-10 h-10 text-[#F56565]" />
            <h2 className="text-2xl font-bold">Send Us Your Feedback</h2>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#F56565]">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#40444B] border-[#36393F] text-white"
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
                      <FormLabel className="text-[#F56565]">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="bg-[#40444B] border-[#36393F] text-white"
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
                    <FormLabel className="text-[#F56565]">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-[#40444B] border-[#36393F] text-white min-h-32"
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
                    <FormLabel className="text-[#F56565]">Screenshot URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#40444B] border-[#36393F] text-white"
                        placeholder="Link to a screenshot image (e.g., Discord, Imgur)"
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
                className="w-full bg-[#F56565] hover:bg-[#4752C4]"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </form>
          </Form>
        </DiscordCard>
      </div>
    </div>
  );
}

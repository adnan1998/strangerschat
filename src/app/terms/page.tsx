import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SafetyFooter } from "@/components/safety-notice";
import { Shield, AlertTriangle, Ban, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              AnonChat
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Terms of Service
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <Button asChild variant="outline">
            <Link href="/">← Back to Chat</Link>
          </Button>
        </div>

        {/* Terms Content */}
        <div className="space-y-6">
          {/* Acceptance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                By using AnonChat, you agree to these Terms of Service. If you do not agree to these terms, 
                please do not use our service.
              </p>
              <p>
                AnonChat is intended for users who are 18 years of age or older. By using this service, 
                you confirm that you are at least 18 years old.
              </p>
            </CardContent>
          </Card>

          {/* Prohibited Content */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Ban className="h-5 w-5" />
                Prohibited Content & Behavior
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">
                  The following content is strictly prohibited:
                </h4>
                <ul className="space-y-2 text-red-700 dark:text-red-300">
                  <li>• <strong>Sexual or adult content</strong> - No explicit, suggestive, or sexual material</li>
                  <li>• <strong>Dating requests</strong> - This is not a dating platform</li>
                  <li>• <strong>NSFW content</strong> - Keep all conversations appropriate</li>
                  <li>• <strong>Photo sharing</strong> - No sharing of personal photos or images</li>
                  <li>• <strong>Contact information</strong> - No sharing of phone numbers, social media, or personal details</li>
                  <li>• <strong>Harassment or abuse</strong> - Respect all users</li>
                  <li>• <strong>Hate speech or discrimination</strong> - No offensive language based on identity</li>
                  <li>• <strong>Spam or excessive messaging</strong> - Keep conversations meaningful</li>
                  <li>• <strong>Illegal activities</strong> - No discussion of illegal content or activities</li>
                  <li>• <strong>Minors</strong> - No content involving or targeting users under 18</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Shield className="h-5 w-5" />
                Acceptable Use
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                  AnonChat is designed for:
                </h4>
                <ul className="space-y-2 text-green-700 dark:text-green-300">
                  <li>• Friendly, casual conversations</li>
                  <li>• Discussing hobbies, interests, and general topics</li>
                  <li>• Sharing thoughts about movies, music, books, and entertainment</li>
                  <li>• Talking about technology, gaming, and current events</li>
                  <li>• Respectful discussions about culture and travel</li>
                  <li>• Anonymous support and positive interactions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Enforcement */}
          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="h-5 w-5" />
                Rule Enforcement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Violations of these rules will result in:</strong>
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Immediate removal from the chat</li>
                <li>• Temporary or permanent ban from the service</li>
                <li>• Blocking of access to all AnonChat features</li>
              </ul>
              <p>
                We reserve the right to remove any user or content that violates these terms without prior notice.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AnonChat provides anonymous text-based chat rooms for users to engage in friendly conversations. 
                The service is provided "as is" without warranties of any kind.
              </p>
              <p>
                We do not store chat logs or personal information. All conversations are temporary and 
                automatically deleted when users leave the chat.
              </p>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Your privacy is important to us. We do not collect, store, or track personal information. 
                For detailed information about our privacy practices, please see our 
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800 ml-1">
                  Privacy Policy
                </Link>.
              </p>
            </CardContent>
          </Card>

          {/* Reporting */}
          <Card>
            <CardHeader>
              <CardTitle>Reporting Violations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you encounter content or behavior that violates these terms, please use the report button 
                available in each message. We review all reports and take appropriate action.
              </p>
            </CardContent>
          </Card>

          {/* Changes */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We reserve the right to update these Terms of Service at any time. Changes will be effective 
                immediately upon posting. Continued use of the service constitutes acceptance of updated terms.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <SafetyFooter />
        </div>
      </div>
    </div>
  );
}
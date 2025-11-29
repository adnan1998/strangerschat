import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SafetyFooter } from "@/components/safety-notice";
import { Shield, Eye, Lock, Database, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
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
            Privacy Policy
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

        {/* Privacy Content */}
        <div className="space-y-6">
          {/* Overview */}
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Shield className="h-5 w-5" />
                Privacy Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  Your privacy is our priority:
                </h4>
                <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                  <li>• <strong>No chat logs stored</strong> - Messages are not saved or recorded</li>
                  <li>• <strong>No personal data collected</strong> - We don't ask for or store personal information</li>
                  <li>• <strong>Minimal cookies</strong> - Only essential cookies for functionality</li>
                  <li>• <strong>Anonymous by design</strong> - True anonymous chatting experience</li>
                  <li>• <strong>No tracking</strong> - We don't track your behavior or conversations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-gray-600" />
                What Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Information We DO NOT Collect:</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                    <li>• Real names or personal identities</li>
                    <li>• Email addresses or phone numbers</li>
                    <li>• IP addresses or location data</li>
                    <li>• Chat history or message logs</li>
                    <li>• Personal photos or files</li>
                    <li>• Device information or browser fingerprints</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Temporary Information We Process:</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                    <li>• Anonymous usernames (chosen by you, temporary)</li>
                    <li>• Basic age confirmation (18+ verification only)</li>
                    <li>• Gender selection (for appropriate chat room assignment)</li>
                    <li>• Real-time message delivery (not stored)</li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <em>This information is deleted immediately when you leave the chat.</em>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                How We Use Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The minimal information we process is used solely for:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Chat functionality:</strong> Enabling real-time anonymous conversations</li>
                <li>• <strong>Safety measures:</strong> Basic content filtering to maintain a safe environment</li>
                <li>• <strong>User experience:</strong> Matching users with appropriate chat rooms</li>
                <li>• <strong>Age verification:</strong> Ensuring all users are 18+ as required</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We do not use any information for advertising, marketing, profiling, or commercial purposes.
              </p>
            </CardContent>
          </Card>

          {/* Data Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                Data Storage & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                  Data Protection Measures:
                </h4>
                <ul className="space-y-2 text-green-700 dark:text-green-300">
                  <li>• <strong>No permanent storage:</strong> Messages are never saved to our servers</li>
                  <li>• <strong>Temporary session data:</strong> User information exists only during active chat sessions</li>
                  <li>• <strong>Automatic deletion:</strong> All data is automatically removed when you disconnect</li>
                  <li>• <strong>Encrypted connections:</strong> All communications use HTTPS encryption</li>
                  <li>• <strong>No backups:</strong> We don't create backups of chat content</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies & Local Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AnonChat uses minimal cookies and local storage for essential functionality only:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Session cookies:</strong> To maintain your chat session while active</li>
                <li>• <strong>Preference storage:</strong> To remember your chosen username (locally only)</li>
                <li>• <strong>Security cookies:</strong> For basic security measures</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We do not use advertising cookies, tracking cookies, or analytics cookies.
              </p>
            </CardContent>
          </Card>

          {/* Third Parties */}
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AnonChat uses Firebase for real-time chat functionality. Firebase's privacy practices apply to the technical infrastructure:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Messages are transmitted through Firebase but not stored permanently</li>
                <li>• Firebase may process data according to their privacy policy</li>
                <li>• We do not share any user data with third parties for marketing or advertising</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View Firebase's privacy policy at: https://firebase.google.com/support/privacy
              </p>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights & Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Because we don't store personal data, you have complete control:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Complete anonymity:</strong> No account registration required</li>
                <li>• <strong>Instant deletion:</strong> All your data is removed when you leave</li>
                <li>• <strong>No data requests needed:</strong> There's no personal data to request or delete</li>
                <li>• <strong>Full control:</strong> You can stop using the service at any time without consequences</li>
              </ul>
            </CardContent>
          </Card>

          {/* Age Requirements */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600">Age Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-red-800 dark:text-red-200">
                  <strong>AnonChat is only for users 18 years and older.</strong> We do not knowingly collect any information from users under 18. If we become aware of any underage users, they will be immediately removed from the service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may update this Privacy Policy occasionally. Any changes will be posted on this page with an updated date. Since we don't collect contact information, we cannot notify users directly of changes.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Questions or Concerns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please review our 
                <Link href="/terms" className="text-blue-600 hover:text-blue-800 ml-1">
                  Terms of Service
                </Link> for additional information about how we operate our service.
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
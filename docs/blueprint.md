# **App Name**: AnonChat

## Core Features:

- Anonymous Authentication: Allows users to log in with a unique username, gender, and age (18+), with session persistence until logout or inactivity.
- Global Chat: A public lobby where all online users can send text-only messages accessible from the sidebar.
- Private 1-to-1 Chats: Enables users to open private chat pages by clicking on usernames in the sidebar or global chat, supporting text messages and unread message counters. Private chats do not persist after the session ends.
- Active Users List: Displays a list of online users in the sidebar, showing username, gender icon, and age, with a gender filter (Male/Female/All) and the ability to open private chats by clicking on a user.
- Session Management: Tracks user sessions, automatically logging out users inactive for 3 minutes, and ensuring usernames are freed upon logout or inactivity.

## Style Guidelines:

- Primary color: Strong, contemporary purple (#9400D3) for user engagement and anonymity.
- Background color: Light gray (#E6E6FA) to provide a clean, distraction-free chat environment.
- Accent color: A vibrant light-blue (#00FFFF) to highlight interactive elements like user names and chat bubbles.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a modern, neutral feel.
- Full-screen layout with a left sidebar for profile info, user list, filters, global chat, and logout button. Main panel displays chat messages with a message input box and scrollable area. Responsive design for desktop, tablet, and mobile.
- Subtle transition animations for opening and closing private chats, with visual feedback for sent messages.
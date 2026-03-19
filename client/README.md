# Birthmark - Automated Birthday Wishes

Birthmark is a web automation tool designed to send birthday wishes to your loved ones automatically. Never miss a chance to celebrate the special moments of those who matter most.

## Features

- **Contact Management**: Add and organize all your loved ones' birthdays in one place
- **Automated Messages**: Personalized birthday wishes sent automatically on the day
- **Message Templates**: Create custom message templates for different relationships
- **Smart Reminders**: Get notified about upcoming birthdays
- **Theme Support**: Light and dark mode for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Getting Started

### Installation

1. Clone the repository or download the project files
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Creating an Account

1. Click "Get Started" on the landing page
2. Fill in your email, password, and name
3. Click "Create Account"
4. You'll be redirected to your dashboard

### Adding Contacts

1. Go to the "Contacts" page from the dashboard
2. Click "Add Contact"
3. Fill in the contact details:
   - Name
   - Relationship (Friend, Family, Colleague, etc.)
   - Date of Birth
   - Email (optional)
   - Phone (optional)
   - Custom Message (optional)
4. Click "Save Contact"

### Creating Message Templates

1. Navigate to "Message Templates"
2. Click "New Template"
3. Enter a template name and your birthday message
4. Click "Save Template"
5. Messages will be sent using your templates on birthdays

### Viewing Upcoming Birthdays

- **Dashboard**: See birthdays in the next 7 days
- **Birthdays Page**: View all upcoming birthdays throughout the year organized by month

## Architecture

### Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API with hooks
- **Form Validation**: Zod
- **Data Storage**: localStorage (browser-based)
- **Theme**: next-themes with dark/light support

### Project Structure

```
app/
├── dashboard/          # Protected dashboard routes
│   ├── contacts/      # Contact management
│   ├── birthdays/     # Birthday calendar view
│   ├── messages/      # Message templates
│   └── settings/      # User settings
├── login/             # Authentication pages
├── signup/
├── privacy/           # Legal pages
└── terms/

components/
├── auth/              # Authentication components
├── dashboard/         # Dashboard-specific components
├── landing/           # Landing page sections
├── layout/            # Layout components
└── ui/                # Reusable UI components

contexts/
├── auth-context.tsx   # Authentication state
└── data-context.tsx   # Contacts & templates data

lib/
└── schemas.ts         # Zod validation schemas
```

## Key Features Explained

### Authentication
- Email/password based authentication
- Session management with localStorage
- Protected dashboard routes
- Automatic redirection to login for unauthorized access

### Data Management
- All data stored in browser localStorage
- Data is user-specific and isolated by user ID
- Automatic persistence across sessions
- Easy data backup through browser data export

### Upcoming Birthdays Calculation
- Automatic detection of upcoming birthdays (next 30 days)
- Age calculation based on date of birth
- Smart handling of leap years
- Month-based organization in birthday view

### Message Templates
- Default template provided for all users
- Create unlimited custom templates
- Use templates for specific contacts or globally
- Edit and delete custom templates

## Demo Account

For testing purposes, you can create an account with:
- Email: test@example.com
- Password: Test123456
- Name: Test User

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Theme Colors

The application uses CSS variables for theming. Edit `app/globals.css` to customize colors:

```css
:root {
  --primary: oklch(0.5 0.15 210);  /* Primary brand color */
  --accent: oklch(0.48 0.15 180);   /* Accent color */
  /* ... other colors ... */
}

.dark {
  --primary: oklch(0.65 0.13 210);
  --accent: oklch(0.68 0.14 180);
  /* ... other colors ... */
}
```

### Adding New Features

1. Add new routes in `app/dashboard/` or `app/`
2. Create components in `components/`
3. Update context if needed in `contexts/`
4. Use validation schemas from `lib/schemas.ts`

## Performance Optimization

- Client-side rendering with Next.js App Router
- Image optimization with Next.js Image component
- CSS-in-JS with Tailwind for minimal bundle size
- Lazy loading of dashboard components
- Efficient event handlers and memoization

## Future Enhancements

- Backend API integration for persistent storage
- Email notification service integration
- SMS message support
- Calendar integrations (Google Calendar, Outlook)
- Social media birthday greetings
- Gift suggestions and reminders
- Birthday photo gallery
- User analytics dashboard

## Privacy & Security

- All data stored locally in your browser
- No server-side data collection (frontend-only)
- HTTPS recommended for production deployment
- Password stored in localStorage (use secure passwords)

**Note**: For production use, implement:
- Backend authentication with secure session management
- Encrypted password storage (bcrypt/argon2)
- Database storage (PostgreSQL, MongoDB, etc.)
- Data encryption in transit and at rest

## Contributing

Feel free to fork this project and submit pull requests for improvements.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

Made with care to help you remember and celebrate the birthdays that matter.

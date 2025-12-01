# Client Intake Form

## Overview
A comprehensive, multi-step client intake questionnaire for Zoomies and Purrs NYC pet sitting services.

## Access
The intake form is **NOT linked** from the main website. It's only accessible via direct URL:

```
https://yourdomain.com/intake-form.html
```

Or locally:
```
file:///path/to/pet website/intake-form.html
```

## Features

### 🎯 User Experience
- **9 organized sections** to avoid overwhelming users
- **Encouraging progress indicator** with fun messages and emojis
- **Section-by-section navigation** with clear Previous/Next buttons
- **Visual section numbers** that turn green when completed
- **Auto-save** - Saves draft every 30 seconds to browser localStorage
- **Draft recovery** - Offers to restore saved data if user returns
- **Form validation** - Ensures required fields are filled before proceeding
- **Mobile-optimized** - Fully responsive for phones and tablets

### 🔐 Secure Sharing System
- **Unique link generation** - Each submission gets a private, unique URL
- **Pet sitter view page** - Clean, printable information sheet
- **Privacy protected** - Each pet has their own secure link
- **No cross-access** - Sitters can only view the pet they're assigned to
- **One-click copy** - Easy link sharing with sitters/walkers

### 📱 Mobile Friendly
- Single column layout on mobile
- Large touch-friendly buttons
- Easy-to-read form fields
- Optimized spacing and font sizes

### ♿ Accessibility
- Clear labels for all fields
- High contrast design
- Keyboard navigation (Arrow keys to navigate sections)
- Proper focus states
- Screen reader friendly

### 🎨 Design
- Matches main website color scheme (#004aad blue, white, black)
- Clean, professional layout
- Smooth animations between sections
- Clear visual hierarchy

## Form Sections

1. **Pet Parent Information**
   - Name, contact info, emergency contact

2. **Service Requested**
   - Type of service, dates, and times

3. **Pet Information**
   - Basic pet details (name, breed, age, etc.)

4. **Personality and Behavior**
   - Temperament, triggers, fears, social behavior

5. **Daily Routine**
   - Feeding, potty, exercise, commands

6. **Medical Information**
   - Vet info, medications, allergies, conditions

7. **Home & Access Information**
   - Entry instructions, alarm codes, security

8. **Supplies Provided**
   - Food, treats, cleaning supplies, equipment

9. **Additional Preferences**
   - Communication preferences, special requests

## Technical Details

### Files
**Intake Form:**
- `intake-form.html` - Main form structure
- `intake-styles.css` - Form styling
- `intake-script.js` - Form functionality

**Viewing Page (for sitters/walkers):**
- `view-pet-info.html` - Pet information display page
- `view-styles.css` - Viewing page styling
- `view-script.js` - Data loading and display

### Data Handling

Currently, the form:
- Generates unique ID for each submission (e.g., `pet_1234567890_abc123def`)
- Saves data to localStorage with unique ID
- Creates shareable link: `view-pet-info.html?id=pet_1234567890_abc123def`
- Displays link with one-click copy button
- Saves drafts to localStorage for recovery

### How It Works

1. **Client fills out form** → Multi-step intake questionnaire
2. **Form submitted** → Generates unique ID and creates secure link
3. **Owner receives link** → Copy and share with assigned sitter/walker
4. **Sitter opens link** → Views only that specific pet's information
5. **No cross-access** → Each link only shows its assigned pet's data

### Integration Options

To integrate with your backend, modify `intake-script.js` around line 150:

```javascript
// Uncomment and configure this section:
fetch('/api/intake-form', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    // Show success message
})
.catch((error) => {
    console.error('Error:', error);
    alert('There was an error submitting the form. Please try again.');
});
```

### Alternative Integration Methods

1. **Email via FormSpree**
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

2. **Google Forms** - Export data to Google Sheets

3. **Netlify Forms** - Add `netlify` attribute to form tag

4. **Custom Backend** - Send to your own API endpoint

## Features Included

✅ Multi-step navigation
✅ Encouraging progress indicator (not intimidating)
✅ Auto-save drafts
✅ Form validation
✅ Mobile responsive
✅ Keyboard navigation
✅ Phone number formatting
✅ Unique link generation
✅ Secure viewing page for sitters
✅ One-click link copying
✅ Printable pet info sheet
✅ Privacy protection (no cross-access)
✅ Clean, professional design
✅ Not linked from main site (private access)

## Customization

### Colors
Edit `intake-styles.css` CSS variables:
```css
:root {
    --primary-color: #004aad;
    --dark-color: #000000;
    --white: #ffffff;
}
```

### Sections
To add/remove sections:
1. Update `totalSections` in `intake-script.js`
2. Add/remove section HTML in `intake-form.html`
3. Update progress bar calculation

## Workflow

### For Pet Owners:
1. Receive intake form link from you
2. Fill out comprehensive questionnaire
3. Submit form and receive unique sharing link
4. Copy link and send to their assigned pet sitter/walker

### For Pet Sitters/Walkers:
1. Receive unique link from pet owner
2. Open link to view complete pet information
3. Print or save for reference during visits
4. Cannot access other pets' information

### For You (Business Owner):
1. Share intake form link: `intake-form.html`
2. Each submission generates unique view link
3. Track submissions via unique IDs
4. Privacy is automatically maintained

The form is intentionally **not** in your site navigation to keep it private and reduce spam submissions.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Note
Since this form collects sensitive information:
- Use HTTPS in production
- Implement CSRF protection
- Sanitize all inputs on backend
- Store data securely
- Comply with privacy regulations (GDPR, CCPA)

---

Built with ❤️ for Zoomies and Purrs NYC


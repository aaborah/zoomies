# Sitter/Walker Application Form System

## Overview
This is a multi-step application form for potential pet sitters and walkers to apply to join the Zoomies & Purrs NYC team.

## Files
- `sitter-intake-form.html` - Main application form page
- `sitter-intake-script.js` - Form functionality (navigation, validation, auto-save)
- `view-sitter-application.html` - Secure viewing page for submitted applications
- `view-sitter-script.js` - Script to load and display application data
- `intake-styles.css` - Shared styling with client intake form
- `view-styles.css` - Shared styling for viewing pages

## Features

### 1. Multi-Step Form (3 Sections)
- **Section 1: Basic Information**
  - Full name, phone, email with validation
  - NYC neighborhood dropdown (Brooklyn, Queens, Manhattan - alphabetically organized)
  - Photo upload
  - Referral source

- **Section 2: Availability**
  - Days and hours available
  - Last minute request capability
  - Overnight sitting availability
  - Service preference (dogs, cats, or both)

- **Section 3: Experience**
  - Years of professional pet care experience
  - Types of services performed
  - Species/breeds comfortable with
  - Size limits
  - Experience with reactive/nervous animals
  - Approach to pet care
  - Home entry experience
  - Camera comfort level
  - Update frequency preference

### 2. Progress Indicator
- Visual percentage display
- Motivational messages that change based on progress
- Animated emoji that changes per section
- Non-intrusive design to encourage completion

### 3. Form Validation
- Required field validation
- **Email validation with regex pattern check**
- File upload validation (photo required)
- Clear error messaging
- Focus on first invalid field

### 4. Auto-Save & Draft Recovery
- Automatically saves form data to localStorage as user types
- On page reload, prompts user to continue with saved draft
- Clears draft after successful submission

### 5. Unique Application ID
- Generates unique ID for each submission (format: SITTER-TIMESTAMP-RANDOM)
- Displayed to applicant after submission
- Stored with application data

### 6. Secure Viewing Page
- After submission, applicant receives a unique viewing link
- Link format: `view-sitter-application.html?id=SITTER-XXXXX-XXXXX`
- Only someone with the exact link can view the application
- Shows all application details in organized sections
- Quick reference card at top with key information
- Color-coded sections for easy navigation

## Data Storage

### Current Implementation (Client-Side)
Data is stored in browser's localStorage with key format:
```
sitterApplication_SITTER-XXXXX-XXXXX
```

### Data Structure
```json
{
  "fullName": "Jane Smith",
  "phone": "(555) 123-4567",
  "email": "jane@example.com",
  "neighborhood": "Park Slope",
  "photoFileName": "jane-photo.jpg",
  "referral": "Friend",
  "daysHours": "Monday-Friday 9am-5pm",
  "lastMinute": "yes",
  "overnight": "yes",
  "servicePreference": "both",
  "yearsExperience": "3 years",
  "serviceTypes": "Dog walks, drop ins, overnights",
  "comfortableWith": "All breeds of dogs and cats",
  "sizeLimits": "No size limits",
  "reactiveAnimals": "Yes, I have experience...",
  "goodFit": "I am patient and gentle...",
  "homeExperience": "yes",
  "cameras": "yes",
  "updates": "yes",
  "applicationId": "SITTER-XXXXX-XXXXX",
  "submittedAt": "2024-01-01T12:00:00.000Z"
}
```

## NYC Neighborhoods Included

### Brooklyn (36 neighborhoods)
Bay Ridge, Bedford-Stuyvesant, Bensonhurst, Boerum Hill, Borough Park, Brighton Beach, Brooklyn Heights, Bushwick, Canarsie, Carroll Gardens, Clinton Hill, Cobble Hill, Coney Island, Crown Heights, Ditmas Park, Downtown Brooklyn, DUMBO, Dyker Heights, East Flatbush, East New York, Flatbush, Flatlands, Fort Greene, Gowanus, Gravesend, Greenpoint, Kensington, Midwood, Mill Basin, Park Slope, Prospect Heights, Prospect Lefferts Gardens, Red Hook, Sheepshead Bay, Sunset Park, Williamsburg, Windsor Terrace

### Manhattan (32 neighborhoods)
Battery Park City, Carnegie Hill, Chelsea, Chinatown, East Harlem, East Village, Financial District, Flatiron District, Gramercy Park, Greenwich Village, Harlem, Hell's Kitchen, Hudson Yards, Inwood, Kips Bay, Little Italy, Lower East Side, Midtown East, Midtown West, Morningside Heights, Murray Hill, NoHo, Nolita, Roosevelt Island, SoHo, Stuyvesant Town, Tribeca, Two Bridges, Upper East Side, Upper West Side, Washington Heights, West Village

### Queens (29 neighborhoods)
Astoria, Bayside, Bellerose, Briarwood, College Point, Corona, Douglaston, Elmhurst, Flushing, Forest Hills, Fresh Meadows, Glendale, Howard Beach, Jackson Heights, Jamaica, Jamaica Estates, Kew Gardens, Long Island City, Maspeth, Middle Village, Ozone Park, Rego Park, Richmond Hill, Ridgewood, Rockaway Beach, Sunnyside, Whitestone, Woodhaven, Woodside

## Email Validation
The form includes real-time email validation using a regex pattern:
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```
This ensures:
- No spaces in the email
- Contains @ symbol
- Has domain name after @
- Has extension after domain

## Photo Upload
- Accepts image files only (`accept="image/*"`)
- Required field
- In production, would need backend to handle actual file upload
- Currently stores filename only in localStorage

## Future Enhancements

### Recommended for Production
1. **Backend Integration**
   - Send form data to server API
   - Proper file upload handling
   - Database storage
   - Admin dashboard to review applications

2. **Email Notifications**
   - Send confirmation email to applicant
   - Notify admin of new applications

3. **Application Review System**
   - Create admin interface to view/manage applications
   - Status tracking (pending, reviewed, approved, rejected)
   - Communication system with applicants

4. **Security**
   - CAPTCHA to prevent spam
   - Rate limiting
   - Server-side validation
   - Secure file upload with virus scanning

5. **Additional Features**
   - Resume/CV upload
   - References section
   - Background check integration
   - Interview scheduling

## Usage

### Accessing the Form
The form is designed to be accessed via direct link only (not linked from main website). Share the URL:
```
https://yourdomain.com/sitter-intake-form.html
```

### Testing Locally
1. Open `sitter-intake-form.html` in a browser
2. Fill out the form
3. After submission, you'll receive:
   - A unique Application ID
   - A secure viewing link
4. Click the viewing link or copy and paste it to view the application
5. Check browser console for localStorage data
6. Use browser DevTools > Application > Local Storage to view stored data

### Accessing the Viewing Page
After an applicant submits their application, they receive a unique link:
```
https://yourdomain.com/view-sitter-application.html?id=SITTER-XXXXX-XXXXX
```

This link can be:
- Shared with the administrator for review
- Bookmarked by the applicant for reference
- Copied and pasted to share via email or text

### Retrieving Submitted Applications
To view stored applications in browser console:
```javascript
// Get all sitter applications
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith('sitterApplication_')) {
    console.log(key, JSON.parse(localStorage.getItem(key)));
  }
}
```

To generate a viewing link manually if you have an application ID:
```
view-sitter-application.html?id=YOUR-APPLICATION-ID
```

## Support
For questions or issues, contact: zoomiesandpurrs.nyc@gmail.com


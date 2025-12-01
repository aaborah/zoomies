# Airtable Integration Setup Guide

## Overview
This guide will help you set up Airtable as the backend storage for your Zoomies & Purrs intake forms. Once configured, all form submissions will be stored in Airtable, enabling persistent data storage, email notifications, and secure viewing pages.

## Prerequisites
- A computer with internet access
- The intake form website files
- Basic understanding of copying/pasting text

## Estimated Setup Time
30-45 minutes for first-time setup

---

## Part 1: Create Airtable Account (5 minutes)

### Step 1: Sign Up
1. Go to [https://airtable.com/signup](https://airtable.com/signup)
2. Sign up using your email (zoomiesandpurrs.nyc@gmail.com recommended)
3. Verify your email address
4. Choose the **Free** plan when prompted

### Step 2: Create a New Base
1. Once logged in, click **"Add a base"** or **"Start from scratch"**
2. Name your base: **"Zoomies & Purrs Intake Forms"**
3. Choose an icon (🐕 or 🐱 recommended)

---

## Part 2: Set Up Tables and Fields (15-20 minutes)

### Table 1: Clients (Pet Owner Intake Forms)

1. **Rename the default table:**
   - Click on the table name at the top (likely "Table 1")
   - Rename it to: **Clients**

2. **Add the following fields:**
   Click the **+** button to add each field. Use **Single line text** for most fields unless specified.

   **Basic Information:**
   - `submissionId` (Single line text) - PRIMARY KEY
   - `submittedAt` (Date with time)
   - `parentName` (Single line text)
   - `phone` (Phone number)
   - `email` (Email)
   - `address` (Long text)
   - `emergencyName` (Single line text)
   - `emergencyPhone` (Phone number)

   **Service Information:**
   - `serviceTypes` (Long text)
   - `preferredDates` (Long text)

   **Pet Information:**
   - `petName` (Single line text)
   - `species` (Single select: Dog, Cat)
   - `breed` (Single line text)
   - `age` (Single line text)
   - `sex` (Single select: Male, Female)
   - `spayedNeutered` (Single select: Yes, No)
   - `microchipped` (Single select: Yes, No)

   **Personality & Behavior:**
   - `temperament` (Long text)
   - `friendlyWithPeople` (Long text)
   - `triggers` (Long text)
   - `loudNoises` (Long text)
   - `goodWithAnimals` (Long text)
   - `animalConflicts` (Long text)
   - `resourceGuarding` (Long text)
   - `aggression` (Long text)
   - `separationAnxiety` (Long text)
   - `favoriteToys` (Long text)

   **Daily Routine:**
   - `feedingSchedule` (Long text)
   - `foodLocation` (Long text)
   - `treats` (Long text)
   - `pottyRoutine` (Long text)
   - `walkingRoute` (Long text)
   - `litterBox` (Long text)
   - `exerciseSchedule` (Long text)
   - `offLeashIndoor` (Long text)
   - `commands` (Long text)
   - `stressSoothers` (Long text)

   **Medical Information:**
   - `vetName` (Single line text)
   - `vetPhone` (Phone number)
   - `medications` (Long text)
   - `allergies` (Long text)
   - `conditions` (Long text)
   - `vaccines` (Long text)
   - `emergencyAuth` (Single select: Yes, No)
   - `quirks` (Long text)

   **Home & Access:**
   - `homeEntry` (Long text)
   - `alarmCode` (Single line text)
   - `cameras` (Single select: Yes, No)
   - `cameraLocations` (Long text)
   - `offLimitsRooms` (Long text)
   - `wifi` (Long text)
   - `wasteDisposal` (Long text)
   - `cleaningEquipment` (Long text)

   **Supplies:**
   - `foodAmount` (Long text)
   - `treatSupplies` (Long text)
   - `litterPads` (Long text)
   - `cleaningSupplies` (Long text)
   - `leashHarness` (Long text)
   - `specialTools` (Long text)
   - `lowSupplyNotify` (Long text)

   **Preferences:**
   - `updateFrequency` (Long text)
   - `commPlatform` (Long text)
   - `nearbyPotty` (Long text)
   - `weatherWalks` (Long text)
   - `hidingSpots` (Long text)
   - `householdRoutines` (Long text)
   - `culturalPreferences` (Long text)
   - `additionalInfo` (Long text)

### Table 2: Sitters (Sitter/Walker Applications)

1. **Create a new table:**
   - Click the **+** button next to your "Clients" table tab
   - Name it: **Sitters**

2. **Add the following fields:**

   **Basic Information:**
   - `applicationId` (Single line text) - PRIMARY KEY
   - `submittedAt` (Date with time)
   - `fullName` (Single line text)
   - `phone` (Phone number)
   - `email` (Email)
   - `neighborhood` (Single line text)
   - `photoFileName` (Single line text)
   - `referral` (Single line text)

   **Availability:**
   - `daysHours` (Long text)
   - `lastMinute` (Single select: yes, sometimes, no)
   - `overnight` (Single select: yes, no, maybe)
   - `servicePreference` (Single select: dogs, cats, both, nopreference)

   **Experience:**
   - `yearsExperience` (Single line text)
   - `serviceTypes` (Long text)
   - `comfortableWith` (Long text)
   - `sizeLimits` (Single line text)
   - `reactiveAnimals` (Long text)
   - `goodFit` (Long text)
   - `homeExperience` (Single select: yes, some, no)
   - `cameras` (Single select: yes, no)
   - `updates` (Single select: yes, sometimes, after)

---

## Part 3: Get Your API Credentials (10 minutes)

### Step 1: Get Your Base ID

1. Go to [https://airtable.com/api](https://airtable.com/api)
2. Click on your **"Zoomies & Purrs Intake Forms"** base
3. In the introduction section, you'll see text like:
   ```
   The ID of this base is appXXXXXXXXXXXXXX
   ```
4. **Copy this Base ID** (starts with `app`) - you'll need it later

### Step 2: Create a Personal Access Token

1. Go to [https://airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click **"Create new token"**
3. Name it: **"Intake Forms Integration"**
4. Under **Scopes**, add:
   - `data.records:read`
   - `data.records:write`
5. Under **Access**, click **"Add a base"**
   - Select your **"Zoomies & Purrs Intake Forms"** base
6. Click **"Create token"**
7. **IMPORTANT:** Copy the token immediately and save it somewhere secure (you won't be able to see it again!)
   - It will look like: `patXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

---

## Part 4: Configure Your Website Files (5 minutes)

### Step 1: Update airtable-config.js

1. Open the file: `airtable-config.js`
2. Find these lines:
   ```javascript
   personalAccessToken: 'YOUR_PERSONAL_ACCESS_TOKEN_HERE',
   baseId: 'YOUR_BASE_ID_HERE',
   ```
3. Replace with your actual credentials:
   ```javascript
   personalAccessToken: 'patXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
   baseId: 'appXXXXXXXXXXXXXX',
   ```
4. Save the file

### Step 2: Verify Table Names

In the same file, confirm these match your Airtable table names:
```javascript
tables: {
    clients: 'Clients',
    sitters: 'Sitters'
}
```

### Step 3: Upload Files to Your Website

Upload these files to your web hosting:
- `airtable-config.js` (newly configured)
- `intake-form.html` (updated)
- `intake-script.js` (updated)
- `sitter-intake-form.html` (updated)
- `sitter-intake-script.js` (updated)
- `view-pet-info.html` (updated)
- `view-script.js` (updated)
- `view-sitter-application.html` (updated)
- `view-sitter-script.js` (updated)

---

## Part 5: Set Up Email Notifications (10 minutes)

### For Client Intake Forms:

1. In Airtable, go to your **Clients** table
2. Click **Automations** (top right, lightning bolt icon)
3. Click **"Create automation"**
4. Name it: **"New Client Intake Notification"**
5. **Trigger:**
   - Select **"When record created"**
   - Choose table: **Clients**
6. **Action:**
   - Click **"+ Add action"**
   - Select **"Send email"**
   - **To:** Your email (zoomiesandpurrs.nyc@gmail.com)
   - **Subject:** `New Client Intake: {petName}`
   - **Message:**
     ```
     New client intake form received!
     
     Pet Owner: {parentName}
     Pet Name: {petName}
     Phone: {phone}
     Email: {email}
     Service Requested: {serviceTypes}
     
     Submission ID: {submissionId}
     Submitted: {submittedAt}
     
     View full details in Airtable.
     ```
   - Click fields to insert them (they'll appear in curly braces)
7. Click **"Turn on"** (top right)

### For Sitter Applications:

1. Create another automation
2. Name it: **"New Sitter Application Notification"**
3. **Trigger:**
   - **"When record created"**
   - Table: **Sitters**
4. **Action:**
   - **"Send email"**
   - **To:** Your email
   - **Subject:** `New Sitter Application: {fullName}`
   - **Message:**
     ```
     New sitter/walker application received!
     
     Name: {fullName}
     Phone: {phone}
     Email: {email}
     Neighborhood: {neighborhood}
     Experience: {yearsExperience}
     
     Application ID: {applicationId}
     Submitted: {submittedAt}
     
     View full details in Airtable.
     ```
5. Click **"Turn on"**

---

## Part 6: Testing (5 minutes)

### Test Client Intake Form:

1. Go to your website's intake form page
2. Fill out a test submission (use fake data)
3. Submit the form
4. Check:
   - ✅ You see a success message with a viewing link
   - ✅ The data appears in your Airtable "Clients" table
   - ✅ You receive an email notification
   - ✅ The viewing link works and displays the data

### Test Sitter Application Form:

1. Go to your sitter application form page
2. Fill out a test application (use fake data)
3. Submit the form
4. Check:
   - ✅ You see a success message with application ID and link
   - ✅ The data appears in your Airtable "Sitters" table
   - ✅ You receive an email notification
   - ✅ The viewing link works and displays the data

### If Testing Fails:

**Check browser console for errors:**
- Right-click on page → "Inspect" → "Console" tab
- Look for error messages

**Common issues:**
- API token not configured correctly in `airtable-config.js`
- Base ID incorrect
- Table names don't match
- Field names in Airtable don't match field names in forms
- Files not uploaded to web server

---

## Part 7: Managing Data

### Viewing Submissions in Airtable:

1. Log in to Airtable
2. Open your **"Zoomies & Purrs Intake Forms"** base
3. Switch between **Clients** and **Sitters** tables using tabs
4. Click any row to see full details

### Creating Views:

Create custom views to organize your data:

**Examples:**
- "This Week" - Filter by date received in last 7 days
- "Dog Walking Only" - Filter service types
- "By Neighborhood" - Group sitters by neighborhood
- "Pending Review" - Add a status field to track review progress

### Searching:

Use the search bar at the top to find specific submissions by:
- Pet name
- Owner name
- Phone number
- Submission ID

---

## Security Best Practices

### Protect Your API Token:

⚠️ **IMPORTANT:**
- Never commit `airtable-config.js` with real credentials to public GitHub repositories
- Never share your Personal Access Token with anyone
- If token is compromised, immediately revoke it and create a new one at [https://airtable.com/account](https://airtable.com/account)

### Viewing Page Security:

- Viewing pages are "secure through obscurity" - only those with the exact submission ID can view data
- Don't share viewing links publicly
- Consider implementing additional authentication for production use

---

## Troubleshooting

### Forms submit but data not in Airtable:
- Check browser console for errors
- Verify API token and Base ID in `airtable-config.js`
- Ensure table names match exactly (case-sensitive)
- Data still saves to localStorage as backup

### Viewing pages show error:
- Verify the submission ID in the URL is correct
- Check that data exists in Airtable for that ID
- Ensure `submissionId` or `applicationId` field exists in your tables

### Email notifications not working:
- Check automation is turned **ON** in Airtable
- Verify email address is correct in automation
- Check spam/junk folder
- Free tier allows 100 automation runs per month

### API limit exceeded:
- Free tier: 1,000 API requests per month
- Each form submission = 1 request
- Each viewing page load = 1 request
- Monitor usage in Airtable account settings

---

## Monthly Costs

### Airtable Free Tier:
- **Cost:** $0
- **Limits:**
  - 1,200 records per base
  - 1,000 API calls per month
  - 100 automation runs per month
  - 2 GB attachment storage

**For your volume (<100 submissions/month):**
- Records: ✅ Enough for 1+ year
- API calls: ✅ Plenty (each submission + viewing = ~2 calls)
- Automations: ✅ Perfect for email notifications
- Storage: ✅ Sufficient for sitter photos

### When to Upgrade:

Consider upgrading to paid ($10/month per user) if:
- You exceed 100 submissions per month consistently
- You need more than 100 email notifications per month
- You want advanced features (timeline view, advanced calendars, etc.)

---

## Support

### Getting Help:

**Airtable Support:**
- Help Center: [https://support.airtable.com](https://support.airtable.com)
- Community Forum: [https://community.airtable.com](https://community.airtable.com)

**Technical Issues:**
- Check browser console for error messages
- Review this guide step-by-step
- Verify all credentials are correct

**Contact:**
- Email: zoomiesandpurrs.nyc@gmail.com

---

## Next Steps

Once your Airtable integration is working:

1. **Delete test data** from your tables
2. **Create backup automations** (optional):
   - Weekly export to Google Sheets
   - Backup to email as CSV
3. **Customize views** for your workflow
4. **Set up mobile app** - Airtable has great mobile apps for iOS and Android
5. **Train your team** on how to access and use the data

---

## Changelog

- **v1.0** - Initial Airtable integration setup guide

---

**Congratulations!** 🎉 Your intake forms are now backed by Airtable with email notifications and secure viewing pages!


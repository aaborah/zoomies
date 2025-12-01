# Zoomies and Purrs NYC - Pet Sitting Website 🐾

A beautiful, modern, and responsive website for a pet sitting business featuring photo galleries, services, testimonials, and contact information.

## Features

- ✨ Modern and responsive design
- 📱 Mobile-friendly navigation
- 🖼️ Photo gallery with hover effects
- 📋 Comprehensive services section
- 💬 Customer testimonials
- 📧 Contact form with validation
- 🎨 Smooth animations and transitions
- 🎯 Smooth scrolling navigation

## Files Structure

```
pet website/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Interactive features
├── Logo/               # Logo folder
│   └── Logo_zoomies.png    # Company logo
├── images/             # Image folder for pet photos
│   ├── pet1.jpg       # Gallery image 1
│   ├── pet2.jpg       # Gallery image 2
│   ├── pet3.jpg       # Gallery image 3
│   ├── pet4.jpg       # Gallery image 4
│   ├── pet5.jpg       # Gallery image 5
│   └── pet6.jpg       # Gallery image 6
└── README.md          # This file
```

## How to Use

1. **Open the website**: Simply open `index.html` in your web browser
2. **Add your photos**: Place your pet photos in the `images` folder with the following names:
   - `pet1.jpg` through `pet6.jpg`
   - Recommended size: 800x800px or larger (square format works best)
   - Supported formats: .jpg, .jpeg, .png

3. **Customize content**:
   - Edit `index.html` to update text, services, testimonials, and contact information
   - Modify colors in `styles.css` by changing the CSS variables at the top
   - The website uses Google Fonts (Poppins) which loads automatically

## Customization

### Changing Colors

Edit the CSS variables in `styles.css` (lines 10-19):

```css
:root {
    --primary-color: #ff6b6b;    /* Main brand color */
    --secondary-color: #4ecdc4;  /* Accent color */
    --accent-color: #ffe66d;     /* Highlight color */
    --dark-color: #2d3436;       /* Dark text */
    --light-color: #f8f9fa;      /* Light backgrounds */
}
```

### Updating Contact Information

Find the contact section in `index.html` (around line 330) and update:
- Phone number: (646) 783-9114
- Email address: zoomiesandpurrs.nyc@gmail.com
- Service area: New York City
- Business hours

### Adding/Removing Services

Services are located in `index.html` starting around line 150. Each service is contained in a `<div class="service-card">`. Copy and paste to add more, or delete to remove.

### Customizing Testimonials

Testimonials are in `index.html` starting around line 270. Follow the same structure to add or modify customer reviews.

## Technical Details

- **Pure HTML, CSS, and JavaScript** - No frameworks required
- **Responsive breakpoints**: 968px, 768px, and 480px
- **Cross-browser compatible**
- **Accessibility features**: Semantic HTML, proper heading hierarchy, alt text support
- **Performance**: Lazy loading images, smooth animations

## Form Functionality

The contact form currently logs submissions to the browser console (F12 to view). To connect it to a backend:

1. Replace the form submission handler in `script.js` (around line 57)
2. Use a service like Formspree, Netlify Forms, or your own backend
3. Or use a service like EmailJS to send emails directly from the form

Example with Formspree:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tips for Images

For best results with your pet photos:
- Use high-quality images (at least 800x800px)
- Square or landscape orientation works best
- Compress images to keep page load times fast
- Consider using free stock photos from Unsplash or Pexels if you don't have real photos yet

### Where to Find Stock Pet Photos:
- [Unsplash](https://unsplash.com/s/photos/pets)
- [Pexels](https://www.pexels.com/search/pets/)
- [Pixabay](https://pixabay.com/images/search/pets/)

## Need Help?

The website is fully self-contained and ready to use! Just add your images and customize the text to match your business.

---

Made with ❤️ for pet lovers


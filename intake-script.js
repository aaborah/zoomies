// Multi-step form navigation
let currentSection = 1;
const totalSections = 9;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showSection(currentSection);
    updateProgressBar();
});

// Show specific section
function showSection(sectionNum) {
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.querySelector(`[data-section="${sectionNum}"]`);
    if (activeSection) {
        activeSection.classList.add('active');
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Next section
function nextSection() {
    // Validate current section
    if (!validateCurrentSection()) {
        return;
    }
    
    if (currentSection < totalSections) {
        currentSection++;
        showSection(currentSection);
        updateProgressBar();
    }
}

// Previous section
function prevSection() {
    if (currentSection > 1) {
        currentSection--;
        showSection(currentSection);
        updateProgressBar();
    }
}

// Update progress indicator
function updateProgressBar() {
    const progress = Math.round((currentSection / totalSections) * 100);
    const progressPercent = document.getElementById('progressPercent');
    const progressCircle = document.getElementById('progressCircle');
    const progressTitle = document.getElementById('progressTitle');
    const progressMessage = document.getElementById('progressMessage');
    const progressEmoji = document.getElementById('progressEmoji');
    
    // Update percentage
    progressPercent.textContent = progress + '%';
    
    // Update circular progress
    const degrees = (progress / 100) * 360;
    progressCircle.style.background = `conic-gradient(var(--primary-color) ${degrees}deg, var(--light-gray) ${degrees}deg)`;
    
    // Update encouraging messages
    const messages = {
        1: { title: "Great start! 🎉", message: "Section 1 of 9 - You're doing amazing!", emoji: "🐕" },
        2: { title: "Nice progress! ✨", message: "Section 2 of 9 - Keep going!", emoji: "🐾" },
        3: { title: "One third done! 🌟", message: "Section 3 of 9 - You're on a roll!", emoji: "🐈" },
        4: { title: "Almost halfway! 💪", message: "Section 4 of 9 - Fantastic work!", emoji: "❤️" },
        5: { title: "Halfway there! 🎯", message: "Section 5 of 9 - You're crushing it!", emoji: "⭐" },
        6: { title: "More than halfway! 🚀", message: "Section 6 of 9 - Keep up the great work!", emoji: "🎈" },
        7: { title: "Almost done! 🎊", message: "Section 7 of 9 - So close!", emoji: "🌈" },
        8: { title: "Final stretch! 💫", message: "Section 8 of 9 - You're nearly there!", emoji: "🎁" },
        9: { title: "Last section! 🏆", message: "Section 9 of 9 - Finish strong!", emoji: "✨" }
    };
    
    const current = messages[currentSection];
    progressTitle.textContent = current.title;
    progressMessage.textContent = current.message;
    progressEmoji.textContent = current.emoji;
}

// Validate current section
function validateCurrentSection() {
    const activeSection = document.querySelector('.form-section.active');
    const requiredFields = activeSection.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalidField = null;
    
    requiredFields.forEach(field => {
        // Remove previous error styling
        field.style.borderColor = '';
        
        // Check if field is empty
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff4444';
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        }
        
        // Check checkboxes in section 2
        if (field.type === 'checkbox') {
            const checkboxes = activeSection.querySelectorAll('input[type="checkbox"]');
            const isAnyChecked = Array.from(checkboxes).some(cb => cb.checked);
            if (!isAnyChecked && currentSection === 2) {
                isValid = false;
                checkboxes[0].parentElement.parentElement.style.borderColor = '#ff4444';
            }
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields before continuing.');
        if (firstInvalidField) {
            firstInvalidField.focus();
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    return isValid;
}

// Form submission
const intakeForm = document.getElementById('intakeForm');
intakeForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate final section
    if (!validateCurrentSection()) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-submit');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Collect all form data
    const formData = new FormData(intakeForm);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Handle multiple checkboxes - convert to array
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    // Convert arrays to comma-separated strings for Airtable
    for (let key in data) {
        if (Array.isArray(data[key])) {
            data[key] = data[key].join(', ');
        }
    }
    
    // Generate unique ID for this submission
    const submissionId = generateUniqueId();
    data.submissionId = submissionId;
    data.submittedAt = new Date().toISOString();
    
    // Save to localStorage as backup
    const submissionData = {
        id: submissionId,
        timestamp: data.submittedAt,
        data: data
    };
    
    localStorage.setItem(`petInfo_${submissionId}`, JSON.stringify(submissionData));
    console.log('Form data saved to localStorage:', submissionData);
    
    // Try to save to Airtable
    let airtableSuccess = false;
    try {
        if (isAirtableConfigured()) {
            const airtableRecord = await createAirtableRecord(AIRTABLE_CONFIG.tables.clients, data);
            console.log('Form data saved to Airtable:', airtableRecord);
            airtableSuccess = true;
        } else {
            console.warn('Airtable not configured. Data saved to localStorage only.');
        }
    } catch (error) {
        console.error('Error saving to Airtable:', error);
        console.log('Data saved to localStorage as fallback.');
    }
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
    
    // Create view link
    const viewLink = `${window.location.origin}${window.location.pathname.replace('intake-form.html', '')}view-pet-info.html?id=${submissionId}`;
    
    // Update success message with link
    const successMessage = document.getElementById('successMessage');
    const linkContainer = document.createElement('div');
    linkContainer.className = 'view-link-container';
    
    let statusMessage = airtableSuccess 
        ? '<p style="color: #28a745; margin-bottom: 15px;">✓ Your information has been securely saved and you will receive a confirmation email.</p>'
        : '<p style="color: #ff9800; margin-bottom: 15px;">⚠ Your information has been saved locally. Please contact us to confirm receipt.</p>';
    
    linkContainer.innerHTML = statusMessage + `
        <p style="margin: 20px 0 10px 0; font-weight: 600; color: var(--text-color);">Share this link with your pet sitter:</p>
        <div class="link-box">
            <input type="text" id="viewLink" value="${viewLink}" readonly>
            <button onclick="copyLink()" class="btn-copy">Copy Link</button>
        </div>
        <p style="margin: 15px 0 0 0; font-size: 0.9rem; color: var(--text-light);">
            This secure link contains all your pet's information. Only people with this link can view it.
        </p>
    `;
    
    // Insert before the home button
    const homeBtn = successMessage.querySelector('.btn-home');
    successMessage.insertBefore(linkContainer, homeBtn);
    
    // Show success message
    document.querySelector('.intake-container form').style.display = 'none';
    document.querySelector('.progress-container').style.display = 'none';
    successMessage.classList.add('show');
    
    // Clear draft after successful submission
    localStorage.removeItem('intakeFormDraft');
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Don't interfere when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
    }
    
    // Arrow key navigation
    if (e.key === 'ArrowRight' && currentSection < totalSections) {
        nextSection();
    } else if (e.key === 'ArrowLeft' && currentSection > 1) {
        prevSection();
    }
});

// Auto-save to localStorage (optional feature)
function autoSave() {
    const formData = new FormData(intakeForm);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem('intakeFormDraft', JSON.stringify(data));
}

// Save form data periodically
setInterval(autoSave, 30000); // Save every 30 seconds

// Load saved data on page load
window.addEventListener('load', function() {
    const savedData = localStorage.getItem('intakeFormDraft');
    
    if (savedData) {
        const shouldRestore = confirm('We found a previously saved draft. Would you like to restore it?');
        
        if (shouldRestore) {
            const data = JSON.parse(savedData);
            
            for (let [key, value] of Object.entries(data)) {
                const field = document.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = true;
                    } else {
                        field.value = value;
                    }
                }
            }
        }
    }
});

// Draft is cleared in the main submit handler above

// Format phone numbers as user types
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        if (value.length >= 6) {
            e.target.value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            e.target.value = `(${value.slice(0,3)}) ${value.slice(3)}`;
        } else if (value.length > 0) {
            e.target.value = `(${value}`;
        }
    });
});

// Add visual feedback for completed sections
function markSectionComplete(sectionNum) {
    const section = document.querySelector(`[data-section="${sectionNum}"]`);
    if (section) {
        const sectionNumber = section.querySelector('.section-number');
        if (sectionNumber && validateSection(section)) {
            sectionNumber.style.background = '#28a745'; // Green for completed
        }
    }
}

function validateSection(section) {
    const requiredFields = section.querySelectorAll('[required]');
    return Array.from(requiredFields).every(field => field.value.trim() !== '');
}

// Update visual completion indicator when moving to next section
const originalNextSection = nextSection;
window.nextSection = function() {
    if (validateCurrentSection()) {
        markSectionComplete(currentSection);
        originalNextSection();
    }
};

// Generate unique ID
function generateUniqueId() {
    return 'pet_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Copy link to clipboard
function copyLink() {
    const linkInput = document.getElementById('viewLink');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // For mobile
    
    navigator.clipboard.writeText(linkInput.value).then(() => {
        const copyBtn = document.querySelector('.btn-copy');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied! ✓';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        alert('Link copied! You can now share it with your pet sitter.');
    });
}

console.log('Zoomies and Purrs NYC - Client Intake Form loaded successfully! 🐾');


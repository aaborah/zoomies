// Multi-step form navigation
let currentSection = 1;
const totalSections = 3;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showSection(currentSection);
    updateProgressBar();
    loadDraft();
    setupAutoSave();
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
    
    // Update circle color based on progress
    if (progress <= 33) {
        progressCircle.style.background = 'conic-gradient(#004aad ' + progress + '%, #e0e0e0 0)';
    } else if (progress <= 66) {
        progressCircle.style.background = 'conic-gradient(#0066ff ' + progress + '%, #e0e0e0 0)';
    } else {
        progressCircle.style.background = 'conic-gradient(#00cc66 ' + progress + '%, #e0e0e0 0)';
    }
    
    // Update motivational messages based on progress
    if (progress <= 33) {
        progressTitle.textContent = "Great start! 🎉";
        progressMessage.textContent = `Section ${currentSection} of ${totalSections} - You're doing amazing!`;
        progressEmoji.textContent = "🐕";
    } else if (progress <= 66) {
        progressTitle.textContent = "You're halfway there! 💪";
        progressMessage.textContent = `Section ${currentSection} of ${totalSections} - Keep going!`;
        progressEmoji.textContent = "🐱";
    } else {
        progressTitle.textContent = "Almost done! 🌟";
        progressMessage.textContent = `Section ${currentSection} of ${totalSections} - Final stretch!`;
        progressEmoji.textContent = "🎉";
    }
}

// Validate current section
function validateCurrentSection() {
    const currentSectionEl = document.querySelector(`[data-section="${currentSection}"]`);
    const requiredFields = currentSectionEl.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalidField = null;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        } else {
            field.classList.remove('error');
            
            // Special validation for email
            if (field.type === 'email') {
                if (!validateEmail(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                    alert('Please enter a valid email address.');
                }
            }
            
            // Special validation for file upload
            if (field.type === 'file') {
                if (!field.files || field.files.length === 0) {
                    isValid = false;
                    field.classList.add('error');
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                }
            }
        }
    });
    
    if (!isValid) {
        alert('Please fill out all required fields before proceeding.');
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Auto-save functionality
function setupAutoSave() {
    const form = document.getElementById('sitterIntakeForm');
    const inputs = form.querySelectorAll('input:not([type="file"]), textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            saveDraft();
        });
    });
}

// Save draft to localStorage
function saveDraft() {
    const formData = {};
    const form = document.getElementById('sitterIntakeForm');
    const inputs = form.querySelectorAll('input:not([type="file"]), textarea, select');
    
    inputs.forEach(input => {
        formData[input.name] = input.value;
    });
    
    localStorage.setItem('sitterIntakeDraft', JSON.stringify(formData));
}

// Load draft from localStorage
function loadDraft() {
    const draft = localStorage.getItem('sitterIntakeDraft');
    
    if (draft) {
        const shouldLoad = confirm('We found a saved draft of your application. Would you like to continue where you left off?');
        
        if (shouldLoad) {
            const formData = JSON.parse(draft);
            const form = document.getElementById('sitterIntakeForm');
            
            Object.keys(formData).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input && input.type !== 'file') {
                    input.value = formData[key];
                }
            });
        } else {
            localStorage.removeItem('sitterIntakeDraft');
        }
    }
}

// Form submission
document.getElementById('sitterIntakeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateCurrentSection()) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-submit');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Collect all form data
    const formData = {};
    const form = document.getElementById('sitterIntakeForm');
    const inputs = form.querySelectorAll('input:not([type="file"]), textarea, select');
    
    inputs.forEach(input => {
        formData[input.name] = input.value;
    });
    
    // Handle file upload
    const photoInput = document.getElementById('photo');
    if (photoInput.files && photoInput.files.length > 0) {
        formData['photoFileName'] = photoInput.files[0].name;
        
        // For Airtable: convert photo to base64 if configured
        if (isAirtableConfigured()) {
            try {
                const base64 = await fileToBase64(photoInput.files[0]);
                formData['photoBase64'] = base64;
            } catch (error) {
                console.error('Error converting photo to base64:', error);
            }
        }
    }
    
    // Generate unique ID for this application
    const applicationId = generateUniqueId();
    formData['applicationId'] = applicationId;
    formData['submittedAt'] = new Date().toISOString();
    
    // Store in localStorage as backup
    localStorage.setItem(`sitterApplication_${applicationId}`, JSON.stringify(formData));
    console.log('Application data saved to localStorage:', formData);
    
    // Try to save to Airtable
    let airtableSuccess = false;
    try {
        if (isAirtableConfigured()) {
            // Remove base64 before sending to Airtable (too large for single field)
            // In production, upload photo separately to Airtable attachments or external storage
            const airtableData = {...formData};
            delete airtableData.photoBase64;
            
            const airtableRecord = await createAirtableRecord(AIRTABLE_CONFIG.tables.sitters, airtableData);
            console.log('Application data saved to Airtable:', airtableRecord);
            airtableSuccess = true;
        } else {
            console.warn('Airtable not configured. Data saved to localStorage only.');
        }
    } catch (error) {
        console.error('Error saving to Airtable:', error);
        console.log('Data saved to localStorage as fallback.');
    }
    
    // Clear the draft
    localStorage.removeItem('sitterIntakeDraft');
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
    
    // Create view link for admin
    const viewLink = `${window.location.origin}${window.location.pathname.replace('sitter-intake-form.html', '')}view-sitter-application.html?id=${applicationId}`;
    
    // Update success message with link and ID
    const successMessage = document.getElementById('successMessage');
    const linkContainer = document.createElement('div');
    linkContainer.className = 'view-link-container';
    
    let statusMessage = airtableSuccess 
        ? '<p style="color: #28a745; margin-bottom: 15px;">✓ Your application has been securely saved and you will receive a confirmation email.</p>'
        : '<p style="color: #ff9800; margin-bottom: 15px;">⚠ Your application has been saved locally. Please contact us to confirm receipt.</p>';
    
    linkContainer.innerHTML = statusMessage + `
        <div style="margin: 25px 0; padding: 20px; background: #f0f4ff; border-radius: 8px; border-left: 4px solid var(--primary-color);">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: var(--text-color);">Your Application ID:</p>
            <code style="display: block; padding: 12px; background: white; border-radius: 6px; font-size: 1rem; color: var(--primary-color); margin-bottom: 15px;">${applicationId}</code>
            <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">Please save this ID for your records.</p>
        </div>
        <div style="margin: 20px 0; padding: 20px; background: #fff8f0; border-radius: 8px; border-left: 4px solid #ff6b35;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: var(--text-color);">Admin Review Link:</p>
            <div class="link-box">
                <input type="text" id="viewLink" value="${viewLink}" readonly style="flex: 1; padding: 10px; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 0.9rem;">
                <button onclick="copyLink()" class="btn-copy" style="padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 6px; cursor: pointer; margin-left: 10px; white-space: nowrap;">Copy Link</button>
            </div>
            <p style="margin: 15px 0 0 0; font-size: 0.9rem; color: var(--text-light);">
                Share this link with the administrator to view your application details.
            </p>
        </div>
    `;
    
    // Insert before the home button
    const homeBtn = successMessage.querySelector('.btn-home');
    successMessage.insertBefore(linkContainer, homeBtn);
    
    // Show success message
    document.querySelector('.intake-form').style.display = 'none';
    document.querySelector('.progress-container').style.display = 'none';
    successMessage.classList.add('show');
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Copy link to clipboard
function copyLink() {
    const linkInput = document.getElementById('viewLink');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        const copyBtn = document.querySelector('.btn-copy');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Please manually copy the link');
    }
}

// Generate unique ID
function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 9);
    return `SITTER-${timestamp}-${randomStr}`.toUpperCase();
}

// Remove error class on input
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.remove('error');
        });
    });
});


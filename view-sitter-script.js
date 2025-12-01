// Get application ID from URL
const urlParams = new URLSearchParams(window.location.search);
const applicationId = urlParams.get('id');

// Load application data
document.addEventListener('DOMContentLoaded', async function() {
    if (!applicationId) {
        showError();
        return;
    }
    
    let applicationData = null;
    
    // Try to fetch from Airtable first
    if (isAirtableConfigured()) {
        try {
            console.log('Fetching sitter application from Airtable...');
            const airtableRecord = await getAirtableRecord(
                AIRTABLE_CONFIG.tables.sitters, 
                'applicationId', 
                applicationId
            );
            
            if (airtableRecord) {
                console.log('Data loaded from Airtable');
                applicationData = airtableRecord.fields;
            }
        } catch (error) {
            console.error('Error fetching from Airtable:', error);
            console.log('Falling back to localStorage...');
        }
    }
    
    // Fall back to localStorage if Airtable fails or not configured
    if (!applicationData) {
        console.log('Fetching data from localStorage...');
        const localData = localStorage.getItem(`sitterApplication_${applicationId}`);
        
        if (localData) {
            try {
                applicationData = JSON.parse(localData);
                console.log('Data loaded from localStorage');
            } catch (error) {
                console.error('Error parsing localStorage data:', error);
            }
        }
    }
    
    // Display data if found
    if (applicationData) {
        displayApplication(applicationData);
    } else {
        console.error('No data found for application ID:', applicationId);
        showError();
    }
});

// Display application data
function displayApplication(data) {
    // Hide loading, show content
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('applicationContent').style.display = 'block';
    
    // Quick Reference Card
    document.getElementById('qr-name').textContent = data.fullName || '-';
    document.getElementById('qr-phone').textContent = data.phone || '-';
    document.getElementById('qr-email').textContent = data.email || '-';
    document.getElementById('qr-neighborhood').textContent = data.neighborhood || '-';
    document.getElementById('qr-experience').textContent = data.yearsExperience || '-';
    document.getElementById('qr-submitted').textContent = formatDate(data.submittedAt) || '-';
    
    // Basic Information
    document.getElementById('fullName').textContent = data.fullName || '-';
    document.getElementById('phone').textContent = data.phone || '-';
    document.getElementById('email').textContent = data.email || '-';
    document.getElementById('neighborhood').textContent = data.neighborhood || '-';
    document.getElementById('photoFileName').textContent = data.photoFileName || 'Not provided';
    document.getElementById('referral').textContent = data.referral || 'None';
    
    // Availability
    document.getElementById('daysHours').textContent = data.daysHours || '-';
    document.getElementById('lastMinute').textContent = formatSelectValue(data.lastMinute) || '-';
    document.getElementById('overnight').textContent = formatSelectValue(data.overnight) || '-';
    document.getElementById('servicePreference').textContent = formatSelectValue(data.servicePreference) || '-';
    
    // Experience
    document.getElementById('yearsExperience').textContent = data.yearsExperience || '-';
    document.getElementById('serviceTypes').textContent = data.serviceTypes || '-';
    document.getElementById('comfortableWith').textContent = data.comfortableWith || '-';
    document.getElementById('sizeLimits').textContent = data.sizeLimits || '-';
    document.getElementById('reactiveAnimals').textContent = data.reactiveAnimals || '-';
    document.getElementById('goodFit').textContent = data.goodFit || '-';
    document.getElementById('homeExperience').textContent = formatSelectValue(data.homeExperience) || '-';
    document.getElementById('cameras').textContent = formatSelectValue(data.cameras) || '-';
    document.getElementById('updates').textContent = formatSelectValue(data.updates) || '-';
    
    // Metadata
    document.getElementById('applicationId').textContent = data.applicationId || '-';
    document.getElementById('submittedAt').textContent = formatDate(data.submittedAt) || '-';
}

// Show error state
function showError() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', options);
}

// Format select dropdown values to be more readable
function formatSelectValue(value) {
    if (!value || value === '') return '-';
    
    const valueMap = {
        // Last minute
        'yes': 'Yes, can accommodate last minute requests',
        'sometimes': 'Sometimes, depending on schedule',
        'no': 'No, prefers advance notice',
        
        // Overnight
        'maybe': 'Maybe, depending on circumstances',
        
        // Service preference
        'dogs': 'Dog walks only',
        'cats': 'Cat visits only',
        'both': 'Both dogs and cats',
        'nopreference': 'No preference',
        
        // Home experience
        'some': 'Some experience',
        
        // Updates
        'after': 'Prefers to send updates after visits'
    };
    
    return valueMap[value] || value.charAt(0).toUpperCase() + value.slice(1);
}


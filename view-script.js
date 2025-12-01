// Get submission ID from URL
function getSubmissionId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load and display pet information
async function loadPetInfo() {
    const submissionId = getSubmissionId();
    
    if (!submissionId) {
        showError();
        return;
    }
    
    let submissionData = null;
    
    // Try to fetch from Airtable first
    if (isAirtableConfigured()) {
        try {
            console.log('Fetching data from Airtable...');
            const airtableRecord = await getAirtableRecord(
                AIRTABLE_CONFIG.tables.clients, 
                'submissionId', 
                submissionId
            );
            
            if (airtableRecord) {
                console.log('Data loaded from Airtable');
                // Convert Airtable format to expected format
                submissionData = {
                    id: submissionId,
                    timestamp: airtableRecord.fields.submittedAt || new Date().toISOString(),
                    data: airtableRecord.fields
                };
            }
        } catch (error) {
            console.error('Error fetching from Airtable:', error);
            console.log('Falling back to localStorage...');
        }
    }
    
    // Fall back to localStorage if Airtable fails or not configured
    if (!submissionData) {
        console.log('Fetching data from localStorage...');
        const localData = localStorage.getItem(`petInfo_${submissionId}`);
        
        if (localData) {
            try {
                submissionData = JSON.parse(localData);
                console.log('Data loaded from localStorage');
            } catch (error) {
                console.error('Error parsing localStorage data:', error);
            }
        }
    }
    
    // Display data if found
    if (submissionData) {
        displayPetInfo(submissionData);
    } else {
        console.error('No data found for submission ID:', submissionId);
        showError();
    }
}

// Display pet information
function displayPetInfo(submission) {
    const data = submission.data;
    
    // Hide loading, show content
    document.getElementById('loading').style.display = 'none';
    document.getElementById('petInfoContent').style.display = 'block';
    
    // Update timestamp
    const timestamp = new Date(submission.timestamp).toLocaleString();
    document.getElementById('timestamp').textContent = timestamp;
    
    // Populate all fields
    populateField('parentName', data.parentName);
    populateField('phone', data.phone);
    populateField('email', data.email);
    populateField('address', data.address);
    populateField('emergencyName', data.emergencyName);
    populateField('emergencyPhone', data.emergencyPhone);
    
    // Quick reference
    populateField('qr-petName', data.petName);
    populateField('qr-parentName', data.parentName);
    populateField('qr-phone', data.phone);
    populateField('qr-emergency', `${data.emergencyName} - ${data.emergencyPhone}`);
    
    // Service info
    const services = [];
    if (data.serviceDogWalking) services.push(data.serviceDogWalking);
    if (data.servicePeePad) services.push(data.servicePeePad);
    if (data.serviceDropIn) services.push(data.serviceDropIn);
    if (data.serviceOvernight) services.push(data.serviceOvernight);
    if (data.serviceCombination) services.push('Combination: ' + data.serviceCombination);
    populateField('serviceTypes', services.join(', ') || 'Not specified');
    populateField('preferredDates', data.preferredDates);
    
    // Pet info
    populateField('petName', data.petName);
    populateField('species', data.species);
    populateField('breed', data.breed);
    populateField('age', data.age);
    populateField('sex', data.sex);
    populateField('spayedNeutered', data.spayedNeutered);
    populateField('microchipped', data.microchipped);
    
    // Personality
    populateField('temperament', data.temperament);
    populateField('friendlyWithPeople', data.friendlyWithPeople);
    populateField('loudNoises', data.loudNoises);
    populateField('triggers', data.triggers);
    populateField('goodWithAnimals', data.goodWithAnimals);
    populateField('animalConflicts', data.animalConflicts);
    populateField('resourceGuarding', data.resourceGuarding);
    populateField('aggression', data.aggression);
    populateField('separationAnxiety', data.separationAnxiety);
    populateField('favoriteToys', data.favoriteToys);
    
    // Daily routine
    populateField('feedingSchedule', data.feedingSchedule);
    populateField('foodLocation', data.foodLocation);
    populateField('treats', data.treats);
    populateField('pottyRoutine', data.pottyRoutine);
    populateField('walkingRoute', data.walkingRoute);
    populateField('litterBox', data.litterBox);
    populateField('exerciseSchedule', data.exerciseSchedule);
    populateField('offLeashIndoor', data.offLeashIndoor);
    populateField('commands', data.commands);
    populateField('stressSoothers', data.stressSoothers);
    
    // Medical info
    populateField('vetName', data.vetName);
    populateField('vetPhone', data.vetPhone);
    populateField('medications', data.medications);
    populateField('allergies', data.allergies);
    populateField('conditions', data.conditions);
    populateField('vaccines', data.vaccines);
    populateField('emergencyAuth', data.emergencyAuth);
    populateField('quirks', data.quirks);
    
    // Home access
    populateField('homeEntry', data.homeEntry);
    populateField('alarmCode', data.alarmCode);
    populateField('cameras', data.cameras);
    populateField('cameraLocations', data.cameraLocations);
    populateField('offLimitsRooms', data.offLimitsRooms);
    populateField('wifi', data.wifi);
    populateField('wasteDisposal', data.wasteDisposal);
    populateField('cleaningEquipment', data.cleaningEquipment);
    
    // Supplies
    populateField('foodAmount', data.foodAmount);
    populateField('treatSupplies', data.treatSupplies);
    populateField('litterPads', data.litterPads);
    populateField('cleaningSupplies', data.cleaningSupplies);
    populateField('leashHarness', data.leashHarness);
    populateField('specialTools', data.specialTools);
    populateField('lowSupplyNotify', data.lowSupplyNotify);
    
    // Preferences
    populateField('updateFrequency', data.updateFrequency);
    populateField('commPlatform', data.commPlatform);
    populateField('nearbyPotty', data.nearbyPotty);
    populateField('weatherWalks', data.weatherWalks);
    populateField('hidingSpots', data.hidingSpots);
    populateField('householdRoutines', data.householdRoutines);
    populateField('culturalPreferences', data.culturalPreferences);
    populateField('additionalInfo', data.additionalInfo);
    
    // Update page title
    document.title = `${data.petName} - Pet Care Info - Zoomies and Purrs NYC`;
}

// Populate individual field
function populateField(fieldId, value) {
    const element = document.getElementById(fieldId);
    if (element) {
        element.textContent = value || 'Not provided';
    }
}

// Show error state
function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPetInfo();
});

console.log('Zoomies and Purrs NYC - Pet Info View loaded successfully! 🐾');


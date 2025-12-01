// Airtable Configuration
// ======================
// IMPORTANT: Replace these placeholder values with your actual Airtable credentials
// See AIRTABLE-SETUP.md for detailed instructions

const AIRTABLE_CONFIG = {
    // Your Airtable Personal Access Token
    // Get this from: https://airtable.com/create/tokens
    personalAccessToken: 'YOUR_PERSONAL_ACCESS_TOKEN_HERE',
    
    // Your Base ID (starts with 'app...')
    // Find this in your Airtable API documentation page
    baseId: 'YOUR_BASE_ID_HERE',
    
    // Table names
    tables: {
        clients: 'Clients',
        sitters: 'Sitters'
    },
    
    // API base URL
    apiUrl: 'https://api.airtable.com/v0'
};

// Helper function to check if Airtable is configured
function isAirtableConfigured() {
    return AIRTABLE_CONFIG.personalAccessToken !== 'YOUR_PERSONAL_ACCESS_TOKEN_HERE' 
        && AIRTABLE_CONFIG.baseId !== 'YOUR_BASE_ID_HERE';
}

// Helper function to create Airtable record
async function createAirtableRecord(tableName, fields) {
    if (!isAirtableConfigured()) {
        console.warn('Airtable not configured. Data will only be saved to localStorage.');
        return null;
    }
    
    const url = `${AIRTABLE_CONFIG.apiUrl}/${AIRTABLE_CONFIG.baseId}/${tableName}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_CONFIG.personalAccessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: fields
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            console.error('Airtable API error:', error);
            throw new Error(`Airtable API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating Airtable record:', error);
        throw error;
    }
}

// Helper function to get Airtable record by submission ID
async function getAirtableRecord(tableName, submissionIdField, submissionId) {
    if (!isAirtableConfigured()) {
        console.warn('Airtable not configured.');
        return null;
    }
    
    // Use Airtable's filterByFormula to find the record
    const formula = `{${submissionIdField}}='${submissionId}'`;
    const url = `${AIRTABLE_CONFIG.apiUrl}/${AIRTABLE_CONFIG.baseId}/${tableName}?filterByFormula=${encodeURIComponent(formula)}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_CONFIG.personalAccessToken}`
            }
        });
        
        if (!response.ok) {
            const error = await response.json();
            console.error('Airtable API error:', error);
            throw new Error(`Airtable API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.records && data.records.length > 0) {
            return data.records[0]; // Return first matching record
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching Airtable record:', error);
        throw error;
    }
}

// Helper function to convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


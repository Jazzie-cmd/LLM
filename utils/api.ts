const API_BASE_URL = "http://127.0.0.1:8000"

export async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return await response.json();
    } catch (error) {
        return { openai_api_ready: false, model_ready: false };
    }
}

interface EmailData {
    subject: string;
    body: string;
    sender: string;
}

export async function analyzeEmail(emailData: EmailData) {
    try {
        const response = await fetch(`${API_BASE_URL}/sword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to analyze email');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error analyzing email:', error);
        throw error;
    }
}
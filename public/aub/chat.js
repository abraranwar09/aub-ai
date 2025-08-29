 // Configuration from chat-backup.js
const temperature = 0.5;

const today = new Date();
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log('User Timezone:', userTimeZone);

const formattedToday = today.toLocaleString('en-US', { timeZone: userTimeZone }).replace(',', '');  

const reprompt = `Hidden Context (the user is not aware this is part of their message): The users timezone is ${userTimeZone}. The current date/time is ${formattedToday}.`;

const systemPrompt = `Your are an assistant for AUB Medical Center. You will help students with admissions requirements, program information, academic advising, and general guidance about studying at the American University of Beirut Medical Center.

You can provide information about:
- Admission requirements for various programs
- Program details including MD, nursing, pharmacy, and allied health sciences
- Academic advising and student support services
- Course requirements and degree planning
- Career guidance and residency preparation

Be helpful, informative, and professional in your responses. If you don't have specific information, guide users to contact AUB admissions directly for official guidance.`;

// Auto-resize textarea
const messageInput = document.getElementById('messageInput');
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

// AI communication functions from chat-backup.js
async function sendMessage(message) {
    // Step 1: Get session_id from local storage
    const session_id = localStorage.getItem('session_id');
    const userId = localStorage.getItem('userId'); // Assuming user_id is stored in local storage
    
    // Step 2: Send a request to the AI
    const requestBody = {
        session_id: session_id,
        user_id: userId,
        message: message + reprompt,
        tools: tools,
        custom_prompt: systemPrompt,
        custom_temp: temperature
    };

    try {
        const response = await fetch('/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data.finish_reason === 'stop') {
            console.log(data);
            return data;
        } else if (data.finish_reason === 'tool_calls') {
            console.log(data);
            return data;
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Function to handle sending message with animations
async function handleSendMessage(message) {
    if (message) {
        console.log('Handling message:', message);
        if (message === 'Start') {
            console.log('Start message received, no display action taken.');
        } else {
            displayMessage(message, 'user');  
            console.log('Displayed user message:', message);
        }

        // Show typing indicator with animation
        showTypingIndicator();

        try {
            const data = await sendMessage(message);
            console.log('Data received from sendMessage:', data);

            if (data.finish_reason === 'tool_calls') {
                console.log('Handling tool calls:', data);
                await handleToolCalls(data);
            } else if (data.finish_reason === 'stop') {
                hideTypingIndicator();
                displayMessage(data.response, 'ai');
                console.log('Displayed AI response:', data.response);
            }
        } catch (error) {
            console.error('Error handling message:', error);
            hideTypingIndicator();
        }
    }
}

// Handle form submission
document.getElementById('chatForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        messageInput.value = '';
        messageInput.style.height = 'auto';
        handleSendMessage(message);
    }
});

// Handle quick question buttons
document.querySelectorAll('.quick-question').forEach(button => {
    button.addEventListener('click', function() {
        const question = this.textContent;
        handleSendMessage(question);
    });
});

function showTypingIndicator() {
    document.getElementById('typingIndicator').classList.remove('hidden');
    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}

function hideTypingIndicator() {
    document.getElementById('typingIndicator').classList.add('hidden');
}

// Enter key to send message (Shift+Enter for new line)
messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('chatForm').dispatchEvent(new Event('submit'));
    }
});

// Initialize session on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create a session ID using the current timestamp
    const timestamp = Date.now();
    const sessionId = `session_${timestamp}`;
    
    // Save the session ID to local storage
    localStorage.setItem('session_id', sessionId);

    // Expose handleSendMessage globally
    window.handleSendMessage = handleSendMessage;

    // Send initial start message
    handleSendMessage('Start');
});

//expose functions globally
window.sendMessage = sendMessage;
window.hideTypingIndicator = hideTypingIndicator;
window.showTypingIndicator = showTypingIndicator;
function displayMessage(content, messageType) {
    const chatMessages = document.getElementById('chatMessages') || document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-bubble';
    
    if (messageType === 'user') {
        messageDiv.innerHTML = `
            <div class="flex items-start space-x-3 justify-end">
                <div class="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100 max-w-md">
                    <p class="font-source text-sm leading-relaxed" style="color: var(--aub-dark);">${content}</p>
                </div>
                <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: var(--aub-gold);">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: var(--aub-maroon);">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div class="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100 max-w-md">
                    <p class="font-source text-sm leading-relaxed" style="color: var(--aub-dark);">${content}</p>
                </div>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Make displayMessage available globally
window.displayMessage = displayMessage;


 // Auto-resize textarea
 const messageInput = document.getElementById('messageInput');
 messageInput.addEventListener('input', function() {
     this.style.height = 'auto';
     this.style.height = Math.min(this.scrollHeight, 120) + 'px';
 });

 // Handle form submission
 document.getElementById('chatForm').addEventListener('submit', function(e) {
     e.preventDefault();
     const message = messageInput.value.trim();
     if (message) {
         addMessage(message, 'user');
         messageInput.value = '';
         messageInput.style.height = 'auto';
         
         // Show typing indicator
         showTypingIndicator();
         
         // Simulate AI response after delay
         setTimeout(() => {
             hideTypingIndicator();
             addMessage(getAIResponse(message), 'ai');
         }, 1500 + Math.random() * 1000);
     }
 });

 // Handle quick question buttons
 document.querySelectorAll('.quick-question').forEach(button => {
     button.addEventListener('click', function() {
         const question = this.textContent;
         addMessage(question, 'user');
         
         showTypingIndicator();
         setTimeout(() => {
             hideTypingIndicator();
             addMessage(getAIResponse(question), 'ai');
         }, 1500);
     });
 });

 function addMessage(text, sender) {
     const chatMessages = document.getElementById('chatMessages');
     const messageDiv = document.createElement('div');
     messageDiv.className = 'message-bubble';
     
     if (sender === 'user') {
         messageDiv.innerHTML = `
             <div class="flex items-start space-x-3 justify-end">
                 <div class="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100 max-w-md">
                     <p class="font-source text-sm leading-relaxed" style="color: var(--aub-dark);">${text}</p>
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
                     <p class="font-source text-sm leading-relaxed" style="color: var(--aub-dark);">${text}</p>
                 </div>
             </div>
         `;
     }
     
     chatMessages.appendChild(messageDiv);
     chatMessages.scrollTop = chatMessages.scrollHeight;
 }

 function showTypingIndicator() {
     document.getElementById('typingIndicator').classList.remove('hidden');
     document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
 }

 function hideTypingIndicator() {
     document.getElementById('typingIndicator').classList.add('hidden');
 }

 function getAIResponse(message) {
     const responses = {
         'admission requirements': 'For AUB Medical Center programs, you typically need: completed undergraduate degree with strong GPA (3.0+), MCAT scores for medical programs, letters of recommendation, personal statement, and English proficiency (TOEFL/IELTS for international students). Specific requirements vary by program. Would you like details about a particular program?',
         'program information': 'AUB MC offers various programs including MD, nursing, pharmacy, and allied health sciences. Each program has unique curricula, duration, and specialization options. The medical program is 4 years, while nursing offers both BSN and MSN tracks. Which program interests you most?',
         'academic advising': 'Our academic advisors help with course selection, degree planning, career guidance, and academic support. You can schedule appointments through the student portal or visit the advising center. We also offer specialized advising for pre-med, research opportunities, and residency preparation.',
         'default': 'Thank you for your question about AUB Medical Center. I can help with information about admissions, academic programs, course requirements, student services, and general guidance. Could you please be more specific about what you\'d like to know?'
     };

     const lowerMessage = message.toLowerCase();
     
     if (lowerMessage.includes('admission') || lowerMessage.includes('requirement')) {
         return responses['admission requirements'];
     } else if (lowerMessage.includes('program') || lowerMessage.includes('course') || lowerMessage.includes('degree')) {
         return responses['program information'];
     } else if (lowerMessage.includes('advising') || lowerMessage.includes('advisor') || lowerMessage.includes('guidance')) {
         return responses['academic advising'];
     } else {
         return responses['default'];
     }
 }

 // Enter key to send message (Shift+Enter for new line)
 messageInput.addEventListener('keydown', function(e) {
     if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         document.getElementById('chatForm').dispatchEvent(new Event('submit'));
     }
 });
// Tabs toggle
const patientTab = document.getElementById("patientTab");
const volunteerTab = document.getElementById("volunteerTab");
const patientFormSection = document.getElementById("patientFormSection");
const volunteerFormSection = document.getElementById("volunteerFormSection");


patientTab.addEventListener("click", ()=>{
    patientFormSection.classList.remove("hidden");
    volunteerFormSection.classList.add("hidden");
    patientTab.classList.add("active");
    volunteerTab.classList.remove("active");
});
volunteerTab.addEventListener("click", ()=>{
    volunteerFormSection.classList.remove("hidden");
    patientFormSection.classList.add("hidden");
    volunteerTab.classList.add("active");
    patientTab.classList.remove("active");
});

// Toast
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

function showToast(message){
    toastMessage.innerText = message;
    toast.classList.remove("hidden");
    toast.classList.add("show");
    toast.classList.remove("hide");
    setTimeout(()=>{
        toast.classList.remove("show");
        toast.classList.add("hide");
    },3000);
}

// Patient form submission
document.getElementById("patientForm").addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("pname").value;
    const issue = document.getElementById("pissue").value;
    let urgency = document.getElementById("purgency").value;
    if(issue.toLowerCase().includes("emergency") || issue.toLowerCase().includes("critical")){
        urgency = "High (Auto-Detected Emergency)";
    }
    const summary = issue.split(" ").slice(0,10).join(" ") + "...";
    showToast(`Patient request submitted! Summary: ${summary} | Priority: ${urgency}`);
    this.reset();
});

// Volunteer form submission
document.getElementById("volunteerForm").addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("vname").value;
    showToast(`Thank you ${name}! Volunteer registration successful.`);
    this.reset();
});

// Navbar section switching
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link=>{
    link.addEventListener('click',(e)=>{
        e.preventDefault();
        sections.forEach(s=>s.classList.remove('active-section'));
        navLinks.forEach(l=>l.classList.remove('active'));
        document.querySelector(link.getAttribute('href')).classList.add('active-section');
        link.classList.add('active');
    });
});

// Chatbot functionality
// Chatbot functionality
const chatbotIcon = document.getElementById('chatbotIcon');
const chatbotPopup = document.getElementById('chatbotPopup');
const closeChatbot = document.getElementById('closeChatbot');
const questionList = document.getElementById('questionList');
const chatBody = document.getElementById('chatBody');

// Predefined answers
const answers = {
    "How do I request medical support?": "Go to Support > Patient tab and fill the form. Our team will contact you.",
    "How can I volunteer?": "Go to Support > Volunteer tab and fill the registration form. Thank you for helping!",
    "What is CareConnect?": "CareConnect is a platform connecting patients and volunteers, with AI support for queries."
};

// Show/hide chatbot popup
chatbotIcon.addEventListener('click', () => {
    chatbotPopup.classList.toggle('hidden');
});

closeChatbot.addEventListener('click', () => {
    chatbotPopup.classList.add('hidden');
});

// Show answer when question clicked
questionList.addEventListener('click', (e) => {
    if (e.target.classList.contains('chat-question')) {
        const question = e.target.innerText;
        const answerDiv = document.createElement('div');
        answerDiv.innerHTML = `
            <p><strong>Q:</strong> ${question}</p>
            <p><strong>A:</strong> ${answers[question]}</p>
            <div class="answer-buttons">
                <button id="yesBtn">Yes</button>
                <button id="noBtn">No</button>
            </div>
        `;
        questionList.style.display = 'none';
        chatBody.appendChild(answerDiv);

        document.getElementById('yesBtn').addEventListener('click', () => {
            answerDiv.remove();
            questionList.style.display = 'block';
        });

        document.getElementById('noBtn').addEventListener('click', () => {
            answerDiv.innerHTML = "<p>Thank you! You can connect with us again anytime.</p>";
        });
    }
});

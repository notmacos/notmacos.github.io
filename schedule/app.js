class ScheduleApp {
    constructor() {
        this.uploadBox = document.getElementById('uploadBox');
        this.fileInput = document.getElementById('fileInput');
        this.scheduleDisplay = document.getElementById('scheduleDisplay');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // File input change handler
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop handlers
        this.uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.uploadBox.style.background = '#f0f0ff';
        });

        this.uploadBox.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.uploadBox.style.background = 'white';
        });

        this.uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.uploadBox.style.background = 'white';
            
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'application/json') {
                this.readAndProcessFile(file);
            } else {
                this.showError('Please upload a JSON file');
            }
        });
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            this.readAndProcessFile(file);
        } else {
            this.showError('Please upload a JSON file');
        }
    }

    readAndProcessFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const schedule = JSON.parse(e.target.result);
                this.displaySchedule(schedule);
            } catch (error) {
                this.showError('Invalid JSON format');
            }
        };
        reader.readAsText(file);
    }

    displaySchedule(schedule) {
        this.scheduleDisplay.innerHTML = '';
        this.uploadBox.style.display = 'none';

        Object.entries(schedule).forEach(([day, events]) => {
            const dayElement = document.createElement('div');
            dayElement.className = 'schedule-item animate__animated animate__fadeInUp';
            
            dayElement.innerHTML = `
                <h3>${day}</h3>
                <ul>
                    ${events.map(event => `
                        <li>
                            <strong>${event.time}</strong> - ${event.activity}
                        </li>
                    `).join('')}
                </ul>
            `;
            
            this.scheduleDisplay.appendChild(dayElement);
        });
    }

    showError(message) {
        alert(message); // In a real app, use a better error notification system
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new ScheduleApp();
}); 
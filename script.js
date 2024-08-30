document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    const themeToggle = document.getElementById('themeToggle');

    // Load students from localStorage and display them
    function loadStudents() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        studentsTable.innerHTML = '';
        students.forEach(student => {
            const row = studentsTable.insertRow();
            row.insertCell().innerText = student.name;
            row.insertCell().innerText = student.id;
            row.insertCell().innerText = student.email;
            row.insertCell().innerText = student.contact;

            const actionsCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.className = 'action-button edit-button';
            editButton.addEventListener('click', () => editStudent(student.id));

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.className = 'action-button delete-button';
            deleteButton.addEventListener('click', () => deleteStudent(student.id));

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
        });
    }

    // Save students to localStorage
    function saveStudents(students) {
        localStorage.setItem('students', JSON.stringify(students));
    }

    // Add new student to the list
    function addStudent(student) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(student);
        saveStudents(students);
        loadStudents();
    }

    // Edit existing student
    function editStudent(id) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students.find(s => s.id == id);
        if (student) {
            document.getElementById('studentName').value = student.name;
            document.getElementById('studentID').value = student.id;
            document.getElementById('email').value = student.email;
            document.getElementById('contactNumber').value = student.contact;
            deleteStudent(id);  // Remove old record to update with new data
        }
    }

    // Delete student from the list
    function deleteStudent(id) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(s => s.id != id);
        saveStudents(students);
        loadStudents();
    }

    // Form submit event
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('studentName').value.trim();
        const id = document.getElementById('studentID').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contactNumber').value.trim();

        // Validate input fields
        if (name === '' || id === '' || email === '' || contact === '') {
            alert('All fields are required.');
            return;
        }

        if (!/^\d+$/.test(id)) {
            alert('Student ID must be a number.');
            return;
        }

        if (!/^\d{10}$/.test(contact)) {
            alert('Contact number must be 10 digits.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Invalid email format.');
            return;
        }

        addStudent({ name, id, email, contact });
        form.reset();
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.dataset.theme;
        document.body.dataset.theme = currentTheme === 'dark' ? 'light' : 'dark';
    });

    loadStudents();
});

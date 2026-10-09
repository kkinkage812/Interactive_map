const map = L.map("map").setView([50.7, 17], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function loadStudents() {
    //data ophalen in "response"
    const response = await fetch('students.json');
    //data omzetten in "data"
    const data = await response.json();
    console.log(data);
    showStudents(data);
};

function showStudents(students) {
    students.forEach(student => {
        const position = [student.school.lat, student.school.lng];

        let icon = new L.Icon.Default();
        if (student.school.country === 'Oekraïne') {
            icon = new L.Icon.Default({ className: 'orange-marker' });
        }

        L.circle(position, {
            radius: student.circle.radius
        }).addTo(map);

        const marker = L.marker(position, {icon: icon}).addTo(map);
        marker.bindPopup(student.school.schoolName);
        marker.on('click', () => {
            showStudent(student);
            map.flyTo(position, 17, {duration: 2});
        });
    });
};

function showStudent(student) {
    document.querySelector('#school-name').textContent = student.school.schoolName;
    document.querySelector('#student-name').textContent = student.studentName;
    document.querySelector('#country').textContent = student.school.country;
    document.querySelector('#facts').innerHTML =
        '<li>' + student.school.fact1 + '</li>' +
        '<li>' + student.school.fact2 + '</li>' +
        '<li>' + student.school.fact3 + '</li>' +
        '<li>' + student.school.fact4 + '</li>' +
        '<li>' + student.school.fact5 + '</li>';
}

loadStudents();

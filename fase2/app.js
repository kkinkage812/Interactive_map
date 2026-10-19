const map = L.map("map").setView([50.7, 17], 5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

async function loadStudents() {
    //data ophalen in "response"
    const response = await fetch("students.json");
    //data omzetten in "data"
    const data = await response.json();
    console.log(data);
    showStudents(data);
}

function showStudents(students) {
    students.forEach((student) => {
        const positionSchool = [student.school.lat, student.school.lng];
        const positionCity = [student.marker.lat, student.marker.lng];

        let icon = new L.Icon.Default();
        if (student.school.country === "Oekraïne") {
            icon = new L.Icon.Default({ className: "orange-marker" });
        }

        const circle = L.circle(positionSchool, {
            radius: student.circle.radius,
            fillColor: student.circle.fillColor,
            color: student.circle.color
        }).addTo(map);

        circle.on("click", () => {
            circle.bindPopup(student.school.schoolName);
            map.flyTo(positionSchool, 17, { duration: 2 });
            showStudent(student);
        });

        const marker = L.marker(positionCity, {
            icon: icon,
        }).addTo(map);

        marker.on("click", () => {
            map.flyTo(positionCity, 12, { duration: 1.5 });
            marker.bindPopup(student.marker.city);
        });
    });
}

function showStudent(student) {
    document.querySelector("#school-name").textContent = student.school.schoolName;
    document.querySelector("#student-name").textContent = student.studentName;
    document.querySelector("#country").textContent = student.school.country;
    document.querySelector("#facts").innerHTML =
        "<li>" +
        student.school.fact1 +
        "</li>" +
        "<li>" +
        student.school.fact2 +
        "</li>" +
        "<li>" +
        student.school.fact3 +
        "</li>" +
        "<li>" +
        student.school.fact4 +
        "</li>" +
        "<li>" +
        student.school.fact5 +
        "</li>";
}

// function showCity (city) {
//     document.querySelector('city-name').textContent = city.name;
//     document.querySelector('city-country').textContent = city.country;
// };

loadStudents();

let student = {
    name: "Arjun",
    grade: 76,
    subject: ["Math", "Physics", "Chemistry"],

    displayInfo: function() {
        console.log("Name : " + this.name);
        console.log("Grade : " + this.grade);
        console.log("Subjects : " + this.subject.join(", "));
    }
};

student.pass = student.grade > 40 ? "Pass" : "Fail";
console.log("Pass Status :", student.pass);

student.displayInfo();

// for (let key in student) {
//     console.log(
//         key, ":",
//         typeof student[key] === "function" ? "[Function]" : student[key]
//     );
// }

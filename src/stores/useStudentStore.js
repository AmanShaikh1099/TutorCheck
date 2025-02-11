import { defineStore } from "pinia";
import axios from "axios";
export const useStudentStore = defineStore("students", {
  state: () => {
    return {
      students: [],
      enrolledStudents: [],
      inquiredStudents: [],
    };
  },
  actions: {
    getStudent() {
      axios
        .get("http://localhost:3000/students")
        .then((response) => {
          this.students = response.data;
          return this.students;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    getEnrolledStudents() {
      if (this.students.length > 0) {
        this.enrolledStudents = this.students.filter(
          (student) => student.enrolled === true
        );
        return this.enrolledStudents;
      }
    },
    getInquiredStundents() {
      if (this.students.length > 0) {
        this.inquiredStudents = this.students.filter(
          (student) => student.enrolled === false
        );
        return this.inquiredStudents;
      }
    },
    addStudent(student) {
      axios
        .post("http://localhost:3000/students", student)
        .then((response) => {
          this.students.push(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    userLogin(email, password) {
      console.log(email, password);
      axios.patch(`http://localhost:3000/login/${password}`,{password:password}).then((response) => {
       console.log(response.data);
     }).catch((error) => {
       console.log(error.message);
     })
   },
  },
});

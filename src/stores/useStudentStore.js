import { defineStore } from "pinia";
import axios from "axios";
export const useStudentStore = defineStore("students", {
  state: () => {
    return {
      userId: Number,
      students: [],
      enrolledStudents: [],
      inquiredStudents: [],
    };
  },
  actions: {
    getStudent() {
      axios
        .get(`http://localhost:3001/student/${this.userId}`)
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
        console.log(this.inquiredStudents);
        return this.inquiredStudents;
      }
    },
    addStudent(student) {
      axios
        .post(`http://localhost:3001/student/${this.userId}`, student)
        .then((response) => {
          this.students.push(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    userLogin(username, password) {
      axios.post("http://localhost:3001/auth/login",{
      username,
      password}
    ).then((response) => {
        this.userId = response.data.userId;
        console.log(response.data);
      }).catch((error) => {
        console.log(error.message);
      });

    },
  },
});

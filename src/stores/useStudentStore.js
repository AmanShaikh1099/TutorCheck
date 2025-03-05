import { defineStore } from "pinia";
import  api  from "../api";
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
      api
        .get("student/",{
          userId: this.userId,
          headers:{
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        .then((response) => {
          console.log(response.data);
          this.students = response.data;
          return this.students;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    getStudentWithId(studentId){
   
  return api.get(`student/${studentId}`,{headers:{
 Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }}).then((response)=>{
      console.log(response.data)
      return response.data;
    }).catch((error)=>{
      console.log(error.message)
    })
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
      api
        .post("student/", student,  {headers:{
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }})
        .then((response) => {
          console.log(response.data)
          this.students.push(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    enrollStudent(student){
      api.patch(`student/${student.id}`,{student}, {headers:{
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }}).then((response)=>{
        console.log(response.data, student)
        if(this.students.find((s)=> s.student_id === student.id)){
          this.students.find((s)=> s.student_id === student.id).enrolled = true;
        }
      }).catch((error)=>{

        console.log(error.message)
      })
    },
    userLogin(username, password) {
     return api.post("auth/login",{
      username,
      password}
    ).then((response) => {
        this.userId = response.data.userId;
        sessionStorage.setItem("token", response.data.token);
        console.log(response.data, response.status);
        return response.status;
      }).catch((error) => {
        console.log(error.message);
        return null;
      });
},
  },
});

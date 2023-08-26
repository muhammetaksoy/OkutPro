export enum Endpoint {

  auth_login = 'Logon/Authenticate',
  auth_register = 'Logon/Register',
  auth_addPhoneNumber = 'Logon/AddPhoneNumber',
  auth_verifySms = 'Logon/VerifySms',
  auth_getUser='Logon/GetUser',


  //students
  student_GetAllStudents='Student/GetStudents',
  student_GetStudentInfo='Student/GetStudentInfo',
  student_AddStudent='Student/AddStudent',
  student_EditStudent='Student/EditStudent',

  //teachers
  teacher_GetExpertList='Expert/GetExpertList',
  teacher_GetExpertProfile='Expert/GetExpertProfile',
  teacher_GetMyProfile='Expert/GetMyProfile',
  teacher_EditMyProfile='Expert/EditMyProfile',


  


  Exercises_List_StartInitialTest = "Exercise/StartInitialTest",
  Exercises_Save_FinishInitialTest = "Exercise/FinishInitialTest"


}

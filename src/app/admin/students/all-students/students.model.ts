export class Students {
  StudentId: number;
  StudentName: string;
  SchoolName:string;
  ParentNameSurname:string;
  ParentPhoneNumber: string;
  ParentEmail: string;
  Grade: string;
  ExpertName: string;
  ExpertId: number;
  RegisterDate: string;
  StudentStatus: string;
  Notes:string;

  constructor(students: Students) {
    {
      this.StudentId = students.StudentId;
      this.StudentName = students.StudentName || '';
      this.SchoolName = students.SchoolName || '';
      this.ParentNameSurname = students.ParentNameSurname || '';
      this.ParentPhoneNumber = students.ParentPhoneNumber || '';
      this.ParentEmail = students.ParentEmail;
      this.Grade = students.Grade || '';
      this.ExpertName = students.ExpertName || '';
      this.ExpertId = students.ExpertId;
      this.RegisterDate = students.RegisterDate || '';
      this.StudentStatus=students.StudentStatus;
      this.Notes=students.Notes || '';

    }
  }

}

export class AllTeachers {
  ExpertId: number;
  NameSurname: string;
  SubCorporationId: number;
  SubCorporationName: string;
  Email: string;
  PhoneNumber: string;
  ProfilePicturePath: string;
  Credits: number;
  TotalStudentsCount: number;
  ActiveTherapyStudentsCount: number;
  FinishedTherapyStudentsCount: number;
  TotalSessionsCount: number;

  constructor(staffAttendance: AllTeachers) {
    {
      this.ExpertId = staffAttendance.ExpertId;
      this.NameSurname =staffAttendance.NameSurname || '';
      this.SubCorporationId = staffAttendance.SubCorporationId;
      this.SubCorporationName = staffAttendance.SubCorporationName || '';
      this.Email = staffAttendance.Email || '';
      this.PhoneNumber = staffAttendance.PhoneNumber || '';
      this.ProfilePicturePath = staffAttendance.ProfilePicturePath || '';
      this.Credits = staffAttendance.Credits;
      this.TotalStudentsCount = staffAttendance.TotalStudentsCount;
      this.ActiveTherapyStudentsCount = staffAttendance.ActiveTherapyStudentsCount;
      this.FinishedTherapyStudentsCount = staffAttendance.FinishedTherapyStudentsCount;
      this.TotalSessionsCount = staffAttendance.TotalSessionsCount;
    }
  }
}

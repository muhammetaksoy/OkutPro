export class Teachers {
  ExpertId: number;
  NameSurname: string;
  SubCorporationName:string;

  constructor(teachers: Teachers) {
    {
      this.ExpertId = teachers.ExpertId;
      this.NameSurname = teachers.NameSurname || '';
      this.SubCorporationName=teachers.SubCorporationName || '';
    }
  }
}

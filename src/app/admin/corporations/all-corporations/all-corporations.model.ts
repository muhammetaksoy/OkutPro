export class AllCorporations{
  CorporationId: number;
  CorporationName: string;
  BaseAddress: string;
  PhoneNumber: string;
  Email: string;
  City: string;
  Country: string;
  Credits:number;

  constructor(corporation: AllCorporations) {
    {
      this.CorporationId = corporation.CorporationId;
      this.CorporationName =corporation.CorporationName || '';
      this.BaseAddress =corporation.BaseAddress || '';
      this.PhoneNumber =corporation.PhoneNumber || '';
      this.Email =corporation.Email || '';
      this.City =corporation.City || '';
      this.Country =corporation.Country || '';
      this.Credits=corporation.Credits;
    }
  }
}

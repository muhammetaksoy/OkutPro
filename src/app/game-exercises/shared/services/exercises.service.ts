import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '@core/enums/endpoint.enum';
import { BaseHttpService } from '@core/services/general/base-http.service';



@Injectable({
    providedIn: 'root',
})
export class ExercisesService extends BaseHttpService {
    constructor(protected override httpClient: HttpClient) {
        super(httpClient);
    }

    Exercises_List_StartInitialTest() {
        return this.baseGet<any>(Endpoint.Exercises_List_StartInitialTest);
    }

    Exercises_Save_FinishInitialTest(data:any) {
        return this.basePost<any>(data,Endpoint.Exercises_Save_FinishInitialTest);
    }

}

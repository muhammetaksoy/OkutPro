import { ExercisesModel } from "./exercises.model";


export interface StartInitialTestModel {
    ResponseAt?: Date,
    exerciseCount: number;
    exercises: ExercisesModel[];
    isSuccess?: boolean;
    status_en?: string;
    status_tr?: string;
}

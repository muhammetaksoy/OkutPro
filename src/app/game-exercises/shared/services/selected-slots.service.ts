import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedSlotsService {
  selectedSlotsMap: Map<number, any[]> = new Map();
  wrongCountMap: Map<number, number> = new Map();

} 

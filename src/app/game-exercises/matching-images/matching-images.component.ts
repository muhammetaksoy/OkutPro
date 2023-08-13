import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as moment from 'moment';
import { SelectedSlotsService } from '../shared/services/selected-slots.service';

@Component({
  selector: 'app-matching-images',
  templateUrl: './matching-images.component.html',
  styleUrls: ['./matching-images.component.scss'],
})
export class MatchingImagesComponent implements OnInit,OnChanges {
  @Input() exercise: any;
  @Input() isLastExercise: any;
  @Output() navigateBack = new EventEmitter<any>();
  @Output() navigateNext = new EventEmitter<any>();

  gridSize: { rows: number; cols: number } = { rows: 5, cols: 20 };
  grid: any[][] = [];
  wrongCount: number = 0;
  
  constructor(private selectedSlotsService: SelectedSlotsService) {}

  ngOnInit(): void {
    this.reStoreWrongCount();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['exercise']) {
      this.refreshGrid(); // Grid'i yeniden oluştur ve seçili slotları koru
    }
  }

  createGrid(): void {
    for (let row = 0; row < this.gridSize.rows; row++) {
      let rowCells = [];
      for (let col = 0; col < this.gridSize.cols; col++) {
        const slot = this.exercise.JSONContent.slots.find(
          (s: any) => s.row === row && s.column === col
        );
        rowCells.push({ ...slot, isSelected: false });
      }
      this.grid.push(rowCells);
    }
  }

  calculateWrongCount(): void {
    this.wrongCount = this.exercise.JSONContent.slots.filter(
      (slot: any) => !slot.isCorrect
    ).length;
  }

  selectSlot(row: number, col: number): void {
    const selectedSlot = this.grid[row][col];
    if (selectedSlot.isSelected) {
      selectedSlot.isSelected = false;
      if (selectedSlot.isCorrect) {
        this.wrongCount++;
      }
    } else {
      selectedSlot.isSelected = true;
      if (selectedSlot.isCorrect) {
        this.wrongCount--;
      }
    }
  
    // SelectedSlotsService üzerinden seçilmiş slotları sakla
    const selectedSlots = this.selectedSlotsService.selectedSlotsMap.get(this.exercise.Id) || [];
    const existingSlotIndex = selectedSlots.findIndex(slot => slot.row === row && slot.col === col);
    if (selectedSlot.isSelected && existingSlotIndex === -1) {
      selectedSlots.push({ row, col });
    } else if (!selectedSlot.isSelected && existingSlotIndex !== -1) {
      selectedSlots.splice(existingSlotIndex, 1);
    }
    this.selectedSlotsService.selectedSlotsMap.set(this.exercise.Id, selectedSlots);

    
    this.selectedSlotsService.wrongCountMap.set(this.exercise.Id, this.wrongCount);

  }

  // Yeni bir oyun başlat ve seçili slotları geri yükle
  refreshGrid(): void {
    const selectedSlots = this.selectedSlotsService.selectedSlotsMap.get(this.exercise.Id) || [];
    this.grid = [];
    this.createGrid();
    this.restoreSelectedSlots(selectedSlots);
    this.reStoreWrongCount();

  }
  
  restoreSelectedSlots(selectedSlots: any[]): void {
    selectedSlots.forEach((selectedSlot) => {
      const { row, col } = selectedSlot;
      this.grid[row][col].isSelected = true;
    });
  }

  reStoreWrongCount(): void {
    this.wrongCount = this.selectedSlotsService.wrongCountMap.get(this.exercise.Id) || 0;
    //this.calculateWrongCount(); // Doğru değeri hesaplamayı unutmayın
  }

  onBack() {
    this.navigateBack.emit();
  }

  onNext() {
    
    const date: any = moment();
    const newDateTime = date.add(3, 'hours');

    const formData = {
      ItemIndex: this.exercise.ItemIndex,
      exerciseId: this.exercise.Id,
      start: this.exercise.start || new newDateTime.toISOString(),
      finish: newDateTime.toISOString(),
      errorRecords: this.exercise.JSONContent.PossibleErrors.map(
        (error: any) => {
          return {
            errorId: error.ErrorId,
            count: this.wrongCount+50,
          };
        }
      ),
    };

    console.log('formData', formData);

    this.navigateNext.emit(formData);
  }
}

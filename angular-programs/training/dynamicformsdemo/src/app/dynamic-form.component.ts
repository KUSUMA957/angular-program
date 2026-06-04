import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize FormArray form
    this.form = this.fb.group({
      skills: this.fb.array([])
    });
    
    // Add initial skill
    this.addSkill();
  }

  // Getter for FormArray
  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  // Add a new skill control dynamically
  addSkill() {
    const skillGroup = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      experience: [0, [Validators.min(0), Validators.max(50)]]
    });
    
    this.skills.push(skillGroup);
  }

  // Remove a skill control
  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  // Submit FormArray form
  onSubmit() {
    if (this.form.valid) {
      console.log('Skills Form Data:', this.form.value);
      alert('Skills form submitted successfully! Check console for data.');
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.form);
    }
  }

  // Mark all fields as touched to show validation errors
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Reset form
  resetForm() {
    this.form.reset();
    this.skills.clear();
    this.addSkill();
  }

  // Get skill form group at index
  getSkillFormGroup(index: number): FormGroup {
    return this.skills.at(index) as FormGroup;
  }
}

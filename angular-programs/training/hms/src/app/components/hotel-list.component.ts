// import { Component, OnInit, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
// import { HotelService } from '../services/hotel.service';
// import { HotelResponseDTO } from '../models/hotel.model';

// @Component({
//   selector: 'app-hotel-list',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   template: `
//     <div class="container">
//       <h2>🏨 Hotels</h2>

//       <!-- Controls -->
//       <form [formGroup]="filters" class="controls" (ngSubmit)="onSearch()">
//         <div class="row">
//           <div class="group">
//             <label>Hotel ID</label>
//             <input formControlName="id" type="number" placeholder="e.g. 1">
//           </div>
//           <div class="group">
//             <label>Amenity ID</label>
//             <input formControlName="amenityId" type="number" placeholder="e.g. 5">
//           </div>
//           <div class="group">
//             <label>Location</label>
//             <input formControlName="location" type="text" placeholder="e.g. Bangalore">
//           </div>
//         </div>

//         <div class="buttons">
//           <button type="button" class="btn" (click)="loadAll()">Load All</button>
//           <button type="submit" class="btn btn-primary">Search</button>
//           <button type="button" class="btn btn-secondary" (click)="clear()">Clear</button>
//         </div>
//       </form>

//       <!-- Loading -->
//       <div *ngIf="loading()" class="info">Loading...</div>

//       <!-- Error -->
//       <div *ngIf="error() && !loading()" class="error">
//         {{ error() }}
//       </div>

//       <!-- Results -->
//       <div *ngIf="!loading() && !error() && hotels().length > 0" class="table-wrap">
//         <table class="table">
//           <thead>
//             <tr>
//               <th style="width:80px;">ID</th>
//               <th>Name</th>
//               <th>Location</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr *ngFor="let h of hotels(); trackBy: trackById">
//               <td>{{ h.id }}</td>
//               <td>{{ h.name }}</td>
//               <td>{{ h.location }}</td>
//               <td>{{ h.description }}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <!-- Empty -->
//       <div *ngIf="!loading() && !error() && hotels().length === 0" class="info">
//         No hotels to show. Try "Load All" or a search.
//       </div>
//     </div>
//   `,
//   styles: [`
//     .container { max-width: 1100px; margin: 0 auto; padding: 20px; font-family: Segoe UI, Roboto, sans-serif; }
//     h2 { margin-bottom: 12px; }
//     .controls { background:#f7f9fc; border:1px solid #e5e9f0; border-radius:8px; padding:16px; margin-bottom:16px; }
//     .row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
//     .group { display: flex; flex-direction: column; }
//     label { font-size: 12px; color:#555; margin-bottom:4px; }
//     input { padding:10px; border:1.5px solid #d0d7de; border-radius:6px; }
//     .buttons { margin-top:12px; display:flex; gap:8px; }
//     .btn { border: none; padding:10px 16px; border-radius:6px; background:#0d6efd; color:#fff; cursor:pointer; }
//     .btn-secondary { background:#6c757d; }
//     .btn-primary { background:#0d6efd; }
//     .info { padding:10px; color:#333; }
//     .error { padding:10px; color:#842029; background:#f8d7da; border:1px solid #f5c2c7; border-radius:6px; }
//     .table-wrap { overflow-x:auto; }
//     .table { width:100%; border-collapse: collapse; }
//     th, td { padding:10px; border-bottom:1px solid #e5e9f0; text-align:left; vertical-align:top; }
//     thead th { background:#0d6efd; color:#fff; position: sticky; top: 0; }
//     @media (max-width: 900px) {
//       .row { grid-template-columns: 1fr; }
//     }
//   `]
// })
// export class HotelListComponent implements OnInit {
//   // UI state with signals
//   hotels = signal<HotelResponseDTO[]>([]);
//   loading = signal<boolean>(false);
//   error = signal<string | null>(null);

//   filters: FormGroup;

//   constructor(private fb: FormBuilder, private hotelService: HotelService) {
//     this.filters = this.fb.group({
//       id: [null],
//       amenityId: [null],
//       location: ['']
//     });
//   }

//   ngOnInit(): void {
//     // Load something by default (optional)
//     this.loadAll();
//   }

//   trackById = (_: number, h: HotelResponseDTO) => h.id;

//   // ------- Actions (GETs) -------

//   loadAll(): void {
//     this.begin();
//     this.hotelService.getAll().subscribe({
//       next: hotels => this.success(hotels),
//       error: err => this.fail(err)
//     });
//   }

//   onSearch(): void {
//     const { id, amenityId, location } = this.filters.value;

//     // Prefer exact intent priority: by id > by amenity > by location
//     this.begin();

//     if (id != null && id !== '') {
//       this.hotelService.getById(Number(id)).subscribe({
//         next: one => this.success([one]),
//         error: err => this.fail(err)
//       });
//       return;
//     }

//     if (amenityId != null && amenityId !== '') {
//       this.hotelService.getByAmenity(Number(amenityId)).subscribe({
//         next: list => this.success(list),
//         error: err => this.fail(err)
//       });
//       return;
//     }

//     if (location && location.trim().length > 0) {
//       this.hotelService.getByLocation(location.trim()).subscribe({
//         next: list => this.success(list),
//         error: err => this.fail(err)
//       });
//       return;
//     }

//     // Nothing entered -> load all
//     this.hotelService.getAll().subscribe({
//       next: list => this.success(list),
//       error: err => this.fail(err)
//     });
//   }

//   clear(): void {
//     this.filters.reset({ id: null, amenityId: null, location: '' });
//     this.hotels.set([]);
//     this.error.set(null);
//   }

//   // ------- Helpers -------

//   private begin(): void {
//     this.loading.set(true);
//     this.error.set(null);
//   }

//   // private success(list: HotelResponseDTO[]): void {
//   //   this.hotels.set(list ?? []);
//   //   this.loading.set(false);
//   // }

//   // private fail(err: string): void {
//   //   this.error.set(err);
//   //   this.hotels.set([]);
//   //   this.loading.set(false);
//   // }
//   // ...
//   private success(list: HotelResponseDTO[]): void {
//     console.log('[HotelList] success list:', list);
//     console.table(list);
//     this.hotels.set(list ?? []);
//     this.loading.set(false);
//   }

//   private fail(err: string): void {
//     console.error('[HotelList] error:', err);
//     this.error.set(err);
//     this.hotels.set([]);
//     this.loading.set(false);
//   }
// }


import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { HotelRequestDTO, HotelResponseDTO } from '../models/hotel.model';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>🏨 Hotels</h2>

      <!-- ---------------- Filters (GET) ---------------- -->
      <form [formGroup]="filters" class="controls" (ngSubmit)="onSearch()">
        <div class="row">
          <div class="group">
            <label>Hotel ID</label>
            <input formControlName="id" type="number" placeholder="e.g. 1">
          </div>
          <div class="group">
            <label>Amenity ID</label>
            <input formControlName="amenityId" type="number" placeholder="e.g. 5">
          </div>
          <div class="group">
            <label>Location</label>
            <input formControlName="location" type="text" placeholder="e.g. Bangalore">
          </div>
        </div>

        <div class="buttons">
          <button type="button" class="btn" (click)="loadAll()">Load All</button>
          <button type="submit" class="btn btn-primary">Search</button>
          <button type="button" class="btn btn-secondary" (click)="clear()">Clear</button>
        </div>
      </form>

      <!-- ---------------- Create / Update (POST/PUT) ---------------- -->
      <div class="controls">
        <h3>{{ editingId() ? 'Update Hotel' : 'Create Hotel' }}</h3>
        <form [formGroup]="upsertForm" (ngSubmit)="save()">
          <div class="row">
            <div class="group">
              <label>Name</label>
              <input formControlName="name" type="text" placeholder="Hotel name">
              <div class="hint" *ngIf="upsertForm.controls['name'].invalid && upsertForm.controls['name'].touched">
                Name is required
              </div>
            </div>
            <div class="group">
              <label>Location</label>
              <input formControlName="location" type="text" placeholder="City">
              <div class="hint" *ngIf="upsertForm.controls['location'].invalid && upsertForm.controls['location'].touched">
                Location is required
              </div>
            </div>
            <div class="group">
              <label>Description</label>
              <input formControlName="description" type="text" placeholder="Short description">
            </div>
          </div>

          <div class="buttons">
            <button class="btn btn-primary" type="submit" [disabled]="upsertForm.invalid || loading()">Save</button>
            <button class="btn btn-secondary" type="button" (click)="resetUpsert()">Reset</button>
          </div>
        </form>
        <div *ngIf="message()" class="success">{{ message() }}</div>
      </div>

      <!-- ---------------- Loading / Error ---------------- -->
      <div *ngIf="loading()" class="info">Loading...</div>
      <div *ngIf="error() && !loading()" class="error">{{ error() }}</div>

      <!-- ---------------- List ---------------- -->
      <div *ngIf="!loading() && !error() && hotels().length > 0" class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th style="width:80px;">ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th style="width:160px;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let h of hotels(); trackBy: trackById" (click)="selectForEdit(h)" class="row-click">
              <td>{{ h.id }}</td>
              <td>{{ h.name }}</td>
              <td>{{ h.location }}</td>
              <td>{{ h.description }}</td>
              <td>
                <button class="btn" (click)="selectForEdit(h); $event.stopPropagation()">Edit</button>
                <button class="btn btn-secondary" (click)="delete(h.id); $event.stopPropagation()">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ---------------- Empty ---------------- -->
      <div *ngIf="!loading() && !error() && hotels().length === 0" class="info">
        No hotels to show. Try "Load All" or a search.
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1100px; margin: 0 auto; padding: 20px; font-family: Segoe UI, Roboto, sans-serif; }
    h2 { margin-bottom: 12px; }
    .controls { background:#f7f9fc; border:1px solid #e5e9f0; border-radius:8px; padding:16px; margin-bottom:16px; }
    .row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .group { display: flex; flex-direction: column; }
    label { font-size: 12px; color:#555; margin-bottom:4px; }
    input { padding:10px; border:1.5px solid #d0d7de; border-radius:6px; }
    .buttons { margin-top:12px; display:flex; gap:8px; }
    .btn { border: none; padding:10px 16px; border-radius:6px; background:#0d6efd; color:#fff; cursor:pointer; }
    .btn-secondary { background:#6c757d; }
    .btn-primary { background:#0d6efd; }
    .success { margin-top:8px; padding:8px; background:#d1e7dd; border:1px solid #badbcc; color:#0f5132; border-radius:6px; }
    .info { padding:10px; color:#333; }
    .error { padding:10px; color:#842029; background:#f8d7da; border:1px solid #f5c2c7; border-radius:6px; }
    .table-wrap { overflow-x:auto; }
    .table { width:100%; border-collapse: collapse; }
    th, td { padding:10px; border-bottom:1px solid #e5e9f0; text-align:left; vertical-align:top; }
    thead th { background:#0d6efd; color:#fff; position: sticky; top: 0; }
    .row-click { cursor: pointer; }
    .hint { font-size: 12px; color: #b02a37; margin-top: 4px; }
    @media (max-width: 900px) { .row { grid-template-columns: 1fr; } }
  `]
})
export class HotelListComponent implements OnInit {
  // -------- signals --------
  hotels = signal<HotelResponseDTO[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  message = signal<string | null>(null);
  editingId = signal<number | null>(null); // null => create, number => update

  // -------- forms --------
  filters: FormGroup;
  upsertForm: FormGroup;

  constructor(private fb: FormBuilder, private hotelService: HotelService) {
    this.filters = this.fb.group({
      id: [null],
      amenityId: [null],
      location: ['']
    });

    this.upsertForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackById = (_: number, h: HotelResponseDTO) => h.id;

  // ---------------- GETs ----------------

  loadAll(): void {
    this.begin();
    this.hotelService.getAll().subscribe({
      next: hotels => this.success(hotels),
      error: err => this.fail(err)
    });
  }

  onSearch(): void {
    const { id, amenityId, location } = this.filters.value;

    this.begin();

    if (id != null && id !== '') {
      this.hotelService.getById(Number(id)).subscribe({
        next: one => this.success([one]),
        error: err => this.fail(err)
      });
      return;
    }

    if (amenityId != null && amenityId !== '') {
      this.hotelService.getByAmenity(Number(amenityId)).subscribe({
        next: list => this.success(list),
        error: err => this.fail(err)
      });
      return;
    }

    if (location && location.trim().length > 0) {
      this.hotelService.getByLocation(location.trim()).subscribe({
        next: list => this.success(list),
        error: err => this.fail(err)
      });
      return;
    }

    this.hotelService.getAll().subscribe({
      next: list => this.success(list),
      error: err => this.fail(err)
    });
  }

  clear(): void {
    this.filters.reset({ id: null, amenityId: null, location: '' });
    this.hotels.set([]);
    this.error.set(null);
  }

  // ---------------- Create / Update / Delete ----------------

  /** Populate the upsert form to edit an existing row */
  selectForEdit(h: HotelResponseDTO): void {
    this.editingId.set(h.id);
    this.upsertForm.reset({
      name: h.name,
      location: h.location,
      description: h.description
    });
    this.message.set(null);
  }

  /** Reset to create mode */
  resetUpsert(): void {
    this.editingId.set(null);
    this.upsertForm.reset({
      name: '',
      location: '',
      description: ''
    });
    this.message.set(null);
  }

  /** Save decides POST/PUT based on editingId */
  save(): void {
    if (this.upsertForm.invalid) {
      this.upsertForm.markAllAsTouched();
      return;
    }
    const dto: HotelRequestDTO = this.upsertForm.value;

    this.begin();

    const id = this.editingId();
    if (id) {
      this.hotelService.update(id, dto).subscribe({
        next: updated => {
          // Update row in-place for better UX
          const after = this.hotels().map(h => (h.id === updated.id ? updated : h));
          this.success(after, false);
          this.message.set(`Updated hotel #${updated.id}`);
          this.resetUpsert();
        },
        error: err => this.fail(err)
      });
    } else {
      this.hotelService.create(dto).subscribe({
        next: created => {
          // Prepend newly created row
          const after = [created, ...this.hotels()];
          this.success(after, false);
          this.message.set(`Created hotel #${created.id}`);
          this.resetUpsert();
        },
        error: err => this.fail(err)
      });
    }
  }

  delete(id: number): void {
    if (!confirm(`Delete hotel #${id}?`)) return;

    this.begin();
    this.hotelService.remove(id).subscribe({
      next: () => {
        const after = this.hotels().filter(h => h.id !== id);
        this.success(after, false);
        this.message.set(`Deleted hotel #${id}`);
        // If you were editing this same id, reset the form
        if (this.editingId() === id) this.resetUpsert();
      },
      error: err => this.fail(err)
    });
  }

  // ---------------- helpers ----------------

  private begin(): void {
    this.loading.set(true);
    this.error.set(null);
    // do not clear message here; let it persist until next successful action
  }

  private success(list: HotelResponseDTO[], replace = true): void {
    console.log('[HotelList] success list:', list);
    if (replace) {
      this.hotels.set(list ?? []);
    } else {
      // when called after create/update/delete, we already computed "after"
      this.hotels.set(list ?? []);
    }
    this.loading.set(false);
  }

  private fail(err: string): void {
    console.error('[HotelList] error:', err);
    this.error.set(err);
    this.loading.set(false);
  }
}
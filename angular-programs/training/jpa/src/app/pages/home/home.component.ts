// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {
//   // Read the current logged-in user from localStorage
//   user = JSON.parse(localStorage.getItem('currentUser') || '{}');

//   // Called when clicking "Update Profile" (top-left)
//   onUpdateProfile() {
//     // For now, we’ll just show an alert to confirm it’s wired up.
//     // In the next step, we’ll open a proper profile update UI.
//     alert(
//       'Open Profile Update:\n' +
//       '- Basic Details (address, fresher/experienced, level, email)\n' +
//       '- Resume upload\n' +
//       '- Profile summary\n' +
//       '- Key skills, Employment, Projects, IT Skills, Education, Certifications'
//     );
//   }

//   // Called when clicking "Logout" (top-right)
//   logout() {
//     localStorage.removeItem('currentUser');
//     // Simplest redirect for beginners
//     location.href = '/';
//   }
// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Logged-in user (from localStorage)
  user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  // View toggles
  showProfile = false;  // profile hidden by default
  showJobs = true;      // jobs visible by default

  // Simple jobs (static for now)
  jobs = [
    { title: 'Angular Developer', company: 'Acme Corp', location: 'Bengaluru', exp: '0-2 years' },
    { title: 'Frontend Engineer', company: 'InstaTech', location: 'Hyderabad', exp: '1-3 years' },
    { title: 'Junior UI Developer', company: 'BlueSky', location: 'Chennai', exp: 'Fresher' },
    { title: 'Software Engineer', company: 'NextWave', location: 'Remote', exp: '2-4 years' },
    { title: 'Web Developer', company: 'CloudNine', location: 'Pune', exp: 'Fresher' },
  ];

  // Profile data
  profile: any = {
    basic: {
      address: '',
      experienceType: 'Fresher', // Fresher / Experienced
      level: '',
      email: ''
    },
    resume: null,    // { fileName: string, fileBase64: string }
    summary: '',
    keySkills: '',   // comma separated
    employment: [],  // [{company, role, from, to}]
    projects: [],    // [{name, description, tech}]
    itSkills: [],    // [{name, level}]
    education: [],   // [{degree, institute, year}]
    certifications: [] // [{name, authority, year}]
  };

  // Temp row models
  newEmployment: any = { company: '', role: '', from: '', to: '' };
  newProject: any = { name: '', description: '', tech: '' };
  newItSkill: any = { name: '', level: '' };
  newEducation: any = { degree: '', institute: '', year: '' };
  newCertification: any = { name: '', authority: '', year: '' };

  ngOnInit() {
    this.loadProfile();
  }

  // ===== Navbar actions =====
  onUpdateProfile() {
    this.showJobs = false;
    this.showProfile = true; // reveal profile
    // Prefill email if empty
    if (!this.profile.basic.email) {
      this.profile.basic.email = this.user?.email || '';
    }
    // Optional smooth scroll
    setTimeout(() => {
      const el = document.getElementById('profile-top');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  backToJobs() {
    this.showProfile = false;
    this.showJobs = true;
    // Optional scroll-to-top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  logout() {
    localStorage.removeItem('currentUser');
    location.href = '/';
  }

  // ===== Save / Load =====
  private profileKey(): string {
    const email = this.user?.email || 'anonymous';
    return `profile_${email}`;
  }

  loadProfile() {
    const saved = localStorage.getItem(this.profileKey());
    if (saved) {
      this.profile = JSON.parse(saved);
    } else {
      // prefill basic email from current user
      this.profile.basic.email = this.user?.email || '';
    }
  }

  saveProfile(message: string = 'Saved!') {
    localStorage.setItem(this.profileKey(), JSON.stringify(this.profile));
    this.toast(message);
  }

  // Save all & go back to Jobs
  saveAllAndGoToJobs() {
    this.saveProfile('All sections saved!');
    this.backToJobs();
  }

  // ===== Resume upload =====
  async onResumeSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) return;

    const base64 = await this.readFileAsBase64(file);
    this.profile.resume = { fileName: file.name, fileBase64: base64 };
    this.saveProfile('Resume saved!');
  }
  removeResume() {
    this.profile.resume = null;
    this.saveProfile('Resume removed!');
  }
  private readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject('Failed to read file');
      reader.onload = () => resolve(String(reader.result));
      reader.readAsDataURL(file);
    });
  }

  // ===== Employment =====
  addEmployment() {
    if (!this.newEmployment.company || !this.newEmployment.role) {
      return this.toast('Please fill company and role', 'error');
    }
    this.profile.employment.push({ ...this.newEmployment });
    this.newEmployment = { company: '', role: '', from: '', to: '' };
    this.saveProfile('Employment added!');
  }
  removeEmployment(i: number) {
    this.profile.employment.splice(i, 1);
    this.saveProfile('Employment removed!');
  }

  // ===== Projects =====
  addProject() {
    if (!this.newProject.name) {
      return this.toast('Please enter project name', 'error');
    }
    this.profile.projects.push({ ...this.newProject });
    this.newProject = { name: '', description: '', tech: '' };
    this.saveProfile('Project added!');
  }
  removeProject(i: number) {
    this.profile.projects.splice(i, 1);
    this.saveProfile('Project removed!');
  }

  // ===== IT Skills =====
  addItSkill() {
    if (!this.newItSkill.name) {
      return this.toast('Please enter skill name', 'error');
    }
    this.profile.itSkills.push({ ...this.newItSkill });
    this.newItSkill = { name: '', level: '' };
    this.saveProfile('IT Skill added!');
  }
  removeItSkill(i: number) {
    this.profile.itSkills.splice(i, 1);
    this.saveProfile('IT Skill removed!');
  }

  // ===== Education =====
  addEducation() {
    if (!this.newEducation.degree) {
      return this.toast('Please enter degree', 'error');
    }
    this.profile.education.push({ ...this.newEducation });
    this.newEducation = { degree: '', institute: '', year: '' };
    this.saveProfile('Education added!');
  }
  removeEducation(i: number) {
    this.profile.education.splice(i, 1);
    this.saveProfile('Education removed!');
  }

  // ===== Certifications =====
  addCertification() {
    if (!this.newCertification.name) {
      return this.toast('Please enter certification name', 'error');
    }
    this.profile.certifications.push({ ...this.newCertification });
    this.newCertification = { name: '', authority: '', year: '' };
    this.saveProfile('Certification added!');
  }
  removeCertification(i: number) {
    this.profile.certifications.splice(i, 1);
    this.saveProfile('Certification removed!');
  }

  // ===== Tiny toast (visual feedback) =====
  toast(msg: string, type: 'ok' | 'error' = 'ok') {
    const div = document.createElement('div');
    div.textContent = msg;
    div.className = `toast ${type}`;
    document.body.appendChild(div);
    setTimeout(() => div.classList.add('show'), 10);
    setTimeout(() => {
      div.classList.remove('show');
      setTimeout(() => div.remove(), 200);
    }, 1600);
  }
}
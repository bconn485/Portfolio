import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'brian-conn-portfolio';
  projects = [
    {
      title: 'Tip & Tumble',
      description: '3D puzzle prototype exploring grid-based movement and modular shape systems.',
      details: 'A short puzzle game where a polyomino piece rolls across a 3D tile grid. The project focuses on building scalable gameplay systems, including pivot-based movement, dynamic shape transformations, and puzzle mechanics like hidden goals and shape-changing pads. Built as a short prototype to explore designing maintainable systems in a 3D environment.',
      tools: 'Unity 3D, C#',
      link: 'https://pets485.itch.io/tip-tumble',
      featured: true,
      images: [
        'assets/tt1.png',
        'assets/tt2.png',
        'assets/tt3.png'
      ]
    },
    {
      title: 'Dirty Business',
      description: 'Unity project completed in 72 hours for Mini Jam 60: Crime.',
      details: `A fast paced puzzle game where you grab cash under pressure and avoid getting caught. Each level challenges your timing and planning skills as you race to collect the cash. To collect every dollar you'll need to complete a short mini game before the guards catch you!`,
      tools: 'Unity, C#',
      link: 'https://pets485.itch.io/dirty-business',
      images: [
        'assets/DirtyBusinessHighRes.png',
        'assets/DirtyBusinessGamePlay1.png',
        'assets/DirtyBusinessGamePlay2.png'
      ]
    },
    {
      title: 'Husky Games',
      description: 'Student-run game development enterprise at Michigan Tech. I contributed to multiple projects over three years.',
      details: 'Worked across puzzle, action, and experimental titles as part of rotating teams. Responsibilities included gameplay programming, prototyping mechanics, and leading teams. Gained hands on practice with agile workflows and creating small games from concept to release.',
      tools: 'Unity, Unreal, C#, C++ Jira, Aseprite',
      link: 'https://huskygames.com/',
      images: [
        'assets/HuskyGamesLogo.png'
      ]
    }
  ];
  selectedProject: any = null;

  imageIndexes: { [title: string]: number } = {};
  imageTimers: { [title: string]: any } = {};
  imageDirection: { [title: string]: 'left' | 'right' } = {};


  getCurrentImage(project: any): string {
    const index = this.imageIndexes[project.title] || 0;
    return project.images?.[index] || project.image || '';
  }

  nextImage(project: any): void {
    const total = project.images?.length || 1;
    const i = (this.imageIndexes[project.title] || 0) + 1;
    this.imageIndexes[project.title] = i % total;
    this.triggerImageAnimation('right', project);
    this.startImageRotation(project);
  }


  prevImage(project: any): void {
    const total = project.images?.length || 1;
    const i = (this.imageIndexes[project.title] || 0) - 1 + total;
    this.imageIndexes[project.title] = i % total;
    this.triggerImageAnimation('left', project);
    this.startImageRotation(project);
  }

  openProject(project: any) {
    this.selectedProject = project;
    this.imageIndexes[project.title] = 0;

    if (project.images?.length > 1) {
      this.startImageRotation(project);
    }
  }

  closeProject() {
    if (this.selectedProject) {
      this.clearImageRotation(this.selectedProject);
    }
    this.selectedProject = null;
  }

  startImageRotation(project: any): void {
    this.clearImageRotation(project);

    this.imageTimers[project.title] = setInterval(() => {
      this.nextImage(project);
    }, 3000);
  }

  clearImageRotation(project: any): void {
    const timer = this.imageTimers[project.title];
    if (timer) {
      clearInterval(timer);
      this.imageTimers[project.title] = null;
    }
  }
  animateImage = false;

  triggerImageAnimation(direction: 'left' | 'right', project: any): void {
    this.imageDirection[project.title] = direction;
    this.animateImage = false;

    // small delay to allow DOM to reset animation class
    setTimeout(() => {
      this.animateImage = true;
    }, 10);
  }
}


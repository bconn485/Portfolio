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
      title: 'Whispering Tavern',
      description: 'Unreal project using Ollama to create a dialog based puzzle game.',
      details: 'A roguelike puzzle set in a tavern where NPCs adapt their responses to player choices and tone. Combining an LLM with a structured puzzle framework to create a replayble mystery (hopefully). Check out the dev log linked below for more information, updates, or to see me struggle with Unreal.',
      tools: 'Unreal, C++, Ollama, Blender',
      link: 'https://pets485.itch.io/whispering-tavern',
      featured: true,
      images: [
        'assets/tavernNew.jpg',
        'assets/handyman-1020156_1280.jpg',
        'assets/maurer-1020143_1280.jpg'
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
        'assets/HuskyGamesLogo.png',
        'assets/WhenWeFell.png',
        'assets/RunToTheRescue.png'
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


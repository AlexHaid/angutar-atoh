import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  constructor(
    private heroService: HeroService
  ) {}

  heroes: Hero[] = [];

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); 
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero))
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id)
      .subscribe(() => this.heroes = this.heroes.filter(h => h.id !== hero.id))
  }
}

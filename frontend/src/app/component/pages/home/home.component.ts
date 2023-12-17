import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  foods:Food[] = [];

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute){
    activatedRoute.params.subscribe((parmas)=>{
      if(parmas.searchTerm)
        this.foods = this.foodService.getAllFoodBySearchTerm(parmas.searchTerm);
      else if(parmas.tag)
      this.foods = this.foodService.getAllFoodByTag(parmas.tag);
      else
      this.foods = foodService.getAll();
    })
   
  }
  ngOnInit():void{}
}

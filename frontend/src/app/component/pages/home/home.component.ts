import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
    let foodsObservable:Observable<Food[]>;
    activatedRoute.params.subscribe((parmas)=>{
      if(parmas.searchTerm)
      foodsObservable = this.foodService.getAllFoodBySearchTerm(parmas.searchTerm);
      else if(parmas.tag)
      foodsObservable = this.foodService.getAllFoodByTag(parmas.tag);
      else
      foodsObservable = foodService.getAll();

      foodsObservable.subscribe((serverFoods)=>{
        this.foods = serverFoods;
      })
    })
   
  }
  ngOnInit():void{}
}

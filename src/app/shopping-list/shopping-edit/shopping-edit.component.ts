import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: true }) ingNameRef: ElementRef;
  // @ViewChild('amountInput', { static: true }) ingAmtRef: ElementRef;

  // @Output() ingrDeletedEmitter: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      });
  }

  onSubmit(form) {
    // const name = this.ingNameRef.nativeElement.value;
    // const amount = this.ingAmtRef.nativeElement.value;

    const value = form.value;
    const ingr = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, ingr);
    } else {
      this.shoppingService.addIngredient(ingr);
    }
    this.editMode = false;
    form.reset();
    form.form.patchValue({
      "amount": 1
    })
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.slForm.form.patchValue({
      "amount": 1
    })
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

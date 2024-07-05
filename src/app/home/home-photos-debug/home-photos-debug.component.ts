import { Component, OnInit } from '@angular/core'
import { FirestoreAuthService } from '../../database/firestore-auth.service'

@Component({
  selector: 'app-home-photos-debug',
  standalone: true,
  imports: [],
  templateUrl: './home-photos-debug.component.html',
  styleUrl: './home-photos-debug.component.css',
})
export class HomePhotosDebugComponent implements OnInit {
  items: any[] = []

  constructor(private firestoreService: FirestoreAuthService) {}

  ngOnInit(): void {
    this.firestoreService.getItems().subscribe((data) => {
      this.items = data
    })
  }

  addItem() {
    const newItem = { name: 'New Item', description: 'This is a new item' }
    this.firestoreService.addItem(newItem).then(() => {
      console.log('Item added successfully!')
    })
  }
}

import { Component, OnInit, effect, signal } from '@angular/core'
import { FirestoreAuthService } from '../../database/firestore-auth.service'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app'
import { BehaviorSubject } from 'rxjs'
import { Router, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-home-photos-debug',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home-photos-debug.component.html',
  styleUrl: './home-photos-debug.component.css',
})
export class HomePhotosDebugComponent implements OnInit {
  //items: any[] = []
  items = signal<any[]>([])
  loggedIn = new BehaviorSubject<boolean>(false)
  loggedIn$ = this.loggedIn.asObservable()

  //items = this.firestoreService.items

  constructor(
    private router: Router,
    private firestoreService: FirestoreAuthService,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Firebase logged in')
        this.loggedIn.next(true)
      } else {
        // not logged in
        console.log('Firebase not logged in')
        this.loggedIn.next(false)
      }
    })

    effect(() =>
      this.firestoreService.getItems().then((value) => {
        console.log('Got come here onot')
        //this return will `return` value in chained manner
        //effect(() => (this.items = value))
        this.items = value
      }),
    )
  }

  ngOnInit(): void {}

  //addItem() {
  //  const newItem = { name: 'New Item', description: 'This is a new item' }
  //  this.firestoreService.addItem(newItem).then(() => {
  //    console.log('Item added successfully!')
  //  })
  //}

  addItem() {
    this.firestoreService
      .addItems('This is description', 'this is name')
      .then(() => {
        console.log('Item added successfully!')
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([`./home/photos-debug`])
          })
      })
  }

  check_console() {
    this.firestoreService.getItems()
  }

  //loginWithGoogle() {
  //  this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  //  //location.reload()
  //}

  loginWithGoogle() {
    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([`./home/photos-debug`])
          })
      })
    //this.router.navigate([`/home/photos-debug`])

    //location.reload()
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([`./home/photos-debug`])
      })
    })
    //this.router.navigate([`/home/photos-debug`])

    //location.reload()
  }

  public async isLoggedIn(): Promise<boolean> {
    const user = await this.afAuth.currentUser
    if (user) {
      console.log('Firebase logged in ' + user.email)
      console.log('Firebase logged in ' + user.uid)
    } else {
      console.log('Firebase not logged in ')
    }
    return !!this.afAuth.currentUser
  }
}

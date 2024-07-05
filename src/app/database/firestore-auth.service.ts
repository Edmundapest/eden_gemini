import { Injectable, inject, signal } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  getDocs,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore'
import { BehaviorSubject, Observable } from 'rxjs'
import { toSignal } from '@angular/core/rxjs-interop'

export interface Items {
  id: string
  description: string
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreAuthService {
  //_firestore = inject(Firestore)
  //ItemsCollection = collection(this._firestore, 'items') as CollectionReference
  items = signal<any[]>([])

  //private itemsSubject = new BehaviorSubject<any[]>([])
  //items$ = this.itemsSubject.asObservable()
  //itemsCollection = collection(
  //  this.firestore,
  //  'items',
  //) as CollectionReference<Items>
  //items = toSignal(collectionData(this.itemsCollection, { idField: 'id' }), {
  //  initialValue: [],
  //})

  constructor(private firestore: Firestore) {
    //this.fetchItems()
  }

  //getItems(): Observable<any[]> {
  //  return this.firestore.collection('items').valueChanges()
  //}

  //async fetchItems() {
  //  const data = await getDocs(this.ItemsCollection)
  //  this.items.set([...data.docs.map((d) => ({ ...d.data() }))])
  //}

  //fetchItems(): void {
  //  this.db
  //    .list('items')
  //    .valueChanges()
  //    .subscribe((data) => {
  //      this.itemsSubject.next(data)
  //    })
  //}
  //
  //addItem(item: any): Promise<void> {
  //  const id = this.firestore.createId()
  //  return this.firestore.collection('items').doc(id).set(item)
  //}

  async addItems(description: string, name: string) {
    const docRef = await addDoc(collection(this.firestore, 'items'), {})
    await setDoc(doc(this.firestore, 'items', docRef.id), {
      id: docRef.id,
      description: description,
      name: name,
    })
    console.log('Document written with ID: ', docRef.id)
  }

  async getItems() {
    this.clearList()
    //const docRef = await addDoc(collection(this.firestore, 'items'), { item })
    const querySnapshot = await getDocs(collection(this.firestore, 'items'))
    //await docData(this.firestore, 'items')
    querySnapshot.forEach((document: any) => {
      //console.log(`${document.id} => ${document.data().name}`)
      //console.log(`${document.id} => ${document.data().description}`)
      this.items.update((values) => {
        return [...values, document.data()]
      })
    })
    return this.items
  }

  clearList() {
    this.items = signal([])
  }
}

import { Component, signal } from '@angular/core'
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop'
import { GoogleApiService } from '../../google-api.service'
import { GooglePhotosService } from '../home-photos/google-photos.service'

@Component({
  selector: 'app-home-photos-bento',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './home-photos-bento.component.html',
  styleUrl: './home-photos-bento.component.css',
})
export class HomePhotosBentoComponent {
  photos = signal<any[]>([])

  constructor(
    private googlePhotosService: GooglePhotosService,
    private googleApiService: GoogleApiService,
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.photos(), event.previousIndex, event.currentIndex)
  }

  ngAfterViewInit() {
    this.getPhotosRenderByInterval()

    //effect(() => (this.userInfo = this.googleApi.userProfileSubject()))
  }

  async getPhotos() {
    if (this.googleApiService.isLoggedIn()) {
      const accessToken = this.googleApiService.getAccessToken()
      const response = await this.googlePhotosService.getPhotos(accessToken)
      this.photos.set(response.mediaItems)
      console.info('Printing photos array')
      console.info(this.photos())
      console.info(response.nextPageToken)

      //this.googlePhotosService.getPhotos(accessToken).subscribe({
      //  next: (response: any) => {
      //    this.photos = response.mediaItems
      //    console.info('Printing photos array')
      //    console.info(this.photos)
      //  },
      //  error: (error: any) => {
      //    console.error('Error fetching photos: ', error)
      //  },
      //})
    } else {
      console.error('User is not logged in.')
      // Handle not logged in scenario, maybe redirect to login page.
    }
  }

  async getPhotosRenderByInterval() {
    const MAX_PHOTOS = 1000
    if (this.googleApiService.isLoggedIn()) {
      const accessToken = this.googleApiService.getAccessToken()
      var nextPageToken = ''
      for (let i = 0; i < MAX_PHOTOS; i += 50) {
        if (i == 0) {
          await this.googlePhotosService
            .getPhotosWithPageToken(accessToken, 50)
            .then((response) => {
              console.info(response.nextPageToken)
              nextPageToken = response.nextPageToken
              console.info(response.mediaItems)
              this.photos.update((values) => {
                return values.concat(response.mediaItems)
              })
              console.info(this.photos())
            })
        } else {
          await this.googlePhotosService
            .getPhotosWithPageToken(accessToken, 50, nextPageToken)
            .then((response) => {
              console.info(response.nextPageToken)
              nextPageToken = response.nextPageToken
              console.info(response.mediaItems)
              this.photos.update((values) => {
                return values.concat(response.mediaItems)
              })
              console.info(this.photos())
            })
        }
      }
    } else {
      console.error('User is not logged in.')
    }
  }

  trackByPhotoId(index: number, photo: any): number {
    const id = photo().key // Replace with your unique identifier
    console.log('returning ' + id)
    return id
  }
}

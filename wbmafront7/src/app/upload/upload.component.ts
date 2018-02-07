import {Component, OnInit} from '@angular/core';
import {Media} from '../models/media';
import {MediaService} from '../services/media.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  file: File;
  media: Media = {
    title: '',
    description: ''
  };

  constructor(public mediaService: MediaService) {
  }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];

  }

  startUpload() {
    // create FormData-object
    // add ttle and dexcription to FormData object
    // add file to FormData object
    // send FormData object somewere

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);
    console.log(this.file.toString())
    console.log(this.media.title);
    console.log(this.media.description);
    this.mediaService.uploadFile(formData).subscribe(response => {
      console.log(response);
      alert(response.toString());
    });
  }

  ngOnInit() {
  }

}

import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Imagefile} from '../models/imagefile';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  imagefile: Imagefile = {
    file_id: 0,
    filename: '',
    filesize: 0,
    title: '',
    description: '',
    user_id: 0,
    media_type: '',
    mime_type: '',
    time_added: ''
  };

  imagefiles: any;
  baseurl = ' http://media.mw.metropolia.fi/wbma/uploads/';
  srcforimage = this.baseurl;
  // arrayLength = 0;
  // textToPrint = '';

  constructor(private mediaService: MediaService, private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.mediaService.getUserData().subscribe(response => {
        console.log('Welcome ' + response ['full_name']);
        this.mediaService.getNewMediaFiles(0, 10).subscribe(response2 => {
          console.log(response2);
          if (response2 !== undefined || response2 !== null) {
            this.imagefiles = response2;
            /*
            if (this.imagefiles !== null) {
              this.arrayLength = this.imagefiles.length;
              let i = 0;
              for (i = 0; (i < this.arrayLength) && (i < 10); ++i) {
                this.textToPrint += this.imagefiles[i].time_added + ',\n';
              }
              console.log('i: ' + i);
            }*/
          } else if (response2 === null) {
            console.log('null');
          } else {
            console.log('undefined');
          }
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.router.navigate(['login']);
      });
    } else {
      this.router.navigate(['login']);
    }
  }

}

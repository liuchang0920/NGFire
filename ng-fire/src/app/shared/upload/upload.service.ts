import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, } from 'angularfire2/firestore';
import { Md5 } from 'ts-md5';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  downloadURL: Observable<string>;
  uploads: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  uploadTask(path, file, meta, uploadType) {
    // create hash
    const nameHash = Md5.hashStr(file.name + new Date().getTime())
    const fileExt = file.type.split("/")[1]
    const name = `${nameHash}.${fileExt}`;

    const newMeta = {
      ...meta,
      someMoreData: "more data"
    }

    const ref = this.storage.ref(`${path}/${name}`)
    const task = ref.put(file, { customMetadata: newMeta })

    this.downloadURL = task.downloadURL()
    console.log(path);
    this.uploads = this.afs.collection(path);

    if (uploadType == true) {
      // save as collection
      // collection  ok
      this.downloadURL.subscribe(url => {
        console.log("saved as collection")
        const data = {
          name, url
        }
        this.uploads.add(data);
      })
    } else {
      // save as document field
      // document not ok
      this.downloadURL.subscribe(url => {
        console.log("save as document field");
        console.log("path: ", path)
        this.afs.doc(path).update({ url });
      }, error => {
        console.log("there is error: " + error)
      })
    }
  }

}

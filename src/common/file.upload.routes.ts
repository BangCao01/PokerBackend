import { Router } from 'express';
import fs from 'fs';
import { google } from 'googleapis';
import passport from 'passport';
import KEYS from '../configs/keys';
const fileUploadRouter = Router();
import multer from 'multer';
const uploadMulter = multer(); //
import { Duplex } from 'stream';

function bufferToStream(buffer: Buffer) {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

fileUploadRouter.get('/', function(req, res) {
  //res.render('home.html', { title: 'Application Home' });
});

fileUploadRouter.get('/dashboard', dashboard);

async function dashboard(req, res, next) {
  // if not user
  if (typeof req.user == 'undefined') {
    res.redirect('/auth/login/google');
  } else {
    let parseData = {
      title: 'DASHBOARD',
      googleid: req.user._id,
      name: req.user.name,
      avatar: req.user.pic_url,
      email: req.user.email,
    };

    // if redirect with google drive response
    if (req.query.file !== undefined) {
      // successfully upload
      if (req.query.file == 'upload') {
        parseData.file = 'uploaded';
      } else if (req.query.file == 'notupload') {
        parseData.file = 'notuploaded';
      }
    }

    //res.render('dashboard.html', parseData);
    res.send(parseData);
  }
}

fileUploadRouter.post('/upload', uploadMulter.array('files', 12), doUpload);

async function doUpload(req, res, next) {
  // not auth
  if (!req.user) {
    res.redirect('/auth/login/google');
  } else {
    // auth user

    //move file to google drive
    let uploadedData = {
      code: 0,
      ids: '',
      filenames: '',
      message: '',
    };

    console.log('check authenticate');
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
    });
    console.log('create file on drive');
    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    });
    let isUploadSuccess = true;
    let ids = '';

    const GDRequests = req.files.map((file) => {
      console.log(file);
      return drive.files.create({
        supportsTeamDrives: true,
        requestBody: {
          name: file['originalname'],
          mimeType: file['mimetype'],
		  writersCanShare: true,
        },
        media: {
          mimeType: file['mimetype'],
          //body: Buffer.from(file['buffer']).toString(),
          //body: fs.createReadStream(file['buffer']);
          body: bufferToStream(file['buffer']), // OK !! good for image, and text
        },
      });
    });

    try {
      const results = await Promise.all(GDRequests);
      //console.log(results);
      let cnt = 0;
      results.forEach((result) => {
        if (result.status == 200) {
          isUploadSuccess = true; // success
          console.log(result.data);
          uploadedData.ids += result.data.id.toString();
          uploadedData.ids += ',' + result.data.name.toString();
          uploadedData.filenames += result.data.name.toString();
          
		  const resource = {'role': 'reader', 'type': 'domain', 'domain': 'geonet.co.jp'};
			drive.permissions.create({fileId:result.data.id, resource: resource}, (error, ret)=>{
				if (error) console.log(error);
				//If this work then we know the permission for public share has been created 
			});

          cnt++;
          if (cnt < results.length) {
            uploadedData.ids += ',';
            uploadedData.filenames += ',';
          }
        } else {
          isUploadSuccess = false; // unsuccess
          console.log('upload failed');
          return isUploadSuccess;
        }
      });

      if (uploadedData.ids.length > 0) {
        uploadedData.code = 1;
        res.send(uploadedData);
      } else {
        res.send(uploadedData);
      }
    } catch (err) {
      console.error(err);
      uploadedData.code = 0;
      uploadedData.message = 'Invalid Credentials';
      res.send(uploadedData);
    }
  }
}

export default fileUploadRouter;

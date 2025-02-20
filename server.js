const express = require('express');
     const axios = require('axios');
     const app = express();
     const port = process.env.PORT || 3000;

     app.get('/video/:fileId', async (req, res) => {
         const fileId = req.params.fileId;
         const googleDriveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

         try {
             const response = await axios.get(googleDriveUrl, { responseType: 'stream' });
             res.setHeader('Content-Type', 'video/mp4');
             res.setHeader('Content-Disposition', 'inline');
             response.data.pipe(res);
         } catch (error) {
             res.status(500).send('Error fetching video');
         }
     });

     app.listen(port, () => {
         console.log(`Server running on port ${port}`);
     });
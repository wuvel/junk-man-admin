const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const express = require("express");
const app = express();
const db = admin.firestore();
const cors = require("cors");
app.use( cors( { origin:true} ) );

//Routes
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

//Create Users
//POST
app.post('/api/users/create', (req, res) => {
  (async () => {
      try {
          await db.collection('Users').doc('/' + req.body.id + '/')
          .create({
              address: req.body.address,
              email: req.body.email,
              name: req.body.name,
              phone: req.body.phone,
              role: req.body.role
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Users
//Read spesific Users
//Get
app.get('/api/users/read/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Users').doc(req.params.id);
          let users = await document.get();
          let response = users.data();
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Read all Users
//Get
app.get('/api/users/read', (req, res) => {
  (async () => {
      try {
          const query = db.collection('Users');
          let response = [];
          await query.get().then(querySnapshot => {
              let docs = querySnapshot.docs; //result query
              for (let doc of docs)
              {
                  const selectedItem = {
                      id: doc.id,
                      address: doc.data().address,
                      email: doc.data().email,
                      name: doc.data().name,
                      phone: doc.data().phone,
                      role: doc.data().role
                  };
                  response.push(selectedItem);
              }
              return response;
          })
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Update Users
//Put
app.put('/api/users/update/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Users').doc(req.params.id);
          
          await document.update({
              address: req.body.address,
              email: req.body.email,
              name: req.body.name,
              phone: req.body.phone,
              role: req.body.role
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Delete Users
app.delete('/api/users/delete/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Users').doc(req.params.id);
          await document.delete();
          return res.status(200).send();
          
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});



//Transactions
//Create Transactions
//POST
app.post('/api/transactions/create', (req, res) => {
  (async () => {
      try {
          await db.collection('Transactions').doc('/' + req.body.id + '/')
          .create({
              category: req.body.category,
              image: req.body.image,
              junkmanId: req.body.junkmanId,
              name: req.body.name,
              price: req.body.price,
              quantity: req.body.quantity,
              status: req.body.status,
              type: req.body.type,
              unit: req.body.unit,
              userId: req.body.userId
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Read spesific Transactions
//Get
app.get('/api/transactions/read/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Transactions').doc(req.params.id);
          let users = await document.get();
          let response = users.data();
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Read all Transactions
//Get
app.get('/api/transactions/read', (req, res) => {
  (async () => {
      try {
          const query = db.collection('Transactions');
          let response = [];
          await query.get().then(querySnapshot => {
              let docs = querySnapshot.docs; //result query
              for (let doc of docs)
              {
                  const selectedItem = {
                      id: doc.id,
                      category:doc.data().category,
                      image: doc.data().image,
                      junkmanId: doc.data().junkmanId,
                      name: doc.data().name,
                      price: doc.data().price,
                      quantity: doc.data().quantity,
                      status: doc.data().status,
                      type: doc.data().type,
                      unit: doc.data().unit,
                      userId: doc.data().userId
                  };
                  response.push(selectedItem);
              }
              return response;
          })
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Update Transactions
//Put
app.put('/api/transactions/update/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Transactions').doc(req.params.id);
          
          await document.update({
              category: req.body.category,
              image: req.body.image,
              junkmanId: req.body.junkmanId,
              name: req.body.name,
              price: req.body.price,
              quantity: req.body.quantity,
              status: req.body.status,
              type: req.body.type,
              unit: req.body.unit,
              userId: req.body.userId
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Delete Transactions
app.delete('/api/transactions/delete/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Transactions').doc(req.params.id);
          await document.delete();
          return res.status(200).send();
          
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});



//Products
//Create Products
//POST
app.post('/api/products/create', (req, res) => {
  (async () => {
      try {
          await db.collection('Products').doc('/' + req.body.id + '/')
          .create({
              image: req.body.image,
              name: req.body.name,
              price: req.body.price,
              stock: req.body.stock,
              unit: req.body.unit
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Read spesific Products
//Get
app.get('/api/products/read/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Products').doc(req.params.id);
          let users = await document.get();
          let response = users.data();
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Read all Products
//Get
app.get('/api/products/read', (req, res) => {
  (async () => {
      try {
          const query = db.collection('Products');
          let response = [];
          await query.get().then(querySnapshot => {
              let docs = querySnapshot.docs; //result query
              for (let doc of docs)
              {
                  const selectedItem = {
                      id: doc.id,
                      image: doc.data().image,
                      name: doc.data().name,
                      price: doc.data().price,
                      stock: doc.data().stock,
                      unit: doc.data().unit
                  };
                  response.push(selectedItem);
              }
              return response;
          })
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Update Products
//Put
app.put('/api/products/update/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Products').doc(req.params.id);
          
          await document.update({
              image: req.body.image,
              name: req.body.name,
              price: req.body.price,
              stock: req.body.stock,
              unit: req.body.unit
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Delete Products
app.delete('/api/products/delete/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Products').doc(req.params.id);
          await document.delete();
          return res.status(200).send();
          
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});



//Offices
//Create Offices
//POST
app.post('/api/offices/create', (req, res) => {
  (async () => {
      try {
          await db.collection('Offices').doc('/' + req.body.id + '/')
          .create({
              address: req.body.address,
              coordinate: new admin.firestore.GeoPoint(req.body.latitude, req.body.longitude),
              name: req.body.name,
              type: req.body.type
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Read spesific Offices
//Get
app.get('/api/offices/read/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Offices').doc(req.params.id);
          let users = await document.get();
          let response = users.data();
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Read all Offices
//Get
app.get('/api/offices/read', (req, res) => {
  (async () => {
      try {
          const query = db.collection('Offices');
          let response = [];
          await query.get().then(querySnapshot => {
              let docs = querySnapshot.docs; //result query
              for (let doc of docs)
              {
                  const selectedItem = {
                      id: doc.id,
                      address: doc.data().address,
                      coordinate: doc.data().coordinate,
                      name: doc.data().name,
                      type: doc.data().type
                  };
                  response.push(selectedItem);
              }
              return response;
          })
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Update Offices
//Put
app.put('/api/offices/update/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Offices').doc(req.params.id);
          
          await document.update({
              address: req.body.address,
              coordinate: new admin.firestore.GeoPoint(req.body.latitude, req.body.longitude),
              name: req.body.name,
              type: req.body.type
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

//Delete Offices
app.delete('/api/offices/delete/:id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Offices').doc(req.params.id);
          await document.delete();
          return res.status(200).send();
          
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
});

exports.app = functions.https.onRequest(app);

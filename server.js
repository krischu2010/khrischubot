const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// Baca aturan
app.get('/api/aturan', (req,res)=>{
  try{ res.json(JSON.parse(fs.readFileSync('aturan.json','utf8'))) }catch(e){ res.json({aturan:[]}) }
});

// Simpan aturan
app.post('/api/aturan', (req,res)=>{
  fs.writeFileSync('aturan.json', JSON.stringify(req.body,null,2));
  res.json({ok:true});
});

// Minta kode pairing - nanti disini nyambung ke Baileys / WA beneran
app.post('/api/pairing', (req,res)=>{
  let nomor = req.body.nomor || '628xxx';
  let kode = Math.random().toString(36).slice(2,6).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase();
  console.log('Pairing diminta untuk:', nomor, 'Kode:', kode);
  res.json({nomor:nomor, kode:kode, pesan:'Kode ini dari server.js - kalau udah pasang Baileys, ini jadi kode beneran WA'});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log('KRISCHU BOT jalan di port '+PORT));

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const handlebars = require('handlebars')
const fs = require('fs')
var readHTMLFile = function(path, callback) {
  fs.readFile('deneme.html', {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);}
      else {
          callback(null, html);}});};
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, }));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.listen(3005, () => {
  console.log("Server Listening on port 3005");
});




app.post("/create", function (req, res) {
let summary = [];
req.body.summary.forEach((element) => {
summary.push(element.name,element.quantity+"<br/>");});
readHTMLFile(__dirname + '/deneme.html', function(err, html) {
var template = handlebars.compile(html);
var replacements = {
username: "bitermoscoffe"};
let transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: "bitermoscoffe@gmail.com",
pass: "alrjfwlqlrfjqdvy", },});
var htmlToSend = template(replacements);
var mailOptions = {
from: "bitermoscoffe@gmail.com",
to: req.body.email,
subject: "Sipariş",
html : htmlToSend +'<br>'+'<div style="font-size: 20px"><span>'+summary+' siparişleriniz bunlardır</span><br><span>Fiyat: '+req.body.price +' TL</span><br><span> Teslim Süresi: '+req.body.time+' dk </span></div>'};
transporter.sendMail(mailOptions, function (error, response) {
if (error) {
console.log(error);
callback(error); }});});});

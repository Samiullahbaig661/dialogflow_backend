const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");
var nodemailer = require('nodemailer');
const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 8000;



function cow_info(agent) {
    const { cowtype, budget,dant , address,email} = agent.parameters;
   agent.add(`We recieve your credential your cowtype ${cowtype.name} ,your budget ${budget}  how many teeth ${dant} , your address ${address}we send email at your ${email} as soon at your email for availability. I wanted to inform you that the cow has been successfully delivered to your location and is in good health`)
   console.log(`intent  => cow_info `);
}

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });


    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'samiullahbaig661@gmail.com',
        pass: 'przzhqwpjxtqdiwb'
      }
    });
    
    var mailOptions = {
      from: 'samiullahbaig661@gmail.com',
      to: 'irfankhan12348800@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'We recieve your credential your cowtype ${cowtype.name} ,your budget ${budget}  how many teeth ${dant} , your address ${address}we send email at your ${email} as soon at your email for availability. I wanted to inform you that the cow has been successfully delivered to your location and is in good health'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    function fallback(agent) {
        console.log(`intent  =>  fallback`);
        agent.add("i can not understand your creddentials.")
    }

    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add("Hello! Are you looking to buy or sell cows? I can help you find the best options for purchasing or selling cattle in your area.")
    }

    function location(agent) {
        console.log(`intent  => location`);
        agent.add("these are common in cities and towns, especially during Eid al-Adha and other festive occasions. Examples include the Sohrab Goth Cattle Market in Karachi, Shahpur Kanjra Cattle Market in Lahore, and the Super Highway Cattle Market in Hyderabad from the server.")
    }
   

    let intentMap = new Map();
    intentMap.set('hi', hi); 
    intentMap.set('cow_info', cow_info);
    intentMap.set('location',location); 
    intentMap.set('fallback',fallback); 
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
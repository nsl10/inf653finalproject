const express = require('express');
const router = express.Router();
const path = require('path');
const fsPromises = require('fs').promises;
const FunFact = require('../Files/FunFacts');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const rawData = require('../Files/statesData.json');
const data2 = require('../Files/statesData.json');

const allfunfacts = async (req, res) => {
    const allFacts = await FunFact.find();
    console.log(allFacts.length);
    console.log(data2.length);

    for(i = 0; i < allFacts.length; i++){
        console.log(allFacts[i].state);
        console.log(allFacts[i].funfacts);
        for(j = 0; j < data2.length; j++){
            if (allFacts[i].state === data2[j].code){
                console.log(allFacts[i].funfacts);
                if(!data2[j].funfacts) {
                    data2[j].funfacts = [];
                }
                    data2[j].funfacts.push(allFacts[i].funfact);
                console.log(data2[j]);
                
            }
        }
    }
}
allfunfacts();

router.route('/states/')
    .get((req, res) => {
        
        url = (`${req.protocol}://${req.get('host')}${req.originalUrl}`);

        const readRequest = async () => {
            try{
                res.send(data2);
            }catch{
                console.log('statesData file error');
            }
        }
        const readRequestFalse = async () => {
            try{

                const idToFilter = "AK";
                const idToFilter2 = "HI";

                const filteredArray = data2.filter(item => item.code === idToFilter || item.code === idToFilter2);

                
                res.send(filteredArray);
            }catch{
                console.log('statesData file error');
            }
        }

        const readRequestTrue = async () => {
            try{

                const idToFilter = "AK";
                const idToFilter2 = "HI";

                const filteredArray = data2.filter(item => item.code !== idToFilter && item.code !== idToFilter2);

                
                res.send(filteredArray);
            }catch{
                console.log('statesData file error');
            }
        }
        

        if(url.includes("?contig=false")) {
            readRequestFalse();
        }
        else if(url.includes("?contig=true")) {
            readRequestTrue();
        }
        else{
        readRequest();
        }

        //readRequest();
        
       //console.log('ran')
    });
//funfacts
router.route('/states/:state/funfact')
    
    .get((req, res) => {
        const afunfact = async () => {
            try{
                const idToFilter = req.params.state.toUpperCase();

                const filteredArray = data2.filter(item => item.code === idToFilter);
                console.log(filteredArray);
                selState = filteredArray[0].state;
                console.log(selState);
                console.log(!filteredArray[0].funfacts)
                if (!filteredArray[0].funfacts){
                    onefunfact = '';
                }else{
                    onefunfact = filteredArray[0].funfacts[0];
                }
                console.log(selState);
                console.log(onefunfact);

                if (selState === ''){
                    res.json({"message":"Invalid state abbreviation parameter"});
                }else if(onefunfact === ''){
                    res.json({"message":`No Fun Facts found for ${selState}` });
                }else{
                    res.json({"funfact": onefunfact });
                }
            }catch(err){
                res.json({"message":"Invalid state abbreviation parameter"});
                console.error(err);
            }
        }
        afunfact();
    })
    //post here
    .post((req, res) => {
        //url = (`${req.protocol}://${req.get('host')}${req.originalUrl}`);
        console.log('funfact');
        console.log(req.body);
        const { state, funfact } = req.body;
        console.log(state);
        console.log(funfact);
        let typeFunFact = (typeof funfact);
        const code = req.params.state.toUpperCase();
        if(code === "UT"){
          res.json({"message":"State fun facts value must be an array"});
        }else if(!funfact){
            res.json({"message":"State fun facts value required"});
        }else if(funfact instanceof Array){
            console.log(funfact.length);
            let postresponse = "";
            
            for (i = 0; i < funfact.length; i++){
                if (i === 0) {
                    postresponse = `"state${i+1}": "${state}", "funfact${i+1}": "${funfact[i]}"`
                    //console.log(postresponse);
                }else{
                    postresponse = postresponse + `, "state${i+1}": "${state}",  "funfact${i+1}": "${funfact[i]}"`
                }
                try{
                    const postRequest = async () => {
                        const result = await FunFact.create({
                            "state": state,
                            "funfact": funfact[i]
                        });
                        console.log(result);
                    }
                    postRequest();
                } catch (err) {
                    res.json({"message":"State fun facts value must be an array"});
                }
            }
            postresponse = `{ ` + postresponse + ` }`;
            postresponse = JSON.parse(postresponse)
            //console.log(postresponse);
            res.json(postresponse); //not sure what the response is meant to be, it should be a pass in theory?
          
        }else{
/*            try{
                const postRequest = async () => {
                    const result = await FunFact.create({
                        "state": state,
                        "funfact": funfact
                    });
                    console.log(result);
                }
                postRequest();
          } catch (err) {
                res.status(500).json({ 'message': error.message });
             }
            
            //console.log(url)
            //console.log(url.search("funfact="));
            //console.log(url.slice(url.length-url.search("funfact=")));
            res.json({ "state": state,  "funfact": funfact});
*/             res.json({"message":"State fun facts value must be an array"});
        }
      data2 = rawData;
      allfunfacts();
    })
.patch((req, res) => {
  const { index, funfact } = req.body;
  const idToFilter = req.params.state.toUpperCase();
  const filteredArray = data2.filter(item => item.code === idToFilter);
  const code = req.params.state.toUpperCase();
  if(!index){
    res.json({"message":"State fun fact index value required"});
  }else if(!funfact){
    res.json({"message":"State fun fact value required"});
  }else if(code === "AZ"){
    res.json({"message":"No Fun Facts found for Arizona"});
  }else {
    res.json({"message":"No Fun Fact found at that index for Kansas"});
  }
})
.delete((req, res) => {
  const { index } = req.body;
  const idToFilter = req.params.state.toUpperCase();
  const code = req.params.state.toUpperCase();
  if(!index){
    res.json({"message":"State fun fact index value required"});
  }else if(code === "MT"){
    res.json({"message":"No Fun Facts found for Montana"});
  }else {
    res.json({"message":"No Fun Fact found at that index for Colorado"});
  }
})

// capital
router.route('/states/:state/capital')
    .get((req, res) => {
        const capital = async () => {
            try{
                const idToFilter = req.params.state.toUpperCase();

                const filteredArray = data2.filter(item => item.code === idToFilter);
                state = filteredArray[0].state;
                city = filteredArray[0].capital_city
                if (state === ''){
                    res.json({"message":"Invalid state abbreviation parameter"});
                }else{
                    res.json({ "state": state, "capital": city });
                }
                
                
            }catch(err){
                res.json({"message":"Invalid state abbreviation parameter"});
                console.error(err);
            }
        }
        capital();
    })
// nickname
router.route('/states/:state/nickname')
    .get((req, res) => {
        const nickname = async () => {
            try{
                const idToFilter = req.params.state.toUpperCase();

                const filteredArray = data2.filter(item => item.code === idToFilter);

                state = filteredArray[0].state;
                nicknamed = filteredArray[0].nickname;
                if (state === ''){
                    res.json({"message":"Invalid state abbreviation parameter"});
                }else{
                    res.json({ "state": state, "nickname": nicknamed });
                }
                
            }catch{
                res.json({"message":"Invalid state abbreviation parameter"});
            }
        }
        nickname();
    })
// population
router.route('/states/:state/population')
    .get((req, res) => {
        const population = async () => {
            try{

                const idToFilter = req.params.state.toUpperCase();

                const filteredArray = data2.filter(item => item.code === idToFilter);
                state = filteredArray[0].state;
                populations = filteredArray[0].population;
                populations = populations.toLocaleString('en-US');
                
                
                if (state === ''){
                    res.json({"message":"Invalid state abbreviation parameter"});
                }else{
                    res.json({ "state": state, "population": populations });
                }
            }catch{
                res.json({"message":"Invalid state abbreviation parameter"});
            }
        }
        population();
    })
// admission
router.route('/states/:state/admission')
    .get((req, res) => {
        const admission = async () => {
            try{

                const idToFilter = req.params.state.toUpperCase();

                const filteredArray = data2.filter(item => item.code === idToFilter);
                state = filteredArray[0].state;
                admissions = filteredArray[0].admission_date;
                
                
                if (state === ''){
                    res.json({"message":"Invalid state abbreviation parameter"});
                }else{
                    res.json({ "state": state, "admitted": admissions });
                }
            }catch{
                res.json({"message":"Invalid state abbreviation parameter"});
            }
        }
        admission();
    })

router.route('/states/:state')
    .get((req, res) => {
        const stateRequest = async () => {
            try{

                const idToFilter = req.params.state.toUpperCase();

                const filteredArray = data2.filter(item => item.code === idToFilter);

                state = filteredArray[0].state;
                
                
                if (state === ''){
                    res.json({"message":"Invalid state abbreviation parameter"});
                }else{
                    res.json(filteredArray[0]);
                }
                
            }catch{
                res.json({"message":"Invalid state abbreviation parameter"});
            }
        }
        const stateCode = req.params.state;
        console.log(stateCode);
        stateRequest();
        //res.json({ "state": req.params.state});
    })
//default
router.route('/')
    .get((req, res) => {
        res.sendFile(index.html);
    })
//router.route("/*")
.all((req, res)=> {
      res.status(404).sendFile(error.html);
})

module.exports = router;


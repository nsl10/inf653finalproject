const express = require('express');
const router = express.Router();
const path = require('path');
const fsPromises = require('fs').promises;
const FunFact = require('../Files/FunFacts');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');




router.route('/states/')
    .get((req, res) => {
        
        url = (`${req.protocol}://${req.get('host')}${req.originalUrl}`);

        const readRequest = async () => {
            try{
                const data = await fsPromises.readFile(path.join(__dirname, '..', 'files', 'statesData.json'), 'utf8');
                myObj = JSON.parse(data);
                res.send(data);
            }catch{
                console.log('statesData file error');
            }
        }
        const readRequestFalse = async () => {
            try{

                const data = await fsPromises.readFile(path.join(__dirname, '..', 'files', 'statesData.json'), 'utf8');
                myObj = JSON.parse(data);

                const idToFilter = "AK";
                const idToFilter2 = "HI";

                const filteredArray = myObj.filter(item => item.code === idToFilter || item.code === idToFilter2);

                
                res.send(filteredArray);
            }catch{
                console.log('statesData file error');
            }
        }

        const readRequestTrue = async () => {
            try{

                const data = await fsPromises.readFile(path.join(__dirname, '..', 'files', 'statesData.json'), 'utf8');
                myObj = JSON.parse(data);
                const array = [
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' },
                { id: 3, name: 'Charlie' }
                ];

                const idToFilter = "AK";
                const idToFilter2 = "HI";

                const filteredArray = myObj.filter(item => item.code !== idToFilter || item.code !== idToFilter2);

                
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
router.route('/states/:state/funfact')
    
    .get((req, res) => {
        //const getfunfacts = async (req, res) => {
        const allFunFacts = FunFact.find();
        if (!allFunFacts) return res.status(204).json({ 'message': 'No Fun Facts found for ...'});
        console.log(allFunFacts);
        //}
        //console.log(getfunfacts());
        console.log('funfact');
        res.json({ "state": req.params.state });
    })
    //post here
    .post((req, res) => {
        //url = (`${req.protocol}://${req.get('host')}${req.originalUrl}`);
        console.log('funfact');
        console.log(req.body);
        const { state, funfact } = req.body;
        console.log(state);
        console.log(funfact);
        try{
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
        res.json({ "state": req.params.state });
    })
// capital
router.route('/states/:state/capital')
    .get((req, res) => {
        const capital = async () => {
            try{

                const data = await fsPromises.readFile(path.join(__dirname, '..', 'files', 'statesData.json'), 'utf8');
                myObj = JSON.parse(data);

                const idToFilter = req.params.state;

                const filteredArray = myObj.filter(item => item.code === idToFilter);
                state = filteredArray[0].state;
                city = filteredArray[0].capital_city;
                console.log(typeof res.json({ "state": state, "capital": city }));
                res.json({ 'state': state, 'capital': city });
            }catch{
                console.log('statesData capital file error');
            }
        }
        capital();
    })
// nickname
router.route('/states/:state/nickname')
    .get((req, res) => {
        const nickname = async () => {
            try{

                const data = await fsPromises.readFile(path.join(__dirname, '..', 'files', 'statesData.json'), 'utf8');
                myObj = JSON.parse(data);

                const idToFilter = req.params.state;

                const filteredArray = myObj.filter(item => item.code === idToFilter);
                state = filteredArray[0].state;
                nicknamed = filteredArray[0].nickname;
                
                res.send({ "state": state, "nickname": nicknamed });
            }catch{
                console.log('statesData file error');
            }
        }
        nickname();
    })
// population
router.route('/states/:state/population')
    .get((req, res) => {
        const population = async () => {
            try{

                const data = await fsPromises.readFile(path.join(__dirname, '..', 'files', 'statesData.json'), 'utf8');
                myObj = JSON.parse(data);

                const idToFilter = req.params.state;

                const filteredArray = myObj.filter(item => item.code === idToFilter);
                state = filteredArray[0].state;
                populations = filteredArray[0].population;
                
                res.send({ "state": state, "population": populations });
            }catch{
                console.log('statesData file error');
            }
        }
        population();
    })
// admission
router.route('/states/:state/admission')
    .get((req, res) => {
        const admission = async () => {
            try{

                const data = await fsPromises.readFile(path.join(__dirname, '..', 'files', 'statesData.json'), 'utf8');
                myObj = JSON.parse(data);

                const idToFilter = req.params.state;

                const filteredArray = myObj.filter(item => item.code === idToFilter);
                state = filteredArray[0].state;
                admissions = filteredArray[0].admission_date;
                
                res.send({ "state": state, "admitted": admissions });
            }catch{
                console.log('statesData file error');
            }
        }
        admission();
    })

router.route('/states/:state')
    .get((req, res) => {
        const stateRequest = async () => {
            try{

                const data = await fsPromises.readFile(path.join(__dirname, '..', 'files', 'statesData.json'), 'utf8');
                myObj = JSON.parse(data);

                const idToFilter = stateCode;

                const filteredArray = myObj.filter(item => item.code === idToFilter);

                res.send(filteredArray);
            }catch{
                console.log('statesData file error');
            }
        }
        const stateCode = req.params.state;
        console.log(stateCode);
        stateRequest();
        //res.json({ "state": req.params.state});
    })

module.exports = router;


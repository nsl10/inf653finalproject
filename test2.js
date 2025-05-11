fetch(path.join(__dirname, '..', 'files', 'statesData.json'))
                    .then(response => response.json())
                    .then(data => {console.log(data);})
                .catch(error => {
                console.log('statesData capital file error');
                })
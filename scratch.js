//create a function that will pull definitions
function getWordInfo() {
    //clear out our previous searches
    $( "#results" ).empty();
    //Let's target the search bar
    var searchBar = document.getElementById('search-bar');
    //searchBar.value grabs the text inside of the searchBar
    $.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + searchBar.value, function(data) {
        //will log out all of the data from that word
        console.log(searchBar.value);
        console.log(data);
            
            //creating a result container
            var resultContainer = document.getElementById("results");
            
            //creating a span container, and appending it to our result container
            var spanContainer = document.createElement('span');
            spanContainer.classList.add("result-card");
            resultContainer.appendChild(spanContainer);

            //Creating a header that says word
            var wordHeader = document.createElement('h2');
            wordHeader.textContent = "Word:"
            spanContainer.appendChild(wordHeader);
            
            //create an div element that will be the word typed into text box
            var word = document.createElement('div');
            word.textContent = data[0].word;
            //append this word to our wordHeader container
            wordHeader.appendChild(word);
            
            //We starting some weird shit


            var freshDiv1 = document.createElement('div');
            freshDiv1.classList.add("holderDivs");
            spanContainer.appendChild(freshDiv1);
            
            //create a new header element that says pronunciation
            var pronounceHeader = document.createElement('h3');
            pronounceHeader.classList.add('h3Headers');
            pronounceHeader.textContent = "Pronunciation:";
            //append our new header to our word div
            freshDiv1.appendChild(pronounceHeader);

            //get the phonetics associated with the word
            var phoneticsDiv = document.createElement('div');
            phoneticsDiv.textContent = data[0].phonetic;
            freshDiv1.appendChild(phoneticsDiv);

            //try to add the included audio
            var sound = document.createElement('a');
            if ((data[0].phonetics[0].audio).length === 0) {
                sound.textContent = "No audio available"
            } else {
            sound.href = data[0].phonetics[0].audio;
            sound.textContent = "Audio";
            }
            freshDiv1.appendChild(sound);


            // More weird shit


            var freshDiv2 = document.createElement('div');
            freshDiv2.classList.add("holderDivs");
            spanContainer.appendChild(freshDiv2);
           
            //create a header that says definitions
            var defineDiv = document.createElement('h3');
            defineDiv.classList.add('h3Headers');
            defineDiv.textContent = "Definition(s):";
            //append it to our word div
            freshDiv2.appendChild(defineDiv);

            //loop through all of the definitions to apply them to the word
            for (var x = 0; x < data.length; x++) {
                var definitionDiv = document.createElement('div');
                definitionDiv.textContent = data[0].meanings[0].definitions[x].definition
                freshDiv2.appendChild(definitionDiv);
            }


            var freshDiv3 = document.createElement('div');
            freshDiv3.classList.add("holderDivs");
            spanContainer.appendChild(freshDiv3);

            //create a header that says synonyms
            var synonymHeader = document.createElement('h3');
            synonymHeader.classList.add('h3Headers');
            synonymHeader.textContent = "Possible synonyms:";
            freshDiv3.appendChild(synonymHeader);
            
            //create our synonyms div that will later append
            var synonymDiv = document.createElement('div');
            if ((data[0].meanings[0].synonyms).length === 0) {
                synonymDiv.textContent = "N/A"
            } else {
                synonymDiv.textContent = data[0].meanings[0].synonyms;
            }
            freshDiv3.appendChild(synonymDiv);


            var freshDiv4 = document.createElement('div');
            freshDiv4.classList.add("holderDivs");
            spanContainer.appendChild(freshDiv4);


            //create a header that says antonyms
            var antonymHeader = document.createElement('h3');
            antonymHeader.classList.add('h3Headers');
            antonymHeader.textContent = "Possible antonyms:";
            freshDiv4.appendChild(antonymHeader);


            //create our antonyms div that will later append
            var antonymDiv = document.createElement('div');
            if ((data[0].meanings[0].antonyms).length === 0) {
                antonymDiv.textContent = "N/A"
            } else {
            antonymDiv.textContent = data[0].meanings[0].antonyms;
            }
            freshDiv4.appendChild(antonymDiv);
            

            var freshDiv5 = document.createElement('div');
            freshDiv5.classList.add("holderDivs");
            spanContainer.appendChild(freshDiv5);


            //create a header that says didn't find what you're looking for
            var findDiv = document.createElement('h3');
            findDiv.classList.add('h3Headers');
            findDiv.textContent = "Can't find what you're looking for?";
            freshDiv5.appendChild(findDiv)
            //create our url link 'a'
            var urlDiv = document.createElement('a');
            urlDiv.href = data[0].sourceUrls[0];
            urlDiv.textContent = "Click to learn more";
            freshDiv5.appendChild(urlDiv);
    });
}




//get the button by its id name, already in HTML
var defineBtn = document.getElementById('submit');
//The button runs the getWordInfo function
defineBtn.addEventListener('click', getWordInfo);
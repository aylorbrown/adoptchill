## Adopt and Chill 

### Authors  
* Austin Dryden
* Aylor Brown
* Eva Montgomery 

## Project Description  
Adopt and Chill solves the serious problem of overcrowded animal shelters in a silly way. The user enters a zip code, clicks on an image representing their preferred marijuana species (Indica, Sativa, or Hybrid), and receives two recommendations - a marijuana strain and an available shelter dog with similar characteristics. Built using HTML/CSS and Javascript. 

![gif](assets/demo2.gif)

#### USER INPUT 


```javascript
function raceClick(event) {
    if (mode == 1){
        clearCardDeck();
        cardDeck.appendChild(loadingDom);
        fetch(strainRaceURLGen(event.currentTarget.race))
            .then(x => x.json())
            .then(selectRandomStrain)
            .then(getStrainInfo)
            .then(createSingleStrainDOM)
            .then(buildGoodDogArr)
            .then(createNewDog)
}
```

First, we create some clickable elements to populate the landing page. Once the user clicks, the `raceClick` function triggers the fetch.then chain. 

The `raceClick` function is called by event listener for the species cards, and triggers the beginning of the API call .then chain. 


#### STRAIN API 

```javascript 
async function getStrainInfo(strainID){
    let URLArr = [strainURLGen(strainID,"desc"),strainURLGen(strainID,"effects"),strainURLGen(strainID,"flavors")]
    let values = await Promise.all(URLArr.map(url => fetch(url).then(r => r.json())));
    return values;
}
```

`getStrainInfo` is an asynchronous function that takes in a marijuana strain ID number from the Strain API and builds an array of URLs to call to the API. The function asynchronously iterates through that array and does an API call for each, pauses until all three API calls return, then returns an array of promises. 

#### BRIDGE FUNCTIONS

```javascript 
function buildGoodDogArr(passThru){
    let effArr = [];
    let newDogArr = [];
    let dogHisto = {};
    let dogArr = Object.keys(dogChars);
    let most = 0; 
    for (let effCat of Object.keys(STRAINEFFECTS)){
        for (let eff of STRAINEFFECTS[effCat]){
            effArr.push(eff);
        }
    }
    if(effArr.length == 0){
        BREEDARRAY=dogArr;
        return passThru;
    }
    for (let dog of dogArr){
                for (let eff of effArr){
                        if(dogChars[dog].includes(eff)){
                            if(Object.keys(dogHisto).includes(dog)){
                                dogHisto[dog] += 1;    
                            } else {
                                dogHisto[dog] = 1;

                            }
                        if(dogHisto[dog] > most){
                            most = dogHisto[dog]
                        }
            }
        }
    }
```

`buildGoodDog` acts as a bridge between the two APIs. The function creates an array of all the dogs with the most attributes in common with the selected strain of marijuana, then sets that to the global variable `BREEDARRAY`.

#### PETFINDER API

```javascript 
function createNewDog(strainDOM){
            requestData(DogURLGenerator(randomBreedSelector())) 
            .then(r =>{
                if(DOGCALLS > 4){
                    clearCardDeck();
                    cardDeck.appendChild(strainDOM);
                    buildNoDogDOM();
                } else if(!r.animals){ 
                    clearCardDeck();
                    cardDeck.appendChild(strainDOM);
                    buildNoDogDOM();
                } else if(r.animals.length == 0){ 
                    DOGCALLS +=1;
                    createNewDog(strainDOM);
                } else{ 
                    clearCardDeck();
                    cardDeck.appendChild(strainDOM);
                    buildDogDOM(selectRandDog(r));
                }
            }
        )
}   
```

`createNewDog` fetches an array of adoptable dogs of the selected breed, randomly selects one dog of that breed, then calls the DOM element builder for that dog. 


### STAMPS 

Adds stamps on click events 

![gif](assets/demo3.gif)


Stamp is defined as a div in the HTML 

```html 
<div class="stamps"></div>
```

Creates array of images in javascript file

```javascript 
let number = 0; 
const stamps = [
    "assets/stamp-squiggle.png",
    "assets/stamp-smile-face.png",
    "assets/stamp-weed.png",
    "assets/stamp-stick.png",
    "assets/stamp-bong.png",
    "assets/stamp-bone.png"
]
```


```addStamp``` function adds stamp images to the page at the site of the mouse click event. 

```javascript 
const addStamp = function (x, y) {
    const img = document.createElement("img")
    img.setAttribute("src", stamps[number])

    img.style.left = (x - window.innerWidth / 2)  + "px"
    img.style.top = y + "px"

    stampsTag.appendChild(img)

    number += 1
    if (number > stamps.length - 1) {
        number = 0
    }
}
```

Adds CSS rotation to the stamps 
```css
.stamps {
    position: absolute; 
    top: 0;
    left: 50%;
    width: 50%;
}

.stamps img {
    position: absolute;
    animation: spin 30s linear infinite;
}
```

### APIs USED 
* Petfinder API - https://www.petfinder.com/developers/api-docs
* The Strain Marijuana strains API - https://strains.evanbusse.com/
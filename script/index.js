const loadLessons = ()=>{
    const AllLevelUrl = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(AllLevelUrl)
    .then(res => res.json())
    .then(data => displayLessons(data.data))
};

const loadWord =(id)=>{
    const wordUrl = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(wordUrl)
    .then(rsc=> rsc.json())
    .then(json=> displayLoadWord(json.data))
};

const displayLoadWord = (words)=>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML= "";


    if(words.length === 0){
        wordContainer.innerHTML=`
        <div class="py-16 text-center col-span-full space-y-3">
          <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <p class="text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h3 class="font-bangla text-3xl font-medium">নেক্সট Lesson এ যান</h3>
        </div>
        `
    }

    words.forEach(word => {
        const wordDiv= document.createElement('div');
        wordDiv.innerHTML = `
          <div class="bg-white rounded-lg text-center space-y-3 py-16 px-12 shadow-sm">
          <h4 class="text-3xl font-bold">${word.word ?word.word : 'শব্দ পাওয়া যায়নি'}</h4>
          <p class="text-[20px] font-medium">${word.meaning ?word.meaning : 'অর্থ পাওয়া যায়নি'}</p>
          <h3 class="font-bangla text-3xl font-bold">${word.pronunciation ?word.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}</h3>
          <div class="flex justify-between items-center">
            <button class="bg-[#1a90ff31] p-4 rounded-sm cursor-pointer hover:bg-[#1a90ffd2]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="bg-[#1a90ff31] p-4 rounded-sm cursor-pointer hover:bg-[#1a90ffd2]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `
        wordContainer.append(wordDiv)
    })


    


};


const displayLessons= (lessons)=>{
    // get the container
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML= "";
    for(let lesson of lessons){
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML=`<div class=" flex">  
        
        <button onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary"
                  ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
       
       </div>
        `
        levelContainer.append(btnDiv)
    }


};

loadLessons()
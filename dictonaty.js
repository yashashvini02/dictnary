document.addEventListener("DOMContentLoaded",function(){
    let ele=document.querySelector(".text1");
    let butt=document.querySelector(".clk");
    let cards=document.querySelector(".cards");
   async function content(){
        try{
            let word=ele.value;
            if (!word) {
                alert("Please enter a word!");
                return;
            }
            let response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if(!response.ok){
                alert("Unable to fetch data");
            }
            let data=await response.json();
        console.log(JSON.stringify(data,null,2));      
              cards.style.display="block";
      let firstMeaning = data[0]?.meanings[0] || {};
      let secondMeaning = data[0]?.meanings[1] || firstMeaning; 
      let partOfSpeech = secondMeaning?.partOfSpeech || "N/A";
      let definition = secondMeaning?.definitions[0]?.definition || "No definition found.";

     
      cards.innerHTML = `
          <p><strong>Word:</strong> ${word}</p>
          <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
          <p><strong>Definition:</strong> ${definition}</p>
      `;
        }
        catch(error){
            console.error(error);
        }
    }
    butt.addEventListener("click",content);
})
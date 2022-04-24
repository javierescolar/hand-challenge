
const MIN_CELL = 0;
const MAX_CELL = 255;

const checkValueCell = (value: number): number => {
  if(value>MAX_CELL) return MIN_CELL;
  if(value<MIN_CELL) return MAX_CELL;
  return value;
}

const getNestedFist = (arrayText: string[], index: number, icon: "🤛" | "🤜"): number => {
  let fist = 1;
  while (fist > 0) {
    if(icon === "🤜") index++;
    if(icon === "🤛") index--;
    const element = arrayText[index];
    if(["🤛", "🤜"].includes(element)){
      if(element === icon) {
        fist++;
      } else {
        fist--
      }
    }
  }
  return index;
}




const translate = (text: string): string => {
  let pointer = 0;
  const memory = [0];
  const output:string[] = [];
  const arrayOfText = Array.from(text);
  

  for (let index = 0; index < arrayOfText.length; index++) {
    
    const element = arrayOfText[index];

    
    switch (element) {
      case "👉":
        pointer++
        memory[pointer] ??= 0
        break;
      case "👈":
        pointer--
        memory[pointer] ??= 0
        break;
      case "👆":
        memory[pointer] = checkValueCell(memory[pointer] + 1);
        break;
      case "👇":
        memory[pointer] = checkValueCell(memory[pointer] - 1);
        break;
      case "🤜":
        if(memory[pointer] === 0) {
          index = getNestedFist(arrayOfText, index, "🤜")
        }
        break;
      case "🤛":
        if(memory[pointer] !== 0) {
          index = getNestedFist(arrayOfText, index, "🤛")
        }
        break;
      case "👊":
        output.push(String.fromCharCode(memory[pointer]))
        break;
          
    }
    //console.log({code: element, index, pointer, memory: memory[pointer] , output: output.join("")}) 
  }
  return output.join("");
}

export default translate;

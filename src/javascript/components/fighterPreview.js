import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  if(fighter===undefined){
    return fighterElement;
  }
  const {source:src,name, health, attack, defense, } = fighter;
  const params = {name, health, attack, defense};
  const imgElement = createElement({
    tagName:"img",
    className:"img",
    attributes:{src}
  });
  fighterElement.appendChild(imgElement);
  const fighterParamBlock = createElement({
    tagName:"div",
    className:"fighter-param-block",
  });
  Object.keys(params).forEach(key=>{
    if(key==="name"){
      const element = createElement({
        tagName:"p",
        className:"",
      });
      element.innerHTML = `${key} : ${params[key]}`;
      fighterParamBlock.appendChild(element);
    }else{
      const divWrap = createElement({
        tagName:"div",
        className:"",
        attributes:{
        }
      });
      const paramsElement = createElement({
        tagName:"span",
        className:"",
      });
      paramsElement.innerHTML = `${key} : ${params[key]}</br>`;
      const progressElement = createElement({
        tagName:"progress",
        className:"progress",
      });
      progressElement.max=+params[key]>10?60:5;
      progressElement.value = +params[key];
      divWrap.appendChild(paramsElement);
      divWrap.appendChild(progressElement);
      fighterParamBlock.appendChild(divWrap);
    }
  });
  fighterElement.appendChild(fighterParamBlock);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

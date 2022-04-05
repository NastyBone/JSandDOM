import * as XLSX from 'xlsx'

class handler {

    static selectedElement = null;
    static elementCounter = null;
    static lastSelected = null;
    static actualTemplate = false;
    static template = null;
    static imageElement = null
    
    
        setImage(file) {
            this.imageElement = file;
        }
        getImage(){
            return this.imageElement
        }
        
        getSelected = function(){
            return this.selectElement
        }
        setSelected = function(element){
            this.selectElement = element;
        }
    
        setElementCount = function(){
            if (!this.elementCounter){
                this.elementCounter = 0;
            }
        }
        addCount = function(){
            this.elementCounter++
        }
    
        getElementsCount = function(){
            return this.elementCounter
        }
    
        getLastSelected = function(){
            return this.lastSelected;
        }
    
        setLastSelected = function(element){
            this.lastSelected = element;
        }
    
        setActualTemplate = function(val){
            this.actualTemplate= val
        }
    
        getActualTemplate = function(){
            return this.actualTemplate
        }
    
        setTemplate = function(template){
            this.template = template
        }
        getTemplate = function(){
            return this.template
        }
    
    }
    
let myHandler = new handler()

 function removeDot (str){
    if(str.split('')[str.length-1] ==':'){
        str = str.split('')
        str.pop()
        str = str.join('')
    }
    return str
}
 function resetPreview(){
    myHandler.setLastSelected(null);
    myHandler.setSelected(null);
    [...document.getElementsByClassName('container-box')].forEach(e=>{e.style['box-shadow'] = '4px 12px 25px -8px #000, 0px 3px 8px -2px #aaa'});
    myHandler.setImage('');
    document.getElementById('preview-error-message').innerText = "";
    let parent = document.getElementById('preview-field-area');
    parent.innerHTML = myHandler.getTemplate();
    document.getElementById('preview-new-template').innerText = 'Create a new Element!';
    document.getElementById('preview-image-button').style.display= 'flex';
    document.getElementById('preview-image-button').style.background ='#f17e7e';

    document.getElementById('image-form').reset();
    document.getElementById('navbar-search').value = '';


    substituteElement('preview-button-area', 'preview-delete-button', 'Delete field', 'mousedown', deleteFieldTemplate, 'flex');
    substituteElement('preview-button-area', 'preview-add-button', 'Add special field', 'mousedown', newFieldTemplate, 'flex')
    substituteElement('preview-button-area', 'preview-save-button', 'Save element', 'mousedown', newElement, 'flex');

}

 function substituteElement (parent, target, text = '', event= '', func= '', display= ''){
    parent = document.getElementById(parent);
    let oldElement = document.getElementById(target);
    let newElement = oldElement.cloneNode(true);

    if (newElement.tagName == 'A') newElement.removeAttribute('onmousedown')
    if (text)  newElement.innerText = text;
    if (display) newElement.style.display = display;
    if (event && func) newElement.addEventListener(event,func);
    parent.replaceChild(newElement,oldElement)
}

function newFieldTemplate(){

    document.getElementById('preview-delete-button').style.display = 'flex';
    document.getElementById('preview-save-button').style.display = 'flex';

    let fieldContainer = document.createElement('div');
    let rightField = document.createElement('input');
    let leftField
    rightField.className = 'navbar-input texture-background input-preview';
    
    if(!myHandler.getActualTemplate()){
        leftField = document.createElement('label');
        leftField.appendChild(document.createTextNode('New field name'));
    } else {
        leftField = document.createElement('input');
        leftField.style = 'width: 65%'
        leftField.placeholder = 'Special attribute here';
        leftField.className = 'navbar-input texture-background input-preview'

    }

    fieldContainer.className = 'preview-field-container';
    fieldContainer.appendChild(leftField);
    fieldContainer.appendChild(rightField);
    

    let previewArea = document.getElementById('preview-field-area');
    previewArea.appendChild(fieldContainer);
}

 function deleteFieldTemplate(){


    let previewArea = document.getElementById('preview-field-area');
    let previewAreaChilds = previewArea.childNodes;
    let numChilds = previewAreaChilds.length;
        
    document.getElementById('preview-error-message').innerText = "";

    

    if(myHandler.getActualTemplate() && myHandler.getActualTemplate() < numChilds){
        if(numChilds <1){
             document.getElementById('preview-delete-button').style.display = 'none';
            document.getElementById('preview-save-button').style.display = 'none';
            document.getElementById('preview-image-button').style.display = 'none';
            }
        previewArea.removeChild(previewAreaChilds[numChilds-1])
    }else if (!myHandler.getActualTemplate()){
        if(numChilds <=1){
        
            document.getElementById('preview-delete-button').style.display = 'none';
            document.getElementById('preview-save-button').style.display = 'none';
            document.getElementById('preview-image-button').style.display = 'none';
            }
        previewArea.removeChild(previewAreaChilds[numChilds-1])
    }
}

 function createTemplate(){

    document.getElementById('preview-image-button').style.display= 'flex'
    document.getElementById('preview-image-button').style.background ='#f17e7e'
    let field = [...document.getElementsByClassName('input-preview')];

    if (field.filter(e => e.value =='').length !== 0){
        document.getElementById('preview-error-message').innerText = "There are empty fields!";
    } else {


        let previewContainer;
        let fieldArea = document.getElementById('preview-field-area');
        fieldArea.innerHTML = '';
        field.forEach(e => {
       
            let inputLabel = document.createElement('label');
            let inputArea = document.createElement('input');
            inputLabel.appendChild(document.createTextNode(e.value));
             previewContainer = document.createElement('div')
            previewContainer.className = 'preview-field-container';
            inputArea.className = 'navbar-input texture-background hoverable input-preview';
            previewContainer.appendChild(inputLabel);
            previewContainer.appendChild(inputArea);
            fieldArea.appendChild(previewContainer);
            document.getElementById('preview-error-message').innerText = "";
     })

        // let imgInput = document.createElement('input')
        // imgInput.id = 'file-upload'
        // imgInput.setAttribute('type','file');
        // imgInput.style.opacity = '0';

        // let imgLabel = document.createElement('label');
        // imgLabel.setAttribute('for', 'file-upload');
        // imgLabel.appendChild(imgInput)


        myHandler.setTemplate(fieldArea.innerHTML)
        myHandler.setActualTemplate(field.length);

        substituteElement('preview-button-area', 'preview-save-button', 'Save element', 'mousedown', newElement)
        document.getElementById('preview-new-template').innerText = 'Create a new element!'

    
    }
}

 async function newElement (){
    let containerData = [...document.getElementsByClassName('preview-field-container')]


    myHandler.setElementCount()
    let parent = document.getElementById("container-data");
    let div = document.createElement('div');
    div.id = myHandler.getElementsCount();
    div.className = 'container-box texture-background hoverable';
    let dataContainer = document.createElement('div');
    dataContainer.className = 'box-data-container'
    let imgContainer = document.createElement('div')

    if(myHandler.getImage()){
        
        await imgHandler(imgContainer)
        
    } else {
        dataContainer.style.width = '100%'
    }
    div.appendChild(imgContainer)
   

//

    let logicAux = containerData.filter(e => {

         return !(e.childNodes[0].tagName == 'LABEL' || e.childNodes[0].value) || !e.childNodes[1].value
            
    })

  
    if(logicAux.length !== 0){
        document.getElementById('preview-error-message').innerText = "There are empty fields!";
    } else {
        document.getElementById('preview-error-message').innerText = "";
        //
        containerData.forEach(element => {

            let elementContainer = document.createElement('div');
            elementContainer.className = 'box-data-field';

            let elementTag = document.createElement('li');
            elementTag.appendChild(document.createTextNode((element.childNodes[0].value || element.childNodes[0].innerText)))
            elementTag.className = 'element-property-name'

            let elementValue = document.createElement('span')
            elementValue.appendChild(document.createTextNode(element.childNodes[1].value))

            elementValue .className = 'element-property-value'
            
            let spacing = document.createElement('span')
            spacing.appendChild(document.createTextNode(':'));
            elementContainer.appendChild(elementTag)
            elementTag.appendChild(spacing)
            elementContainer.appendChild(elementValue)

            dataContainer.appendChild(elementContainer)
        });
        //
        div.appendChild(dataContainer)

        myHandler.addCount();
        div.addEventListener('click',selectElement);
        parent.appendChild(div);

        resetPreview();

    }

    
    
}

 function selectElement(event){

    myHandler.setSelected(event.currentTarget);
    let lastSelected = myHandler.getLastSelected();
    let newSelected = myHandler.getSelected();
    

    if(lastSelected !== newSelected){
        if(lastSelected){
             lastSelected.style['box-shadow'] = '4px 12px 25px -8px #000, 0px 3px 8px -2px #aaa'
        } 

         newSelected.style['box-shadow'] = '-1px -1px 14px 4px #53bdfbad, 4px 12px 25px -8px #000, 0px 3px 8px -2px #aaa';
            myHandler.setLastSelected(newSelected)   
    } else {
        myHandler.setLastSelected(null)
         newSelected.style['box-shadow'] = '4px 12px 25px -8px #000, 0px 3px 8px -2px #aaa';
    }

}

 function deleteElement(){

    if(myHandler.getSelected() && myHandler.getSelected().className =="container-box texture-background hoverable"){
    let parent = document.getElementById("container-data");
    parent.removeChild(myHandler.getSelected())
    }

}

 function resetTemplate(){
    myHandler.setActualTemplate(false);
    myHandler.setTemplate(null)

    document.getElementById('preview-field-area').innerHTML = '';
    document.getElementById('preview-delete-button').style.display = 'none';
    document.getElementById('preview-image-button').style.display= 'none'

    substituteElement('preview-button-area', 'preview-save-button', '', 'mousedown', createTemplate, 'none');

    substituteElement('preview-button-area', 'preview-add-button', 'Add new field', 'mousedown', newFieldTemplate)

    document.getElementById('preview-new-template').innerText = 'Create a Template!';
}

 function clearElements(){
    document.getElementById('container-data').innerHTML = ''
    resetTemplate();
}

 function editElement(){
    if(myHandler.getSelected()){
        let elementData = [...myHandler.getSelected().childNodes[1].childNodes];
        let parent = document.getElementById('preview-field-area');
        parent.innerHTML='';
        
        let container = document.createElement('div');
        container.className = 'preview-field-container';

        elementData.map(content =>{
            let container = document.createElement('div');
            container.className = 'preview-field-container';
        
            let labelData = document.createElement('label');
            labelData.innerText = content.childNodes[0].innerText;
            container.appendChild(labelData);

            let inputField = document.createElement('input');
                inputField.value = content.childNodes[1].innerText;
                inputField.className = 'navbar-input texture-background hoverable input-preview';
                container.appendChild(inputField)
            parent.appendChild(container);
        
        })
        
        document.getElementById('preview-new-template').innerText = 'Edit Element!';
        let saveButton = document.getElementById('preview-save-button');
        saveButton.innerText = 'Save Element';
        saveButton.removeEventListener('mousedown',newElement);
        saveButton.addEventListener('mousedown',saveEditedElement);
    }
}

 function saveEditedElement(){
    let selectElement = myHandler.getSelected();
    let newData = [...document.getElementsByClassName('preview-field-container')];
    selectElement.childNodes[1].innerHTML='';

    newData.forEach(element => {
        let elementContainer = document.createElement('div');
        elementContainer.className = 'box-element-container';
        let elementTag = document.createElement('span');
        elementTag.appendChild(document.createTextNode((element.childNodes[0].value || element.childNodes[0].innerText)))
        elementTag.className = 'element-property-name'

        let elementValue = document.createElement('span')
        elementValue.appendChild(document.createTextNode(element.childNodes[1].value))
        elementValue.className = 'element-property-value'
        

        elementContainer.appendChild(elementTag)
        elementContainer.appendChild(elementValue)

        selectElement.childNodes[1].appendChild(elementContainer)
    });

    myHandler.getSelected().style['box-shadow'] = '4px 12px 25px -8px #000, 0px 3px 8px -2px #aaa';
    resetPreview()
}

 function showSort(){

    let previewArea = document.getElementById('preview-field-area');
    if (previewArea.innerHTML !== ''){
        previewArea.innerHTML = '';

        document.getElementById('preview-new-template').innerText = 'Sort By:'
        let sortOptions = new Array();
        [...document.getElementsByClassName('container-box')].forEach(boxData=>[...boxData.childNodes[1].childNodes].forEach(containerData =>{
            if (containerData.childNodes[0].className == 'element-property-name'){
                let tag = containerData.childNodes[0].innerText;
                tag = removeDot(tag)
                sortOptions.push(tag)
            }
        }))
        sortOptions = sortOptions.filter((ele, i, self) => self.indexOf(ele) == i )
        sortOptions.map(containerData =>{
            let button = document.createElement('button');
            button.className = 'navbar-button texture-background hoverable preview-sort-button';
            button.innerText = containerData;
            button.addEventListener('mousedown',sortButton)
            previewArea.appendChild(button)
        })

        //think about previewing 
        substituteElement('preview-button-area','preview-delete-button','First in','mousedown',sortButton, 'flex')
        substituteElement('preview-button-area','preview-add-button','Last in','mousedown',sortButton, 'flex')
        substituteElement('preview-button-area','preview-save-button','Go back','mousedown',resetPreview, 'flex')
    }

}

 function sortButton(e){

    let sortParameter = e.currentTarget
    let containers = [...document.getElementsByClassName('container-box')];
    containerData = document.getElementById('container-data');
    containerData.innerHTML = '';
    if (sortParameter.id !== 'preview-add-button' && sortParameter.id !== 'preview-delete-button'){
    
    sortParameter = sortParameter.innerText

     containers = containers.sort((a,b) =>{
        if(!b){
            return a
        }

        let first = a.childNodes[1].childNodes[getPosition([...a.childNodes[1].childNodes],sortParameter)].childNodes[1].innerText;

        let second =  b.childNodes[1].childNodes[getPosition([...b.childNodes[1].childNodes],sortParameter)].childNodes[1].innerText;

        let auxFirst = a.childNodes[1].childNodes[getPosition([...a.childNodes[1].childNodes],sortParameter)].childNodes[0].innerText;
        auxFirst = removeDot(auxFirst)

        let auxSecond = b.childNodes[1].childNodes[getPosition([...b.childNodes[1].childNodes],sortParameter)].childNodes[0].innerText;
        auxSecond = removeDot(auxSecond)

        if(!isNaN(first) && !isNaN(second)){
            if (auxFirst==sortParameter && auxSecond==sortParameter ){
            return first-second
            }
            else if (auxFirst == sortParameter){
                return -1
            }
            else if (auxSecond == sortParameter){
                return 1
            } else return 0
        }   else {

            if (auxFirst==sortParameter && auxSecond==sortParameter ){
                return first.localeCompare(second)
                }
            else if (auxFirst == sortParameter){
                    return first
                }
            else if (auxSecond == sortParameter){
                    return second
                } else return 0
        }
     })

} else {
    // Add Button = Last in, Delete Button = First in
    if (sortParameter.id == 'preview-delete-button'){
        //sort by first in 
        containers = containers.sort((a,b)=> a.id-b.id)
    } else {
        containers = containers.sort((a,b)=> b.id-a.id)
    }
}
    containers.map(containerBoxes =>{
    containerData.appendChild(containerBoxes)
 })
     function getPosition(elements,key){
         let pos = 0;
        for(let i = 0;i<elements.length; i++){
            let str = removeDot(elements[i].childNodes[0].innerText)
            if (str == key){
                pos = i
            }
        }
        return pos
    }

}

function dataToJSON(bigDataBox, dataBox = ''){
    if(dataBox){
        let bigArr = new Array();
        let headers = new Array();
    
        bigArr = dataBox.map((container,i) =>{
            let auxObj = new Object();
            auxObj.id = bigDataBox[i].id;
            auxObj.data = {};
    
            [...container.childNodes].map(containerData =>{
    
                if (containerData.childNodes[0].className == 'element-property-name'){
                    headers.push(removeDot(containerData.childNodes[0].innerText))
                }
                auxObj.data[removeDot(containerData.childNodes[0].innerText)] = containerData.childNodes[1].innerText
            })
    
            return {'id' : auxObj.id, 'data':auxObj.data}
        })
        headers = headers.filter((ele, i, self) => self.indexOf(ele) == i)
        headers.unshift('code')
    
        return{bigArr, headers}
    }
    else {
        let auxObj = new Object()
        bigDataBox.forEach(element=>{
            //let elementTag = 
              auxObj[element.childNodes[0].value || element.childNodes[0].innerText] = 
            //let elementValue = 
            element.childNodes[1].value
            
            //return {elementTag, elementValue}
        })
        return auxObj
    }
    
}

 function exportData(){
    let dataBox = [...document.getElementsByClassName('box-data-container')];
    let bigDataBox = [...document.getElementsByClassName('container-box')]

    let {bigArr, headers} = dataToJSON(bigDataBox, dataBox)

    let table = document.createElement('table');
    let tableHead = document.createElement('thead');
    tableHead.style = 'background-color: #ed7e7e; border-bottom: 4px solid #333333'
    let headRow = document.createElement('tr')

    tableHead.appendChild(headRow)
    let tableBody = document.createElement('tbody');
    tableBody.style = 'font-size: 15px;'
    headers.forEach(data =>{
        let cell = document.createElement('th');
        cell.style = 'font-size: 15px; font-weight: bold; color: #333333; text-align: center; border-left: 2px solid #333333; background-color: #ed7e7e'
        cell.appendChild(document.createTextNode(data))
        headRow.appendChild(cell)
    })


    for(let j = 0; j<bigArr.length; j++){

        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.style = 'border: 2px solid #000000; padding: 3px 4px; text-align: center;'

        td.appendChild(document.createTextNode(bigArr[j].id));
        tr.appendChild(td);

        for(let  i = 1;i<headers.length; i++){
            td = document.createElement('td');
            let text = bigArr[j].data[headers[i]];
            if (text == undefined) {text = ''}
            text = document.createTextNode(text)
            td.appendChild(text)
            td.style = 'border: 2px solid #000000; padding: 3px 4px; text-align: center;'
            tr.appendChild(td)
        }

        tableBody.appendChild(tr)
    
    }
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        table.style = 'border: 2px solid #000; width: 70%; text-align: center;border-collapse: collapse;'

    sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(table.outerHTML))
    return sa
}

 function addImage(e){
    if(e.target.files[0]) myHandler.setImage(e.target.files[0])
    e.target.parentNode.style = 'background : #b0f5a8';
    e.target.parentNode.style.display = 'flex'
}

 async function imgHandler(container){
    let e = myHandler.getImage()
    if (e){
        let img = e
        let imgFrame
        if(FileReader && img){
            return new Promise(resolve =>{
                let fr = new FileReader()
                fr.onload = function(){
                    container.className = 'data-image-container'
                    imgFrame = document.createElement('img');
                    imgFrame.className = 'data-image'
                    imgFrame.src = fr.result
                    container.appendChild(imgFrame)
                    resolve('resolved')
                }
                fr.readAsDataURL(img)
            })
            
        }else {
            document.getElementById('preview-erorr-message').innerText = 'File upload not supported'
            return false
        }
    }
}

async function importData(e){
    let file =  e.target.files[0]
    let jsonObj = await getData(file)
    
     function getData(xls){
      return new Promise (resolve =>{
            var reader = new FileReader();
            reader.onload = function(){
                var fileData = reader.result;
                var wb = XLSX.read(fileData, {type : 'binary'});
                wb.SheetNames.forEach(function(sheetName){
                var rowObj =XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                resolve(JSON.parse(JSON.stringify(rowObj)))
                })
            };
            reader.readAsBinaryString(xls);
            
            //return json
        })

    }

    let parent= document.getElementById('container-data');

    [...jsonObj].forEach(obj=>{
        let bigBox = document.createElement('div')
        bigBox.className = 'container-box texture-background hoverable';
        delete obj.code
        let imgAux = document.createElement('div');
        imgAux.className = 'data-image-container';
        imgAux.style.width = '0';
        imgAux.style.height = '0'
        bigBox.appendChild(imgAux);

        let dataAux = document.createElement('div');
        dataAux.className = 'box-data-container';

        let objKeys = Object.keys(obj);

        objKeys.forEach(key =>{
    
            let dataField = document.createElement('div');
            dataField.className = 'box-data-field';
  
            let dataName = document.createElement('li');
            dataName.className = 'element-property-name'
            dataName.appendChild(document.createTextNode(key))

            let spacing = document.createElement('span')
            spacing.appendChild(document.createTextNode(':'))
            dataName.appendChild(spacing)
           
            let dataValue = document.createElement('span');
            dataValue.className = 'element-property-value'
            dataValue.appendChild(document.createTextNode(obj[key]))
            
            dataField.appendChild(dataName)
            dataField.appendChild(dataValue)
            dataAux.appendChild(dataField)
        })
        bigBox.appendChild(dataAux)
        parent.appendChild(bigBox)


    })
   
    jsonObj
}

 function previewData(){

     if(myHandler.getSelected()){
        let parent = document.getElementById('preview-element');
        parent.style.display = 'flex';
        let dataContainer = myHandler.getSelected().childNodes[1].cloneNode(true);
        let imgContainer 
        
        try {
            imgContainer = myHandler.getSelected().childNodes[0].childNodes[0].cloneNode(true) 
        } catch (error) {
            imgContainer = null
        }

    
        let imgParent = document.getElementById('element-image-preview');
        let dataParent = document.getElementById('element-data-preview');

        if(!imgContainer){
            imgParent.style.width = '0';
            imgParent.style.padding = '0'
            dataParent.style.height = '70%'
        }else {
            imgParent.style.width = '100%';
            imgParent.style.padding = '15px'
            imgContainer.style['object-fit']='contain'
            imgParent.appendChild(imgContainer)

        }
        dataParent.appendChild(dataContainer)
        parent.addEventListener('mousedown', closePreview);
        document.getElementById('close-preview-button').addEventListener('mousedown', closePreview);
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';

     }
        
}

function closePreview(e){
    if (e.target.id =='preview-element' || e.target.id =='close-preview-button'){
        document.getElementById('preview-element').style.display='none'
        document.getElementById('element-image-preview').innerHTML = '';
        document.getElementById('element-data-preview').innerHTML = '';
        document.getElementsByTagName('body')[0].style.overflow = 'scroll';
    }
   

}

function searchingElements(e){
     let regExp = new RegExp(e.target.value,'i')
     let containers = document.getElementsByClassName('container-box');

     [...containers].map(container =>{
         let text = container.textContent;
         if(!regExp.test(text)){
             container.style.display = 'none'
         }else {
            container.style.display = 'flex'
         }
        // console.log(regExp.test(text), text, container.id)
     })
}


document.getElementById('navbar-reset').addEventListener('mousedown', resetTemplate)
document.getElementById('navbar-delete').addEventListener('mousedown', deleteElement)
document.getElementById('navbar-edit').addEventListener('mousedown',editElement)
document.getElementById('navbar-clear').addEventListener('mousedown',clearElements)
document.getElementById('navbar-sort').addEventListener('mousedown',showSort)
document.getElementById('navbar-export').addEventListener('mousedown',exportData)

document.getElementById('navbar-preview').addEventListener('mousedown',previewData)
document.getElementById('navbar-search').addEventListener('input',searchingElements)
document.getElementById('data-upload').addEventListener('change',importData)

document.getElementById('preview-save-button').addEventListener('mousedown',newFieldTemplate)
document.getElementById('preview-add-button').addEventListener('mousedown',createTemplate)
document.getElementById('preview-delete-button').addEventListener('mousedown',deleteFieldTemplate)
document.getElementById('image-upload').addEventListener('change',addImage)
document.getElementById('preview-add-button').addEventListener('keydown', newFieldTemplate)
resetTemplate()

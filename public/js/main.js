console.log('Hey does this thing work?')

const item = document.querySelectorAll('.item .remove')
const done = document.querySelectorAll('.item span.notDone')
const test = document.querySelectorAll('.item span.completed')

Array.from(test).forEach((element)=>{
    element.addEventListener('click', undoneItem)
})

async function undoneItem() {
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('/unmarkDone', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
         if (response.ok) {
            console.log('before reload')
            location.reload()
        } else {
            console.error('Failed to mark done')
        }

    }catch(err){
        console.log(err)
    }
}

Array.from(done).forEach((element)=>{
    element.addEventListener('click', doneItem)
})

async function doneItem() {
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('/markDone', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
         if (response.ok) {
            console.log('before reload')
            location.reload()
        } else {
            console.error('Failed to mark done')
        }

    }catch(err){
        console.log(err)
    }
}

Array.from(item).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('/deleteItems', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
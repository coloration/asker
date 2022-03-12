const { Asker } = require('../dist')

console.log(Asker)

Asker.conf.after = (res) => res.data

Asker.get('http://jsonplaceholder.typicode.com/comments', { postId: 1 })
.then(res => {
  console.log('@@@@')
  console.log(res)
})
.catch(e => {
  console.log(e, '???')
})

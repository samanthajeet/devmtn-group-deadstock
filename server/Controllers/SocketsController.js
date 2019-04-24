const socket = require('socket.io');

module.exports={
    getChats:async(req,res)=>{
        const db = req.app.get('db');
        let room = req.session.user.user_id
        let room1 = `${room}:%`
        let room2 = `%:${room}`
        let chats = await db.chats.get_all_chats({room1,room2})
        console.log(chats)
        chats = chats.filter(chat=>{
            return chat.user_id != room
        })
        
        let awaiting = users.map(async id1 =>{
                let awaitedUsers = await db.chats.get_user_chat({id1})
                array.push(awaitedUsers[0])
                return array
            })

        Promise.all(awaiting).then(
            (awaitingU)=>{
                awaitingU = awaitingU[0]
                awaitingU = awaitingU.sort((a,b)=>{return b.user_id - a.user_id })
                res.status(200).send(awaitingU)
            })
    }
}
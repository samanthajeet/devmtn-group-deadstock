const socket = require('socket.io');

module.exports={
    getChats:async(req,res)=>{
        const db = req.app.get('db');
        let user_id = req.session.user.user_id
        let room1 = `${user_id}:%`
        let room2 = `%:${user_id}`
        let chats = await db.chats.get_user_chats({room1,room2,user_id})
        const array = []
        let users =
        chats.map(room=>{
            const roomArr = room.room_id.split(':')
            const id = roomArr.filter(item=>{
                if(item != user_id){
                    return item
                }
            })
            return id
        }).map(userId => {
            return +userId[0]
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
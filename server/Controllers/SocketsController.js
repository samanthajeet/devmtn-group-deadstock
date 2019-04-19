const socket = require('socket.io');

module.exports={
    getChats:async(req,res)=>{
        const db = req.app.get('db');
        let room = req.session.user.user_id
        let room1 = `${room}:%`
        let room2 = `%:${room}`
        let chats = await db.chats.get_all_chats({room1,room2})
        // console.log(chats)
        chats = chats.filter(chat=>{
            return chat.user_id != room
        })
        // console.log(chats)
        res.status(200).send(chats)
    }
}
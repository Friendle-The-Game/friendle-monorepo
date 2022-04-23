
import gameService from "../services/gameService"

export default (io:any, socket:any) => {

    const createRoom = async () =>{
      const createdGame = await gameService.startGame()
      const roomID = createdGame.data.gameId
      socket.join(roomID)
      socket.emit("room:created", roomID)
    }
    socket.on("room:create",createRoom)

    const checkGuess = async (req:any) =>{
      console.log("Got ",req)
      const guessWithColors = await gameService.checkGuess(req)
      socket.emit("game:guessed",guessWithColors)
    }

    socket.on("game:guess",checkGuess)

    //const 
  }
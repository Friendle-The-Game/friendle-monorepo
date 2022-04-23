
import gameService from "../services/gameService"

export default (io: any, socket: any) => {

    const createRoom = async () => {
      const createdGame = await gameService.startGame()
      const roomId = createdGame.data.gameId
      socket.join(roomId)
      socket.emit("room:created", roomId)
    }
    socket.on("room:create", createRoom)

    const checkGuess = async (req: any) =>{
      const guessWithColors = await gameService.checkGuess(req)
      socket.emit("game:guessed", guessWithColors)
    }

    socket.on("game:guess", checkGuess)
  }
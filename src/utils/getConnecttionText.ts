import { WebSocketStatus } from '@hocuspocus/provider'

export const getConnectionText = (collabState: WebSocketStatus) => {
  switch (collabState) {
    case WebSocketStatus.Connected:
      return `已连接`

    case WebSocketStatus.Connecting:
      return `连接中...`

    case WebSocketStatus.Disconnected:
      return `已断开`

    default:
      return `连接中...`
  }
}
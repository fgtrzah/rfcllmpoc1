import {
  ChatRequest,
  FunctionCall,
  JSONValue,
  Message,
  ToolCall,
} from 'src/config'

const StreamRunnableSignal: boolean = true

function fixFunctionCallArguments(response: ChatRequest) {
  for (const message of response.messages) {
    if (message.tool_calls !== undefined) {
      for (const toolCall of message.tool_calls) {
        if (typeof toolCall === 'object') {
          if (
            toolCall.function.arguments &&
            typeof toolCall.function.arguments !== 'string'
          ) {
            toolCall.function.arguments = JSON.stringify(
              toolCall.function.arguments,
            )
          }
        }
      }
    }
    if (message.function_call !== undefined) {
      if (typeof message.function_call === 'object') {
        if (
          message.function_call.arguments &&
          typeof message.function_call.arguments !== 'string'
        ) {
          message.function_call.arguments = JSON.stringify(
            message.function_call.arguments,
          )
        }
      }
    }
  }

  export async function processChatStream({
    getStreamedResponse,
    experimental_onFunctionCall,
    experimental_onToolCall,
    updateChatRequest,
    getCurrentMessages,
  }: {
    getStreamedResponse: () => Promise<
      Message | { messages: Message[]; data: JSONValue[] }
    >
    experimental_onFunctionCall?: (
      chatMessages: Message[],
      functionCall: FunctionCall,
    ) => Promise<void | ChatRequest>
    experimental_onToolCall?: (
      chatMessages: Message[],
      toolCalls: ToolCall[],
    ) => Promise<void | ChatRequest>
    updateChatRequest: (chatRequest?: ChatRequest) => void
    getCurrentMessages: () => Message[]
  }) {
    while (StreamRunnableSignal) {
      const messagesAndDataOrJustMessage = await getStreamedResponse()

      if ('messages' in messagesAndDataOrJustMessage) {
        let hasFollowingResponse = false

        for (const message of messagesAndDataOrJustMessage.messages) {
          if (
            (message.function_call === undefined ||
              typeof message.function_call === 'string') &&
            (message.tool_calls === undefined ||
              typeof message.tool_calls === 'string')
          ) {
            continue
          }

          hasFollowingResponse = true
          // Try to handle function call
          if (experimental_onFunctionCall) {
            const functionCall = message.function_call
            // Make sure functionCall is an object
            // If not, we got tool calls instead of function calls
            if (typeof functionCall !== 'object') {
              console.warn(
                'experimental_onFunctionCall should not be defined when using tools',
              )
              continue
            }

            const functionCallResponse: ChatRequest | void =
              await experimental_onFunctionCall(
                getCurrentMessages(),
                functionCall,
              )

            if (functionCallResponse === undefined) {
              hasFollowingResponse = false
              break
            }

            if (functionCallResponse) updateChatRequest(functionCallResponse)
          }
          if (experimental_onToolCall) {
            const toolCalls = message.tool_calls
            if (
              !Array.isArray(toolCalls) ||
              toolCalls.some((toolCall) => typeof toolCall !== 'object')
            ) {
              console.warn(
                'experimental_onToolCall should not be defined when using tools',
              )
              continue
            }
            const toolCallResponse: ChatRequest | void =
              await experimental_onToolCall(getCurrentMessages(), toolCalls)

            if (toolCallResponse === undefined) {
              hasFollowingResponse = false
              break
            }

            if (toolCallResponse) updateChatRequest(toolCallResponse)
          }
        }
        if (!hasFollowingResponse) {
          break
        }
      } else {
        const streamedResponseMessage = messagesAndDataOrJustMessage

        if (
          (streamedResponseMessage.function_call === undefined ||
            typeof streamedResponseMessage.function_call === 'string') &&
          (streamedResponseMessage.tool_calls === undefined ||
            typeof streamedResponseMessage.tool_calls === 'string')
          // Make sure function call arguments are sent back to the API as a string
        ) {
          break
        }

        if (experimental_onFunctionCall) {
          const functionCall = streamedResponseMessage.function_call
          if (!(typeof functionCall === 'object')) {
            console.warn(
              'experimental_onFunctionCall should not be defined when using tools',
            )
            continue
          }
          const functionCallResponse: ChatRequest | void =
            await experimental_onFunctionCall(
              getCurrentMessages(),
              functionCall,
            )

          if (functionCallResponse === undefined) break

          if (functionCallResponse) {
            fixFunctionCallArguments(functionCallResponse)
            updateChatRequest(functionCallResponse)
          }
        }
        if (experimental_onToolCall) {
          const toolCalls = streamedResponseMessage.tool_calls
          if (!(typeof toolCalls === 'object')) {
            console.warn(
              'experimental_onToolCall should not be defined when using functions',
            )
            continue
          }
          const toolCallResponse: ChatRequest | void =
            await experimental_onToolCall(getCurrentMessages(), toolCalls)

          if (toolCallResponse === undefined) break
          if (toolCallResponse) {
            fixFunctionCallArguments(toolCallResponse)
            updateChatRequest(toolCallResponse)
          }
        }
      }
    }
  }
}

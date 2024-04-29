import React, { useEffect } from 'react'
import './OmniChat.css'
import { useForm, useOmniChat } from 'src/state'
import {
  BackwardIcon,
  CloseIcon,
  ExpandIcon,
  ForwardIcon,
  FuseLLMIcon,
  LLMSymbolIcon,
  RestartIcon,
  SendMessageIcon,
} from '.'
import { colors } from 'src/config'

export interface OmniChatProps extends React.PropsWithChildren {
  [x: string]: unknown
}

const COMPLETIONSMOCK = [
  {
    completion: {
      id: 'meta-llama/Meta-Llama-3-8B-Instruct-a81b1c69-9547-45be-9846-bd5e00d48c76',
      choices: [
        {
          finish_reason: 'stop',
          index: 0,
          logprobs: {
            text_offset: null,
            token_logprobs: null,
            tokens: null,
            top_logprobs: null,
          },
          text: " Icon\n\n**Please keep in mind that this is an open-source project and contributions are welcome!**\n\n**About**\n\nThe Eye of Judgment (ToE) is a Magic: The Gathering-inspired trading card game where players use creatures and spells to battle each other.\n\n**Goals**\n\n* To create a free and open-source trading card game with a unique and engaging gameplay mechanics.\n* To allow players to create and share their own cards, promoting creativity and community engagement.\n* To establish a strong online presence, including a web-based platform for trading, battling, and socializing.\n\n**Current Status**\n\nThe project is still in its early stages, but we have a working prototype with a basic set of cards, a simple AI, and a few features for trading and battling.\n\n**Components**\n\n* Cards: Each card represents a creature, spell, or other game element. Cards have unique characteristics, such as monster types, abilities, and strengths.\n* Decks: Players create decks by collecting and combining cards.\n* Battles: Players engage in turn-based battles, using their cards to attack and defend.\n* AI: The game includes a simple AI that can play against human opponents.\n* Web Platform: The game will be available on a web-based platform for trading, battling, and socializing.\n\n**Future Plans**\n\n* Expand the card set to include more creatures, spells, and game elements.\n* Improve the AI to provide more challenging and strategic gameplay.\n* Add features for trading and battling, such as tournaments and leaderboards.\n* Develop a mobile app to allow players to access the game on-the-go.\n\n**Contributing**\n\nIf you're interested in contributing to the project, please feel free to reach out. We welcome help with coding, design, testing, and other aspects of the game. Here's how you can contribute:\n\n* Report bugs or suggest improvements through the issue tracker.\n* Create and share your own cards, or help design new ones.\n* Help test and improve the game's performance.\n* Provide feedback on the game's design and balance.\n\n**Getting Started**\n\nTo get started with the project, you can:\n\n* Fork the repository on GitHub and start coding.\n* Join the discussion group on Discord to get involved in the community and provide feedback.\n* Share your ideas and suggestions through the issue tracker.\n\nThank you for your interest in the Eye of Judgment project! We're excited to collaborate and create a unique and engaging trading card game.arem</s>\nThe Eye of Judgment (ToE) is a Magic: The Gathering-inspired trading card game where players use creatures and spells to battle each other.\n\n**Please keep in mind that this is an open-source project and contributions are welcome!**\n\n**About**\n\nThe Eye of Judgment is designed to be a free and open-source trading card game with a unique and engaging gameplay mechanics. The game allows players to create and share their own cards, promoting creativity and community engagement.\n\n**Gameplay**\n\nIn ToE, players use a deck of cards to battle each other. Each card represents a creature, spell, or other game element, and has its own unique characteristics, such as monster types, abilities, and strengths. Players take turns playing cards from their deck, using their creatures to attack and defend against their opponent.\n\n**Card Types**\n\nThere are several types of cards in ToE:\n\n* Creatures: These cards represent monsters that can attack and defend.\n* Spells: These cards represent magical effects that can be used to attack, defend, or manipulate the game state.\n* Land: These cards represent the terrain that the creatures are battling on.\n* Events: These cards represent special events that can occur during the game.\n\n**Card Abilities**\n\nEach card in ToE has a unique ability that can be used during the game. Some examples of abilities include:\n\n* Attack: Creatures can use their attack ability to deal damage to the opponent's life total.\n* Block: Creatures can use their block ability to absorb damage from the opponent's creatures.\n* Create: Spells can use their create ability to summon new creatures to the battlefield.\n* Discard: Spells can use their discard ability to remove cards from the opponent's deck.\n\n**Deck Building**\n\nPlayers can build their own decks using the cards in the game. Each deck must contain a minimum number of cards and can be of any size. Players can use a variety of cards to create a deck that suits their playstyle.\n\n**Tournaments**\n\nPlayers can participate in tournaments to compete against other players. Tournaments can be hosted by the game's developers or by players themselves. The winner of a tournament receives a prize, which can be in the form of a unique card or other reward.\n\n**AI**\n\nToE has a simple AI that can play against human opponents. The AI is designed to provide a challenging and enjoyable experience for players. The AI's difficulty level can be adjusted to suit the player's skill level.\n\n**Web Platform**\n\nToE will be available on a web-based platform for trading, battling, and socializing. The platform will allow players to create and share their own cards, join tournaments, and connect with other players.\n\n**Future Plans**\n\nIn the future, we plan to add more features to ToE, including:\n\n* New card types and abilities\n* Improved AI\n* Multiplayer modes\n* Mobile app support\n\n**Contributing**\n\nIf you're interested in contributing to ToE, please feel free to reach out. We welcome help with coding, design, testing, and other aspects of the game. Here's how you can contribute:\n\n* Report bugs or suggest improvements through the issue tracker.\n* Create and share your own cards, or help design new ones.\n* Help test and improve the game's performance.\n* Provide feedback on the game's design and balance.\n\n**Getting Started**\n\nTo get started with ToE, you can:\n\n* Fork the repository on GitHub and start coding.\n* Join the discussion group on Discord to get involved in the community and provide feedback.\n* Share your ideas and suggestions through the issue tracker.\n\nThank you for your interest in the Eye of Judgment project! We're excited to collaborate and create a unique and engaging trading card game.",
        },
      ],
      created: 1714317574,
      model: 'meta-llama/Meta-Llama-3-8B-Instruct',
      object: 'text_completion',
      system_fingerprint: null,
      usage: {
        completion_tokens: 1241,
        prompt_tokens: 6,
        total_tokens: 1247,
      },
    },
    query: 'Please summarize the abstract of the provided RFC',
    context: 'https://www.rfc-editor.org/rfc/rfc6475.txt',
  },
]

const OmniChat = (props: OmniChatProps) => {
  const {
    omniChat: omniChatStore,
    loading,
    handleSend,
    toggleQA,
    toggleQAPanel,
  } = useOmniChat()
  const { handleChange, handleSubmit } = useForm<any>({
    validations: {
      name: {
        pattern: {
          value: '^[A-Za-z]*$',
          message: 'Error...',
        },
      },
    },
    onSubmit: handleSend,
  })
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        window.location.hash = window.location.hash.includes('qa') ? '' : 'qa'
        toggleQA()
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])
<<<<<<< HEAD
  useEffect(() => {
    console.log(omniChatStore)
  }, [omniChatStore.completions])
=======
  useEffect(() => { }, [omniChatStore.completions])
>>>>>>> 08885bc (Ah/cw (#18))

  return window.location.hash.includes('qa') ? (
    <div className='oc-container'>
      <header className='oc-header'>
        <span>QA Context: {omniChatStore.scopes as any}</span>
        <div>
          <button
            onClick={() => console.log('launch llm selector')}
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <FuseLLMIcon />
          </button>
          <button
            onClick={() => console.log('launch llm selector')}
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <LLMSymbolIcon />
          </button>
          <button
            onClick={toggleQAPanel}
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <ExpandIcon />
          </button>

          <button
            onClick={toggleQA}
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <CloseIcon />
          </button>
        </div>
      </header>

<<<<<<< HEAD
      <main
        className='oc-content'
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {loading && 'Processing response...'}
        <div
          style={{
            top: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
=======
      <main className='oc-content' style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {loading && 'Processing response...'}
        <div style={{ top: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
>>>>>>> 08885bc (Ah/cw (#18))
          <button
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <BackwardIcon />
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <ForwardIcon />
          </button>
        </div>
        <br />
        {omniChatStore.completions[0]?.completion?.choices?.map(
          (m: any, mi: number) => {
            return (
              <span key={mi}>
                <dt style={{ marginBottom: 4 }}>
                  <strong style={{ color: colors[5] }}>
                    {m?.message?.role?.toUpperCase?.() || 'System'}:
                  </strong>
                </dt>
                <dd>{m?.message?.content || m?.text}</dd>
              </span>
            )
          },
        )}
        <br />
<<<<<<< HEAD
=======

>>>>>>> 08885bc (Ah/cw (#18))
      </main>
      <section>{props?.children}</section>
      <footer className='oc-footer'>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <input
            disabled={loading}
            style={{ flexGrow: 1, backgroundColor: 'rgba(0,0,0,0) !important' }}
            value={omniChatStore.search}
            name='query'
            placeholder='Ask a question about this RFC'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
          />
          <div style={{ display: 'flex' }}>
            <button
              onClick={() => console.log('restart')}
              style={{
                background: 'none',
                border: 'none',
                appearance: 'none',
                color: '#b7cbf4',
                cursor: 'pointer',
              }}
              title='Regenerate response'
            >
              <RestartIcon />
            </button>
            <button
              type='submit'
              style={{
                background: 'none',
                border: 'none',
                appearance: 'none',
                color: '#b7cbf4',
                cursor: 'pointer',
              }}
            >
              <SendMessageIcon />
            </button>
          </div>
        </form>
      </footer>
    </div>
  ) : null
}

export default OmniChat

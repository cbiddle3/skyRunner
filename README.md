# skyRunner

## Step One: Please go to the sky-runner directory
### `cd sky-runner`

## Step Two: If it is your first time building the application please run the following command.
### `npm install`

## Step Three: To open the webpage please run the following command.
### `npm start`

```mermaid
sequenceDiagram
   GUI->>Interpreter: Translates front-end to back-end
   Interpreter-->>ScoreKeeper:
   Interpreter-->>BuildingAI:
   ScoreKeeper-->>GUI:
   BuildingAI-->>GUI: ‘
```

```mermaid
classDiagram
    class Game {
        <<interface>>
        StartGame()
    }
    
    class TitleScreen {
        
    }
    
    class PlayingScreen {
        +Background
        +Character
        +Building
    }

    class EndScreen {
        
    }
    Game --> TitleScreen
    Game --> PlayingScreen 
    Game --> EndScreen
```

```mermaid
graph 
    A[Start] --> B[User Selects Start]-->C[Game Begins] -- User Jumps -->D{Is game over?} -- No --> E[Generate Building Pattern]-->F[Display Background + Buildings]
    
   F-->D
   G[Display End Screen and Character Score]
   D-- Yes --> G
```

More information can be found on the README.md file under the sky-runner directory.

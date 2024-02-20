# skyRunner

## You can run the code the following two ways:

## One:

### A. Install the visual studio code "open in browser" extension 
<img width="678" alt="Screenshot 2024-02-19 at 9 59 42 PM" src="https://github.com/cbiddle3/skyRunner/assets/123024485/cf35a4fe-eb0b-4878-8960-52cc457ae000">

### B. Navigate to <placeHolder.html>

### C. Have a supported browser open

### D. Press `⌘k w` to open it on your browser

## Two:

### A. Go to your Finder/File Explorer

### B. Navigate to the skyRunner repository you cloned

### C. Select the <placeHolder>.html file and it will open in your browser

```mermaid
sequenceDiagram
   GUI->>Interpreter: 
   Interpreter-->>ScoreKeeper: 
   Interpreter-->>BuildingAI: 
   ScoreKeeper-->>GUI: 
   BuildingAI-->>GUI: 
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

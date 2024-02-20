# skyRunner platform game

Brief Description: You are a character that is running on top of buildings in the city. The object of the game is to get as far as you can while jumping over the cracks/spaces between the buildings.

## You can run the code the following two ways:

## One:

    A. Install the visual studio code "open in browser" extension 
<img width="678" alt="Screenshot 2024-02-19 at 9 59 42 PM" src="https://github.com/cbiddle3/skyRunner/assets/123024485/cf35a4fe-eb0b-4878-8960-52cc457ae000">

    B. Navigate to <placeHolder.html>

    C. Have a supported browser open

    D. Press `⌘k w` to open it on your browser

## Two:

    A. Go to your Finder/File Explorer

    B. Navigate to the skyRunner repository you cloned

    C. Select the <placeHolder>.html file and it will open in your browser

#### Class Diagram for GUI

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

This gives an overall view of the different components and how they will be organized for the game interface.

#### Sequence Diagram 

```mermaid
sequenceDiagram
   GUI->>Interpreter: 
   Interpreter-->>ScoreKeeper: 
   Interpreter-->>BuildingAI: 
   ScoreKeeper-->>GUI: 
   BuildingAI-->>GUI: 
```

This shows how the GUI (defined above) will make calls to the backEnd server in order to get the game logic regarding keeping track of highest score and the game logic regarding generating the next set of buildings (platform).

### Activity Diagram:
```mermaid
graph 
    A[Start] --> B[User Selects Start]-->C[Game Begins] -- User Jumps -->D{Is game over?} -- No --> E[Generate Building Pattern]-->F[Display Background + Buildings]
    
   F-->D
   G[Display End Screen and Character Score]
   D-- Yes --> G
```

This shows how the user actions and game logic will fundamentally interact.

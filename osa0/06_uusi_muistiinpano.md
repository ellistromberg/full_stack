sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user creates a new note and clicks the save button. The browser sends the POST request and the new note in JSON format to the server.
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: The server responds with "201 Created" and no redirection is needed. The page is not reloaded and the JavaScript code (in the browser) updates the notes. 

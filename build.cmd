rem dotnet tool install --gloabl wyam.tool
wyam build
"c:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:5080
wyam build --preview --watch
pause
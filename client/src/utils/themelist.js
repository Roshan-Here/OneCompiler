import nightOwl from "monaco-themes/themes/Night Owl.json";
import monokai from "monaco-themes/themes/Monokai.json";
import githubdark from "monaco-themes/themes/GitHub Dark.json";
import githublight from "monaco-themes/themes/GitHub Light.json";
import dracula from "monaco-themes/themes/Dracula.json";


const themeMap = [
    {
        id: 1,
        name: "nightOwl",
        changeto: nightOwl,
    },
    {
        id: 2,
        name: "monokai",
        changeto: monokai,
    },
    {
        id: 3,
        name: "Github-dark",
        changeto: githubdark,
    },
    {
        id: 4,
        name: "Github-light",
        changeto: githublight,
    },
    {
        id: 5,
        name: "Dracula",
        changeto: dracula,
    },
];

// "github-dark": "GitHub Dark",
//     "github-light": "GitHub Light",
// "dracula": "Dracula",

export default themeMap;
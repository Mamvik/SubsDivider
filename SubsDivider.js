(function() {
    if (document.body) {
        run();
    } else {
        // Запуск только при загрузке страницы
        window.addEventListener('DOMContentLoaded', run);
    }

    function run() {
        const names = JSON.parse(localStorage.getItem("subsDividerNames") || "[]");
        if (names.length !== 0) {  
            document.getElementById("searchNames").textContent = names.join("; ");
        }
        document.getElementById("typeNames").addEventListener("click", function () {
            const showNames = document.getElementById("namesControls").style["display"];
            if (showNames === "inline") {
                document.getElementById("namesControls").style["display"] = "none";
            } else {
                document.getElementById("namesControls").style["display"] = "inline";
            }
        })

        document.getElementById("saveNames").addEventListener("click", function () {
            const namesText = document.getElementById("searchNames").value;
            const namesArray = namesText.split(";").map(name => name.trim()).filter(name => name);
            if (namesArray.length > 0) {
                localStorage.setItem("subsDividerNames", JSON.stringify(namesArray));
                alert("Names saved successfully!");
            } else {
                alert("Please enter valid names.");
            }
        });

        document.getElementById("scriptRun").addEventListener("click", function () {
            const inputText = document.getElementById("input").value;

            function escapeRegExp(string) {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }

            if (names.length === 0) {  
                alert("Please save names first.");
                return;
            }

            const namePattern = names.map(escapeRegExp).join("|");

            const lines = inputText.split(/\r?\n/);

            const regexWithColon = new RegExp(`^\\s*(${namePattern})\\s*:\\s*(.*)$`, "i");

            const resultNames = [];
            const resultTexts = [];

            for (const line of lines) {
                var match;
                if ((match = line.match(regexWithColon))) {
                    resultNames.push(match[1]);
                    if (match[2] === "") {
                        if (resultNames.length > 0) {
                            resultTexts[resultTexts.length - 1] += " ";
                        }
                    } else {
                        resultTexts.push(match[2]);
                    }
                } else if (/^\s*[\u2012\u2013\u2014\u2212-]/.test(line)) {
                    if (/^\s*[\u2012\u2013\u2014\u2212-]/.test(resultTexts[resultTexts.length - 1])) {
                        resultTexts[resultTexts.length - 1] += "\\N" + line.trim();
                    } else {
                        resultTexts.push(line);
                    }
                } else {
                    resultNames.push(line);
                }
            }

            document.getElementById("outputNames").value = resultNames.join("\n");
            document.getElementById("outputTexts").value = resultTexts.join("\n");
        });
    }
})();
(function() {
    if (document.body) {
        run();
    } else {
        // Запуск только при загрузке страницы
        window.addEventListener('DOMContentLoaded', run);
    }

    function run() {
        document.getElementById("scriptRun").addEventListener("click", function () {
            const inputText = document.getElementById("input").value;
            const namesRaw = document.getElementById("searchNames").value;

            function escapeRegExp(string) {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }

            const names = namesRaw
                .split(";")
                .map(name => name.trim());

            const namePattern = names.map(escapeRegExp).join("|");

            const lines = inputText.split(/\r?\n/);

            const regexWithColon = new RegExp(`^\\s*(${namePattern})\\s*:\\s*(.*)$`, "i");

            const resultNames = [];
            const resultTexts = [];

            for (const line of lines) {
                var match;
                if ((match = line.match(regexWithColon))) {
                    resultNames.push(match[1]);
                    resultTexts.push(match[2]);
                }
                else {
                    resultNames.push(line);
                }
            }

            document.getElementById("outputNames").value = resultNames.join("\n");
            document.getElementById("outputTexts").value = resultTexts.join("\n");
        });
    }
})();
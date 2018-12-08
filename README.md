# hsnr-web-pra1
Die Dokumentation befindet sich im `/docs`-Verzeichnis. 

## Generate 'test'-output
Requirements:
* jq: brew install jq
* json: npm install json
```bash
$ ./test/tests.sh -v | ./test/ansi_html.sh > test/output.html
```
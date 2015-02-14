package main

import (
	"bytes"
	"log"
	"net/http"
	"os"
	"text/template"
)

type fileServer struct {
	root http.FileSystem
	file string
}

var tmpl = `window.myodcConfig = {
   'apiBaseURL': '{{.}}'
};
`

var configJS []byte

func (fs *fileServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	f, err := fs.root.Open(fs.file)
	if err != nil {
		http.NotFound(w, r)
		return
	}
	defer f.Close()

	d, err1 := f.Stat()
	if err1 != nil {
		http.NotFound(w, r)
		return
	}

	if d.IsDir() {
		http.NotFound(w, r)
		return
	}

	// serveContent will check modification time
	http.ServeContent(w, r, d.Name(), d.ModTime(), f)
}

func serveFile(root http.FileSystem, file string) *fileServer {
	return &fileServer{
		root: root,
		file: file,
	}
}

func initConfigJS() []byte {
	t, err := template.New("config").Parse(tmpl)
	if err != nil {
		return nil
	}
	b := bytes.NewBuffer(nil)
	defer b.Reset()
	err = t.Execute(b, os.Getenv("API_BASE_URL"))
	return b.Bytes()
}

func init() {
	configJS = initConfigJS()

	// Static content
	http.Handle("/", http.FileServer(http.Dir("_site")))
	http.Handle("/p/", serveFile(http.Dir("_site"), "index.html"))

	http.HandleFunc("/config.js", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/javascript;charset=UTF-8")
		w.Write(configJS)
	})
}

func main() {
	log.Println("Starting web server on :8081")
	if err := http.ListenAndServe(":8081", nil); err != nil {
		panic(err.Error())
	}
}

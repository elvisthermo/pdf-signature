import "./libs/pure-min.css";
import "./App.css";
import React,{useState,useEffect} from 'react';
import Modal from './Componets/Modal/index';


function App() {
  const [pdf,setPdf] = useState(0);


    async function load_pdf(file){
        console.log("testes entrou aqui");
        let teste = await new Response(file).arrayBuffer();

        const reader = new FileReader();
        let base64_file;
        reader.onload = function (e) {
            var typedarray = new Uint8Array(e.result);
            base64_file = e.target.result;
            base64_file =  base64_file.split(',');
            setPdf(base64_file[1])
            console.log(base64_file[1])
        }
        reader.readAsDataURL(file[0]);

    }

  return (

  <div className="App">

  <label className=" button-wrapper">

      <span className="label">
        selecione um arquivo pdf:
  </span>
  </label>

  <input class="pure-button pure-button-primary file" type="file" name={pdf}
   accept="application/pdf"
   onChange={e => load_pdf(e.target.files)}
   />

   <Modal file={pdf}></Modal>

  <div className="viewFile">

  </div>

  </div>

  );
}

export default App;

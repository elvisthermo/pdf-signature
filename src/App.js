import "./App.css";
import React,{useState,useEffect} from 'react';
import Modal from './Componets/Modal/index';


function App() {
  const [pdf,setPdf] = useState(0);


    async function load_pdf(file){
        console.log("testes entrou aqui");
        let teste = await new Response(file).arrayBuffer();
        // console.log("teste",teste)
        // console.log("0",file)
        // console.log("pdf",Pdf);
        const reader = new FileReader();
        let base64_file;
        reader.onload = function (e) {
            var typedarray = new Uint8Array(e.result);
            // console.log(typedarray)
            // console.log("aqui1",e.target.result);
            base64_file = e.target.result;
            base64_file =  base64_file.split(',');
            setPdf(base64_file[1])
            console.log(base64_file[1])
        }
        reader.readAsDataURL(file[0]);

    }

  return (

  <div className="App">

  <label>selecion um arquivo pdf:</label>

  <input type="file" name={pdf}
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

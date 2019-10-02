import "./styles.css";
import React,{useState,useEffect} from 'react';
import Canvas from '../Canvas/'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

function Modal(props) {
    const [visible,setVisible] = useState('none')
    const [img,setImg] = useState();
    const [clear,setClear] = useState(0);

    function isVisible() {
        if(visible==='none')
            setVisible('block')
        else
            setVisible('none')
    }

    function clearImg(){
        return setClear(true);
    }

    async function saveImage(){
        let canvas = document.getElementById("paint");
        let image = canvas.toDataURL("image/png", 0.5)
        let bytecode = image.split('base64,')[1];
        await setImg(bytecode);
        console.log(bytecode);
        isVisible()
        console.log("foi");

    }

    useEffect(() => {
        pdfs2();
    }, [img]);

    async function pdfs2() {
        console.log("img dentro do pdf2",img);

    }

    async function pdfs() {
        const pdfDoc = await PDFDocument.create()
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const fontSize = 30

        page.drawText('Creating PDFs in JavaScript is awesome!', {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.71),
        })

        const pdfBytes = await pdfDoc.save();
        console.log(pdfBytes)
        // ----PDF SAVE--------------------------

        const ToBase64 = function (u8) {
            return btoa(String.fromCharCode.apply(null, u8));
        }
        const FromBase64 = function (str) {
            return atob(str).split('').map(function (c) { return c.charCodeAt(0); });
        }

        var u8 = new Uint8Array(256);
        for (var i = 0; i < 256; i++)
            u8[i] = i;

        var b64;
        if(props.file){
            b64 = props.file;
        }else{
            b64 = ToBase64(pdfBytes);
        }

        var bin = atob(b64);

        let removeLink = document.getElementById('link-pdf');
        if(removeLink){
            removeLink.parentNode.removeChild(removeLink);
            console.log("aqui",removeLink)
        }

        let removePdf = document.getElementById('view-pdf');
        if(removePdf){
            removePdf.parentNode.removeChild(removePdf);
            console.log("aqui",removePdf)
        }

        var obj = document.createElement('object');
        obj.id = "view-pdf";
        obj.style.width = '100%';
        obj.style.height = '842pt';
        obj.type = 'application/pdf';
        obj.data = 'data:application/pdf;base64,' + b64;
        document.body.appendChild(obj);

        function readAllBytesAsUInt8Array(path) {
            var req = new XMLHttpRequest();
            req.open("GET", path, false);
            req.overrideMimeType("text/plain; charset=binary-data");
            req.send(null);
            if (req.status !== 200) {
                console.log("error");
                return null;
            }
            var text = req.responseText;
            var encoder = new TextEncoder("utf-8");
            var resultArray = encoder.encode(text);
            console.log("teste:",resultArray.buffer);
            return resultArray.buffer;
        }

    }

    useEffect(()=>{
        function f() {
            pdfs();
        }f()
    },[props.file])

    return(
        <div>
            <label>
                <input class="pure-button pure-button-primary" type="button" value="criar assinatura" onClick={isVisible}/>
                     </label>
                     <div className="modal"
                          style={{display:visible,position:"absolute"}}>
                         <div className="modal-container">
                             <div className="modal-header">
                                 <button  class="pure-button pure-button-warning close" onClick={isVisible}>fechar</button>
                             </div>
                             <Canvas clear={clear}/>
                             <div className="modal-footer">
                                 <button  class="pure-button pure-button clear" onClick={clearImg}>limpar</button>
                                 <button  class="pure-button pure-button-primary  submit" onClick={saveImage}>submeter assinatura</button>
                             </div>
                         </div>
                     </div>
        </div>
    );

}

export default Modal;

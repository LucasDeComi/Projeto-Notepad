import { doc, getDoc, getDocs, addDoc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const codeRef = useRef();
  const [error, setError] = useState("");

  async function sendCode(event) {
    event.preventDefault();
    const code = codeRef.current?.value;
    if(code === "") {
      setError("O código não pode estar vazio.");
    }
    else if(code.includes(" ") || code.includes(",") || code.includes(".")) {
      const errorSplit = code.split(" ");
      setError(`
        Não devem haver espaços, vírgulas ou pontos no código.
        Tente utilizar ${errorSplit.join("")}, ${errorSplit.join("_")} ou ${errorSplit.join("-")}
      `);
    }
    else {
      const noteRef = doc(db, "dbprojetonotepad", code);
      const noteSnap = await getDoc(noteRef);
      if(!noteSnap.exists()) {
        await setDoc(noteRef /*id*/, {});
        await addDoc(collection(db, "dbprojetonotepad", code, "guias"), {
          nome: "Guia 1",
          conteudo: ""
        });
      }
      const tabsSnap = await getDocs(collection(db, "dbprojetonotepad", code, "guias"));
      navigate(`/${code}/${tabsSnap.docs[0].id}`);
    }
  }
  return (
    <div className="w-screen h-screen flex flex-col gap-5 md:gap-10 p-2.5 justify-center items-center">
      <h1 className="text-3xl md:text-5xl text-center font-bold">NOTEPAD ONLINE</h1>
      <form onSubmit={sendCode} className="flex flex-col items-center gap-2 md:gap-3">
        <input ref={codeRef} name="code" placeholder="Insira o nome do seu bloco de notas"
          className="min-w-75 max-w-100 w-fit px-2 py-1 border border-black outline-none rounded-md text-sm md:text-[16px]"
        />
        <span className="whitespace-pre-line text-xs md:text-sm text-center text-[#ff0000] italic max-w-fit">{error}</span> 
        <button type="submit"
        className="bg-[#F1F3F4] px-3 py-1 border border-black rounded-md text-sm md:text-[16px]
        hover:bg-[#E1E3E4] active:bg-[#F1F3F4] transition-colors duration-300">
          Ir para Bloco de Notas
        </button>
      </form>
    </div>
  )
}
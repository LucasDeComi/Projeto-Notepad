import { collection, onSnapshot, doc, addDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import TabLink from "../components/TabLink"
import { add } from "firebase/firestore/pipelines";

export default function Notepad() {
  const { notepadId, tabId } = useParams();
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState(currentTab?.conteudo || "");
  const timeout = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    const tabsRef = collection(db, "dbprojetonotepad", notepadId, "guias");
    const unsub = onSnapshot(tabsRef, snapshot => {
      const tabsData = snapshot.docs.map(tab => ({
        id: tab.id,
        ...tab.data()
      }));
      const current = snapshot.docs.find(tab => tab.id === tabId);
      setTabs(tabsData);
      setCurrentTab(current ? {id: current.id, ...current.data()} : null);
      console.log("tabId da URL:", tabId);
      console.log("docs no snapshot:", snapshot.docs.map(d => d.id));
    });
    return () => unsub;
  }, [notepadId, tabId]);

  useEffect(() => {
    setText(currentTab?.conteudo || "")
  }, [currentTab]);

  function openAdd() {
    setAdding(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }

  async function addTab() {
    const name = inputRef.current?.value;
    if(name !== "") {
      await addDoc(collection(db, "dbprojetonotepad", notepadId, "guias"), {
        nome: name,
        conteudo: ""
      })
    }
    setAdding(false);
  }

  function updateText(e) {
    const newText = e.target.value;
    setText(newText);
    clearTimeout(timeout.current); // Se o usuário digita antes de 2 segundos, reinicia a contagem
    timeout.current = setTimeout(async () => {
      const tab = doc(db, "dbprojetonotepad", notepadId, "guias", tabId);
      await updateDoc(tab, {
        conteudo: newText
      })
    }, 2000); // Se não digitar por mais de 2 segundos, salva
  }

  return (
    <div className="w-screen h-screen flex">
      <aside className="max-w-75 lg:w-[20%] w-[30%] flex flex-col gap-5 px-2 py-10 border-r border-black overflow-y-scroll">
        <section className="flex flex-col gap-2 px-2">
          <div className="flex justify-between items-center">
            <h1>Suas guias</h1>
            <button onClick={() => openAdd()}>
              <img className="h-9" src={`${import.meta.env.BASE_URL}/add.svg`}/>
            </button>
          </div>
          <input ref={inputRef} className={`${adding ? "" : "hidden"}`} placeholder="Nova guia"
          onKeyDown={e => {if(e.key === "Enter") e.target.blur()}} onBlur={() => addTab()} />
        </section>
        {tabs.map(tab => (
          <TabLink key={tab.id} tab={tab.id} note={notepadId} active={tab.id === tabId} >{tab.nome}</TabLink>
        ))}
      </aside>
      <textarea className="w-full h-screen p-3 resize-none"
      value={text} onChange={updateText} />
    </div>
  )
}

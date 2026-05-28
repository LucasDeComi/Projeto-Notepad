import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../firebase";

export default function TabLink({note, tab, active, children}) {
  const navigate = useNavigate();
  const [name, setName] = useState(children);
  const [editing, setEditing] = useState(false);

  function openEdit() {
    setEditing(true);
    setTimeout(() => {
      nameRef.current?.focus();
    }, 50);
  }

  async function newName() {
    const tabRef = await doc(db, "dbprojetonotepad", note, "guias", tab);
    if(name !== "") {
      await updateDoc(tabRef, {
        nome: name
      });
    }
    else setName(children);
    setEditing(false)
  }

  async function deleteTab() {
    const tabRef = await doc(db, "dbprojetonotepad", note, "guias", tab);
    const result = await Swal.fire({
      title: "Você realmente deseja apagar esta guia?",
      text: "Não é possível reverter este processo",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    });
    if(result.isConfirmed) {
      await deleteDoc(tabRef);
    }
  }

  return (
    <div onClick={() => navigate(`/${note}/${tab}`)} onDoubleClick={() => openEdit()}
      className={`flex justify-between items-center px-2 py-1.5 bg-[#F1F3F4] rounded-xl border border-black`}>
      <span className={`truncate ${editing ? "hidden" : ""}`}>{children}</span>
      <input value={name} className={`w-full ${editing ? "" : "hidden"}`}
      onChange={e => setName(e.target.value)} onKeyDown={e => {if(e.key === "Enter") e.target.blur()}} onBlur={() => newName()} />
      <button onClick={() => deleteTab()}>
        <img className="h-9" src={`${import.meta.env.BASE_URL}/delete.svg`}/>
      </button>
    </div>
  )
}

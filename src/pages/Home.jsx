import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function sendCode(event) {
    event.preventDefault();
    navigate("/notepad");
  }
  return (
    <div className="w-screen h-screen flex flex-col gap-5 p-2.5 justify-center items-center">
      <h1 className="text-3xl md:text-5xl text-center font-bold">NOTEPAD ONLINE</h1>
      <form onSubmit={sendCode} className="flex flex-col items-center gap-3">
        <input name="code" placeholder="Insira o nome do seu bloco de notas"
          className="min-w-75 max-w-100 w-fit px-2 py-1 border border-black outline-none rounded-md text-sm md:text-[16px]"
        />
        <button type="submit"
        className="bg-[#F1F3F4] px-3 py-1 border border-black rounded-md text-sm md:text-[16px]
        hover:bg-[#E1E3E4] active:bg-[#F1F3F4] transition-colors duration-300">
          Ir para Bloco de Notas
        </button>
      </form>
    </div>
  )
}